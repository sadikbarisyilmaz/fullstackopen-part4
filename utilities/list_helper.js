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
