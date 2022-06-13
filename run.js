import authClient from "./src/config/twitter.config.js";
import clientBuilder from "./src/builder/twitter.builder.js";

import express from "express";

const app = express();
const client = clientBuilder();
const STATE = "teste";

app.get("/callback", async function (req, res) {
    try {
      const { code, state } = req.query;
      console.log(req.query)
      if (state !== STATE) return res.status(500).send("State isn't matching");
      await authClient.requestAccessToken(code);
      res.redirect("/tweets");
    } catch (error) {
      console.log(error);
    }
  });
app.get("/login", async function (req, res) {
    const authUrl = authClient.generateAuthURL({
        state: STATE,
        code_challenge_method: "s256",
    });
    res.redirect(authUrl);
});

app.get("/tweets", async function (req, res) {
    try {
        const filme = await client.tweets.createTweet({
            text:"oi",
        })
        res.send(filme);
    } catch (error) {
        console.log("tweets error", error);
    }
});

app.get("/revoke", async function (req, res) {
    try {
        const response = await authClient.revokeAccessToken();
        res.send(response);
    } catch (error) {
        console.log(error);
    }
});

app.listen(3000, () => {
    console.log(`Go here to login: http://127.0.0.1:3000/login`);
});