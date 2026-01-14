# 😷 Mask Detector

แอปพลิเคชันตรวจจับหน้ากากอนามัยแบบ Real-time โดยใช้ AI (Teachable Machine + TensorFlow.js)

## ✨ Features

- 🎥 ตรวจจับหน้ากากอนามัยแบบ Real-time ผ่านกล้อง Webcam
- 🤖 ใช้ Machine Learning Model จาก Google Teachable Machine
- 🌐 รองรับหลายแพลตฟอร์ม: Web, Android, Desktop (Electron)
- ⚡ พัฒนาด้วย React + TypeScript + Vite

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI Framework |
| TypeScript | Type Safety |
| Vite | Build Tool & Dev Server |
| TensorFlow.js | Machine Learning Runtime |
| Teachable Machine | Image Classification Model |
| Capacitor | Android App Build |
| Electron | Desktop App Build |

## 📁 Project Structure

```
mask-detector/
├── public/
│   └── model/           # Teachable Machine Model Files
│       ├── model.json
│       └── metadata.json
├── src/
│   ├── components/
│   │   └── MaskDetector.tsx   # Main Component
│   ├── App.tsx
│   └── main.tsx
├── android/             # Capacitor Android Project
├── electron/            # Electron Desktop Config
└── dist-electron/       # Electron Build Output
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm หรือ yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd mask-detector

# Install dependencies
npm install --legacy-peer-deps
```

### Development

```bash
# Start development server
npm run dev
```

เปิดเบราว์เซอร์ไปที่ `http://localhost:5173`

## 📦 Build

### Web Build

```bash
npm run build
```

ไฟล์ Build จะอยู่ในโฟลเดอร์ `dist/`

### Android Build

```bash
# Build และ Sync กับ Android
npm run build:android

# เปิดใน Android Studio
npx cap open android
```

> 📖 ดูรายละเอียดเพิ่มเติมได้ที่ [BUILD_APK.md](./BUILD_APK.md)

### Desktop Build (Electron)

```bash
npm run build:electron
```

## 🎯 How It Works

1. **Load Model** - โหลด Teachable Machine Model จากโฟลเดอร์ `/public/model/`
2. **Start Webcam** - เริ่มต้นกล้อง Webcam เมื่อผู้ใช้กดปุ่ม
3. **Predict** - ทำนายผลแบบ Real-time ว่าสวมหน้ากากหรือไม่
4. **Display** - แสดงผลลัพธ์เป็น Probability ของแต่ละ Class

## 🔧 Custom Model

หากต้องการใช้โมเดลของตัวเอง:

1. สร้างโมเดลที่ [Teachable Machine](https://teachablemachine.withgoogle.com/)
2. Export โมเดลแบบ TensorFlow.js
3. นำไฟล์ `model.json`, `metadata.json` และ `weights.bin` ไปวางในโฟลเดอร์ `public/model/`

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production (Web) |
| `npm run build:android` | Build for Android |
| `npm run build:electron` | Build for Desktop |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## 📄 License

MIT License
