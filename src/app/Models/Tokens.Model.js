const { DataTypes, baseModel } = require('../Blueprints/Model');

const TABLE_NAME = 'tokens';

const MODEL_NAME = 'Token';

const ATTRIBUTES = {
  user_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  token: {
    type: DataTypes.STRING(255),
  },
  type: {
    type: DataTypes.STRING(50),
  },
  blacklisted: {
    type: DataTypes.BOOLEAN,
  },
  expires: {
    type: DataTypes.DATE,
  },
};

const loadModel = baseModel(TABLE_NAME, MODEL_NAME, ATTRIBUTES, false);
const loadAssociations = (models) => {
  models[MODEL_NAME].belongsTo(models.User, {
    foreignKey: 'user_id',
  });
};

module.exports = {
  loadModel,
  loadAssociations,
};
