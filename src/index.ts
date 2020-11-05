import dotenv from "dotenv";
import { join } from "path";

dotenv.config();

import app from "./app";

const PORT = process.env.PORT;

app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
