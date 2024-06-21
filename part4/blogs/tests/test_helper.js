const Blog = require('../models/blog')

const initialBlogs = [
    {
      title: "First post!",
      author: "me",
      url: "localhost",
      likes: 0,
    },
    {
        title: "Second post!",
        author: "me",
        url: "localhost",
        likes: 2,
    }
  ]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}