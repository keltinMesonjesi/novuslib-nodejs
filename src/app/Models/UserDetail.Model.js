const { DataTypes, baseModel } = require('../Blueprints/Model');

const TABLE_NAME = 'users_details';

const MODEL_NAME = 'UserDetail';

const ATTRIBUTES = {
  user_id: {
    type: DataTypes.BIGINT.UNSIGNED,
    references: {
      model: 'users',
      key: 'id',
    },
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
  address: {
    type: DataTypes.STRING(255),
  },
};

const loadModel = baseModel(TABLE_NAME, MODEL_NAME, ATTRIBUTES);
const loadAssociations = (models) => {
  models[MODEL_NAME].belongsTo(models.User, {
    foreignKey: 'user_id',
  });
};

module.exports = {
  loadModel,
  loadAssociations,
};
