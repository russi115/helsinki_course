const _ = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length == 0) {
    return 0;
  } else {
    let cont = 0;
    blogs.forEach((element) => {
      cont += element.likes;
    });
    return cont;
  }
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }

  let favorite = blogs[0];

  for (let i = 1; i < blogs.length; i++) {
    if (blogs[i].likes > favorite.likes) {
      favorite = blogs[i];
    }
  }

  return {
    title: favorite.title,
    author: favorite.author,
    likes: favorite.likes,
  };
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }

  const blogCounts = _.countBy(blogs, "author");
  const maxBlogsAuthor = _.maxBy(
    _.keys(blogCounts),
    (author) => blogCounts[author]
  );

  return {
    author: maxBlogsAuthor,
    blogs: blogCounts[maxBlogsAuthor],
  };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }

  const likesByAuthor = _.groupBy(blogs, 'author');
  const likesSumByAuthor = _.mapValues(likesByAuthor, authorBlogs => _.sumBy(authorBlogs, 'likes'));
  const maxLikesAuthor = _.maxBy(_.keys(likesSumByAuthor), author => likesSumByAuthor[author]);

  return {
    author: maxLikesAuthor,
    likes: likesSumByAuthor[maxLikesAuthor]
  };
};


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};
