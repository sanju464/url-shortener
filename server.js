const cors = require("cors");
const { nanoid } = require("nanoid");
require("dotenv").config();

const express = require("express");
const pool = require("./db");

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // ✅ serve frontend

/* ---------- HEALTH CHECK ROUTE ---------- */
app.get("/api/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

/* ---------- SHORTEN API ---------- */
app.post("/shorten", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "URL required" });
  }

  // Validate URL
  try {
    new URL(url);
  } catch {
    return res.status(400).json({ error: "Invalid URL format" });
  }

  let token;

  while (true) {
    token = nanoid(7);

    try {
      await pool.query(
        "INSERT INTO urls(token, original_url) VALUES($1,$2)",
        [token, url]
      );
      break;
    } catch (err) {
      if (err.code !== "23505") {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
      }
    }
  }

  res.json({
    shortUrl: `http://localhost:${process.env.PORT}/${token}`,
  });
});

/* ---------- REDIRECT ROUTE (KEEP LAST) ---------- */
app.get("/:token", async (req, res) => {
  const { token } = req.params;

  try {
    const result = await pool.query(
      "SELECT original_url FROM urls WHERE token=$1",
      [token]
    );

    if (result.rows.length === 0) {
      return res.status(404).send("Short URL not found");
    }

    await pool.query(
      "UPDATE urls SET clicks = clicks + 1 WHERE token=$1",
      [token]
    );

    res.redirect(result.rows[0].original_url);

  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

/* ---------- START SERVER ---------- */
app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});