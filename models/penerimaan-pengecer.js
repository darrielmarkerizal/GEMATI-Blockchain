const sequelize = require("../config/database");
const { Model, DataTypes } = require("sequelize");

class PenerimaanPengecer extends Model {}

PenerimaanPengecer.init(
    {
        id_penerimaan: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        id_pengecer: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "pengecer",
                key: "id_pengecer",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        id_distribusi: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "distribusi_distributor",
                key: "id_distribusi",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        tanggal_penjualan: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        jumlah_pupuk_terjual: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        data_petani_pembeli_pupuk: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        hash_transaksi: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: "PenerimaanPengecer",
        tableName: "penerimaan_pengecer",
        timestamps: true,
    }
);

module.exports = PenerimaanPengecer;
