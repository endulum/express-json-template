import app from './app'
import { getUser } from './helpers'
import request from 'supertest'

describe('getUser helper', () => {
  test('it works', async () => {
    const user = await getUser('admin', process.env.ADMIN_PASS as string)
    expect(user).toBeDefined()
    for (let property of ['username', 'id', 'token']) {
      expect(user).toHaveProperty(property)
    }
  })
})

describe('logging in', () => {
  const correctInputs = {
    username: 'admin',
    password: process.env.ADMIN_PASS
  }

  test('POST /login - 400 and errors', async () => {
    const wrongInputsArray = [
      { username: '' },
      { password: '' },
      { password: 'some wrong password' }
    ]

    for (let wrongInputs of wrongInputsArray) {
      const response = await request(app).post('/login').type('form').send({
        ...correctInputs, ...wrongInputs
      })
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('errors')
      expect(response.body.errors.length).toEqual(1)
    }
  })

  test('POST /login - 200 and token', async () => {
    const response = await request(app).post('/login').type('form').send(correctInputs)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('token')
  })
})

describe('signing up', () => {
  const correctInputs = {
    username: 'new-user',
    password: 'password',
    confirmPassword: 'password',
    deleteAfter: true
  }

  test('POST /signup - 400 and errors', async () => {
    const wrongInputsArray = [
      { username: '' },
      { password: '' },
      { confirmPassword: '' },
      { username: 'admin' },
      { password: 'some mismatched password' },
      { confirmPassword: 'some mismatched password' }
    ]

    for (let wrongInputs of wrongInputsArray) {
      const response = await request(app).post('/signup').type('form').send({
        ...correctInputs, ...wrongInputs
      })
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('errors')
      expect(response.body.errors.length).toEqual(1)
    }
  })

  test('POST /signup - 200 and new user details returned', async () =>{
    const response = await request(app).post('/signup').type('form').send(correctInputs)
    expect(response.status).toBe(200)
    for (let property of ['username', 'id', 'role']) {
      expect(response.body).toHaveProperty(property)
    }
  })
})