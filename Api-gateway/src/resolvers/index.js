const productResolver = require('./product_resolver');
const authResolver = require('./auth_resolver');

const lodash = require('lodash');

const resolvers = lodash.merge(productResolver, authResolver);

module.exports = resolvers;