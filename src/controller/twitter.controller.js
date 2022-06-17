import authClient from "../config/twitter.config.js";
import clientBuilder from "../builder/twitter.builder.js";

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
        if (state !== process.env.STATE) return res.status(500).send("<h1>Segredo não é igual!</h1>");
        await authClient.requestAccessToken(code);
        res.status(200).send("Bem vindo ao Twitter Auto Post");
        console.log(authClient)
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
    const {tweet} = req.body;
    
    try {
        const filme = await client.tweets.createTweet({
            text: tweet,
        })
        res.send(filme);
    } catch (error) {
        console.log("Erro no Tweet. Razão:\n", error);
    }
}

export {loginController, callbackController,revokeController,tweetController}