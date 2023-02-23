const app = require('./app')
const { PORT } = require('./utils/config')
const { info } = require('./utils/logger')
app.listen(PORT, () => {
  // console.log(`listening at  port ${PORT}....`)
  info(`listening at  port ${PORT}....`)
})
