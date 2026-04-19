# For the Jury  

Source code:   
https://github.com/madinajanarys/olyapp  

Web version is available at:  
https://olyapp.expo.app/

Android version (APK) is available at:  
https://github.com/madinajanarys/olyapp/raw/refs/heads/main/app.apk

iOS version (IPA) will be available soon.









# How-to install on Windows  

- Install **Node.js v20.19 or higher** (required for Expo SDK 54) from https://nodejs.org/en/download
- Install Expo Orbit from https://github.com/expo/orbit/releases
- Install emulator from https://expo.dev/go

# Olimpiad Family

Expo (React Native) app with i18n (en / kk / ru) and React Navigation.

## How to run

**Terminal** = the place where you type commands (Command Prompt, PowerShell, or the Terminal tab inside Cursor/VS Code).

1. **Open a terminal**
   - In **Cursor**: press `` Ctrl+` `` (backtick) or use menu **Terminal → New Terminal**.
   - Or open **PowerShell** or **Command Prompt** from the Windows Start menu.

2. **If you see “npm is not recognized”** (Node is installed but not in PATH), run this once in the same terminal:
   ```powershell
   $env:Path = "C:\Program Files\nodejs;" + $env:Path
   ```
   Then run the steps below. To fix it permanently: restart Cursor after installing Node.js, or add `C:\Program Files\nodejs` to your system PATH.

3. **Go to the project folder** (if you’re not already there):
   ```bash
   cd c:\Users\zh_ra\Desktop\project
   ```

4. **Install dependencies** (only needed once, or after upgrading SDK):
   ```bash
   npm install
   npx expo install --fix
   ```
   `npx expo install --fix` aligns all Expo-related packages to versions compatible with the current SDK.

   **If you get `ERESOLVE could not resolve` or dependency conflicts** (e.g. after upgrading to SDK 54), do a clean install:
   ```powershell
   Remove-Item -Recurse -Force node_modules; Remove-Item package-lock.json -Force
   npm install
   npx expo install --fix
   ```

5. **Start the app**:
   ```bash
   npx expo start
   ```

6. **Open the app**:
   - **Phone**: install “Expo Go” from the app store, then scan the QR code shown in the terminal.
   - **Web**: in the same terminal, press **w**.
   - **Android emulator**: press **a** (emulator must be installed and running).
   - **iOS simulator** (Mac only): press **i**.

To stop the server, press **Ctrl+C** in the terminal.

**If Node is in a different folder** (e.g. nvm or custom install), use the full path instead of `npm` / `npx`, for example:
```powershell
& "C:\Program Files\nodejs\npm.cmd" install
& "C:\Program Files\nodejs\npx.cmd" expo start
```


## Build an android release version  

$env:JAVA_HOME = "C:\Program Files\Android\Android Studio\jbr"
cd android
.\gradlew.bat assembleRelease
// apk file will be in android\app\build\outputs\apk\release folder


## EAS
```
npm install --global eas-cli  
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
eas init --id 0d284465-14a4-4245-9aec-2a811d30eba6
```

# EAS deploy
```
npx expo export --platform web  
eas deploy
```

```
npx expo export --platform web 
eas deploy --prod
```