//Se llama al typedef (esquema) de cada submodulo
const productTypeDefs = require('./product_type_defs');
const authTypeDefs = require('./auth_type_defs');

//Se unen
const schemasArrays = [ productTypeDefs, authTypeDefs];

//Se exportan
module.exports = schemasArrays;