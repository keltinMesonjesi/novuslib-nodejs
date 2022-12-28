const requestTypes = {
  get: 'get',
  post: 'post',
  put: 'put',
  patch: 'patch',
};

const requestKeys = {
  body: 'body',
  params: 'params',
  query: 'query',
};

const requestTypeToKey = {
  get: 'query',
  post: 'body',
  put: 'params',
  patch: 'params',
};

module.exports = {
  requestTypes,
  requestKeys,
  requestTypeToKey,
};
