import { getUser, req } from './helpers'

describe('getUser helper', () => {
  test('it works', async () => {
    const user = await getUser('admin', process.env.ADMIN_PASS as string)
    expect(user).toBeDefined()
    for (let property of ['username', 'id', 'token']) {
      expect(user).toHaveProperty(property)
    }
  })
})

describe('req helper', () => {
  test('it works', async () => {
    const res_withoutAuth = await req('GET', '/', null, null)
    expect(res_withoutAuth.status).toBe(401)
    const user = await getUser('admin', process.env.ADMIN_PASS as string)
    const res_withAuth = await req('GET', '/', null, user.token)
    expect(res_withAuth.status).toBe(200)
  })
})