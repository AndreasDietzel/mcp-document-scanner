# 🍎 macOS Kontextmenü-Integration (Quick Action)

**Ziel:** MCP Document Scanner direkt aus dem Finder-Kontextmenü aufrufen

---

## 📋 Voraussetzungen

- ✅ mcp-document-scanner v2.0 installiert und gebaut
- ✅ `npm link` ausgeführt (macht `mcp-scan` global verfügbar)
- ✅ Setup-Wizard durchlaufen (`mcp-scan --setup`)

---

## 🔧 Option 1: Automator Quick Action (Empfohlen)

### Schritt 1: Automator öffnen

1. Drücke `Cmd + Leertaste` → Suche "Automator"
2. Wähle **"Schnellaktion"** (Quick Action)
3. Klicke **"Auswählen"**

### Schritt 2: Quick Action konfigurieren

**Wichtige Einstellungen oben:**

| Einstellung | Wert |
|-------------|------|
| **Workflow empfängt** | Dateien oder Ordner |
| **im Bereich** | Finder.app |
| **Farbe** | Blau (optional) |
| **Bild** | ActionGear (optional) |

### Schritt 3: Shell-Script hinzufügen

1. Suche in der linken Leiste nach **"Shell-Script ausführen"**
2. Ziehe es in den Workflow-Bereich
3. Konfiguration:
   - **Shell:** `/bin/zsh`
   - **Übergabe:** als Argumente

**Script-Inhalt (wähle eine Variante):**

#### Variante A: Preview-Modus (empfohlen für Neulinge)
```bash
#!/bin/zsh

# Node.js Path sicherstellen (bei nvm/brew Installation)
export PATH="/usr/local/bin:/opt/homebrew/bin:$HOME/.nvm/versions/node/$(ls $HOME/.nvm/versions/node/ | tail -1)/bin:$PATH"

# Für jede ausgewählte Datei
for file in "$@"
do
  # Nur PDFs, DOCX, Pages, TXT, Bilder
  if [[ "$file" =~ \.(pdf|docx|pages|txt|png|jpg|jpeg)$ ]]; then
    mcp-scan "$file" --preview --verbose
  fi
done

# Erfolgs-Benachrichtigung
osascript -e 'display notification "Analyse abgeschlossen" with title "MCP Scanner" sound name "Glass"'
```

#### Variante B: Execute-Modus (benennt automatisch um)
```bash
#!/bin/zsh

# Node.js Path sicherstellen
export PATH="/usr/local/bin:/opt/homebrew/bin:$HOME/.nvm/versions/node/$(ls $HOME/.nvm/versions/node/ | tail -1)/bin:$PATH"

# Zähler für Statistik
renamed=0
skipped=0

# Für jede ausgewählte Datei
for file in "$@"
do
  if [[ "$file" =~ \.(pdf|docx|pages|txt|png|jpg|jpeg)$ ]]; then
    result=$(mcp-scan "$file" --execute --silent 2>&1)
    
    if echo "$result" | grep -q "Erfolgreich umbenannt"; then
      ((renamed++))
    else
      ((skipped++))
    fi
  fi
done

# Zusammenfassung
osascript -e "display notification \"$renamed umbenannt, $skipped übersprungen\" with title \"MCP Scanner\" sound name \"Glass\""
```

#### Variante C: Mit Bestätigung (Dialog)
```bash
#!/bin/zsh

# Node.js Path sicherstellen
export PATH="/usr/local/bin:/opt/homebrew/bin:$HOME/.nvm/versions/node/$(ls $HOME/.nvm/versions/node/ | tail -1)/bin:$PATH"

# Anzahl Dateien
count=$#
message="$count Datei(en) analysieren und umbenennen?"

# Bestätigungs-Dialog
response=$(osascript -e "button returned of (display dialog \"$message\" buttons {\"Abbrechen\", \"Nur Vorschau\", \"Umbenennen\"} default button 3 with icon caution)")

if [ "$response" = "Umbenennen" ]; then
  # Execute-Modus
  for file in "$@"; do
    [[ "$file" =~ \.(pdf|docx|pages|txt|png|jpg|jpeg)$ ]] && mcp-scan "$file" --execute
  done
elif [ "$response" = "Nur Vorschau" ]; then
  # Preview-Modus
  for file in "$@"; do
    [[ "$file" =~ \.(pdf|docx|pages|txt|png|jpg|jpeg)$ ]] && mcp-scan "$file" --preview
  done
fi
```

### Schritt 4: Speichern

1. Klicke auf **"Datei" → "Sichern"** (oder `Cmd + S`)
2. Name: **"🔍 Dokument scannen"** (Emoji optional)
3. Speicherort ist automatisch richtig: `~/Library/Services/`

---

## ✅ Testen

### Im Finder:

1. Rechtsklick auf eine PDF-Datei
2. Wähle: **"Dienste" → "🔍 Dokument scannen"**
3. Warte auf Benachrichtigung

**Tipp:** Funktioniert auch mit **mehreren Dateien gleichzeitig!**

---

## ⌨️ Keyboard Shortcut (Optional)

### Shortcut einrichten:

1. **Systemeinstellungen** öffnen
2. **Tastatur** → **Tastaturkurzbefehle**
3. Links: **"Dienste"** auswählen
4. Rechts: Scrolle zu **"Allgemein"** oder **"Dateien und Ordner"**
5. Finde **"🔍 Dokument scannen"**
6. Doppelklick rechts neben dem Namen
7. Drücke deine Wunsch-Kombination (z.B. `Ctrl + Cmd + S`)

**Empfohlene Shortcuts:**
- `⌃⌘S` (Ctrl + Cmd + S) - Scan
- `⌃⌘R` (Ctrl + Cmd + R) - Rename (Execute)

---

## 🔧 Option 2: Shell-Script für Terminal-Nutzer

Falls du lieber ein CLI-Script nutzt:

### Installation:

```bash
# Script erstellen
cat > /usr/local/bin/finder-scan << 'EOF'
#!/bin/zsh
# Öffnet markierte Finder-Dateien mit mcp-scan

files=$(osascript -e 'tell application "Finder" to set selectedItems to selection as alias list' -e 'repeat with anItem in selectedItems' -e 'POSIX path of anItem & linefeed' -e 'end repeat')

for file in $files; do
  [[ "$file" =~ \.(pdf|docx|pages|txt|png|jpg|jpeg)$ ]] && mcp-scan "$file" --preview
done
EOF

# Ausführbar machen
chmod +x /usr/local/bin/finder-scan

# Testen
finder-scan
```

### Aufruf:
1. Dateien im Finder markieren
2. Terminal öffnen
3. Befehl eingeben: `finder-scan`

---

## 🎨 Anpassungen

### Icon ändern:

1. Öffne den Workflow in Automator (`~/Library/Services/`)
2. Oben rechts: Klicke auf das **Bild-Symbol**
3. Wähle ein anderes Icon (z.B. MagnifyingGlass, Document, Gear)

### Farbe ändern:

1. In Automator: Klicke auf die **Farb-Dropdown**
2. Wähle deine Lieblingsfarbe

### Nur für bestimmte Dateitypen:

Ändere die erste Zeile:
```bash
# Nur PDFs
if [[ "$file" =~ \.pdf$ ]]; then

# Nur Bilder  
if [[ "$file" =~ \.(png|jpg|jpeg)$ ]]; then

# Nur Office-Dokumente
if [[ "$file" =~ \.(pdf|docx|pages)$ ]]; then
```

---

## 🐛 Troubleshooting

### Problem: "mcp-scan: command not found"

**Lösung:** NPM-Path fehlt im Script

```bash
# Ersetze die PATH-Zeile durch:
export PATH="/usr/local/bin:/opt/homebrew/bin:$HOME/.nvm/versions/node/v22.6.0/bin:$PATH"

# Oder finde deinen Node-Path:
which node
# z.B. /Users/deinname/.nvm/versions/node/v22.6.0/bin/node

# Dann nutze das Verzeichnis in der PATH-Zeile
```

### Problem: Keine Benachrichtigung

**Lösung:** Benachrichtigungen für "Script-Editor" erlauben

1. **Systemeinstellungen** → **Mitteilungen**
2. Suche **"Script-Editor"** oder **"osascript"**
3. Aktiviere Benachrichtigungen

### Problem: Quick Action erscheint nicht im Kontextmenü

**Lösung 1:** Warte 10 Sekunden (macOS indiziert neue Services)

**Lösung 2:** Services-Cache leeren
```bash
/System/Library/CoreServices/pbs -flush
killall Finder
```

**Lösung 3:** Prüfe Berechtigungen
```bash
ls -la ~/Library/Services/
# Sollte deine Quick Action zeigen
```

### Problem: Script läuft, aber nichts passiert

**Lösung:** Terminal-Zugriff erlauben

1. **Systemeinstellungen** → **Sicherheit** → **Datenschutz**
2. Tab: **"Automation"**
3. Finde **"Automator"** oder **"Finder"**
4. Aktiviere Zugriff auf andere Apps

---

## 📝 Beispiel-Workflows

### Workflow 1: Downloads aufräumen

**Zweck:** Alle PDFs in ~/Downloads scannen und umbenennen

```bash
#!/bin/zsh
cd ~/Downloads
for file in *.pdf; do
  [[ -f "$file" ]] && mcp-scan "$file" --execute --silent
done
osascript -e 'display notification "Downloads aufgeräumt" with title "MCP Scanner"'
```

**Als Quick Action:** Script oben in Automator einfügen, aber ohne `for file in "$@"` Loop

### Workflow 2: Archiv-Integration

**Zweck:** Gescannte Datei direkt ins Archiv verschieben

```bash
#!/bin/zsh
ARCHIVE="/Users/$(whoami)/Documents/DateiArchiv/Archiv"

for file in "$@"; do
  if [[ "$file" =~ \.(pdf|docx)$ ]]; then
    # Erst umbenennen
    mcp-scan "$file" --execute --silent
    
    # Dann ins Archiv verschieben (nach Jahr)
    year=$(date +%Y)
    mkdir -p "$ARCHIVE/Zwanziger/$year/99_Sonstiges"
    mv "$file" "$ARCHIVE/Zwanziger/$year/99_Sonstiges/"
  fi
done
```

---

## 🎉 Fertig!

Jetzt kannst du:
- ✅ Rechtsklick auf Dateien → Quick Action
- ✅ Mehrere Dateien gleichzeitig verarbeiten
- ✅ Mit Keyboard-Shortcut noch schneller sein
- ✅ Automatische Benachrichtigungen erhalten

**Viel Erfolg! 🚀**
