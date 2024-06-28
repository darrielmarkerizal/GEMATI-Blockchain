const sequelize = require("../config/database");
const { Model, DataTypes } = require("sequelize");

class DistribusiDistributor extends Model {}

DistribusiDistributor.init(
    {
        id_distribusi: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        id_distributor: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "distributor",
                key: "id_distributor",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        id_penerimaan: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "penerimaan_gudang",
                key: "id_penerimaan",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        tanggal_distribusi: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        jumlah_pupuk_didistribusikan: {
            type: DataTypes.INTEGER,
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
        hash_transaksi: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "distribusi_distributor",
        timestamps: true,
    }
);

module.exports = DistribusiDistributor;
