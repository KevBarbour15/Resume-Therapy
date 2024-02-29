const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/chat", async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: req.body.prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    if (error.response.status === 429) {
      console.error("Rate limit exceeded");
      res.status(429).send("Rate limit exceeded. Please try again later.");
    } else {
      res.status(500).send("An error occurred");
    }
  }
});

module.exports = router;
