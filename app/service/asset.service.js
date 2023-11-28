const { assetRepository } = require("../repository");

const AssetService = {
  async createAsset(asset, item) {
    console.log(asset);
    console.log(item);

    const id_asset = await assetRepository.createAsset(asset)
    item.forEach(async(ctx)=>{
      await assetRepository.createAssetItem(id_asset, ctx)
    })
    return id_asset
  },
  async fetchAssetOnPeriod(month, year) {
    let asset = await assetRepository.getAssetByPeriod(month, year)
    const item = await assetRepository.getAssetItemsByAssetId(asset.id)
    asset.item = item
    return asset;
  },
  async fetchAnnualAUC(year) {
    let asset = await assetRepository.getAssetByYear(year)
    return asset
  },
};

module.exports = AssetService;






