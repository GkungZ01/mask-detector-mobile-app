# วิธี Build APK สำหรับ Mask Detector App

## ขั้นตอนที่ต้องทำ

### 1. ติดตั้ง Android Studio
- ดาวน์โหลดจาก: https://developer.android.com/studio
- ติดตั้งและเปิดครั้งแรก (จะติดตั้ง Android SDK อัตโนมัติ)

### 2. ตั้งค่า ANDROID_HOME (หลังติดตั้ง Android Studio)
เปิด PowerShell แบบ Administrator แล้วรัน:
```powershell
[Environment]::SetEnvironmentVariable("ANDROID_HOME", "$env:LOCALAPPDATA\Android\Sdk", "User")
```

### 3. Build APK

#### วิธี A: ใช้ Android Studio (ง่ายที่สุด)
```bash
npx cap open android
```
แล้วเลือก Build > Build Bundle(s) / APK(s) > Build APK(s)

#### วิธี B: ใช้ Command Line
```bash
cd android
.\gradlew.bat assembleDebug
```

### 4. ไฟล์ APK จะอยู่ที่
```
android/app/build/outputs/apk/debug/app-debug.apk
```

## หมายเหตุ
- APK แบบ Debug ใช้ทดสอบได้เลย ไม่ต้อง sign
- สำหรับ Release APK ต้องสร้าง keystore และ sign ก่อน upload Play Store
