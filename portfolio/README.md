# Toby Goldsmith — Portfolio

A minimal, cinematic portfolio for a Production Designer / Art Director.  
Built with React + Vite + Tailwind CSS.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start local dev server
npm run dev

# 3. Open in browser
# → http://localhost:5173
```

---

## File Structure

```
portfolio/
├── index.html                  # Entry point + Google Fonts
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
│
└── src/
    ├── main.jsx                # React root
    ├── App.jsx                 # Routing
    ├── index.css               # Global styles, grid layout, animations
    │
    ├── data/
    │   ├── projects.js         # ← EDIT: your project content + images
    │   └── experience.js       # ← EDIT: your credits + CV content
    │
    ├── components/
    │   └── Nav.jsx             # Fixed navigation (desktop + mobile)
    │
    └── pages/
        ├── Home.jsx            # Editorial image grid
        ├── Project.jsx         # Cinematic project detail page
        ├── About.jsx           # Bio + CV download
        ├── Experience.jsx      # Film credits layout
        └── Contact.jsx         # Minimal contact
```

---

## Customising Content

### 1. Your Projects (`src/data/projects.js`)

Each project needs:

```js
{
  id: 'unique-slug',             // used in URL: /project/unique-slug
  title: 'Project Title',
  category: 'Film',             // Film / Television / Architecture / Commercial
  year: '2024',
  role: 'Art Department',
  shortDesc: 'One line.',
  description: 'Full paragraph for the project page.',
  tags: ['Tag1', 'Tag2'],
  coverImage: 'https://...',    // shown in the home grid
  images: ['https://...', ...], // index 0 = hero; rest = gallery
  gridClass: 'grid-item-1',     // grid-item-1 through grid-item-6
}
```

**Grid layout on desktop** (6 items):
```
[ grid-item-1 (large) ][ grid-item-2 ]
[ grid-item-1 (large) ][ grid-item-3 ]
[ grid-item-4 ][ grid-item-5 (large) ]
[ grid-item-6 ][ grid-item-5 (large) ]
```
- `grid-item-1` and `grid-item-5` are the large, hero-sized slots.
- Reorder projects in the array to change which appears where.

### 2. Your Credits (`src/data/experience.js`)

⚠️  **Update `filmCredits`, `architectureCredits`, and `education`**  
with your actual credits from your existing website.

Each credit:
```js
{
  year: '2024',
  role: 'Art Department',
  project: 'Series Title',      // null for non-project entries
  company: 'Production Co.',
  type: 'Television Drama',
  notes: ['Bullet point one', 'Bullet point two'],
}
```

### 3. Your Details

Search for `trgoldsmith21@gmail.com` and replace with your real email.  
Search for `@tobygoldsmith` and update your Instagram handle.  
In `About.jsx`, update the bio paragraphs.

### 4. CV Download

Place your CV PDF at:
```
portfolio/public/cv-toby-goldsmith.pdf
```
The "Download CV" links on About and Experience pages will then work.

---

## Design System

### Colours
| Token        | Hex       | Use                          |
|--------------|-----------|------------------------------|
| `--ink`      | `#0c0b0a` | Primary text, dark surfaces  |
| `--paper`    | `#f5f3ef` | Background, light surfaces   |
| `--mid`      | `#888480` | Secondary text, labels       |
| `--light`    | `#d8d4cf` | Borders, dividers            |
| `--dim`      | `#3a3835` | Body text on light bg        |

### Typography
- **Display**: Cormorant Garamond (300, 400, 500) — headings, titles, quotes
- **UI**: Barlow (300, 400) — navigation, labels, body copy

Both loaded from Google Fonts in `index.html`.

### Spacing & Grid
- Nav height: `60px`
- Page padding: `32px` mobile → `96px` desktop
- Home grid gap: `4px` (intentionally tight, architectural)

---

## Deploying

### Netlify (recommended)
```bash
npm run build
# Drag the /dist folder to netlify.com/drop
```

Or connect your GitHub repo and set:
- Build command: `npm run build`
- Publish directory: `dist`

### Vercel
```bash
npx vercel
```

> **Note**: React Router uses client-side routing.  
> On Netlify, add a `public/_redirects` file:
> ```
> /* /index.html 200
> ```
> On Vercel, this is handled automatically.

---

## Scaling the Site

### Adding More Projects
- Add entries to `src/data/projects.js`
- The home grid supports 6 items with the current CSS layout
- For more projects, modify `.projects-grid` in `index.css` to add additional rows

### Adding a Film Stills / Drawings Section
- Duplicate a page (e.g., copy `About.jsx` → `Drawings.jsx`)
- Add the route in `App.jsx`
- Add the nav link in `Nav.jsx`

### Password-Protecting the Portfolio
- Use Netlify's password protection (Pro plan)
- Or add a simple gate component before `<App />` in `main.jsx`

### Adding Real Animations
Install Motion:
```bash
npm install motion
```
Then wrap page content:
```jsx
import { motion } from 'motion/react'
<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
  ...
</motion.div>
```

---

## Notes

- All placeholder images are from [Unsplash](https://unsplash.com) — replace with your actual work.
- The CV download link (`/cv-toby-goldsmith.pdf`) will 404 until you add the file to `/public`.
- The experience data is illustrative — **replace with your real credits**.
- Contact email and Instagram are placeholders — update before publishing.
