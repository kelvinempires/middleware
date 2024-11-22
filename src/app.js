import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import Module from "module";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware to restrict access to working hours
const workingHoursMiddleware = (req, res, next) => {
  const now = new Date();
  const hours = now.getHours();
  const day = now.getDay();
  if (day >= 1 && day <= 5 && hours >= 9 && hours < 17) {
    next();
  } else {
    res.send(
      "The web application is only available during working hours (Monday to Friday, from 9 to 17)."
    );
  }
};

app.use(workingHoursMiddleware);

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve static files
app.use(express.static(path.join(__dirname, "../public")));

// Routes
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/services", (req, res) => {
  res.render("services");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
