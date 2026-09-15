import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';

function tutorApiPlugin(): Plugin {
  return {
    name: 'vels-tutor-api',
    configureServer(server) {
      server.middlewares.use('/api/tutor', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
          return;
        }

        let body = '';
        req.on('data', (chunk: Buffer) => {
          body += chunk.toString();
        });

        req.on('end', async () => {
          try {
            const data = JSON.parse(body || '{}');
            const apiKey = process.env.GEMINI_API_KEY;

            if (!apiKey) {
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ useFallback: true, message: 'GEMINI_API_KEY is not configured' }));
              return;
            }

            const { GoogleGenAI } = await import('@google/genai');
            const ai = new GoogleGenAI({
              apiKey,
              httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
            });

            const contents: Array<{ role?: string; parts: Array<{ text: string }> }> = [];

            if (Array.isArray(data.conversationHistory)) {
              for (const msg of data.conversationHistory) {
                if (msg.parts?.[0]?.text) {
                  contents.push({
                    role: msg.role === 'assistant' || msg.role === 'model' ? 'model' : 'user',
                    parts: [{ text: msg.parts[0].text }],
                  });
                }
              }
            }

            contents.push({
              role: 'user',
              parts: [{ text: data.userMessage || '你好' }],
            });

            const response = await ai.models.generateContent({
              model: 'gemini-3.8-flash',
              contents,
              config: {
                systemInstruction: data.systemPrompt || '你是一位溫暖的聖經品格教育 AI 助教。',
              },
            });

            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
              text: response.text || '',
              useFallback: false,
            }));
          } catch (err: any) {
            console.warn('Gemini live API error, switching to mock:', err?.message || err);
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ useFallback: true, error: err?.message || 'Server error' }));
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss(), tutorApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
  };
});
