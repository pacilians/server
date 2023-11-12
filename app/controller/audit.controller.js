const { plainToClass } = require("class-transformer");
const { Audit, AuditEvent } = require("../../core/model");
const JsonResponse = require("../../core/response");
const { auditService } = require("../service");

const AuditController = {
  async createAudit(req, res) {
    const audit = plainToClass(Audit, req.body);
    const createdAudit = await auditService.createAudit(audit);
    const response = new JsonResponse(
      200,
      { audit: createdAudit },
      "Success creating audit"
    );

    if (!createdAudit) {
      response.message = "Failed creating audit";
      response.status = 500;
    }
    response.send(res);
  },

  async getAuditDetail(req, res){
    const id = req.params.id;
    const audit = await auditService.getAuditEventDetail(id)
    const response = new JsonResponse(200, {audit: audit}, "Audit has been received");
    response.send(res);
  },

  async createBulkAudit(req, res) {
    const data = req.body;
    const audit = await auditService.createBulk(data);

    const response = new JsonResponse(
      200,
      { audit: audit },
      "Success creating audit"
    );

    if (!audit) {
      response.message = "Failed creating audit";
      response.status = 500;
    }

    response.send(res);
  },
  
  async deleteAudit(req, res) {
    const id = req.params.id;
    await auditService.deleteAudit(id);
    const response = new JsonResponse(200, {}, "Audit has been deleted");
    response.send(res);
  },
  async updateStatusAudit(req, res) {
    const { status } = req.body;
    const id = req.params.id;
    await auditService.updateStatusAudit(id, status);
    const response = new JsonResponse(200, {}, "Audit status has been updated");
    response.send(res);
  },
  async updateFileAudit(req, res) {
    let resp = new JsonResponse(200, null, "");
    const file_data = req.file;
    const id = req.params.id;
    await auditService.updateFileAudit(id, file_data.buffer);
    resp.send(res);
  },

  /**
   * Audit Event
   */

  async createAuditEvent(req, res) {
    const audit_event = plainToClass(AuditEvent, req.body);
    audit_event.created_at = new Date();
    const createdAuditEvent = await auditService.createAuditEvent(audit_event);
    const response = new JsonResponse(
      200,
      { audit: createdAuditEvent },
      "Success creating audit event"
    );

    if (!createdAuditEvent) {
      response.message = "Failed creating audit event";
      response.status = 500;
    }
    response.send(res);
  },

  async updateAuditEvent(req, res) {
    const audit_event = plainToClass(AuditEvent, req.body);
    const id = req.params.id;
    const createdAuditEvent = await auditService.updateAuditEvent(
      id,
      audit_event
    );
    const response = new JsonResponse(
      200,
      { audit: createdAuditEvent },
      "Success creating audit event"
    );

    if (!createdAuditEvent) {
      response.message = "Failed creating audit event";
      response.status = 500;
    }
    response.send(res);
  },

  async deleteAuditEvent(req, res) {
    const id = req.params.id;
    await auditService.deleteAuditEvent(id);
    const response = new JsonResponse(200, {}, "Audit event has been deleted");
    response.send(res);
  },

  async getAuditList(req, res) {
    const audit = await auditService.getAllAudit();

    const response = new JsonResponse(
      200,
      { audit: audit },
      "Success fetch audit"
    );
    response.send(res);
  },
};

module.exports = AuditController;
