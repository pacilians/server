const db = require("../../core/database");

const AuditRepository = {
  /**
   * The Audit
   */
  
  getDetailAudit: async (id_audit) => {
    const [rows] = await db.query(
      "SELECT id, id_audit_event, name, created_at, status, file FROM audit WHERE id_audit = ?",
      [id_audit]
    );
    return rows;
  },

  getDetailAuditByEventId: async (id_event) => {
    const [rows] = await db.query(
      "SELECT id, id_audit_event, name, created_at, status, file FROM audit WHERE id_audit_event = ?",
      [id_event]
    );
    return rows;
  },

  createAudit: async (audit) => {
    const now = new Date();
    const [result] = await db.query(
      "INSERT INTO audit (id_audit_event, name, created_at, status, file) VALUES (?, ?, ?, ?, ?)",
      [audit.id_audit_event, audit.name, now, audit.status, null]
    );
    let res = audit
    res.id = result.insertId
    return audit;
  },

  updateAuditFile: async (id, file) => {
    await db.query("UPDATE audit SET file = ? WHERE id = ?", [file, id]);
    return file;
  },

  updateStatusAudit: async (id, status) => {
    await db.query("UPDATE audit SET status = ? WHERE id = ?", [status, id]);
    return id;
  },

  deleteAudit: async (id) => {
    return await db.query("DELETE FROM audit WHERE id = ?", [id]);
  },

  /**
   * The Audit Events
   */
  createAuditEvent: async (audit_event) => {
    const now = new Date();
    const [result] = await db.query(
      "INSERT INTO audit_event (name, created_at, start, end) VALUES (?, ?, ?, ?)",
      [
        audit_event.name,
        audit_event.created_at,
        audit_event.start,
        audit_event.end,
      ]
    );
    let event = audit_event;
    event.id = result.insertId
    return event;
  },
  getAuditEventDetail: async (id) => {
    const [rows] = await db.query(
      "SELECT name, created_at, start, end FROM audit_event WHERE id = ?",
      [id]
    );
    return rows[0];
  },
  deleteAuditEvent: async (id) => {
    return await db.query("DELETE FROM audit_event WHERE id = ?", [id]);
  },
  updateAuditEvent: async (id, audit_event) => {
    await db.query(
      "UPDATE audit_event SET name = ?, start = ?, end = ? WHERE id = ?",
      [audit_event.name, audit_event.start, audit_event.end, id]
    );
    return id;
  },
  getAllAuditEvent: async () => {
    const [rows] = await db.query(
      "SELECT id, name, created_at, start, end from audit_event"
    );
    return rows;
  },
};

module.exports = AuditRepository;
