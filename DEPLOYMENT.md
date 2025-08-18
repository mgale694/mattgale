# GitHub Pages Deployment Guide

This guide explains how to deploy your personal website to GitHub Pages.

## 🌐 Deployment Options

### Option 1: User GitHub Pages (Recommended)

**Result**: `https://mgale694.github.io/`

1. **Rename Repository**

   - Go to your repository settings
   - Rename the repository to `mgale694.github.io`
   - This enables user GitHub Pages

2. **Current Configuration**

   - The workflow is already configured for user pages (`VITE_BASE_PATH: '/'`)
   - No changes needed to the code

3. **Enable Pages**
   - Go to Settings → Pages
   - Source: **GitHub Actions**
   - Save the configuration

### Option 2: Project GitHub Pages

**Result**: `https://mgale694.github.io/matthewgale.co.uk/`

1. **Update Workflow**

   - Edit `.github/workflows/deploy.yml`
   - Change `VITE_BASE_PATH: '/'` to `VITE_BASE_PATH: '/matthewgale.co.uk/'`

2. **Enable Pages**
   - Go to Settings → Pages
   - Source: **GitHub Actions**
   - Save the configuration

## 🚀 Automatic Deployment

The GitHub Action will automatically:

1. **Trigger** on pushes to the `main` branch
2. **Install** dependencies using Bun
3. **Build** the website using Vite
4. **Deploy** to GitHub Pages

## 📋 Deployment Checklist

- [ ] Repository renamed to `mgale694.github.io` (for user pages)
- [ ] GitHub Pages enabled with "GitHub Actions" source
- [ ] Workflow file committed to repository
- [ ] First deployment triggered by pushing to `main` branch

## 🔧 Build Configuration

The deployment uses:

- **Bun** for package management and building
- **Turbo** for monorepo task running
- **Vite** for optimized production builds
- **GitHub Actions** for CI/CD

## 📝 Manual Deployment (Alternative)

If you prefer manual deployment:

```bash
# Build the website
cd website
bun install
bun run build:web

# The built files will be in apps/web/dist/
# Upload these files to your hosting provider
```

## 🐛 Troubleshooting

### Common Issues:

1. **404 on deployment**: Check the base path configuration in `vite.config.ts`
2. **Assets not loading**: Ensure `VITE_BASE_PATH` matches your GitHub Pages URL structure
3. **Build fails**: Check that all dependencies are properly installed

### Logs:

Check the "Actions" tab in your GitHub repository to see deployment logs and troubleshoot any issues.

---

Once deployed, your website will be available at:

- **User Pages**: `https://mgale694.github.io/`
- **Project Pages**: `https://mgale694.github.io/matthewgale.co.uk/`
