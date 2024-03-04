'use strict'

import User from './user.model.js'
import { encrypt, checkPassword } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'

export const test = (req, res)=>{
    return res.send('Hello world')
}

export const register = async(req, res)=>{
    try{
        let data = req.body
        data.password = await encrypt(data.password)
        data.role = 'ADMIN'
        let user = new User(data)
        await user.save()
        return res.send({message: "Registered successfully"})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering user', err: err})
    }
}

export const login = async (req, res) => {
    try {
        let { username, email, password } = req.body;

        let user;
        if (email) {
            console.log('Logged with email');
            user = await User.findOne({ email });
        } else {
            console.log('Logged with username');
            user = await User.findOne({ username });
        }

        if (user && await checkPassword(password, user.password)) {
            let loggedUser = {
                uid: user._id,
                username: user.username,
                email: user.email,
                name: user.name,
                role: user.role
            };

            let token = await generateJwt(loggedUser);
            return res.send({ message: `Welcome ${user.name}`, loggedUser, token });
        }

        return res.status(404).send({ message: 'Invalid credentials' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error to login' });
    }
};
