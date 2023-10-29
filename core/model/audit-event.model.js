class AuditEvent {
    constructor(id, name, created_at, start, end) {
      this.id = id;
      this.name = name;
      this.created_at = created_at;
      this.start = start;
      this.end = end;
      this.audit = [];
    }
  
    spread(data) {
      this.id = data.id;
      this.name = data.name;
      this.created_at = data.created_at;
      this.start = data.start;
      this.end = data.end;
      this.audit = [];
    }

    addAudit(audit) {
      this.audit.push(audit);
    }

  }
  
  module.exports = AuditEvent;
  