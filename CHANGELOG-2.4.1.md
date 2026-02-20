# Version 2.4.1 - Cleanup Release

## Changes

### Removed
- **Category-based organization**: Removed automatic category assignment (e.g., "Vodafone → Telekommunikation")
- Deleted `src/categories.ts` (dead code, was never used in CLI)
- Cleaned up imports in `src/cli.ts`

### Updated
- **README.md**: Removed all references to categories and folder structure
- **Workflow**: Simplified to focus on intelligent renaming based on document content
- No functional changes to core features (AI analysis, OCR, renaming still work)

## Migration

No migration needed. This release removes unused code and documentation only.

### What Still Works

- ✅ AI-powered document analysis (Perplexity API)
- ✅ OCR integration (Tesseract)
- ✅ Intelligent filename generation
- ✅ Batch processing
- ✅ Undo functionality
- ✅ macOS Quick Action integration

### What's Gone

- ❌ Automatic folder categorization (was never implemented)
- ❌ Category suggestions in verbose output
- ❌ References to 05_Wohnen, 06_Telekommunikation, etc.

---

**Date**: 2026-02-10
**Type**: Cleanup
