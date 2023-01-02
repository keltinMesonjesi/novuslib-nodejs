const router = require('express').Router();

const { swaggerUi, loadSwaggerDocument } = require('../../../config/swagger');

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(loadSwaggerDocument()));

module.exports = router;
