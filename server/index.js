import express from "express";
import cors from "cors";

import "./config/database.js";
import leaderboardRoutes from "./routes/leaderboard.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/leaderboard", leaderboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
