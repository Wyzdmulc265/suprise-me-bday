# Vercel Deployment Guide

This app is now configured for deployment on Vercel. Follow these steps:

## Prerequisites

- A Vercel account (https://vercel.com)
- PostgreSQL database (can use Vercel Postgres or external provider)
- Node.js 18+ (Vercel uses this version)

## Environment Variables

Before deploying, set these environment variables in Vercel:

1. **DATABASE_URL** (Required)
   - PostgreSQL connection string
   - Format: `postgresql://user:password@host:port/database`
   - If using Vercel Postgres: Connect your database and Vercel will populate this automatically

2. **NODE_ENV** (Optional)
   - Already set to `production` in vercel.json
   - Override if needed in Vercel dashboard

3. **PORT** (Optional)
   - Automatically handled by Vercel
   - Default: 3000

## Deployment Steps

### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel
```

### Option 2: Using GitHub Integration

1. Push your code to GitHub
2. Go to https://vercel.com/new
3. Import your repository
4. Select "Other" as the framework
5. Set the build command: `npm run build`
6. Set the start command: `npm start`
7. Add environment variables (DATABASE_URL, etc.)
8. Click Deploy

## First-Time Database Setup

After deployment:

1. Set DATABASE_URL in Vercel environment variables
2. Run migrations (if needed):
   ```bash
   npm run db:push
   ```
3. Redeploy to apply any database changes

## Troubleshooting

### "cannot find database"
- Verify DATABASE_URL is set in Vercel
- Check database is accessible from Vercel's servers
- Ensure PostgreSQL allows connections from Vercel IPs

### "PORT not listening"
- Vercel automatically assigns PORT
- App already listens on process.env.PORT (see server/index.ts)
- No changes needed

### Build failing
- Check that `npm run build` works locally first
- Verify all dependencies are in package.json
- Check Node.js version matches Vercel's (18+)

## Performance Tips

- The build script minifies and bundles for optimal cold start times
- Database connections are kept lightweight
- Static assets are cached by Vercel's CDN

## Monitoring

After deployment:
1. Monitor logs in Vercel dashboard
2. Check function durations and memory usage
3. Set up alerts for failed deployments

## Local Testing (Production Build)

To test the production build locally:

```bash
npm run build
npm start
```

Then open http://localhost:3000
