# Studio Calypso — website (V1)

A plain HTML/CSS site. No build step, so you can edit any file in a text editor and refresh the browser.

## Viewing it

Double-click `index.html` to open it in your browser. Photos and fonts load from the internet, so you need to be online.

## Files

| File | What it is |
|---|---|
| `index.html` | Home page |
| `about.html` | About Hestelle |
| `workshops.html` | Workshops, gift vouchers, workshop FAQ |
| `consult.html` | Book a consultation + contact details, pricing guide, commission FAQ |
| `assets/css/styles.css` | All styling. Colours and fonts are at the top under `:root` |
| `assets/js/site.js` | Site settings (waiting times, email) + menu and form behaviour |
| `assets/img/` | Logo, icon and favicon |
| `robots.txt`, `sitemap.xml` | For Google |

## Things to update before going live

Search the HTML files for `REPLACE` and `PLACEHOLDER` to find every spot.

- **Waiting times and email address:** change them once at the top of `assets/js/site.js` and they update on every page.
- **Photos:** all current photos are free Unsplash placeholders. Put your own photos in `assets/img/` and change the `src="https://images.unsplash.com/..."` to e.g. `src="assets/img/hero.jpg"`. Update the `alt` text to describe your photo (this helps Google too).
- **Reviews:** the three on the home page are placeholders. Swap in real ones (Etsy and Google reviews are a great source).
- **Prices, workshop details, studio hours, WhatsApp number, Instagram link:** all placeholders.
- **About page:** add Hestelle's own story where marked `EDIT`.
- **Domain:** `https://www.studiocalypso.co.za` is assumed in the page headers, `sitemap.xml` and `robots.txt`. Find-and-replace if the domain is different.
- **Logo:** if you replace `assets/img/logo.svg`, trim the artboard to the artwork in Illustrator so it sizes correctly.

## Forms

The consultation form and the 10%-off sign-up currently open the visitor's email app with their details filled in. To receive submissions automatically instead, create a free form at a service like Formspree and paste its URL into `formEndpoint` in `assets/js/site.js`.

## Getting found on Google

The pages already include search-friendly titles, descriptions, structured data (business, workshops, FAQs) and a sitemap. Once the site is live:

1. Set up a **Google Business Profile** for Studio Calypso in Cape Town. This matters most for searches like "jewellery workshop Cape Town".
2. Add the site to **Google Search Console** and submit `sitemap.xml`.
3. Link the site from Instagram, Etsy and any directories or blogs that mention Hestelle.
