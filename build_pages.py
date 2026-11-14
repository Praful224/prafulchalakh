"""
Build & Static Site Generator for Cloudflare Pages and GitHub Pages
Generates complete static HTML files for both root and dist/ directories,
ensuring direct URLs and folder routes work flawlessly.
"""

import os
import shutil
import json
import asyncio
from httpx import AsyncClient, ASGITransport
from app import app, PORTFOLIO_DATA, BASE_DIR

DIST_DIR = os.path.join(BASE_DIR, "dist")

async def build():
    print(f"Building static site from: {BASE_DIR}")
    print(f"Target dist directory: {DIST_DIR}")

    # 1. Sync CSS and JS from static/ to root
    shutil.copyfile(os.path.join(BASE_DIR, "static", "css", "styles.css"), os.path.join(BASE_DIR, "styles.css"))
    shutil.copyfile(os.path.join(BASE_DIR, "static", "js", "avatar_and_utils.js"), os.path.join(BASE_DIR, "avatar_and_utils.js"))
    print("  ✓ Synced styles.css and avatar_and_utils.js to root")

    # 2. Re-create clean dist directory
    if os.path.exists(DIST_DIR):
        shutil.rmtree(DIST_DIR)
    os.makedirs(DIST_DIR, exist_ok=True)

    # 3. Copy static folder to dist/static
    static_src = os.path.join(BASE_DIR, "static")
    static_dst = os.path.join(DIST_DIR, "static")
    if os.path.exists(static_src):
        shutil.copytree(static_src, static_dst)
        print("  ✓ Copied static/ to dist/static/")

    # Also copy root styles and js to dist root for flat-file support
    shutil.copyfile(os.path.join(BASE_DIR, "styles.css"), os.path.join(DIST_DIR, "styles.css"))
    shutil.copyfile(os.path.join(BASE_DIR, "avatar_and_utils.js"), os.path.join(DIST_DIR, "avatar_and_utils.js"))

    # Copy assets to dist/assets
    assets_src = os.path.join(BASE_DIR, "assets")
    assets_dst = os.path.join(DIST_DIR, "assets")
    if os.path.exists(assets_src):
        shutil.copytree(assets_src, assets_dst)
        print("  ✓ Copied assets/ to dist/assets/")

    # 4. Render HTML routes using ASGI transport
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://testserver") as client:
        routes = [
            ("/", [
                os.path.join(BASE_DIR, "index.html"),
                os.path.join(DIST_DIR, "index.html")
            ]),
            ("/experience", [
                os.path.join(BASE_DIR, "experience.html"),
                os.path.join(BASE_DIR, "experience", "index.html"),
                os.path.join(DIST_DIR, "experience.html"),
                os.path.join(DIST_DIR, "experience", "index.html")
            ]),
            ("/projects", [
                os.path.join(BASE_DIR, "projects.html"),
                os.path.join(BASE_DIR, "projects", "index.html"),
                os.path.join(DIST_DIR, "projects.html"),
                os.path.join(DIST_DIR, "projects", "index.html")
            ]),
        ]

        for exp in PORTFOLIO_DATA["experiences"]:
            slug = exp["slug"]
            routes.append((
                f"/experience/{slug}",
                [
                    os.path.join(BASE_DIR, "experience", slug, "index.html"),
                    os.path.join(DIST_DIR, "experience", slug, "index.html")
                ]
            ))

        for proj in PORTFOLIO_DATA["projects"]:
            slug = proj["slug"]
            routes.append((
                f"/projects/{slug}",
                [
                    os.path.join(BASE_DIR, "projects", slug, "index.html"),
                    os.path.join(DIST_DIR, "projects", slug, "index.html")
                ]
            ))

        for url, target_paths in routes:
            resp = await client.get(url)
            if resp.status_code != 200:
                print(f"  ✗ FAILED {url} (status: {resp.status_code})")
                continue
            for target_path in target_paths:
                os.makedirs(os.path.dirname(target_path), exist_ok=True)
                with open(target_path, "wb") as f:
                    f.write(resp.content)
            print(f"  ✓ Rendered {url} -> {len(target_paths)} locations ({len(resp.content)} bytes)")

        # 5. Render API endpoint /api/data
        api_resp = await client.get("/api/data")
        if api_resp.status_code == 200:
            api_targets = [
                os.path.join(BASE_DIR, "api", "data.json"),
                os.path.join(DIST_DIR, "api", "data.json")
            ]
            for target in api_targets:
                os.makedirs(os.path.dirname(target), exist_ok=True)
                with open(target, "wb") as f:
                    f.write(api_resp.content)
            print("  ✓ Rendered /api/data -> api/data.json")

    # 6. Ensure Cloudflare _redirects file
    redirects_content = """/resume  /assets/Praful_Chalakh_Resume.pdf  302
/api/data  /api/data.json  200
"""
    with open(os.path.join(BASE_DIR, "_redirects"), "w", encoding="utf-8") as f:
        f.write(redirects_content)
    with open(os.path.join(DIST_DIR, "_redirects"), "w", encoding="utf-8") as f:
        f.write(redirects_content)
    print("  ✓ Generated _redirects for Cloudflare Pages")

    print("\n✅ Build completed successfully!")

if __name__ == "__main__":
    asyncio.run(build())

