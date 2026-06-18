# Habit Tracker

A tiny frontend-only habit tracker for checking off a few daily habits and saving progress in the browser with `localStorage`.

## Run Locally

Open [index.html](/Users/shlokp/Documents/Learning%20Orchestrators%20with%20Habit%20Tracker/index.html:1) in a browser, or serve the repo locally:

```bash
python3 -m http.server 4173
```

Then visit `http://127.0.0.1:4173`.

## GitHub Pages

This app is ready to work as a GitHub Pages site because it is fully static:

- `index.html` is the entry point
- assets are loaded with relative paths
- there is no backend dependency

To publish it with GitHub Pages:

1. Push the repository to GitHub.
2. Open the repository on GitHub.
3. Go to `Settings` > `Pages`.
4. Under `Build and deployment`, choose `Deploy from a branch`.
5. Select the `main` branch and the `/ (root)` folder.
6. Save and wait for the Pages URL to be generated.

## Notes

- Habit completion is stored in `localStorage`, so data is specific to each browser and device.
- There is no account system or cloud sync in this version.
