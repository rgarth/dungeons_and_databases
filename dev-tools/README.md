# Development Tools

This directory contains development-only tools that are **not deployed to production**.

## 🎭 Race Avatar Test (`test-races.html`)

A tool to test FLUX.1 Schnell avatar generation across all available D&D races.

### Usage (Development Only)

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Open the test page:**
   - Copy the `test-races.html` file to your browser
   - Or serve it locally with a simple HTTP server

3. **Run the test:**
   - Click "🚀 Test All Races with FLUX.1 Schnell"
   - Wait for all races to complete (takes ~30 seconds)
   - View results with generated images

### What it tests:

- **All 12 D&D races:** Human, Elf, Dwarf, Halfling, Dragonborn, Gnome, Half-Elf, Half-Orc, Tiefling, Aasimar, Goliath, Tabaxi
- **FLUX.1 Schnell performance** for each race
- **Race-specific prompts** to ensure distinct features
- **Generation times** and success rates

### API Endpoint

The test uses `/api/test-races-avatar` which:
- ✅ **Available in development** (`NODE_ENV !== 'production'`)
- ❌ **Blocked in production** (returns 404)
- 🔒 **Requires authentication** (must be logged in)

### Production Safety

- **HTML file:** Located in `dev-tools/` (not `public/`) so it won't be served
- **API endpoint:** Explicitly blocked in production environment
- **No deployment impact:** These tools are completely isolated from production code

---

## Adding New Dev Tools

When adding new development tools:

1. **Place files in `dev-tools/`** directory
2. **Add production checks** to any API endpoints
3. **Document usage** in this README
4. **Test locally** before committing 