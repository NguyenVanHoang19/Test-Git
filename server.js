const express = require("express");
const app = express();
const connectDB = require("./config/connectDB");

connectDB();

app.get("/", (req, res) => {
  res.send("HI");
});

app.use(express.json({ extended: false }));
app.use("/api/user", require("./routes/api/user"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Start port ${PORT}`));
