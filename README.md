# ⚽ FK Rajec — Official Club Website

Full-stack football club website built with Next.js 15, shadcn/ui, Tailwind CSS v4, Prisma, Neon PostgreSQL, and NextAuth.js.

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment variables
Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Required variables:
| Variable | Description |
|---|---|
| `DATABASE_URL` | Neon PostgreSQL connection string (pooled) |
| `DIRECT_URL` | Neon PostgreSQL direct connection string |
| `NEXTAUTH_SECRET` | Random string (min 32 chars) — generate with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Your app URL (e.g. `https://your-app.vercel.app`) |

### 3. Set up Neon Database

1. Create a free account at [neon.tech](https://neon.tech)
2. Create a new project named `fkrajec`
3. Copy the **connection string** → `DATABASE_URL`
4. Copy the **direct connection string** → `DIRECT_URL`

### 4. Push schema & seed database
```bash
npm run db:push       # Push schema to Neon
npm run db:seed       # Seed test data
```

### 5. Run development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔐 Test Accounts (after seeding)

| Role | Email | Password |
|---|---|---|
| **Admin** | admin@fkrajec.sk | admin123 |
| **Coach** | trener@fkrajec.sk | trener123 |
| **Player** | kovac@fkrajec.sk | hrac123 |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── (public)/          # Public pages (home, news, squad, fixtures, results, table)
│   ├── auth/login/        # Login page
│   ├── dashboard/         # Protected dashboard (role-based)
│   │   ├── page.tsx       # Overview
│   │   ├── trainings/     # Training management
│   │   ├── attendance/    # Attendance tracking
│   │   ├── notifications/ # In-app notifications
│   │   ├── players/       # Player management (Admin only)
│   │   ├── news/          # News management (Admin only)
│   │   └── fixtures/      # Fixtures & Results management (Admin only)
│   └── api/               # API routes with role guards
├── components/
│   ├── home/              # Home page sections
│   ├── layout/            # Navbar, Footer
│   ├── dashboard/         # Dashboard components
│   └── ui/                # shadcn components
├── lib/
│   ├── auth.ts            # NextAuth configuration
│   ├── db.ts              # Prisma client
│   └── mock-data.ts       # Development mock data
└── types/
    └── next-auth.d.ts     # NextAuth type augmentations
```

---

## 🌍 Deploy to Vercel

1. Push your code to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Set environment variables in Vercel dashboard:
   - `DATABASE_URL`
   - `DIRECT_URL`  
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` → set to your Vercel URL
4. Deploy!

The `vercel.json` is already configured to run `prisma generate && next build`.

---

## 🎨 Design

- **Brand colors:** FK Rajec Red (`#CC0000`) + Black (`#1A1A1A`)
- **Fonts:** Bebas Neue (headings) + Inter (body)
- **League:** 5. liga JUH skupina B

## 📋 Role Permissions

| Feature | Admin | Coach | Player |
|---|---|---|---|
| View public pages | ✅ | ✅ | ✅ |
| Manage news | ✅ | ❌ | ❌ |
| Add/edit trainings | ✅ | ✅ | ❌ |
| View trainings | ✅ | ✅ | ✅ |
| Mark attendance | ✅ | ✅ | Self only |
| Manage players | ✅ | ❌ | ❌ |
| Add fixtures/results | ✅ | ❌ | ❌ |
| Dashboard access | ✅ | ✅ | ✅ |
