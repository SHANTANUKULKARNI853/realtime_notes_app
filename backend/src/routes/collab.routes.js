const express = require("express");
const router = express.Router();
const prisma = require("../services/prisma");
const auth = require("../middleware/auth");

// ➕ Add collaborator
router.post("/:noteId", auth, async (req, res) => {
  try {
    const { email, permission } = req.body;
    const { noteId } = req.params;

    // find note
    const note = await prisma.note.findUnique({
      where: { id: noteId },
    });

    if (!note) return res.status(404).json({ error: "Note not found" });

    // only owner or admin can add
    if (
      note.ownerId !== req.user.userId &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ error: "Not allowed" });
    }

    // find user to add
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) return res.status(404).json({ error: "User not found" });

    const collab = await prisma.collaborator.create({
      data: {
        noteId,
        userId: user.id,
        permission,
      },
    });
    await prisma.activityLog.create({
  data: {
    userId: req.user.userId,
    noteId,
    action: "ADD_COLLABORATOR",
  },
});


    res.json(collab);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📄 Get collaborators of note
router.get("/:noteId", auth, async (req, res) => {
  const list = await prisma.collaborator.findMany({
    where: { noteId: req.params.noteId },
    include: { user: true },
  });

  res.json(list);
});

module.exports = router;
