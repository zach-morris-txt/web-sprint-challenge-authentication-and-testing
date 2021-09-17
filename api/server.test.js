//Imports
const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')


//DATABASE Management
beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db('users').truncate()
})
afterAll(async () => {
  await db.destroy()
})


//Testing Server
test('sanity', () => {
  expect(true).toBeTruthy()
})

describe('[POST] /api/auth/register', () => {
  it('Returns A Status 201 CREATED', async () => {
    const res = await request(server).post('/api/auth/register').send({ username: "tolstoy", password: "12345" })
    expect(res.status).toBe(201)
  })
  // it('Returns Newly Created User', async () => {
  //   const res = await request(server)
  //     .post('/api/auth/register')
  //     .send({ username: "tolstoy", password: "12345" })
  //   expect(res.body).toMatchObject({ id: 1, username: "tolstoy", password: "$2a$08$$2a$08$.EMuRhhu4RP6U.sQqXrJ4q2pw7P6iSxy.rxWU4YdtQ3FcImy3HW9WIJSi5Olupl." })
  // })  
  test('Returns A Status 422 On Missing Username', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ usernamw: "tolstoy" })
    expect(res.status).toBe(422)
  })
})

describe('[POST] /api/auth/login', () => {
  it('Returns Correct Message On Invalid Credentials', async () => {
    const res = await request(server).post('/api/auth/login').send({ username: "tolstoy", password: "12345" })
    expect(res.body.message).toBe('invalid credentials')
  })
  test('Returns A Status 422 On Missing Username', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ usernamw: "tolstoy" })
    expect(res.status).toBe(422)
  })
})

describe('[GET] /api/jokes', () => {
  it('Returns A Status 401 And Proper Message On No Token', async () => {
    const res = await request(server).get('/api/jokes')
    expect(res.status).toBe(401)
    expect(res.body.message).toMatch('token required')
  })
  it('Returns A Status 401 And Proper Message On Incorrect Token', async () => {
    const res = await request(server).get('/api/jokes').set('Authorization', 'foobar')
    expect(res.body.message).toMatch('token invalid')
  })
})
