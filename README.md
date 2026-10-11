# MockMate

MockMate is an AI-powered mock interview platform. It helps candidates practice realistic interviews, answer questions with voice input, receive structured feedback, and review their performance over time.

## Features

- Google sign-in through Firebase Authentication
- Resume upload and PDF text extraction
- Resume-aware interview question generation
- Technical, HR, and managerial interview modes
- Five-question interviews with increasing difficulty
- Browser speech recognition and text-to-speech prompts
- AI evaluation of confidence, communication, correctness, and final score
- Interview history and detailed reports
- PDF report download
- Credit-based interview usage
- Razorpay credit purchases when payment credentials are configured

## User Flow

1. Sign in with Google.
2. Enter a target role, experience level, and interview mode.
3. Optionally upload a PDF resume.
4. Start an AI-generated five-question interview.
5. Answer each question by voice or text.
6. Receive question-level feedback and a final performance report.
7. Review completed interviews from the history page.

## Interview Rules

| Question | Difficulty | Time limit |
| --- | --- | ---: |
| 1 | Easy | 60 seconds |
| 2 | Medium | 90 seconds |
| 3 | Medium | 90 seconds |
| 4 | Hard | 120 seconds |
| 5 | Very hard | 120 seconds |

An unanswered or timed-out question receives a score of zero. Other answers are evaluated by the configured AI provider.

## Credits

- New users start with 150 credits.
- Generating an interview costs 50 credits.
- A user must have at least 50 credits to start an interview.
- Credits are application data stored in MongoDB; they are separate from AI-provider billing or API tokens.

## Technology

### Client

- React 19 and Vite
- React Router
- Redux Toolkit
- Axios
- Tailwind CSS
- Motion and React Icons
- Recharts and React Circular Progressbar
- jsPDF and jspdf-autotable
- Firebase Authentication
- Web Speech API through react-speech-recognition

### Server

- Node.js and Express
- MongoDB with Mongoose
- JWT authentication in HTTP-only cookies
- CORS and cookie-parser
- Multer for PDF uploads
- pdfjs-dist for resume parsing
- OpenRouter-compatible AI requests
- Razorpay payment integration

## Repository Layout

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
│   ├── models/
│   └── routes/
├── screenshots/
└── README.md
```

## Environment Variables

Never commit `.env` files or real credentials. The repository ignores `.env` and `.env.*` files.

### Client: `client/.env`

```dotenv
VITE_SERVER_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=your_razorpay_public_key
```

`VITE_SERVER_URL` points the Vite client to the API server. The Firebase configuration is currently defined in `client/src/utils/firebase.js`.

### Server: `server/.env`

```dotenv
MONGODB_URL=mongodb://localhost:27017
JWT_SECRET_KEY=replace_with_a_long_random_secret
OPENROUTER_API_KEY=your_openrouter_api_key
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
PORT=5000
```

`RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are only required for payment features. MongoDB, JWT, and OpenRouter credentials are required for the corresponding server features.

The database name is defined in `server/config/constants.js` as `ai-interview-agent`. A MongoDB Atlas connection can be used instead of a local MongoDB URL. Restrict Atlas network access to known deployment IPs when possible; `0.0.0.0/0` allows access from anywhere and should be treated as a temporary development setting.

## API Routes

| Method | Route | Purpose | Auth |
| --- | --- | --- | --- |
| `POST` | `/api/auth/google` | Create or find a Google-authenticated user | No |
| `POST` | `/api/auth/logout` | Clear the authentication cookie | No |
| `GET` | `/api/user/current-user` | Return the current user | Yes |
| `POST` | `/api/interview/resume` | Parse an uploaded PDF resume | Yes |
| `POST` | `/api/interview/generate-questions` | Generate and save five questions | Yes |
| `POST` | `/api/interview/submit-answer` | Evaluate and save an answer | Yes |
| `POST` | `/api/interview/finish` | Complete an interview and calculate totals | Yes |
| `GET` | `/api/interview/get-interview` | List the user's interviews | Yes |
| `GET` | `/api/interview/report/:interviewId` | Return one interview report | Yes |
| `POST` | `/api/payment/order` | Create a Razorpay order | Yes |
| `POST` | `/api/payment/verify` | Verify a Razorpay payment | Yes |

Authenticated requests use the HTTP-only `token` cookie. The client sends cookies with Axios `withCredentials: true`.

## Local Development

### Frontend

```bash
cd client
npm install
npm run dev
```

The Vite development server normally runs at `http://localhost:5173`. Its proxy forwards `/api` requests to `http://localhost:5000`.

Available client scripts:

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

### Backend

The current checkout contains the backend configuration, models, controllers, and routes, but does not currently include the backend entrypoint, package manifest, middleware files, or external service modules. Restore or add those server runtime files before running the backend with Node.js.

Once the server runtime is present, the expected local flow is:

```bash
cd server
npm install
npm run dev
```

The API is expected at `http://localhost:5000`.

## Authentication and Data

Google authentication happens in the browser through Firebase. The client sends the authenticated user's name and email to the server. The server creates or finds the MongoDB user and issues a seven-day JWT cookie.

The main data records are:

- `User`: name, email, and credits
- `Interview`: role, experience, mode, resume text, questions, answers, scores, feedback, status, and timestamps
- `Payment`: plan, amount, purchased credits, Razorpay identifiers, and payment status

## Troubleshooting

### The client cannot reach the API

Check that the server is running on port 5000 and that `VITE_SERVER_URL` points to the correct API origin. Restart Vite after changing a client env file.

### Requests return 401

The user is not authenticated, the JWT cookie is missing, or the client request is missing `withCredentials: true`.

### MongoDB does not connect

Check `MONGODB_URL`, MongoDB Atlas network access, database credentials, and DNS access. Do not commit the connection string.

### Resume parsing fails

Use a readable PDF file and confirm that the server has write access to its upload directory.

### Voice features do not work

Use a browser with Web Speech API support, grant microphone permission, and check the browser console for speech-recognition errors.

### Payments are unavailable

Payment credentials are optional for the interview workflow. Add valid Razorpay credentials only when payment features are ready to be enabled.

## Security Checklist

- Keep `client/.env` and `server/.env` local and untracked.
- Never place server secrets in `VITE_*` variables.
- Rotate MongoDB, OpenRouter, Razorpay, or JWT credentials if they are exposed.
- Use a restricted MongoDB Atlas network rule in production.
- Use HTTPS in production so secure authentication cookies work correctly.
- Use a strong, unique `JWT_SECRET_KEY`.

## License

No license has been specified yet.
[GitHub](https://github.com/jeetroy251-hue)
