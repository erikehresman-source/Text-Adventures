Text Adventures — Highlands Demo (PWA)
====================================
Upload this folder to a GitHub Pages repo (main branch or docs/).
Then open index.html. Install as a PWA if desired.

Included:
- 5 encounters with ASCII maps
- 3 codex entries
- modules.json loader (ready for more adventures later)
- Offline-capable service worker with runtime caching
- 404.html debug console (unregister SW, clear caches, inspect storage)

Quick Start:
1) Upload all files to your repo root (or to /docs) and enable GitHub Pages.
2) Visit the Pages URL. If updates don't appear, open /404.html and click "Unregister SW" + "Clear All Caches", then reload.
3) Test "Start" to load Highlands; "Continue" loads your last save.

Notes:
- All saves are local (localStorage key: txtadv-save).
- Add new modules by editing assets/modules.json and dropping new JSON files in assets/.
- Build date: 2025-09-21T18:26:38.199216Z
