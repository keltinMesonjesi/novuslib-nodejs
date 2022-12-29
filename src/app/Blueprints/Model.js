const { DataTypes } = require('../../config/database');

/**
 * Base blueprint for creating models
 * @param tableName String
 * @param modelName String
 * @param attributes Object
 * @returns {modelInstance}
 */
const baseModel = (tableName, modelName, attributes) => {
  const modelInstance = (dbConnection) => {
    dbConnection.define(
      modelName,
      {
        id: {
          primaryKey: true,
          type: DataTypes.BIGINT.UNSIGNED,
        },

        ...attributes,

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
        tableName: tableName,
      }
    );
  };

  return modelInstance;
};

module.exports = {
  DataTypes,
  baseModel,
};
