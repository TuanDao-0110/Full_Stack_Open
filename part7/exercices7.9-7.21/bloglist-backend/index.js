const { info } = require("./utils/logger");
const app = require("./app");
const { PORT } = require("./utils/config");

app.listen(PORT, () => {
  info(`connecting ${PORT}....`);
});
