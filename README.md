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
│
├── 📄 index.html              # HTML entry point
├── 📄 package.json            # Dependencies และ scripts
├── 📄 vite.config.ts          # Vite configuration
├── 📄 tsconfig.json           # TypeScript configuration
├── 📄 capacitor.config.ts     # Capacitor configuration สำหรับ mobile
├── 📄 electron-builder.json5  # Electron builder configuration
├── 📄 .eslintrc.cjs           # ESLint configuration
│
├── 📁 src/                    # ✨ Source code หลัก
│   ├── 📄 main.tsx            # React entry point
│   ├── 📄 App.tsx             # Root component
│   ├── 📄 App.css             # Global styles สำหรับ App
│   ├── 📄 index.css           # Global CSS styles
│   ├── 📄 vite-env.d.ts       # Vite type definitions
│   │
│   ├── 📁 components/         # React Components
│   │   ├── 📄 MaskDetector.tsx    # 🎯 Component หลักตรวจจับหน้ากาก
│   │   └── 📄 MaskDetector.css    # Styles สำหรับ MaskDetector
│   │
│   ├── 📁 types/              # TypeScript Type Definitions
│   │   └── 📄 teachablemachine.d.ts  # Types สำหรับ Teachable Machine
│   │
│   └── 📁 assets/             # Static assets (images, icons)
│
├── 📁 public/                 # 📦 Static files (ไม่ถูก process)
│   ├── 📄 vite.svg            # Vite logo
│   └── 📁 model/              # 🤖 Teachable Machine Model
│       ├── 📄 model.json      # Model architecture
│       ├── 📄 metadata.json   # Model metadata (labels)
│       └── 📄 weights.bin     # Model weights
│
├── 📁 electron/               # 🖥️ Electron Desktop App
│   ├── 📄 main.ts             # Electron main process
│   ├── 📄 preload.ts          # Preload script
│   └── 📄 electron-env.d.ts   # Electron type definitions
│
└── 📁 android/                # 📱 Android Project (Capacitor)
    ├── 📄 build.gradle        # Android build configuration
    ├── 📄 settings.gradle     # Gradle settings
    ├── 📄 variables.gradle    # Gradle variables
    ├── 📄 gradlew.bat         # Gradle wrapper (Windows)
    ├── 📁 app/                # Android app module
    │   ├── 📄 build.gradle    # App-level build config
    │   └── 📁 src/            # Android source code
    ├── 📁 gradle/             # Gradle wrapper files
    └── 📁 capacitor-cordova-android-plugins/  # Capacitor plugins
```

### 📂 Folder Descriptions

| Folder | Description |
|--------|-------------|
| `src/` | โค้ด React/TypeScript หลักของแอปพลิเคชัน |
| `src/components/` | React Components ที่ใช้ในแอป |
| `src/types/` | TypeScript type definitions |
| `public/` | ไฟล์ static ที่ไม่ต้อง process (รวมถึง ML Model) |
| `public/model/` | ไฟล์โมเดล Teachable Machine สำหรับตรวจจับหน้ากาก |
| `electron/` | โค้ดสำหรับ build Desktop app ด้วย Electron |
| `dist/` | Output จากการ build สำหรับ Web |
| `dist-electron/` | Output จากการ build สำหรับ Electron |
| `android/` | โปรเจค Android ที่สร้างโดย Capacitor |

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
