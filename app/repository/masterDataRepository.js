const pool = require("../../core/database");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs')
const CryptoJS = require('crypto-js');

const MasterDataRepository = {

    /**
     * Mandatory File
     */
    getAllMandatory: async () => {
        const [rows] = await pool.query('SELECT * FROM category_mandatory');
        return rows;
    },
    createMandatory: async (name) => {
        const [result] = await pool.query('INSERT INTO category_mandatory (name) VALUES (?)', [name]);
        return result.insertId;
    },
    deleteMandatory: async()=>{
        await db.query('DELETE FROM category_mandatory WHERE id = ?', [id]);
    },



    /**
     * Service Category
     */
    getAllService: async () => {
        const [rows] = await pool.query('SELECT * FROM category_service');
        return rows;
    },
    createService: async () => {
        const [result] = await pool.query('INSERT INTO category_service (name) VALUES (?)', [name]);
        return result.insertId;
    },
    deleteService: async()=>{
        await db.query('DELETE FROM category_mandatory WHERE id = ?', [id]);
    },


    /**
     * Business Category
     */
    getAllBusiness: async () => {
        const [rows] = await pool.query('SELECT * FROM category_business');
        return rows;
    },
    createBusiness: async (name) => {
        const [result] = await pool.query('INSERT INTO category_business (name) VALUES (?)', [name]);
        return result.insertId;
    },
    deleteBusiness: async(id)=>{
        await pool.query('DELETE FROM category_business WHERE id = ?', [id]);
    }

};

module.exports = MasterDataRepository;
