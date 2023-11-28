const { plainToClass } = require("class-transformer");
const JsonResponse = require("../../core/response");
const { assetService } = require("../service");

const AuditController = {
  async createAsset(req, res) {
    const asset = req.body.asset;
    const item = req.body.item;
    const createAsset = await assetService.createAsset(asset, item)
    const response = new JsonResponse(
      200,
      {},
      "Success creating asset"
    );
    response.send(res);
  },

  async getAssetOnPeriod(req, res) {
    const month = req.params.month
    const year = req.params.year
    const asset = await assetService.fetchAssetOnPeriod(month, year)
    const response = new JsonResponse(
      200,
      { result: asset },
      "Asset has been received"
    );
    response.send(res);
  },

  async getAnnualAUC(req, res) {
    const year = req.params.year
    const asset = await assetService.fetchAnnualAUC(year)

    const response = new JsonResponse(
      200,
      { result: asset },
      ""
    );
    
    response.send(res);
  },
};

module.exports = AuditController;
