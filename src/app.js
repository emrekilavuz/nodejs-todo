const express = require("express");
const taskRoutes = require("./routes/tasks");

const app = express();

app.use(express.json());
app.use("/tasks", taskRoutes);

// Global error handler (basit)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app; // test için
