import authClient from "./src/config/twitter.config.js";
import clientBuilder from "./src/builder/twitter.builder.js";

const client = clientBuilder();

const loginController = async (req, res)=>{
    const authUrl = authClient.generateAuthURL({
        state: process.env.STATE,
        code_challenge_method: "s256",
    }); 
    res.redirect(authUrl);
}

const callbackController = async (req,res)=>{
    try {
        const { code, state } = req.query;
        console.log(req.query)
        if (state !== process.env.STATE) return res.status(500).send("<h1>Segredo não é igual!</h1>");
        await authClient.requestAccessToken(code);
        res.status(200).send("Bem vindo ao Twitter Auto Post");
    } catch (error) {
        console.log(error);
    }
}

const revokeController = async (req,res) =>{
    try {
        const response = await authClient.revokeAccessToken();
        res.send(response);
    } catch (error) {
        console.log(error);
    }
}

const tweetController = async (req,res) =>{
    try {
        const filme = await client.tweets.createTweet({
            text:"oi",
        })
        res.send(filme);
    } catch (error) {
        console.log("tweets error", error);
    }
}
export {loginController, callbackController,revokeController,tweetController}