# 🧑‍💼 Job Board Web Application

A mini full-stack job board built with **Next.js (App Router)**, **Prisma**, **PostgreSQL**, and **Tailwind CSS**. Admins can log in to add, delete, and manage job listings.

---


## ⚙️ Tech Stack

- **Frontend**: Next.js (App Router), React, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: JWT (stored in HTTP-only cookies)
- **Deployment**: Vercel

---

## 📸 Features

- Admin authentication (Register/email/password)
- Add new jobs with details like title, company, location, etc.
- Delete existing job listings
- Fully responsive  layout
- Clean UI with TailwindCSS
- Logout with cookie clearing and toast notifications

🛠️ Setup Instructions---

1. Clone the Repository
git clone https://github.com/yourusername/job-board.git
cd job-board

2. Install Dependencies
npm install

3. Configure Environment Variables
Create a .env file:
DATABASE_URL="postgresql://postgres:1234@localhost:5432/jobbord?schema=public"


4. Run Prisma Migration
npx prisma migrate dev --name init

5. Start the Development Server
npm run dev

👨‍💻 Admin Credentials (Hardcoded for Testing)
Email: admin@gmail.com
Password: admin1234


📂 Folder Structure Overview
bash
Copy
Edit
/app
  ├── api/
  ├── dashboard/
  ├── login/
  └── page.tsx
/components
/prisma

📌 Notes
Make sure PostgreSQL is running locally or use Railway/Supabase for a hosted DB.

The token is stored securely in HTTP-only cookies.

Use Postman or browser dev tools to test JWT-protected routes.

🧑‍🎓 Author
Name – R.G.Prabodha jayawardhana
GitHub:https://github.com/prabodhaj32


