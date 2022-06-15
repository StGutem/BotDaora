import {Router} from "express";

const twitter = Router();

twitter.get('/login',()=>{});
twitter.get('/callback',()=>{})
twitter.get('/revoke',()=>{});
twitter.post('/tweet',()=>{});

export default twitter;