import dotenv from "dotenv";

dotenv.config();

import app from "./app";

const PORT = process.env.PORT;

// in production this will serve static files
app.get("/", (req, res) => {
  res.json({ response: true });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
