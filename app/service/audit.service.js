const { auditRepository } = require("../repository");
const { Audit, AuditEvent } = require("../../core/model");
const moment = require('moment');

const AuditService = {
  async getAllAudit() {
    const event = await auditRepository.getAllAuditEvent();

    let audit = [];

    for (let i = 0; i < event.length; i++) {
      let current = event[i];
      let OEventAudit = new AuditEvent();
      OEventAudit.spread(current);
      OEventAudit.start = moment(OEventAudit.start).format('DD-MM-YYYY');
      OEventAudit.end = moment(OEventAudit.end).format('DD-MM-YYYY');
      OEventAudit.created_at = moment(OEventAudit.created_at).format('DD-MM-YYYY');

      const item = await auditRepository.getDetailAuditByEventId(current.id);

      for (let j = 0; j < item.length; j++) {
        const OAudit = new Audit();
        OAudit.spread(item[j]);
        OAudit.file_exist = true;

        if (OAudit.file === null) OAudit.file_exist = false;

        OAudit.file = null;
        OEventAudit.addAudit(OAudit);
      }
      audit.push(OEventAudit);
    }

    return audit;
  },

  async createBulk(data) {
    const { name, start, end, audit } = data;

    const event = await this.createAuditEvent({
      name: name,
      start: start,
      end: end,
    });

    for (let i = 0; i < audit.length; i++) {
      let newAudit = audit[i];
      newAudit.id_audit_event = event.id;
      await this.createAudit(newAudit);
    }

    return data;
  },

  /**
   * Audit Item
   */
  async createAudit(audit) {
    return await auditRepository.createAudit(audit);
  },

  async updateFileAudit(id, file) {
    return await auditRepository.updateAuditFile(id, file);
  },

  async updateStatusAudit(id, status) {
    return await auditRepository.updateStatusAudit(id, status);
  },

  async deleteAudit(id) {
    return await auditRepository.deleteAudit(id);
  },
  

  /**
   * Audit Event
   */

  async createAuditEvent(audit_event) {
    return await auditRepository.createAuditEvent(audit_event);
  },

  async getAuditEventDetail(id) {
    const data = await auditRepository.getAuditEventDetail(id);
    const audit = new AuditEvent();
    audit.spread(data)
    audit.start =  moment(audit.start).format('DD-MM-YYYY');
    audit.end =  moment(audit.end).format('DD-MM-YYYY');
    audit.created_at =  moment(audit.created_at).format('DD-MM-YYYY');

    const item = await auditRepository.getDetailAuditByEventId(id);

    for (let j = 0; j < item.length; j++) {
      const OAudit = new Audit();
      OAudit.spread(item[j]);
      OAudit.file_exist = true;
      OAudit.created_at = moment(OAudit.created_at).format('DD-MM-YYYY');

      if (OAudit.file === null) OAudit.file_exist = false;

      OAudit.file = null;
      audit.addAudit(OAudit);
    }
    return audit
  },

  async updateAuditEvent(id, audit_event) {
    let currentAuditEvent = this.getAuditEventDetail(id);

    if (audit_event.name) {
      currentAuditEvent.name = audit_event.name;
    }

    if (audit_event.start) {
      currentAuditEvent.start = audit_event.start;
    }

    if (audit_event.end) {
      currentAuditEvent.end = audit_event.end;
    }
    return await auditRepository.updateAuditEvent(id, audit_event);
  },

  async deleteAuditEvent(id) {
    return await auditRepository.deleteAuditEvent(id);
  },
  async getAllAuditEvent() {
    const audit_events = await auditRepository.getAllAuditEvent();
  },
};

module.exports = AuditService;
