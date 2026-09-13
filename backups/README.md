# VELS Mini v0.6.0 官方基準版本備份記錄

- **備份版本**：VELS Mini v0.6.0 — AI Tutor Prototype (Official Baseline)
- **備份時間**：2026-09-13
- **Git Commit Hash**：`f969de3`
- **Git Release Tag**：`v0.6.0`

---

## 備份位置

1. **實體資料夾完整原始碼鏡像備份**：
   - 路徑：`backups/v0.6.0/`
   - 說明：包含完整的前端原始碼、AI 核心模組、課程資料庫（6 大 JSON）、設定檔、型別定義檔與資源檔案。可直接檢視或複製使用。

2. **獨立壓縮保存檔（單檔封存）**：
   - 路徑：`backups/vels-mini-v0.6.0.tar.gz`
   - SHA256 校驗碼：`55aa0bc2b3d79944b46e9f28473d351756a067c51ee7f3845de50afa9634edd0`
   - 校驗檔路徑：`backups/vels-mini-v0.6.0.tar.gz.sha256`

3. **版本控制 Git Tag 錨點**：
   - Tag：`v0.6.0`
   - 指令：`git checkout v0.6.0`

---

## 核心功能與資料驗證規格

- **語意鎖定（方案 B）**：
  - V001: 勇氣 / Courage
  - V002: 誠實 / Honesty
  - V003: 同情心 / Compassion（無「尋求」錯置，教材語彙別名為憐憫）
  - V004: 責任 / Responsibility
  - V005: 毅力 / Perseverance
- **AI Tutor 模組**：
  - `src/ai/tutorTypes.ts`（型別系統）
  - `src/ai/tutorPrompt.ts`（Step-Aware 提示詞引擎，7 步驟情境感知）
  - `src/ai/mockTutor.ts`（本地高可用性教學引導 Fallback）
  - `src/ai/geminiTutor.ts`（伺服器代理介接服務）
  - `src/components/AITutor.tsx`（獨立伴讀對話元件）
- **驗證狀態**：
  - `dataValidation.ts`：PASS (isValid: true, 0 errors, 0 warnings)
  - `tsc --noEmit`：PASS (0 errors)
  - `npm run build`：PASS (編譯成功)

---

## 一鍵還原說明

如日後需還原至 v0.6.0 狀態，可採用以下任一方式：

### 方式 A：使用 Git Tag 還原（推薦）
```bash
git checkout v0.6.0
```

### 方式 B：使用實體備份資料夾還原
```bash
cp -r backups/v0.6.0/* .
```

### 方式 C：解壓縮封存檔還原
```bash
tar -xzvf backups/vels-mini-v0.6.0.tar.gz -C .
```
