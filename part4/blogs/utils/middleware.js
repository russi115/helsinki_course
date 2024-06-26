const User = require('../models/user')
const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        request.token = authorization.replace('Bearer ', '')
    }else{
        request.token = null
    }
    next()
}//exercise 4.20

const userExtractor = async(request, response, next) => {
    const authorization = request.token
    const decodedToken = jwt.verify(authorization, process.env.SECRET)

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }

    const user = await User.findById(decodedToken.id)
    request.user = user
    
    next()
}//exercise 4.22

module.exports = {
    tokenExtractor, userExtractor
  };