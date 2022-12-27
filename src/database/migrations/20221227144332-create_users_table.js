'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        "users",
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.DataTypes.BIGINT.UNSIGNED,
          },
          uid: {
            allowNull: false,
            unique: true,
            type: Sequelize.DataTypes.STRING(32),
          },
          username: {
            allowNull: false,
            unique: true,
            type: Sequelize.DataTypes.STRING(50),
          },
          email: {
            allowNull: false,
            unique: true,
            type: Sequelize.DataTypes.STRING(100),
          },
          email_verified_at: {
            allowNull: true,
            type: Sequelize.DATE,
          },
          password: {
            allowNull: false,
            type: Sequelize.STRING(255),
          },
          remember_token: {
            allowNull: true,
            type: Sequelize.STRING(255),
          },
          created_at: {
            allowNull: false,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
            type: "TIMESTAMP",
          },
          updated_at: {
            allowNull: true,
            defaultValue: Sequelize.literal(
              "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
            ),
            type: "TIMESTAMP",
          },
          deleted_at: {
            allowNull: true,
            type: "TIMESTAMP",
          },
        },
        { transaction }
      );
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down (queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.dropTable("users", { transaction });
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
