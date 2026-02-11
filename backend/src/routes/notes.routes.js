const express = require("express");
const router = express.Router();
const prisma = require("../services/prisma");
const auth = require("../middleware/auth");
const crypto = require("crypto");



/* =========================
   ✅ CREATE NOTE
========================= */
router.post("/", auth, async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = await prisma.note.create({
      data: {
        title,
        content,
        ownerId: req.user.userId,
      },
    });

    // 🔥 Activity Log
    await prisma.activityLog.create({
      data: {
        userId: req.user.userId,
        noteId: note.id,
        action: "CREATE_NOTE",
      },
    });

    res.json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



/* =========================
   ✅ GET ACCESSIBLE NOTES
========================= */
router.get("/", auth, async (req, res) => {
  try {
    const notes = await prisma.note.findMany({
      where: {
        OR: [
          { ownerId: req.user.userId },
          {
            collaborators: {
              some: { userId: req.user.userId },
            },
          },
        ],
      },
    });

    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



/* =========================
   ✅ UPDATE NOTE
========================= */
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, content } = req.body;

    const note = await prisma.note.findUnique({
      where: { id: req.params.id },
    });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // collaborator check
    const collab = await prisma.collaborator.findFirst({
      where: {
        noteId: req.params.id,
        userId: req.user.userId,
      },
    });

    if (
      note.ownerId !== req.user.userId &&
      req.user.role !== "admin" &&
      (!collab || collab.permission !== "editor")
    ) {
      return res.status(403).json({ error: "Not allowed" });
    }

    const updated = await prisma.note.update({
      where: { id: req.params.id },
      data: { title, content },
    });

    // 🔥 Activity Log
    await prisma.activityLog.create({
      data: {
        userId: req.user.userId,
        noteId: req.params.id,
        action: "UPDATE_NOTE",
      },
    });

    res.json(updated);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



/* =========================
   ✅ DELETE NOTE
========================= */
router.delete("/:id", auth, async (req, res) => {
  try {
    const note = await prisma.note.findUnique({
      where: { id: req.params.id },
    });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    if (
      note.ownerId !== req.user.userId &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ error: "Not allowed" });
    }

    // 🔥 Activity Log BEFORE delete
    await prisma.activityLog.create({
      data: {
        userId: req.user.userId,
        noteId: req.params.id,
        action: "DELETE_NOTE",
      },
    });

    await prisma.note.delete({
      where: { id: req.params.id },
    });

    res.json({ message: "Note deleted" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   🔍 SEARCH NOTES
========================= */
router.get("/search", auth, async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) return res.json([]);

    const notes = await prisma.note.findMany({
      where: {
        AND: [
          {
            OR: [
              { title: { contains: q, mode: "insensitive" } },
              { content: { contains: q, mode: "insensitive" } },
            ],
          },
          {
            OR: [
              { ownerId: req.user.userId },
              {
                collaborators: {
                  some: { userId: req.user.userId },
                },
              },
            ],
          },
        ],
      },
    });

    res.json(notes);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
 
/* =========================
   🔗 GENERATE SHARE LINK
========================= */
router.post("/:id/share", auth, async (req, res) => {
  try {
    const note = await prisma.note.findUnique({
      where: { id: req.params.id },
    });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // Only owner or admin
    if (
      note.ownerId !== req.user.userId &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ error: "Not allowed" });
    }

    const token = crypto.randomBytes(16).toString("hex");

    const updated = await prisma.note.update({
      where: { id: req.params.id },
      data: {
        isPublic: true,
        shareToken: token,
      },
    });

    res.json({
      message: "Share link generated",
      link: `realtimenotesapp-production.up.railway.app/public/${token}`,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});





module.exports = router;
