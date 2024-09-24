import { getUser, req } from './helpers'

describe('deserialize user', () => {
  test('GET / - 401 without token', async () => {
    const response = await req('GET', '/', null, null)
    expect(response.status).toBe(401)
  })

  test('GET / - 200 with token', async () => {
    const token = (await getUser('admin', process.env.ADMIN_PASS as string)).token
    const response = await req('GET', '/', null, token)
    expect(response.status).toBe(200)
  })
})