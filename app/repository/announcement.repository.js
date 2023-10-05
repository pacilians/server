const db = require('../../core/database');

module.exports = {
    createAnnouncement: async (announcement) => {
        const { id_user, title, content } = announcement;
        const created_at = new Date();
        const [result] = await db.query('INSERT INTO announcement (id_user, title, content, created_at) VALUES (?, ?, ?, ?)', [id_user, title, content, created_at]);
        return result.insertId;
    },
    getAnnouncementById: async (id) => {
        const [rows] = await db.query('SELECT * FROM announcement WHERE id = ?', [id]);
        if (rows.length) {
            return rows[0];
        }
        return null;
    },
    getAllAnnouncements: async () => {
        const [rows] = await db.query('SELECT * FROM announcement');
        return rows
    },
    updateAnnouncement: async (announcement) => {
        const { id, title, content } = announcement;
        const updated_at = new Date();
        const [result] = await db.query('UPDATE announcement SET title = ?, content = ?, updated_at = ? WHERE id = ?', [title, content, updated_at, id]);
        return result.affectedRows > 0;
    },
    deleteAnnouncement: async (id) => {
        const [result] = await db.query('DELETE FROM announcement WHERE id = ?', [id]) || [];
        return result
    },
    pinAnnouncement: async (id, status) => {
        const updated_at = new Date();
        const [result] = await db.query('UPDATE announcement SET is_pinned = ?, updated_at = ? WHERE id = ?', [status, updated_at, id]);
        return result.affectedRows > 0;
    },
};
