const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
      title: "First post!",
      author: "me",
      url: "localhost",
      likes: 0,
      user: ''
    },
    {
        title: "Second post!",
        author: "me",
        url: "localhost",
        likes: 2,
        user: ''
    }
  ]

const initialUsers = [
  {
    username: 'root',
    name: 'admin',
    password: 'admin'
  },
  {
    username: 'Sebastian',
    name: 'Chivox',
    password: '1234'
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  initialBlogs, initialUsers, blogsInDb, usersInDb
}