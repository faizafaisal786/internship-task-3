# Vercel Deployment Guide

I have prepared your project for deployment on Vercel. Because this is a monorepo with separate `frontend` and `backend` folders, you should deploy them as **two separate projects** on Vercel.

## 1. Backend Deployment

### Prerequisites
- You need a hosted PostgreSQL database (e.g., from [Supabase](https://supabase.com/), [Neon](https://neon.tech/), or [Railway](https://railway.app/)). **SQLite will not work on Vercel.**

### Steps
1. Push your code to GitHub.
2. Create a new project on [Vercel](https://vercel.com/new).
3. Select your repository.
4. For **Root Directory**, select `backend`.
5. In **Environment Variables**, add:
   - `DATABASE_URL`: Your PostgreSQL connection string.
   - `JWT_SECRET`: A secret string for authentication.
   - `PORT`: 5000 (optional, defaults to 5000 in code).
6. Click **Deploy**.

## 2. Frontend Deployment

### Steps
1. Create another new project on [Vercel](https://vercel.com/new).
2. Select the same repository.
3. For **Root Directory**, select `frontend`.
4. In **Environment Variables**, add:
   - `VITE_API_URL`: The URL of your deployed backend (e.g., `https://your-backend.vercel.app/api`).
5. Click **Deploy**.

## Changes Made
- **Frontend**: Updated `src/api/axios.ts` to use `VITE_API_URL` environment variable.
- **Backend**: 
  - Added `vercel.json` for Express routing.
  - Exported `app` in `src/index.ts` for Vercel serverless functions.
  - Updated `package.json` build script to include `prisma generate`.
