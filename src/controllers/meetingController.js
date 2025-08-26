const Meeting = require("../models/meetings");

const createMeeting = async (req, res) => {
  try {
    //JWT middleware tarafından eklenen userIdye erişim
    const userId = req.userId;
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Başlık Alanı Zorunludur.",
      });
    }

    const newMeeting = await Meeting.create({
      title,
      userId,
    });

    res.status(201).json({
      message: "Toplantı Başarıyla Oluşturuldu:",
      meeting: newMeeting,
    });
  } catch (error) {
    console.error("Toplantı Oluşturma Hatası:", error);
    res.status(500).json({
      message: "Sunucu Hatası",
    });
  }
};

const getMettings = async (req, res) => {
  try {
    const meeting = await Meeting.findAll({
      where: { userId: req.userId },
      order: [["created_at", "DESC"]],
    });

    res.status(200).json({
      meeting,
    });
  } catch (error) {
    console.error("Toplantıları Listeleme Hatası:", error);
    res.status(500).json({
      message: "Sunucu Hatası",
    });
  }
};

const deleteMeeting = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Meeting.destroy({
      where: { id, userId: req.userId },
    });

    if (result === 0) {
      return res.status(404).json({
        message: "Toplantı Bulunamadı veya yetkinit yok",
      });
    }

    res.status(200).json({
      message: "Toplantı başarıyla silindi",
    });
  } catch (error) {
    console.error("Toplantı silme hatası:", error);
    res.status(500).json({
      message: "Sunucu Hatası",
    });
  }
};

const getMettingById = async (req, res) => {
  try {
    const { id } = req.params;
    const meeting = await Meeting.findOne({
      where: { id, userId: req.userId },
    });

    if (!meeting) {
      return res.status(404).json({
        message: "Toplantı Bulunamadı",
      });
    }

    res.status(200).json({
      meeting,
    });
  } catch (error) {
    console.error("Toplantı detayı getirme hatası:", error);
    res.status(500).json({
      message: "Sunucu Hatası",
    });
  }
};

module.exports = {
  createMeeting,
  deleteMeeting,
  getMettings,
  getMettingById
};
