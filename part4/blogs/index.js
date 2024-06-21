const config = require('./utils/config')
const logger = require('./utils/logger')
const app = require('./app')

app.listen(config.PORT, ()=> {
    logger.info(`server is running on port ${config.PORT}`);
})