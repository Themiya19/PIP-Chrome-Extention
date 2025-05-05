<!-- @format -->

# Universal Picture-in-Picture Chrome Extension

This Chrome extension enables Picture-in-Picture (PiP) mode for any video on any website.

## Features

- Works on most HTML5 video players
- Simple one-click activation

## Installation

1. Clone or download this repository to your computer.
2. Open Chrome and go to `chrome://extensions/`.
3. Enable **Developer mode** (top right).
4. Click **Load unpacked** and select the extension folder.

## Usage

1. Navigate to any website with a video.
2. Click the extension icon in the Chrome toolbar.
3. The first video on the page will pop out in Picture-in-Picture mode.

## Notes

- Some sites (like Netflix) may block PiP via DRM or custom players.
- If there are multiple videos, only the first one will be used.

## Files

- `manifest.json` — Extension manifest
- `background.js` — Background script to inject PiP logic
- `pip.js` — Content script to trigger PiP

---

Enjoy watching videos in PiP mode on any site!
