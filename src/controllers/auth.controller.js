const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const users = require("../models/user.model");

const JWT_SECRET = process.env.JWT_SECRET || "1234";

async function register(req, res){
    const {username, password} = req.body;
    if(!username || !password){
        return res.status(400).json({ message:"Username y password son obligatorios"})
    }
    const created = await users.createUser({username, password});
    return res.status(201).json(created);
}


async function login (req,res){
    const {username , password} = req.body;
    if(!username || !password){
        return res.status(400).json({ message:"Username y password son obligatorios"})
    }
    const user = await users.findByUsername(username);
    if(!user){
        return res.status(401).json({message:"Invalid credentials"});
    }
    const match = await bcrypt.compare(password, user.password);
    if(!match){
        return res.status(401).json({message:"Invalid credentials"});
    }
    const token = jwt.sign({id:user.id, username:user.username}, JWT_SECRET, {expiresIn:"1m"});
    return res.status(200).json({token:token});
}

module.exports={
    register,
    login,
}