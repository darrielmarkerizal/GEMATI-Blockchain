const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Adjust the path as necessary

class Gudang extends Model {}

Gudang.init(
    {
        id_gudang: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        nama_gudang: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        kapasitas_gudang: {
            type: DataTypes.DECIMAL(10, 2),
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
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        modelName: "gudang",
        tableName: "gudang_unit_pengantongan",
        timestamps: true,
    }
);

module.exports = Gudang;
