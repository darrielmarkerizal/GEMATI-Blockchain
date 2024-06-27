const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Distributor extends Model {}

Distributor.init(
    {
        id_distributor: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        nama_distributor: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        kabupaten_kota: {
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
            allowNull: false,
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
        modelName: "distributor",
        tableName: "distributor",
        timestamps: true,
    }
);

module.exports = Distributor;
