# MockMate

MockMate is a practical AI mock interview platform for people who want to prepare by actually speaking, not just reading another list of interview tips.

Pick a role, share a little context, and step into a timed interview with an AI interviewer. MockMate asks questions, listens to your answers, and turns each session into feedback you can use.

## What It Does

- Google sign-in with Firebase Authentication
- Role-based technical, HR, and managerial interviews
- Optional PDF resume upload and resume-aware questions
- Five questions with increasing difficulty
- Voice-first interview experience with browser speech recognition
- Female AI interviewer avatar and spoken prompts
- Feedback on confidence, communication, and correctness
- Interview history and detailed performance reports
- Downloadable PDF reports
- Optional Razorpay credit purchases

## A Session, End to End

1. Sign in with Google.
2. Choose the role, experience level, and interview mode.
3. Upload a PDF resume if you want more personalized questions.
4. Start the session and answer each question naturally.
5. Receive feedback after each answer.
6. Finish the interview to see your overall report.
7. Revisit past sessions from Interview History.

The interview is deliberately structured to become more difficult as it goes:

| Question | Difficulty | Time limit |
| --- | --- | ---: |
| 1 | Easy | 60 seconds |
| 2 | Medium | 90 seconds |
| 3 | Medium | 90 seconds |
| 4 | Hard | 120 seconds |
| 5 | Very hard | 120 seconds |

An unanswered or timed-out question receives a score of zero. Answers that are submitted in time are evaluated by the configured OpenRouter model, with automatic fallback across the configured free models if one is unavailable.

## Credits

Every new account starts with 150 credits. Starting an interview costs 50 credits, so the balance is managed by the application in MongoDB. These credits are separate from OpenRouter usage limits or provider billing.

## Tech Stack

### Frontend

- React 19 with Vite
- React Router
- Redux Toolkit
- Axios
- Tailwind CSS v4
- Motion and React Icons
- Recharts and React Circular Progressbar
- jsPDF and jspdf-autotable
- Firebase Authentication
- Browser Web Speech APIs through react-speech-recognition

### Backend

- Node.js and Express
- MongoDB with Mongoose
- JWT authentication in HTTP-only cookies
- CORS and cookie-parser
- Multer for PDF uploads
- pdfjs-dist for resume text extraction
- OpenRouter for AI generation and evaluation
- Razorpay for optional credit purchases

## Project Structure

```text
.
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── redux/
│       ├── services/
│       └── utils/
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   └── services/
├── client/.env.example
├── server/.env.example
└── README.md
```

## Environment Setup

Keep real `.env` files local. They are ignored by Git. Safe templates are available in `client/.env.example` and `server/.env.example`.

### Client environment

Create `client/.env`:

```dotenv
VITE_SERVER_URL=http://localhost:5100
VITE_RAZORPAY_KEY_ID=your_razorpay_public_key

VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_firebase_measurement_id
```

The Firebase measurement ID is optional for Google login. The other Firebase web-app values are required by the client Firebase initialization.

### Server environment

Create `server/.env`:

```dotenv
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET_KEY=replace_with_a_long_random_secret
OPENROUTER_API_KEY=your_openrouter_api_key

# Optional until payments are enabled
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

PORT=5100
NODE_ENV=development
```

The database name is defined in `server/config/constants.js`. For MongoDB Atlas, make sure the database user and network access rules allow the machine running the API to connect. URL-encode special characters in the database username or password, such as `@` becoming `%40`.

### Firebase checklist

In Firebase Console:

1. Create or select a web app and copy its config into `client/.env`.
2. Enable Google under Authentication > Sign-in method.
3. Add `localhost`, `127.0.0.1`, and the production frontend domain under Authorized domains.
4. Add your Google account as a test user if the OAuth consent screen is still in testing.

Firestore is not required for the current application. User and interview data are stored in MongoDB.

## Run Locally

Install dependencies once in each app:

```bash
cd server
npm install

cd ../client
npm install
```

Start the API in one terminal:

```bash
cd server
npm run dev
```

Start the Vite client in another:

```bash
cd client
npm run dev
```

The API runs on `http://localhost:5100` and the client normally runs on `http://localhost:5173`.

On macOS, port `5000` may be occupied by AirTunes. Keeping both env files on port `5100` avoids that conflict.

### Available scripts

Client:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

Server:

```bash
npm run dev
npm start
```

## API Overview

| Method | Endpoint | Purpose | Auth |
| --- | --- | --- | --- |
| `POST` | `/api/auth/google` | Create or find a Google-authenticated user | No |
| `POST` | `/api/auth/logout` | Clear the login cookie | No |
| `GET` | `/api/user/current-user` | Return the current user | Yes |
| `POST` | `/api/interview/resume` | Parse an uploaded PDF resume | Yes |
| `POST` | `/api/interview/generate-questions` | Generate and save interview questions | Yes |
| `POST` | `/api/interview/submit-answer` | Evaluate and save an answer | Yes |
| `POST` | `/api/interview/finish` | Complete an interview and calculate totals | Yes |
| `GET` | `/api/interview/get-interview` | List the user's interviews | Yes |
| `GET` | `/api/interview/report/:interviewId` | Return one interview report | Yes |
| `POST` | `/api/payment/order` | Create a Razorpay order | Yes |
| `POST` | `/api/payment/verify` | Verify a Razorpay payment | Yes |

Authenticated requests use the HTTP-only `token` cookie. The client sends it with Axios `withCredentials: true`.

## Authentication and Data

Firebase handles the Google sign-in in the browser. The client sends the verified user's name and email to the API. The server creates or finds the MongoDB user, then issues a seven-day JWT cookie.

The main MongoDB records are:

- `User`: name, email, and application balance
- `Interview`: role, experience, mode, resume text, questions, answers, feedback, scores, status, and timestamps
- `Payment`: plan, amount, purchased balance, Razorpay identifiers, and payment status

## Troubleshooting

### The client cannot reach the API

Confirm that the server is running and that `VITE_SERVER_URL` matches the server `PORT`. Restart Vite after changing a client env file.

### Google login does not open or complete

Check that Google is enabled in Firebase Authentication, the current domain is authorized, and the Firebase values in `client/.env` belong to the same project.

### Requests return `401 Unauthorized`

The browser does not have a valid JWT cookie yet, the session expired, or the request is missing `withCredentials: true`.

### MongoDB does not connect

Check the Atlas user, password encoding, network access rules, and `MONGODB_URL`. Do not commit the connection string.

### Resume upload fails

Only PDF resumes are accepted and the upload limit is 5 MB. Make sure the API process can write to its `public` directory.

### Voice features do not work

Use a browser with Web Speech API support, allow microphone access, and check the browser console for speech-recognition errors.

### Payments are unavailable

Payments are optional. Add valid Razorpay credentials when the purchase flow is ready to be enabled.

## Security Notes

- Never commit `.env` files or paste real credentials into documentation.
- Keep server secrets out of `VITE_*` variables.
- Rotate MongoDB, OpenRouter, Razorpay, or JWT credentials if they are exposed.
- Restrict MongoDB Atlas network access in production instead of leaving it open to every IP.
- Use HTTPS in production so secure authentication cookies work correctly.
- Use a strong, unique `JWT_SECRET_KEY`.

## License

No license has been specified yet.

## Maintainer

Atish
