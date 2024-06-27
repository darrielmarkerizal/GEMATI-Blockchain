const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class Provinsi extends Model {}

Provinsi.init(
    {
        id_provinsi: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        nama_provinsi: {
            type: DataTypes.STRING,
            allowNull: false,
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
        modelName: "provinsi",
        tableName: "provinsi",
        timestamps: true,
    }
);

module.exports = Provinsi;
