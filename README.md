# StudyFlow

StudyFlow is a study planner with an AI assistant, notes, flashcards, a weekly schedule, progress tracking, and Pomodoro sessions. Students create an account with an email, password, name, standard/class, and course so their planner can be saved and accessed across browsers.

## Requirements

- Node.js 20 or newer
- MongoDB connection string
- Gemini API key to enable AI answers and quiz generation

## Configuration

Copy `frontend/backend/.env.example` to `frontend/backend/.env`, then set `MONGODB_URI` and `GEMINI_API_KEY`. Keep `.env` private and never commit it.

For production, also set `NODE_ENV=production` and a persistent, randomly generated `SESSION_SECRET` (at least 32 random bytes). For example, generate one locally with:

```sh
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Production startup fails if `SESSION_SECRET` or `MONGODB_URI` is missing. MongoDB stores accounts, planner data, and notes. Passwords are stored as salted scrypt hashes, never as plain text. The Gemini key is used only by the backend.

## Development

Install dependencies from the repository root, then start the backend:

```sh
npm install
npm --prefix frontend install
npm --prefix frontend/backend install
npm start
```

In a second terminal, start the frontend development server:

```sh
cd frontend
npm run dev
```

The frontend proxies `/api` requests to the backend on port 5000. Visitors see a welcome page, then can log in or create an account. Account creation collects the student's name, standard/class, and course before opening the planner. When creating an account from a browser that already has a private planner, StudyFlow keeps that planner's existing data and attaches it to the account.

After registration, StudyFlow displays a one-time recovery code. Save it privately: password recovery requires the account email and this code, does not send email, and consumes the code when resetting the password. Signed-in students can create a replacement code from Profile; doing so invalidates the previous code. Recovery codes are stored as salted scrypt hashes, and successful password recovery invalidates existing sessions.

## Public deployment (Render + MongoDB Atlas)

The repository includes a Render Blueprint in `render.yaml`. To create a public deployment:

1. Push the project to GitHub and create a free MongoDB Atlas cluster. Create a database user with a strong, unique password and copy the Atlas connection string for the `studyflow` database.
2. In Atlas Network Access, allow connections from Render. Render's free service does not provide fixed outbound IPs, so Atlas may require `0.0.0.0/0`; protect the database with the unique database-user password and grant that user access only to the StudyFlow database.
3. Sign in to Render, choose **New → Blueprint**, and connect this GitHub repository. Render reads `render.yaml` to build the frontend and start the API service.
4. When prompted, provide `MONGODB_URI` using the Atlas connection string. Keep the generated `SESSION_SECRET`; add `GEMINI_API_KEY` if AI answers and quiz generation should be enabled.
5. Wait for the deployment health check to pass. Render will provide the public `onrender.com` URL; share that URL so students can open StudyFlow on phones, tablets, and computers.

The Blueprint builds the active frontend into `dist`, installs backend dependencies, and starts the Express server. The same-origin deployment keeps account cookies and `/api` requests together. On Render's free plan, the service may sleep while idle, so the first visit after a quiet period can take longer.

## Checks

```sh
npm run lint
npm run build
npm --prefix frontend run lint
npm --prefix frontend run build
```
