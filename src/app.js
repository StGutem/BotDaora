import app from "./config/express.config.js";
import twitter from "./route/twitter.route.js";

app.use("/twitter",twitter);

export default app;