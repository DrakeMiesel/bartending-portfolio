# Drake Miesel — Bartending Portfolio

A minimalist, responsive portfolio website built with plain HTML, CSS, and JavaScript. It is designed for free hosting with GitHub Pages.

## Files

- `index.html` — page content, navigation, and popup text
- `style.css` — colors, typography, spacing, layout, and mobile styling
- `script.js` — accessible popup behavior and footer year
- `images/` — put your portrait and cocktail photos here

## Preview locally

1. Download and unzip the project.
2. Open `index.html` in a modern browser.
3. For the closest match to GitHub Pages, use a local static server or VS Code's Live Server extension. The page should also open directly in most browsers.

## Publish with GitHub Pages (free)

1. Sign in or create an account at https://github.com/.
2. Create a new repository. For a public portfolio, choose **Public**. A repository name such as `bartending-portfolio` is fine.
3. Upload `index.html`, `style.css`, `script.js`, and the `images` folder to the repository's top level (the root).
4. In the repository, open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Select the `main` branch and the `/(root)` folder, then click **Save**.
7. Wait for GitHub Pages to publish the site. The Pages section will show the public URL, usually `https://YOUR-USERNAME.github.io/bartending-portfolio/`.
8. Open the URL on your phone and test every popup and contact link.

The first publication can take a few minutes. Whenever you update and commit a file on the `main` branch, GitHub Pages will rebuild the website automatically.

## Add your portrait

1. Save a photo as `portrait.jpg` inside the `images` folder.
2. In `index.html`, find the comment `Replace this placeholder with your portrait when ready`.
3. Replace the `<div class="portrait-placeholder" ...>...</div>` element with:

   ```html
   <img class="portrait-image" src="images/portrait.jpg" alt="Portrait of Drake Miesel">
   ```

4. Commit the change and wait for the site to update.

Choose a friendly, well-lit photo with a simple background. Since this is for an upscale bar, a neat shirt or smart-casual outfit will fit the design.

## Add cocktail photos

For each photo, put a JPG or WebP file in `images/`, for example `cocktail-01.jpg`.

In `index.html`, find the relevant card's `.drink-image` div and replace its placeholder contents with an image. Example:

```html
<div class="drink-image drink-image-one">
  <img class="drink-photo" src="images/cocktail-01.jpg" alt="A cocktail I made, served in a coupe glass">
</div>
```

Add this rule to `style.css` so the image fills the card:

```css
.drink-photo {
  width: 100%;
  height: 100%;
  min-height: 100%;
  object-fit: cover;
  display: block;
  grid-area: 1 / 1;
}
```

If the placeholder label remains in the HTML, remove it when adding the photo. Add descriptive alt text that accurately describes the actual image.

## Edit the text

- Main page text: edit the corresponding text directly in `index.html`.
- Popup text: find the `<template id="...">` near the bottom of `index.html` and edit its contents.
- Colors and typography: edit the CSS variables at the top of `style.css`.
- Phone/email: search `index.html` for the displayed phone number and email address. Update both the visible text and the `href` attributes if they change.

## Important privacy note

GitHub Pages sites are public. The current version includes the phone number and email address from the resume you provided. Anyone with the URL may see them. Consider whether you are comfortable publishing your personal phone number publicly before sharing the site or printing the QR code.

## QR code

After the website is live, copy the exact GitHub Pages URL from **Settings → Pages** and use it to generate a QR code. Test the code from a second device before printing it. Do not generate a QR code until you have the final URL.
