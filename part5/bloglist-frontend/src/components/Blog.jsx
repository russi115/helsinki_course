const Blog = ({ blog }) => (
  <div>
    {blog.title} {blog.author} <Button text={'delete'} />
  </div>  
)

function Button({text, handle}) {
  return (
    <button onClick={handle} type="submit">
      {text}
    </button>
  );
}

export default Blog