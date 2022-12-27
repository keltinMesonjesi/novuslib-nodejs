'use strict';
const { DataTypes, dbConnection } = require('../../config/database');

const User = dbConnection.define("user", {
    id: {
      primaryKey: true,
      type: DataTypes.BIGINT.UNSIGNED,
    },
    uid: {
      type: DataTypes.STRING(32),
    },
    username: {
      type: DataTypes.STRING(50),
    },
    email: {
      type: DataTypes.STRING(100),
    },
    email_verified_at: {
      type: DataTypes.DATE,
    },
    password: {
      type: DataTypes.STRING(255),
    },
    remember_token: {
      type: DataTypes.STRING(255),
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
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    tableName: "users",
  });

module.exports = User;
