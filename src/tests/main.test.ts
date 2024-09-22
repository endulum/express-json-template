import app from "./app";
import request from 'supertest'
import { getUser } from './helpers'

describe('deserialize user', () => {
  test('GET / - 401 without token', async () => {
    const response = await request(app).get('/')
    expect(response.status).toBe(401)
  })

  test('GET / - 200 with token', async () => {
    const token = (await getUser('admin', process.env.ADMIN_PASS as string)).token
    const response = await request(app).get('/').set({ Authorization: token !== null ? `Bearer ${token}` : '' })
    expect(response.status).toBe(200)
  })
})