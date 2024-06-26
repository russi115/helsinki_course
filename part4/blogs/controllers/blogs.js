const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middlewares = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
    .find({}).populate('user', {username: 1, name: 1})
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post('/',middlewares.userExtractor, async (request, response) => {
    
    const body = request.body
    const user = request.user

    const blog = new Blog({
      title: body.title,
      url: body.url,
      author: body.author,
      user: user
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body

  const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(result)
})

blogsRouter.delete('/:id', middlewares.userExtractor, async (request, response) => {

    const user = request.user
    const blogToDelete = await Blog.findById(request.params.id)

    if(blogToDelete == null){
      return response.status(401).json({ error: "Blog don't found." })
    }
    if(blogToDelete.user.toString() !== user.id.toString()){
      return response.status(401).json({ error: 'You are not the owner of the blog.' })
    }

    await Blog.findByIdAndDelete(request.params.id)
    user.blogs = user.blogs.filter(blog => blog!=request.params.id )
    await user.save()
    return response.status(204).end()
    //exercise 4.21
})

module.exports = blogsRouter