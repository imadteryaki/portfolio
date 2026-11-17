# Developer Portfolio

My personal portfolio website – a **React** single-page app with a **Node.js / Express** backend and an admin dashboard to manage projects.

🌐 **Live:** [imadteryaki.vercel.app](https://imadteryaki.vercel.app)

## Features

- Modern, responsive design with **Tailwind CSS** and smooth animations using **Framer Motion**
- **Multilingual:** German, English and Arabic (including right-to-left layout) with i18next
- Sections for About, Tech Stack, Projects and Contact, plus a printable **CV page**
- **Contact form** that sends emails via Nodemailer
- **Admin dashboard** (JWT-protected) to create, edit, feature and delete projects
- **Image uploads** to Cloudinary
- Security headers with Helmet

## Tech Stack

| Frontend | Backend |
|---|---|
| React 19, Vite | Node.js, Express 5 |
| Tailwind CSS 4, Framer Motion | MongoDB, Mongoose |
| React Router 7, i18next | JWT, bcryptjs, Helmet |
| react-hot-toast, react-icons | Cloudinary, Multer, Nodemailer |

## Project Structure

```
├── src/          # React frontend (sections, pages, components, locales)
├── public/       # Static assets (images, CV)
└── server/       # Express API (routes, controllers, models, middleware)
```

## Getting Started

### Prerequisites
- Node.js 20+
- MongoDB database (e.g. MongoDB Atlas)
- Cloudinary account (for image uploads)

### Setup

```bash
# Frontend
npm install
cp .env.example .env

# Backend
cd server
npm install
cp .env.example .env    # fill in your own values
npm run seed            # creates the admin account
```

### Run

```bash
npm run dev:all   # starts frontend (Vite) and backend together
```

- Frontend: `http://localhost:5173`
- API: `http://localhost:5000`
- Admin: `/admin/login`

## Deployment

The frontend is deployed on **Vercel** (`vercel.json` handles SPA routing).

## Author

**Imad Teryaki** – Full Stack Developer from Wuppertal, Germany
[LinkedIn](https://www.linkedin.com/in/imad-teryaki-0b7b98270/) · [GitHub](https://github.com/imadteryaki)
