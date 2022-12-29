'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        'users_details',
        {
          id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.DataTypes.BIGINT.UNSIGNED,
          },
          user_id: {
            allowNull: false,
            type: Sequelize.DataTypes.BIGINT.UNSIGNED,
          },
          firstname: {
            allowNull: false,
            type: Sequelize.DataTypes.STRING(50),
          },
          lastname: {
            allowNull: false,
            type: Sequelize.DataTypes.STRING(50),
          },
          phone_number: {
            allowNull: false,
            type: Sequelize.DataTypes.STRING(40),
          },
          address: {
            allowNull: false,
            type: Sequelize.DataTypes.STRING(255),
          },
          created_at: {
            allowNull: false,
            type: Sequelize.DataTypes.DATE,
          },
          updated_at: {
            allowNull: false,
            type: Sequelize.DataTypes.DATE,
          },
          deleted_at: {
            allowNull: true,
            type: Sequelize.DataTypes.DATE,
          },
        },
        { transaction }
      );
      await queryInterface.addConstraint('users_details', {
        fields: ['user_id'],
        type: 'foreign key',
        name: 'users_details_user_id_fk',
        references: {
          table: 'users',
          field: 'id',
        },
        onDelete: 'cascade',
        transaction,
      });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },

  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.dropTable('users_details', { transaction });
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
