export const dummy = (blogs) => {
    return 1
}

export const totalLikes = (blogsArr) => {

    if (blogsArr.length === 0) {
        return 0
    } else if (blogsArr.legth === 1) {
        return blogsArr[0].likes
    } else {
        let totalComments = []
        blogsArr.forEach(element => {
            totalComments.push(element.likes)
        });
        return totalComments.reduce((a, b) => a + b)

    }
}


export const favoriteBlog = (blogsArr) => {

    const arr = [{ likes: 0 }]

    blogsArr.forEach(blog => {
        if (blog.likes > arr[arr.length - 1].likes) {
            arr.push(blog)
        }
    })
    const { title, author, likes } = arr[arr.length - 1]
    return { title, author, likes }

}

export const mostBlogs = (blogsArr) => {

    const authorsArr = []

    blogsArr.forEach(blog => {
        if (authorsArr.filter(author => author.author === blog.author).length === 0) {
            authorsArr.push({ author: blog.author, blogs: 1 })
        } else {
            authorsArr.forEach(author => {
                if (author.author === blog.author) {
                    author.blogs += 1
                }
            })
        }
    })

    const arr = [{ blogs: 0 }]

    authorsArr.forEach(author => {
        if (author.blogs > arr[arr.length - 1].blogs) {
            arr.push(author)
        }
    })
    const { author, blogs } = arr[arr.length - 1]
    return { author, blogs }

}
export const mostLikes = (blogsArr) => {

    const authorsArr = []

    blogsArr.forEach(blog => {
        if (authorsArr.filter(author => author.author === blog.author).length === 0) {
            authorsArr.push({ author: blog.author, likes: blog.likes })
        } else {
            authorsArr.forEach(author => {
                if (author.author === blog.author) {
                    author.likes += blog.likes
                }
            })
        }
    })

    const arr = [{ likes: 0 }]

    authorsArr.forEach(author => {
        if (author.likes > arr[arr.length - 1].likes) {
            arr.push(author)
        }
    })
    const { author, likes } = arr[arr.length - 1]
    return { author, likes }

}
