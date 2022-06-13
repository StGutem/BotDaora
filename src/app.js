import app from "./config/express.config.js";

app.use("/twitter",()=>{res.send("ok");});

export default app;