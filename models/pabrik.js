const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Pabrik extends Model {}

Pabrik.init(
    {
        id_pabrik: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        nama_pabrik: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        kapasitas_produksi: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        sertifikasi_kualitas: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        id_provinsi: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "provinsi",
                key: "id_provinsi",
            },
            onUpdate: "CASCADE",
        },
        id_pengguna: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "pengguna",
                key: "id_pengguna",
            },
            onUpdate: "CASCADE",
        },
    },
    {
        sequelize,
        modelName: "Pabrik",
        tableName: "pabrik",
        timestamps: true,
        createdAt: "createdAt",
        updatedAt: "updatedAt",
    }
);

module.exports = Pabrik;
