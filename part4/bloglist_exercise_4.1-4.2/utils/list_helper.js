var _ = require('lodash')

const dummy = (...blogs) => {
    return 1
}
const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.length === 0
        ? 0
        : blogs.reduce(reducer, 0)
}
const favoriteBlog = (blogs) => {

    if (blogs.length === 0) {
        return undefined
    }
    else {
        return blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
    }
}

const mostBlogs = (blogs) => {
    const groupedBlogs = _.groupBy(blogs, 'author') // group the blogs by author
    const blogCounts = _.mapValues(groupedBlogs, blogs => blogs.length) // count the number of blogs for each author
    const authorWithMostBlogs = _.maxBy(_.keys(blogCounts), author => blogCounts[author]) // get the author with the most blogs

    return { author: authorWithMostBlogs, blogs: blogCounts[authorWithMostBlogs] } // create the result object
}
const mostLike = (blogs) => {
    const mostLikeObject = _.maxBy(blogs, 'likes')
    const { author, likes } = mostLikeObject
    return { author, likes }
}
module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLike
}