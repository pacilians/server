const db = require("../../core/database");

module.exports = {
  createSecuritiesAccount: async (securitiesAccount) => {
    const now = new Date()
    console.log(securitiesAccount)
    const [result] = await db.query(
      "INSERT INTO securities_account (id_customer, kode_bk, no_rekening_investor, nama_perusahaan, nama_awal, nama_tengah, nama_belakang, ktp, npwp, no_paspor, no_pendaftaran_usaha, tanggal_pendirian, tempat_pendirian, tipe_investor, jenis_kelamin, jenis_pekerjaan, alamat_identitas_1, alamat_identitas_2, kode_kota, kode_provinsi, kode_negara, no_telepon, no_hp, email, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        securitiesAccount.id_customer,
        securitiesAccount.kode_bk,
        securitiesAccount.no_rekening_investor,
        securitiesAccount.nama_perusahaan,
        securitiesAccount.nama_awal,
        securitiesAccount.nama_tengah,
        securitiesAccount.nama_belakang,
        securitiesAccount.ktp,
        securitiesAccount.npwp,
        securitiesAccount.no_paspor,
        securitiesAccount.no_pendaftaran_usaha,
        securitiesAccount.tanggal_pendirian,
        securitiesAccount.tempat_pendirian,
        securitiesAccount.tipe_investor,
        securitiesAccount.jenis_kelamin,
        securitiesAccount.jenis_pekerjaan,
        securitiesAccount.alamat_identitas_1,
        securitiesAccount.alamat_identitas_2,
        securitiesAccount.kode_kota,
        securitiesAccount.kode_provinsi,
        securitiesAccount.kode_negara,
        securitiesAccount.no_telepon,
        securitiesAccount.no_hp,
        securitiesAccount.email,
        now
      ]
    );

    return result.insertId;
  },

  getSecuritiesAccountById: async (id) => {
    const [rows] = await db.query(
      "SELECT * FROM securities_account WHERE id = ?",
      [id]
    );
    if (rows.length) {
      return rows[0];
    }
    return null;
  },

  getAllSecuritiesAccounts: async () => {
    const [rows] = await db.query("SELECT * FROM securities_account");
    return rows;
  },

  updateSecuritiesAccount: async (securitiesAccount) => {
    const { id, ...rest } = securitiesAccount;
    const keys = Object.keys(rest);
    const values = keys.map((key) => rest[key]);

    const updateFields = keys.map((key) => `${key} = ?`).join(", ");
    values.push(id);

    const [result] = await db.query(
      `UPDATE securities_account SET ${updateFields} WHERE id = ?`,
      values
    );

    return result.affectedRows > 0;
  },

  deleteSecuritiesAccount: async (id) => {
    const [result] =
      (await db.query("DELETE FROM securities_account WHERE id = ?", [id])) ||
      [];
    return result;
  },
};
