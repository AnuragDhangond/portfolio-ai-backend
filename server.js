import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/* =======================
   CHAT ROUTE
======================= */
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    // 🔹 Your Real Portfolio Data
    const portfolioData = `
Anurag Dhangond is an MCA student from Pune, India.

Education:
- 10th Standard from Sarhad School, Pune
- 12th Standard (Commerce) from Pune Cambridge Commerce
- Bachelor of Computer Applications (BCA) from Sarhad College
- Master of Computer Applications (MCA) from Zeal Institute

Technical Skills:
- Angular
- Node.js
- Express.js
- MongoDB
- Java
- SQL
- HTML
- CSS
- JavaScript
- Git

Projects:
1. Society Management System
2. CRM System (MERN Stack)
3. Timetable Scheduler System
4. AI-powered Portfolio Website

Professional Focus:
- Full Stack Development
- MEAN / MERN Stack Development
- Backend Development
- Database Integration

Contact Info:
1.email: adhangond@gmail.com
2.Contact number: 9209036661
`;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `
You are Anurag's professional portfolio assistant.

Here is his verified information:
${portfolioData}

Rules:
- Only answer using the information provided above.
- Do not create fake information.
- If question is unrelated to his portfolio, politely say you can only answer portfolio-related questions.
- Keep answers clear and professional.

User Question: ${userMessage}
`
              }
            ]
          }
        ]
      }
    );

    const reply =
      response.data.candidates[0].content.parts[0].text;

    res.json({ reply });

  } catch (error) {
    console.error("GEMINI ERROR:", error.response?.data || error.message);
    res.status(500).json({
      reply: "⚠️ AI Error. Please try again."
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

