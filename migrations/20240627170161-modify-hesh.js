"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await Promise.all([
            queryInterface.addColumn(
                "distribusi_distributor",
                "hash_transaksi",
                {
                    type: Sequelize.STRING,
                    allowNull: false,
                }
            ),
            queryInterface.addColumn("penerimaan_gudang", "hash_transaksi", {
                type: Sequelize.STRING,
                allowNull: false,
            }),
            queryInterface.addColumn("penerimaan_pengecer", "hash_transaksi", {
                type: Sequelize.STRING,
                allowNull: false,
            }),
            queryInterface.addColumn(
                "penerimaan_subsidi_petani",
                "hash_transaksi",
                {
                    type: Sequelize.STRING,
                    allowNull: false,
                }
            ),
        ]);
    },
    down: async (queryInterface, Sequelize) => {
        await Promise.all([
            queryInterface.removeColumn(
                "distribusi_distributor",
                "hash_transaksi"
            ),
            queryInterface.removeColumn("penerimaan_gudang", "hash_transaksi"),
            queryInterface.removeColumn(
                "penerimaan_pengecer",
                "hash_transaksi"
            ),
            queryInterface.removeColumn(
                "penerimaan_subsidi_petani",
                "hash_transaksi"
            ),
        ]);
    },
};
