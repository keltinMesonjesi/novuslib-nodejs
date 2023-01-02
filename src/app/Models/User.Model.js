const { DataTypes, baseModel } = require('../Blueprints/Model');

const TABLE_NAME = 'users';

const MODEL_NAME = 'User';

const ATTRIBUTES = {
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
};

const loadModel = baseModel(TABLE_NAME, MODEL_NAME, ATTRIBUTES);
const loadAssociations = (models) => {
  models[MODEL_NAME].hasOne(models.UserDetail, {
    foreignKey: 'user_id',
  });
  models[MODEL_NAME].hasOne(models.Token, {
    foreignKey: 'user_id',
  });
};

module.exports = {
  loadModel,
  loadAssociations,
};
