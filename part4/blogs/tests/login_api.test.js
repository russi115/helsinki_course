const { test, after, beforeEach, describe } = require('node:test')
const assert = require("node:assert");
const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  for (let user of helper.initialUsers) {
    const passwordHash = await bcrypt.hash(user.password, 10)
    let userObject = new User({username: user.username, passwordHash})
    await userObject.save()
  }
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }

  const result = await api
    .post('/api/login')
    .send({username: 'root', password: 'admin'})
    .expect(200)
  
  header = { 'Authorization': `Bearer ${result.body.token}`}
})


describe("API blog", ()=>{

  describe("Exercise 4.23", async () => {    
  test('A valid blog can be added ', async () => {
    const newBlog = {
      title:"Canonical string reduction",
      author:"Edsger W. Dijkstra",
      url:"http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes:12
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .set(header)
      .expect('Content-Type', /application\/json/)

    // const response = await api.get('/api/blogs')
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    
    assert(blogsAtEnd.find(blog => blog.title === 'Canonical string reduction'));
  
  })

  })

})

after(async () => {
  await mongoose.connection.close()
})