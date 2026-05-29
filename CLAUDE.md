# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A personal tech blog (`pigbrain`) built on **Jekyll-Bootstrap (JB) 0.3.0**, deployed as a GitHub Pages user site (`origin` → `pigbrain/pigbrain.github.com`). Content is overwhelmingly Korean-language technical posts (Erlang, Machine Learning, Math, Go, Spring, Istio, etc.). The active theme is **Snail** (a port of the elementaryOS portal page).

## Common commands

```bash
rake post title="A Title" [date="YYYY-MM-DD"] [tags="[tag1,tag2]"] [category="Erlang"]   # scaffold a new post in _posts/
rake page name="foo.html"        # scaffold a new standalone page
rake preview                     # jekyll serve -w (live local preview)
jekyll build                     # generate _site/ (the build output; gitignored)
rake theme:switch name="Snail"   # switch the active theme
```

There is no test suite, linter, or CI config in this repo — validation is visual via `rake preview`.

## Architecture & conventions

- **Posts** live in `_posts/` and follow Jekyll's strict `YYYY-M-D-slug.md` naming. The slugs in this repo carry two extra conventions you must preserve when adding files: spaces are written as `+` and a `_on_<Category>` suffix tags the topic (e.g. `2015-7-20-LinearRegression_on_MachineLearning.md`). The actual category is set in front matter, not derived from the filename.
- **Permalinks** are `/:categories/:year/:month/:day/:title` (see `_config.yml`). Category in front matter therefore directly shapes the published URL — keep capitalization consistent (note some existing posts have stray trailing-whitespace categories like `OpenSource  `; don't replicate that).
- **Front matter** for posts: `layout: post`, `title`, `category`, `tags: [...]`, optional `tagline`/`description`. Every post body starts with `{% include JB/setup %}` (the `rake post` task emits this automatically).
- **Excerpts** use the `teaser` strategy (`excerpt: teaser` in `_config.yml`): place `<!--more-->` where the homepage teaser should cut off. Without it the whole post renders on the homepage.
- **Layouts** in `_layouts/` (`post`, `page`, `archive`, `categories`, `tags`, etc.) are thin wrappers that pull theme markup from `_includes/themes/<theme>/`. JB framework partials live in `_includes/JB/` and are referenced as `{% include JB/<name> %}`. To change a layout's look, edit the theme include, not the top-level layout.
- **Theme assets** (CSS/JS/img/fonts) live under `assets/themes/<theme>/`; the Snail theme's images and favicon are in `assets/themes/Snail/img`.
- `Rakefile` is the source of truth for all generators and the JB path config (`SOURCE`, `posts`, `themes`, `post_ext: md`). The `_config.yml` `JB:` hash configures comments (Disqus, `short_name: pigbrain`), analytics, sharing, and search (Google CSE).

## Editing notes

- Site `title`, `tagline`, `author`, and contact/footer links are all in `_config.yml`.
- `_drafts/` holds unpublished drafts; `_site/` and `_theme_packages/` are build/scratch output and gitignored — never edit or commit them.
