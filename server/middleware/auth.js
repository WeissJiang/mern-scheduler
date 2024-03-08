// const passport = require('passport');
// const auth = passport.authenticate('jwt', { session: false });

const jwt = require('jsonwebtoken');
const { ROLE } = require('../constants');

const verifyJWT = (req, res, next) => {
    const authorization = req.headers.authorization;
    if(!authorization){
        return res.status(401).send({
            message: "Invalid authorization"
        })
    };
  
    const token = authorization?.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) {
            return res.status(403).send({
                message: "Forbiden access"
            })
        }
  
        req.decoded = decoded;
        next();
    });
}

const verifyAdmin = async (req, res, next) => {
    const email = req.decoded.email;
    const query = {
      email
    };
    const user = await usersCollection.findOne(query)
    if(user.role === ROLE.ADMIN){
      next();
    }else{
      return res.status(401).send({
        message: "Unauthorized access"
      })
    }
}

const verifyManager = async (req, res, next) => {
    const email = req.decoded.email;
    const query = {
      email
    };
    const user = await usersCollection.findOne(query)
    if(user.role === ROLE.MANAGER){
      next();
    }else{
      return res.status(401).send({
        message: "Unauthorized access"
      })
    }
}

const auth = { verifyJWT, verifyAdmin, verifyManager };
module.exports = auth;