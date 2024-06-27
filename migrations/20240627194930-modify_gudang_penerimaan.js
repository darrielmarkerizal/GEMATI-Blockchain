module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn("penerimaan_gudang", "id_produksi");
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn("penerimaan_gudang", "id_produksi", {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: "produksi_pupuk",
                key: "id_produksi",
            },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        });
    },
};
