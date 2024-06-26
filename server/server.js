require("dotenv").config();
const cors = require("cors");
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

const openaiRouter = require('./routes/openai');
const authRouter = require('./routes/auth');

app.use('/api', openaiRouter);
app.use('/auth', authRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

