# Praful Chalakh — Portfolio

A high-craft, recruiter-friendly personal portfolio for **Praful Chalakh** (Forward Deploy Engineer / Cloud & DevSecOps Engineer), built with pure HTML, CSS, and Vanilla JavaScript.

Designed following [pbakaus/impeccable](https://github.com/pbakaus/impeccable) anti-AI-slop design principles and inspired by modern technical comparison aesthetics:
- **No generic AI tells**: Editorial serif headings (`Newsreader`), clean body (`Plus Jakarta Sans`), technical mono labels (`IBM Plex Mono`), zero purple-to-blue gradients, and zero cards-nested-in-cards.
- **3D Wireframe Icosahedron**: Pure CSS 3D transforms + requestAnimationFrame physics, serving as an interactive geometric avatar placeholder (ready for your custom photo).
- **Interactive Conveyor Belts & Real-Time Canvas Particle Dissolve**:
  - Horizontal drag & inertial scrub on the Experience and Projects belts.
  - Glowing orange scanner line with real-time dithered particles, haze, and embers revealing the ATS-friendly technical code/resume counterpart of each visual card.
  - Dynamic scanner metric counter badge.
- **Recruiter First**: Fact strip (2+ Yrs, 7 Products, −50%+ Cost, 4 Certs), one-click resume PDF download, email copy with toast confirmation, and filterable projects (`Go`, `DevOps`, `Cloud`).
- **Social Connectivity Hub**: Direct integration for GitHub (with live API repo & language stats), LinkedIn, and Instagram accounts (`@mee.praf` and `@etcpraful`).

## File Structure

```
Portfolio/
├── index.html              # Main HTML markup and comprehensive design system styling
├── avatar_and_utils.js     # 3D Icosahedron avatar, theme toggle, scroll-reveal, GitHub API, and toast
├── belt_and_canvas.js      # Dual-belt motion engine + real-time canvas particle dissolve effect
├── assets/                 # Place your Praful_Chalakh_Resume.pdf here
└── README.md               # Project documentation
```

## Running Locally

Simply open `index.html` in any modern web browser, or serve it using your preferred static server:

```bash
# Using Python
python -m http.server 8000

# Using Node / npx
npx serve .
```

Then visit `http://localhost:8000` (or the port indicated).
