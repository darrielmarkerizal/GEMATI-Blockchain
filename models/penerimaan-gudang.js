const sequelize = require("../config/database");
const { Model, DataTypes } = require("sequelize");
const GudangUnitPengantongan = require("./Gudang");

class PenerimaanGudang extends Model {}

PenerimaanGudang.init(
    {
        id_penerimaan: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        id_gudang: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "gudang_unit_pengantongan",
                key: "id_gudang",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        },
        tanggal_penerimaan: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        jumlah_pupuk_diterima: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        hasil_pengecekan_kualitas: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        tanggal_pengemasan: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        jumlah_pupuk_dikemas: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        hash_transaksi: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW("CURRENT_TIMESTAMP"),
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW(
                "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
            ),
        },
    },
    {
        sequelize,
        modelName: "penerimaanGudang",
        tableName: "penerimaan_gudang",
        timestamps: true,
    }
);

PenerimaanGudang.belongsTo(GudangUnitPengantongan, {
    foreignKey: "id_gudang",
    as: "gudangUnitPengantongan",
});

module.exports = PenerimaanGudang;
