const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Petani extends Model {}

Petani.init(
    {
        id_petani: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        nama_petani: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        kabupaten_kota: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        kecamatan: {
            type: DataTypes.STRING,
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
            allowNull: true,
            references: {
                model: "pengguna",
                key: "id_pengguna",
            },
            onUpdate: "CASCADE",
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
        modelName: "Petani",
        tableName: "petani",
        timestamps: true,
    }
);

module.exports = Petani;
