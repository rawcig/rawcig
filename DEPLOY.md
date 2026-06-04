# Deployment Guide

Your portfolio is ready for deployment! Here are the steps to deploy:

## Option 1: Deploy to Vercel (Recommended)

Vercel is the company behind Next.js and provides the best experience for Next.js apps.

1. Push your code to GitHub, GitLab, or Bitbucket
2. Go to [vercel.com](https://vercel.com) and sign up
3. Click "New Project" and import your repository
4. Vercel will auto-detect Next.js configuration
5. Click "Deploy"

## Option 2: Deploy to Netlify

1. Push your code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign up
3. Click "New site from Git" and select your repository
4. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. Click "Deploy site"

## Option 3: Deploy to AWS, Azure, or Google Cloud

Build the app locally and deploy the `.next` folder to your cloud provider:

```bash
npm run build
# Deploy the .next folder and public/ folder to your hosting
```

## Pre-deployment Checklist

- [ ] Update email address in the Contact section
- [ ] Update GitHub and LinkedIn links
- [ ] Add your project descriptions
- [ ] Test locally: `npm run dev`
- [ ] Build production: `npm run build`
- [ ] Test production build: `npm start`
- [ ] Update metadata in `src/app/layout.js`
- [ ] Customize colors and styling in `src/app/globals.css` if needed

## Environment Variables

If you need environment variables:

1. Create `.env.local` for local development
2. For production, add them in your hosting platform's dashboard
3. Reference the `.env.example` file for available variables

## Performance Tips

- The portfolio is already optimized with Tailwind CSS
- Next.js handles image optimization automatically
- Static site generation is enabled for fast loading
- Consider adding a CMS for dynamic content later

## Troubleshooting

**Build fails locally:**
```bash
npm install
npm run build
```

**Port 3000 already in use:**
```bash
npm run dev -- -p 3001
```

**Need to clean build:**
```bash
rm -rf .next node_modules
npm install
npm run build
```

---

Good luck with your deployment! 🚀
