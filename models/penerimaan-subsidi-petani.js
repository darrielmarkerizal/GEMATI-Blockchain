const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Petani = require("./Petani");
const PenerimaanPengecer = require("./penerimaan-pengecer");

class PenerimaanSubsidiPetani extends Model {}

PenerimaanSubsidiPetani.init(
    {
        id_subsidi: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        id_penerimaan_pengecer: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "penerimaan_pengecer",
                key: "id_penerimaan",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        id_petani: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "petani",
                key: "id_petani",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        timestamp: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW("CURRENT_TIMESTAMP"),
        },
        hash_transaksi: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: "PenerimaanSubsidiPetani",
        tableName: "penerimaan_subsidi_petani",
        timestamps: false,
    }
);

PenerimaanSubsidiPetani.belongsTo(Petani, {
    foreignKey: "id_petani",
});

PenerimaanSubsidiPetani.belongsTo(PenerimaanPengecer, {
    foreignKey: "id_penerimaan_pengecer",
});

module.exports = PenerimaanSubsidiPetani;
