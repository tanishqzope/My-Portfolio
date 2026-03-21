import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

const app = express();

// Security Headers (Enforces HTTPS, prevents XSS, clickjacking, etc.)
app.use(helmet());

// Enable CORS for frontend
app.use(cors({
    origin: '*', // Restrict this to your specific domain in production
    methods: ['GET', 'POST', 'OPTIONS'],
}));

// Parse JSON payloads
app.use(express.json());

// Logging Middleware (Logs formatting: Method URL Status ResponseTime)
app.use(morgan('combined'));

// --- RATE LIMITERS ---
// 1. General API Rate Limiter
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: { error: "Too many requests from this IP, please try again later." }
});
app.use("/api/", apiLimiter);

// 2. Login Rate Limiter (Stricter)
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10, // 10 login attempts per 15 minutes
    message: { error: "Too many login attempts, please try again after 15 minutes." }
});
app.use("/api/auth/login", loginLimiter);

// 3. Account Creation Rate Limiter
const registerLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 3, // 3 accounts per hour
    message: { error: "Too many accounts created from this IP, please try again after an hour." }
});
app.use("/api/auth/register", registerLimiter);

// 4. AI Generation Rate Limiter (Heavy task)
const aiLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // 5 AI requests per hour
    message: { error: "AI generation rate limit reached, please try again later." }
});
app.use("/api/ai/generate", aiLimiter);

// --- ROUTES ---

// Web3Forms Contact Submission Endpoint
app.post("/api/contact", async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
        }

        const access_key = process.env.WEB3FORMS_ACCESS_KEY;
        if (!access_key) {
            console.error("WEB3FORMS_ACCESS_KEY is not defined in environment variables");
            return res.status(500).json({ success: false, message: "Server misconfiguration" });
        }

        // Forward to Web3Forms using built-in fetch (Node 18+)
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                access_key: access_key,
                name,
                email,
                subject: subject || "New Message from Portfolio",
                message,
            }),
        });

        const result = await response.json();
        
        if (result.success) {
            res.status(200).json({ success: true, message: "Message sent securely" });
        } else {
            console.error("Web3Forms API Error:", result.message);
            res.status(400).json({ success: false, message: "Failed to send message via provider" });
        }

    } catch (error) {
        console.error("Contact API Server Error:", error);
        res.status(500).json({ success: false, message: `Internal server error: ${error.message}` });
    }
});

// Placeholder for Login
app.post("/api/auth/login", (req, res) => {
    res.status(501).json({ error: "Not Implemented" });
});

// Placeholder for Register
app.post("/api/auth/register", (req, res) => {
    res.status(501).json({ error: "Not Implemented" });
});

// Placeholder for AI Generation
app.post("/api/ai/generate", (req, res) => {
    res.status(501).json({ error: "Not Implemented" });
});

export default app;
