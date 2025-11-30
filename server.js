const express = require("express");
const path = require("path");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// 1) Render Homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// 2) Send Email Route
app.post("/send-email", async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.json({ status: false, message: "All fields are required!" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nitinkumarvasdhani786@gmail.com",   // YOUR GMAIL
        pass: "twaednpyrenhydvh",                 // YOUR APP PASSWORD (NO SPACES)
      },
    });

    await transporter.sendMail({
      from: `"The Knots Weddings" <nitinkumarvasdhani786@gmail.com>`,
      to: "nitinkumarvasdhani786@gmail.com",      // Receiver Email
      subject: "New Enquiry From The Knots Weddings Contact Form Submission",
      html: `
        <h2>New Inquiry</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Message:</b> ${message}</p>
      `,
    });

    res.json({ status: true, message: "Message sent successfully!" });
  } catch (error) {
    console.log("EMAIL ERROR:", error);

    res.json({
      status: false,
      message: "Failed to send email.",
      error: error.message,
    });
  }
});

app.listen(5000, () => console.log("Server running → http://localhost:5000"));