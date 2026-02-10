# 🚀 Document Scanner - VS Code Workspace

Dieses Workspace-File konfiguriert VS Code optimal für die Entwicklung am Document Scanner.

## 📂 Workspace öffnen

### Option 1: Workspace-File direkt öffnen
```bash
code document-scanner.code-workspace
```

### Option 2: Über VS Code
1. VS Code öffnen
2. `File > Open Workspace from File...`
3. `document-scanner.code-workspace` auswählen

## ✨ Features

### 🔨 Tasks (Cmd+Shift+B)
- **Build** - TypeScript kompilieren (Standard)
- **Watch** - TypeScript im Watch-Mode
- **Link globally** - npm link ausführen
- **Test: Preview Mode** - Test mit Beispieldatei
- **Setup: Config Wizard** - Setup-Wizard starten
- **Clean Build** - Build-Ordner löschen und neu bauen

### 🐛 Debug Configurations (F5)
- **Debug: doc-scan** - Debuggt test-rechnung.txt
- **Debug: Setup Wizard** - Debuggt Setup-Prozess
- **Debug: Test mit Geburtsdatum** - Testet Geburtsdatum-Schutz
- **Debug: Undo** - Debuggt Undo-Funktionalität

### ⚙️ Settings
- TypeScript Auto-Kompilierung
- Format on Save aktiviert
- Sensitive Config-Dateien ausgeblendet
- Passende File Associations
- Code Spell Checker mit deutschen Begriffen

### 🔌 Empfohlene Extensions
- ESLint & Prettier (Code Qualität)
- GitLens (Git Integration)
- Markdown Tools
- Path IntelliSense
- Error Lens (Inline Errors)

## 🛠️ Schnellstart

1. **Dependencies installieren**
   ```bash
   npm install
   ```

2. **Projekt bauen**
   - Drücke `Cmd+Shift+B` → Build
   - Oder: `npm run build`

3. **Global verlinken**
   - Task ausführen: "Link globally"
   - Oder: `npm link`

4. **Testen**
   - Drücke `F5` → "Debug: doc-scan"
   - Oder: `doc-scan test-data/test-rechnung.txt --preview`

## 📁 Projektstruktur

```
document-scanner/
├── .vscode/                    ← VS Code Konfiguration
│   ├── extensions.json        - Empfohlene Extensions
│   ├── launch.json            - Debug Konfigurationen
│   ├── settings.json          - Workspace Settings
│   └── tasks.json             - Build Tasks
├── src/                       ← TypeScript Source
│   ├── cli.ts                 - Haupt-CLI Entry Point
│   ├── config.ts              - Config Management
│   ├── setup.ts               - Setup Wizard
│   ├── ai-analysis.ts         - AI Integration
│   └── ...
├── build/                     ← Kompilierte JS Files
├── test-data/                 ← Test-Dokumente
├── docs/                      ← Dokumentation
│   └── archive/               - Historische Docs
├── package.json              
├── tsconfig.json
└── document-scanner.code-workspace  ← Dieses File
```

## 🔒 Security Notes

**Sensitive Dateien werden automatisch ausgeblendet:**
- `~/.doc-scan.json` (Enthält API-Keys & Geburtsdatum)
- `~/.doc-scan-undo.json`
- Legacy: `~/.mcp-scan*.json`

Diese Dateien sind in `.gitignore` und werden nicht committed.

## 🎯 Keyboard Shortcuts

| Shortcut | Aktion |
|----------|--------|
| `Cmd+Shift+B` | Build Task ausführen |
| `F5` | Debug starten |
| `Shift+F5` | Debug stoppen |
| `Cmd+Shift+P` | Command Palette |
| `Cmd+P` | Quick File Open |

## 📚 Weitere Dokumentation

- [README.md](README.md) - Hauptdokumentation
- [AI-INTEGRATION.md](AI-INTEGRATION.md) - AI Features
- [MACOS-KONTEXTMENU.md](MACOS-KONTEXTMENU.md) - macOS Integration
- [SECURITY.md](SECURITY.md) - Security Infos
- [RELEASE-v2.3.0.md](RELEASE-v2.3.0.md) - Neueste Release Notes

## 🐛 Debugging Tipps

### TypeScript Source Maps nicht gefunden?
```bash
npm run build
# Stellt sicher dass .js.map Dateien vorhanden sind
```

### Config-Datei prüfen
```bash
cat ~/.doc-scan.json
# Zeigt aktuelle Config (inkl. API-Key maskiert)
```

### Verbose Output aktivieren
Alle Debug-Konfigurationen verwenden bereits `--verbose`

## 💡 Development Workflow

1. **Feature entwickeln**
   - `Cmd+Shift+B` → "Watch" Task starten
   - Code in `src/` bearbeiten
   - TypeScript kompiliert automatisch

2. **Testen**
   - `F5` → Passende Debug-Config wählen
   - Breakpoints setzen
   - Step-through debugging

3. **Committen**
   ```bash
   git add .
   git commit -m "feat: Neue Funktion"
   git push origin main
   ```

## 🔄 Aktualisieren

```bash
# Dependencies aktualisieren
npm update

# Build neu erstellen
npm run build

# npm link neu setzen
npm link
```

---

**Happy Coding! 🎉**
