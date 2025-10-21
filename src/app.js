const express = require("express");
const taskRoutes = require("./routes/tasks.routes");
const authRoutes = require("./routes/auth.routes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

