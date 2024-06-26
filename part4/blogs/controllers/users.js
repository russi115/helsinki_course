const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
    .find({}).populate('blogs', {title: 1, url: 1, likes: 1, author: 1})
    
    response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
  if (user) {
    response.json(user)
  } else {
    response.status(404).end()
  }
})

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if(password == ''){
      return response.status(400).json({error: 'Password is required'})
    } else if(password.length < 3){
      return response.status(400).json({error: 'Password should have more than 3 characters'})
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash,
    }) 
    const savedUser = await user.save()
    response.status(201).json(savedUser)
  })//exercise 4.15

usersRouter.put('/:id', async (request, response) => {
  const {name, username, password} = request.body

  if(password.length < 3){
    return response.status(400).json({error: 'Password should have more than 3 characters'})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    name,
    username,
    passwordHash
  })

  const result = await User.findByIdAndUpdate(request.params.id, user, { new: true })
  response.status(200).json(result)
})

usersRouter.delete('/:id', async (request, response) => {
    await User.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

module.exports = usersRouter