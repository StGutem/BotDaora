import authClient from "../config/twitter.config.js";
import {Client} from "twitter-api-sdk"

function clientBuilder() {
    console.log(authClient)
    return new Client(authClient);
}

export default clientBuilder;