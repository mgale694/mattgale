---
slug: welcome
title: Welcome
authors: [mgale]
tags: [facebook, hello, docusaurus]
---

[Docusaurus blogging features](https://docusaurus.io/docs/blog) are powered by the [blog plugin](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-content-blog).

Simply add Markdown files (or folders) to the `blog` directory.

Regular blog authors can be added to `authors.yml`.

The blog post date can be extracted from filenames, such as:

- `2019-05-30-welcome.md`
- `2019-05-30-welcome/index.md`

A blog post folder can be convenient to co-locate blog post images:

![Docusaurus Plushie](./docusaurus-plushie-banner.jpeg)

The blog supports tags as well!

<details>
  <summary>What is the difference between a cold build and an incremental build?</summary>

A cold build is when the Docusaurus caches are empty, generally after running `docusaurus clear`.

An incremental build happens when you run another time the `docusaurus build` command. Docusaurus automatically tries to "re-use" computations from former builds to make subsequent builds faster. In practice it's based on [Webpack persistent caching](https://webpack.js.org/guides/build-performance/#persistent-cache). To enable incremental builds on your CI server, you can persist the `node_modules/.cache` folder across builds.

</details>

**And if you don't want a blog**: just delete this directory, and use `blog: false` in your Docusaurus config.
