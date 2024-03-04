'use strict'

import jwt from 'jsonwebtoken'
import User from '../user/user.model.js'

export const validateJwt = async(req, res, next)=>{
    try {
        let secretKey = process.env.SECRET_KEY
        let { token } = req.headers
        if(!token) return res.status(401).send({message: 'Unauthorized'})
        let { uid } = jwt.verify(token, secretKey)
        let user = await User.findOne({_id: uid})
        if(!user) return res.status(404).send({message:'User not found - Unauthorized'})
        req.uid = uid
        req.user = user
        next()
    } catch (err) {
        console.error(err)
        return res.status(401).send({message:'Invalid token or expired'})        
    }
}