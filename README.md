```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║   ██████╗  ██████╗  ██████╗    ███████╗ ██████╗ █████╗ ███╗   ██╗       ║
║   ██╔══██╗██╔═══██╗██╔════╝    ██╔════╝██╔════╝██╔══██╗████╗  ██║       ║
║   ██║  ██║██║   ██║██║         ███████╗██║     ███████║██╔██╗ ██║       ║
║   ██║  ██║██║   ██║██║         ╚════██║██║     ██╔══██║██║╚██╗██║       ║
║   ██████╔╝╚██████╔╝╚██████╗   ███████║╚██████╗██║  ██║██║ ╚████║       ║
║   ╚═════╝  ╚═════╝  ╚═════╝   ╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝  ╚═══╝     ║
║                                                                          ║
║            Intelligente Dokumentenerkennung für macOS                    ║
║                            v2.4.1                                        ║
║                                                                          ║
╚══════════════════════════════════════════════════════════════════════════╝
```

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![macOS](https://img.shields.io/badge/macOS-Monterey%2B-blue)](https://www.apple.com/macos/)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org/)
[![OCR](https://img.shields.io/badge/OCR-Tesseract-orange)](https://github.com/tesseract-ocr/tesseract)
[![Version](https://img.shields.io/badge/Version-2.4.1-brightgreen)](package.json)

---

**Was macht doc-scan?** — Erkennt Dokumente (Firma, Typ, Datum) und benennt Dateien intelligent um. Aus `scan001.pdf` wird `2024-01-24_Vodafone_Rechnung_VF-12345.pdf`. Optional mit AI-Unterstützung via Perplexity API.

---

## Features

- **AI-gestützte Analyse** — Perplexity API erkennt *alle* Firmen, nicht nur vordefinierte (optional)
- **OCR** — Gescannte PDFs und Bilder via Tesseract
- **Multi-Format** — PDF, DOCX, Pages, TXT, PNG, JPG
- **Batch-Verarbeitung** — `doc-scan ~/Downloads/*.pdf --execute`
- **Undo** — Letzte Umbenennung rückgängig machen
- **macOS Integration** — Finder Quick Action (Rechtsklick)
- **Security** — Input Validation, Path Traversal Protection, API Key Protection
- **Geburtsdatum-Schutz** — Verhindert Fehlerkennungen bei Briefkopf-Analysen

### Erkennungs-Engine

| Was | Beispiele |
|-----|-----------|
| **Absender** | 40+ Firmen (Allianz, Vodafone, Amazon, ...) — mit AI unbegrenzt |
| **Dokumenttyp** | Rechnung, Vertrag, Bescheid, Mahnung, Kündigung, Kontoauszug, ... |
| **Datum** | Scanner-Zeitstempel → Briefdatum (OCR) → Erstelldatum (Fallback) |
| **Referenznummern** | Rechnungs-Nr, Kunden-Nr, Vertrags-Nr, Policen-Nr, Aktenzeichen |
| **Keywords** | AI extrahiert bis zu 5 Buzzwords aus dem Inhalt |

### Unterstützte Formate

| Format | Methode |
|--------|---------|
| PDF | Textextraktion + OCR-Fallback (pdftoppm → Tesseract) |
| DOCX | mammoth.js |
| Pages | ZIP-Extraktion |
| TXT | UTF-8/Latin-1 |
| PNG / JPG / JPEG | OCR via Tesseract |
| DOC, XLS/XLSX, PPT/PPTX, Numbers, Keynote, ODT | Dateiname wird beibehalten (kein Text extrahierbar) |

---

## Installation

```bash
# Voraussetzungen
brew install node                       # Node.js 18+
brew install tesseract tesseract-lang   # OCR (optional)

# Installieren
git clone https://github.com/AndreasDietzel/document-scanner.git
cd document-scanner
npm install
npm run build
npm link                                # macht "doc-scan" global verfügbar
```

**Test:**
```bash
doc-scan --help
```

### AI einrichten (optional)

```bash
doc-scan --setup
# → "AI-Enhancement aktivieren?" → Ja
# → Perplexity API-Key eingeben (https://www.perplexity.ai/settings/api)
```

Oder manuell in `~/.doc-scan.json`:
```json
{
  "enableAI": true,
  "perplexityApiKey": "pplx-your-key-here"
}
```

Mehr dazu: [AI-INTEGRATION.md](AI-INTEGRATION.md)

---

## Verwendung

```bash
# Vorschau (Standard) — analysiert ohne Umbenennung
doc-scan rechnung.pdf

# Umbenennen
doc-scan rechnung.pdf --execute

# Batch
doc-scan ~/Downloads/*.pdf --execute

# Verbose Debug-Ausgabe
doc-scan rechnung.pdf --preview --verbose

# Undo
doc-scan --undo

# Setup-Wizard
doc-scan --setup
```

### Alle Flags

| Flag | Beschreibung |
|------|-------------|
| `--preview` | Analysiert ohne Umbenennung (Standard) |
| `--execute` | Benennt automatisch um |
| `--silent` | Keine macOS-Benachrichtigungen |
| `--verbose` | Detaillierte Debug-Ausgabe |
| `--setup` | Interaktiver Setup-Wizard |
| `--undo` | Letzte Batch-Umbenennung rückgängig machen |
| `--undo-stats` | Undo-Statistiken anzeigen |
| `--help` | Hilfe |

---

## Beispiele

### Umbenennung

| Vorher | Nachher | Erkannt |
|--------|---------|---------|
| `scan001.pdf` | `2024-01-24_Vodafone_Rechnung_VF-12345.pdf` | Datum, Firma, Typ, Referenz-Nr |
| `document.docx` | `2023-12-31_Allianz_Vertrag_POL-9876.docx` | Datum, Firma, Vertrag, Policen-Nr |
| `IMG_0123.jpg` | `2025-03-15_Techniker_Krankenkasse_Bescheid.jpg` | Datum, Firma, Typ |

### AI-Analyse Output

```
🤖 AI-Analyse läuft...
✓ Dokumenttyp: Rechnung (95% Konfidenz)
✓ Firma: Vodafone GmbH
✓ Keywords: Mobilfunk, LTE, Datenvolumen, Grundgebühr
   → 2025-05-15_Vodafone_Mobilfunkrechnung_LTE_RG-2024-987654.pdf
```

### Batch-Verarbeitung

```bash
doc-scan ~/Downloads/*.pdf --preview

# ============================================================
# 📊 ZUSAMMENFASSUNG - 15 Dateien verarbeitet
# ============================================================
# ✅ Erfolgreich: 15
# 📝 Umbenannt: 0
# ⏭️  Übersprungen: 3
# ❌ Fehler: 0
```

---

## Konfiguration

Die Konfiguration liegt in `~/.doc-scan.json` und wird über `doc-scan --setup` erstellt.

```json
{
  "defaultMode": "preview",
  "enableOCR": true,
  "ocrLanguage": "deu",
  "customCompanies": ["Meine Firma GmbH"],
  "enableAI": false,
  "perplexityApiKey": "",
  "aiConfidenceThreshold": 0.5,
  "birthDate": "01.01.1990"
}
```

| Feld | Beschreibung |
|------|-------------|
| `defaultMode` | `preview` oder `execute` |
| `enableOCR` | OCR für gescannte PDFs/Bilder |
| `ocrLanguage` | Tesseract-Sprache (`deu`, `eng`, ...) |
| `customCompanies` | Eigene Firmennamen zur Erkennung |
| `enableAI` | Perplexity AI aktivieren |
| `perplexityApiKey` | API-Key (lokal gespeichert, nie committed) |
| `aiConfidenceThreshold` | Minimum-Konfidenz für AI-Ergebnisse (0-1) |
| `birthDate` | Geburtsdatum — wird bei Datumserkennung ignoriert |

---

## macOS Finder Integration

Quick Action einrichten für Rechtsklick → "Dokument scannen":

1. Automator öffnen → **Schnellaktion** erstellen
2. "Shell-Script ausführen" hinzufügen
3. Script einfügen (siehe [MACOS-KONTEXTMENU.md](MACOS-KONTEXTMENU.md))
4. Als "🔍 Dokument scannen" speichern
5. **Fertig** — Rechtsklick auf Dateien → Schnellaktionen → 🔍 Dokument scannen

Optional: Keyboard Shortcut zuweisen unter Systemeinstellungen → Tastatur → Kurzbefehle → Dienste.

---

## Projekt-Struktur

```
document-scanner/
├── src/
│   ├── cli.ts              # Haupt-CLI
│   ├── config.ts           # Konfigurationsmanagement
│   ├── ai-analysis.ts      # Perplexity AI Integration
│   ├── security.ts         # Security & Validierung
│   ├── setup.ts            # Setup-Wizard
│   └── undo.ts             # Undo-Funktionalität
├── build/                  # Kompilierte JS-Dateien
├── test-data/              # Testdateien
├── package.json
├── tsconfig.json
└── LICENSE
```

### Entwicklung

```bash
npm run build       # TypeScript kompilieren
npm run watch       # Watch-Modus
node build/cli.js test-data/test-rechnung.txt --preview   # Lokaler Test
```

---

## Troubleshooting

**`doc-scan: command not found`** — `npm link` im Repo-Verzeichnis ausführen.

**Quick Action erscheint nicht** — Systemeinstellungen → Erweiterungen → Finder → aktivieren.

**OCR funktioniert nicht** — `brew install tesseract tesseract-lang`, dann `tesseract --list-langs` prüfen (muss `deu` enthalten).

**"Keine Textinhalte gefunden"** — OCR nicht installiert, Datei beschädigt, oder Bild ohne Text. Debug mit `doc-scan datei.pdf --verbose`.

---

## Dokumentation

- [AI-INTEGRATION.md](AI-INTEGRATION.md) — Perplexity AI Setup & Verwendung
- [MACOS-KONTEXTMENU.md](MACOS-KONTEXTMENU.md) — Automator Quick Action Setup
- [SECURITY.md](SECURITY.md) — Security & ISO 25010
- [CHANGELOG.md](CHANGELOG.md) — Versionshistorie

---

## Lizenz

MIT — siehe [LICENSE](LICENSE)

**Andreas Dietzel** — [@AndreasDietzel](https://github.com/AndreasDietzel)
