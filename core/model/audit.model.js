class Audit {
  constructor(id, id_audit_event, name, created_at, updated_at, status, file) {
    this.id = id;
    this.name = name;
    this.id_audit_event = id_audit_event;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.status = status;
    this.file = file;
  }

  spread(data) {
    this.id = data.id;
    this.name = data.name;
    this.created_at = data.created_at;
    this.updated_at = data.updated_at;
    this.status = data.status;
    this.file = data.file;
  }
}

module.exports = Audit;
