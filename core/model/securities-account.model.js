class SecuritiesAccount {
    constructor(
        id,
        id_customer,
        kode_bk,
        no_rekening_investor,
        nama_perusahaan,
        nama_awal,
        nama_tengah,
        nama_belakang,
        ktp,
        npwp,
        no_paspor,
        no_pendaftaran_usaha,
        tanggal_pendirian,
        tempat_pendirian,
        tipe_investor,
        jenis_kelamin,
        jenis_pekerjaan,
        alamat_identitas_1,
        alamat_identitas_2,
        kode_kota,
        kode_provinsi,
        kode_negara,
        no_telepon,
        no_hp,
        email
    ) {
        this.id = id;
        this.id_customer = id_customer;
        this.kode_bk = kode_bk;
        this.no_rekening_investor = no_rekening_investor;
        this.nama_perusahaan = nama_perusahaan;
        this.nama_awal = nama_awal;
        this.nama_tengah = nama_tengah;
        this.nama_belakang = nama_belakang;
        this.ktp = ktp;
        this.npwp = npwp;
        this.no_paspor = no_paspor;
        this.no_pendaftaran_usaha = no_pendaftaran_usaha;
        this.tanggal_pendirian = tanggal_pendirian;
        this.tempat_pendirian = tempat_pendirian;
        this.tipe_investor = tipe_investor;
        this.jenis_kelamin = jenis_kelamin;
        this.jenis_pekerjaan = jenis_pekerjaan;
        this.alamat_identitas_1 = alamat_identitas_1;
        this.alamat_identitas_2 = alamat_identitas_2;
        this.kode_kota = kode_kota;
        this.kode_provinsi = kode_provinsi;
        this.kode_negara = kode_negara;
        this.no_telepon = no_telepon;
        this.no_hp = no_hp;
        this.email = email;
        this.created_at = null
        this.updated_at = null
    }

    spread(data) {
        this.id = data.id;
        this.id_customer = data.id_customer;
        this.kode_bk = data.kode_bk;
        this.no_rekening_investor = data.no_rekening_investor;
        this.nama_perusahaan = data.nama_perusahaan;
        this.nama_awal = data.nama_awal;
        this.nama_tengah = data.nama_tengah;
        this.nama_belakang = data.nama_belakang;
        this.ktp = data.ktp;
        this.npwp = data.npwp;
        this.no_paspor = data.no_paspor;
        this.no_pendaftaran_usaha = data.no_pendaftaran_usaha;
        this.tanggal_pendirian = data.tanggal_pendirian;
        this.tempat_pendirian = data.tempat_pendirian;
        this.tipe_investor = data.tipe_investor;
        this.jenis_kelamin = data.jenis_kelamin;
        this.jenis_pekerjaan = data.jenis_pekerjaan;
        this.alamat_identitas_1 = data.alamat_identitas_1;
        this.alamat_identitas_2 = data.alamat_identitas_2;
        this.kode_kota = data.kode_kota;
        this.kode_provinsi = data.kode_provinsi;
        this.kode_negara = data.kode_negara;
        this.no_telepon = data.no_telepon;
        this.no_hp = data.no_hp;
        this.email = data.email;
        this.created_at = data.created_at || null
        this.updated_at = data.updated_at || null
    }

    addAudit(audit) {
        this.audit.push(audit);
    }
}

module.exports = SecuritiesAccount;
