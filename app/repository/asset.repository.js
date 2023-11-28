const db = require("../../core/database");

const AssetRepository = {
  /**
   * Aset
   */
  async getAllAssets() {
    const [rows] = await db.query("SELECT * FROM asset");
    return rows;
  },

  async getAssetById(id) {
    const [rows] = await db.query("SELECT * FROM asset WHERE id = ?", [id]);
    return rows;
  },

  async getAssetByPeriod(month, year){
    const [rows] = await db.query("SELECT * FROM asset WHERE month = ? AND year = ?", [month, year]);
    return rows[0];
  },

  async getAssetByYear(year){
    const [rows] = await db.query("SELECT * FROM asset WHERE year = ? ORDER BY month", [year]);
    return rows;
  },

  async createAsset(asset) {
    const [result] =  await db.query("INSERT INTO asset (year, month, total) VALUES (?, ?, ?)", [asset.year, asset.month, asset.total]);
    return result.insertId
  },

  async updateAsset(id, asset) {
    return await db.query("UPDATE asset SET ? WHERE id = ?", [asset, id]);
  },

  async deleteAsset(id) {
    return await db.query("DELETE FROM asset WHERE id = ?", [id]);
  },

  /**
   * Aset Item
   */

  async getAllAssetItems() {
    const [rows] = await db.query("SELECT * FROM asset_item");
    return rows;
  },

  async createAssetItem(id_asset, item) {
    return await db.query("INSERT INTO asset_item (id_asset, name, auc, type) VALUES (?, ?, ?, ?)", [id_asset, item.name, item.auc, item.type]);
  },

  async getAssetItemsByAssetId(assetId) {
    const [rows] = await db.query(
      "SELECT * FROM asset_item WHERE id_asset = ?",
      [assetId]
    );
    return rows;
  },
};

module.exports = AssetRepository;
