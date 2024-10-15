import Leaderboard from "../models/Leaderboard.js";

export const getAllScores = async (req, res) => {
  try {
    const scores = await Leaderboard.find().sort({ score: -1 });
    res.status(200).json(scores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createScore = async (req, res) => {
  const { username, score } = req.body;
  try {
    const newScore = new Leaderboard({ username, score });
    await newScore.save();
    res.status(201).json(newScore);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
