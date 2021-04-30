const { config } = require('dotenv');

const { parsed } = config();

module.exports = {
    PORT,
    MODE,
    BASE_URL,
    IN_PROD = MODE !== 'prod',
    DB,
    SECRET
} = parsed