'use strict';

const { DataTypes } = require('../../app/Blueprints/Model');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.createTable(
        'tokens',
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
          token: {
            unique: true,
            allowNull: false,
            type: Sequelize.DataTypes.STRING(255),
          },
          type: {
            allowNull: false,
            type: DataTypes.STRING(50),
          },
          blacklisted: {
            allowNull: false,
            defaultValue: false,
            type: DataTypes.BOOLEAN,
          },
          expires: {
            allowNull: false,
            type: DataTypes.DATE,
          },
          created_at: {
            allowNull: false,
            type: Sequelize.DataTypes.DATE,
          },
          updated_at: {
            allowNull: false,
            type: Sequelize.DataTypes.DATE,
          },
        },
        { transaction }
      );
      await queryInterface.addConstraint('tokens', {
        fields: ['user_id'],
        type: 'foreign key',
        name: 'tokens_user_id_fk',
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
      await queryInterface.dropTable('tokens', { transaction });
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
