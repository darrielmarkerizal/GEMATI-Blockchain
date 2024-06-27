const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class ProduksiPupuk extends Model {}

ProduksiPupuk.init(
    {
        id_produksi: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        id_pabrik: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "pabrik",
                key: "id_pabrik",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        tanggal_produksi: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        jumlah_pupuk_diproduksi: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        batch_number: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.literal("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.literal(
                "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
            ),
        },
    },
    {
        sequelize,
        modelName: "produksiPupuk",
        tableName: "produksi_pupuk",
        timestamps: true,
    }
);

module.exports = ProduksiPupuk;
