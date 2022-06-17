import {Router} from "express";
import { callbackController, loginController, revokeController, tweetController } from "../controller/twitter.controller.js";

const twitter = Router();

twitter.get('/login',loginController);
twitter.get('/callback',callbackController)
twitter.get('/revoke',revokeController);
twitter.post('/tweet',tweetController);

export default twitter;