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
  for ({title, author, url, likes, user} of helper.initialBlogs) {
    const users = await helper.usersInDb()
    const blogObject = new Blog({
      title: title,
      author: author,
      url: url,
      likes: likes,
      user: users[0].id
    })
    await blogObject.save()
  }

  const result = await api
    .post('/api/login')
    .send({username: 'root', password: 'admin'})
    .expect(200)
  
  header = { 'Authorization': `Bearer ${result.body.token}`}
})

describe("API blog", ()=>{

  describe("Exercises 4.8 - 4.12", async () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })//exercise 4.8
    test('Blogs must have id', async () => {
      const response = await api.get('/api/blogs')
  
      assert(response.body[0].id)  
      assert(!response.body[0]._id)  
    })//exercise 4.9
    test('a valid blog can be added ', async () => {
      const newBlog = {
        title: "new post!",
        author: "me",
        url: "localhost",
        likes: 4,
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
      
      const titles = blogsAtEnd.map(r => r.title)  
      assert(titles.includes('new post!'))
    })//exercise 4.10
    test('a valid blog without likes can be added', async () => {
      const newBlog = {
        title: "new post without likes!",
        author: "me",
        url: "localhost",
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
      
      assert(blogsAtEnd.find(blog => blog.title === 'new post without likes!').likes === 0);
    })//exercise 4.11
    test('blog without content or url is not added', async () => {
      const newBlog = {
        author: "me"
    }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .set(header)
    
      const blogsAtEnd = await helper.blogsInDb()
  
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })//exercise 4.12
  })

  describe("Exercises 4.13 and 1.14", async () =>{
    test('a blog can be deleted', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]
  
      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set(header)
        .expect(204)
    
      const blogsAtEnd = await helper.blogsInDb()
    
      const contents = blogsAtEnd.map(r => r.title)
      assert(!contents.includes(blogToDelete.title))
    
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
    })//exercise 4.13
    test('a blog can be updated', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
  
      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send({
          title: "First post updated!",
          author: "me+",
          url: "localhost",
          likes: 1,
        })
        .expect(200)
    
      const blogsAtEnd = await helper.blogsInDb()
    
      const contents = blogsAtEnd.map(r => r.title)
      assert(contents.includes("First post updated!"))
    
    })//exercise 4.14
  })
  
  describe("Aditional example tests", async () => {
    test('all blogs are returned', async () => {
      const response = await api.get('/api/blogs')
    
      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })
    test('the first blog was posted by me', async () => {
      const response = await api.get('/api/blogs')
    
      const authors = response.body.map(e => e.author)
      assert(authors.includes('me'))
    })
    test('a specific blog can be viewed', async () => {
      const blogsAtStart = await helper.blogsInDb()
    
      const blogToView = blogsAtStart[0]
      blogToView.user = blogToView.user.toString()
    
      const blogResult = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    
      assert.deepStrictEqual(blogResult.body, blogToView)
    })
  })

})

after(async () => {
  await mongoose.connection.close()
})