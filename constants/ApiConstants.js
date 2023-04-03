import { SIZES } from "./theme";

const config = require("../package.json").projectConfig;
const BACKEND_BASE_URL = config.backendApiBaseUrl;

const COUNTRY_FLAG = {
    BASE_URL: 'https:www.countryflags.io',
    SIZES: {16: '16', 24: '24', 32: '32', 48: '48', 64: '64'},
    STYLE: {FLAT: 'flat', SHINY: 'shiny'}
};

const BACKEND_API  = {
    BASE_API_URL: `${BACKEND_BASE_URL}/api`,
    REGISTER: '/register',
    LOGIN: '/login',
}
export default {COUNTRY_FLAG, BACKEND_API};