'use strict';
const { DataTypes, dbConnection } = require('../../config/database');

const UserDetail = dbConnection.define(
  'userDetail',
  {
    id: {
      primaryKey: true,
      type: DataTypes.BIGINT.UNSIGNED,
    },
    user_id: {
      type: DataTypes.BIGINT.UNSIGNED,
    },
    firstname: {
      type: DataTypes.STRING(50),
    },
    lastname: {
      type: DataTypes.STRING(50),
    },
    phone_number: {
      type: DataTypes.STRING(40),
    },
    created_at: {
      type: DataTypes.DATE,
    },
    updated_at: {
      type: DataTypes.DATE,
    },
    deleted_at: {
      type: DataTypes.DATE,
    },
  },
  {
    paranoid: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    tableName: 'users_details',
  }
);

module.exports = UserDetail;
