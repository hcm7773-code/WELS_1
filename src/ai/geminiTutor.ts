import { TutorRequest, TutorResponse } from './tutorTypes';
import { buildTutorSystemPrompt } from './tutorPrompt';
import { getMockTutorResponse } from './mockTutor';

/**
 * Dedicated AI Service for VELS AI Tutor.
 * Isolates AI calls from UI components and provides robust fallback to Mock Tutor.
 */
export async function askTutor(request: TutorRequest): Promise<TutorResponse> {
  const systemPrompt = request.systemPrompt || buildTutorSystemPrompt(request.context);

  try {
    // Attempt to invoke server-side Gemini API endpoint
    const response = await fetch('/api/tutor', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        systemPrompt,
        conversationHistory: request.conversationHistory.map((msg) => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        })),
        userMessage: request.userMessage,
        context: {
          courseId: request.context.courseId,
          virtueId: request.context.virtueId,
          virtueNameZh: request.context.virtueNameZh,
          virtueNameEn: request.context.virtueNameEn,
          currentStepNumber: request.context.currentStep.number,
          currentStepCode: request.context.currentStep.code,
        }
      })
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.text && !data.useFallback) {
        return {
          assistantMessage: data.text,
          thinkingPoints: data.thinkingPoints || undefined,
          suggestedQuestions: data.suggestedQuestions || undefined,
          bibleVerseTag: data.bibleVerseTag || undefined,
          stepGuidance: data.stepGuidance || undefined,
          source: 'gemini'
        };
      }
    }
  } catch (error) {
    // Server route unavailable, offline, or development environment without live proxy
    console.info('Live Gemini endpoint unreachable or key not configured. Falling back to VELS Mock Tutor prototype.');
  }

  // Graceful prototype fallback to Mock Tutor
  return getMockTutorResponse({
    ...request,
    systemPrompt
  });
}
