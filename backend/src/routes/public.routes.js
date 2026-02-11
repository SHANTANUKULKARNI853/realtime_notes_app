const express = require("express");
const router = express.Router();
const prisma = require("../services/prisma");

router.get("/:token", async (req, res) => {
  try {
    const note = await prisma.note.findUnique({
      where: { shareToken: req.params.token },
      select: {
        title: true,
        content: true,
        createdAt: true,
      },
    });

    if (!note) {
      return res.status(404).json({ error: "Invalid link" });
    }

    res.json(note);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
