const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

const Blog = require('../models/blog')
const { set } = require('../app')

/* initializing the database before every
 test with the beforeEach function */

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
})


test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
}, 100000)

test('blog has property id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})
describe('test with logged in user', () => {
    let headers

    beforeEach(async () => {
        const newUser = {
            username: 'username',
            name: 'username',
            password: 'password'
        }

        await api
            .post('/api/users')
            .send(newUser)

        const result = await api
            .post('/api/login')
            .send(newUser)

        headers = {
            'Authorization': `bearer ${result.body.token}`
        }
    })

    test('POST request creates new blog post', async () => {

        const newBlog = {
            title: 'blogtastic',
            author: 'Michael Zhan',
            url: 'https://reactpatterns.com/',
            likes: 1,
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .set(headers)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length+1)
        // test for if new blog added has same as used in test
        const contents = blogsAtEnd.map(n => n.author)
        expect(contents).toContain('Michael Zhan')
    })

    //test that verifies that if the likes property is missing from
    //the request, it will default to the value 0.
    test('if likes undefined, set to 0', async () => {
        const newBlog = {
            title: 'blogtastic',
            author: 'Michael Zhan',
            url: 'https://reactpatterns.com/',
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .set(headers)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        expect(response.body.likes).toBe(0)
    })

    /* write a test related to creating new blogs (post:api/blogs) endpoint, that
    verifies that if title and URL properties are missing from the request data, the backend
    responds with status code 400 bad request*/

    test('if title is missing return 400', async () => {
        const newBlog = {
            author: 'Michael Zhan',
            url: 'https://reactpatterns.com/',
            likes: 2
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set(headers)
            .expect(400)
    })

    test('if URL is missing return 400', async () => {
        const newBlog = {
            title: 'blogtastic',
            author: 'Michael Zhan',
            likes: 2
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set(headers)
            .expect(400)

    })

    /* deleting a single blog resource */
    test('succeeds with status 204 if id is valid', async () => {
        const newBlog = {
            title: 'The best blog ever',
            author: 'Me',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set(headers)
            .expect(201)

        const allBlogs = await helper.blogsInDb()
        const blogToDelete = allBlogs.find(blog => blog.title ===newBlog.title)

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set(headers)
            .expect(204) //no content: a request has succeeded, but no need to navigate away from current page

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

        const contents = blogsAtEnd.map(r => r.title)

        expect(contents).not.toContain(blogToDelete.title)
    })

    /* update a single blog */
    test('succeeds in updating likes', async () => {
        const newBlog = {
            title: 'Masterpiece',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set(headers)
            .expect(201) // successful response

        const allBlogs = await helper.blogsInDb()
        const blogToUpdate = allBlogs.find(blog => blog.title === newBlog.title)

        const updatedBlog = {
            ...blogToUpdate,
            likes: blogToUpdate.likes +1
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedBlog)
            .set(headers)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length +1)
        const foundBlog = blogsAtEnd.find(blog => blog.likes === 13)
        expect(foundBlog.likes).toBe(13)

    })

    test('username already taken expect status 400', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'superuser',
            password: 'salainen'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .set(headers)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('username must be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('password is too short expect status 400', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root2',
            name: 'superuser',
            password: 'sa'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .set(headers)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('password must be at least 3 characters')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

})


afterAll(() => {
    mongoose.connection.close()
})