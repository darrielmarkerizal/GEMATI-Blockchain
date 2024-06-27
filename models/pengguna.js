const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class Pengguna extends Model {}

Pengguna.init(
    {
        id_pengguna: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        nama_pengguna: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        peran: {
            type: DataTypes.ENUM(
                "pabrik",
                "gudang",
                "distributor",
                "pengecer",
                "petani",
                "superuser"
            ),
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        blockchain_address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "Pengguna",
        tableName: "pengguna",
        timestamps: true,
    }
);

module.exports = Pengguna;
