import { auth } from "twitter-api-sdk";

const authClient = new auth.OAuth2User({
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    callback: "http://localhost:3000/twitter/callback",
    scopes: ["tweet.read", "tweet.write", "users.read", "offline.access"],
  });

export default authClient;