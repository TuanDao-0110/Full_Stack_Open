const { info } = require('../../part3/Exercise3.13-3.22/phonebook_backend/utils/logger')
const app = require('./app')
const { PORT } = require('./utils/config')


app.listen(PORT, () => {
    info(`connecting ${PORT}....`)
})