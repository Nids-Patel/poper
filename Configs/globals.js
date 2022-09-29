global.chalk = require('chalk'); // FOR COLORED CONSOLES

global.STATUS_CODES = require('./constants').STATUS_CODES;

global.STATUS_MESSAGES = require('./constants').STATUS_MESSAGES;

global.PROCESS_STATUS = require('./constants').PROCESS_STATUS;

global.PAGE_SIZE = parseInt(process.env.PAGINATION_PAGE_SIZE);

global.MESSAGE = [];
