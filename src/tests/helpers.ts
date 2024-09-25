import request, { Response } from 'supertest'

import app from "./app";
import prisma from '../prisma'

export async function req(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  form: Record<string, unknown> | null,
  token: string | null
): Promise<Response> {
  // any way to have '.post()', '.put()', '.delete()' conditionally chained? and without type errors?
  switch (method) {
    case 'POST': return await request(app)
      .post(url)
      .set({ Authorization: token !== null ? `Bearer ${token}` : '' })
      .type('form').send(form ?? {})
    case 'PUT': return await request(app)
      .put(url)
      .set({ Authorization: token !== null ? `Bearer ${token}` : '' })
      .type('form').send(form ?? {})
    case 'DELETE': return await request(app)
      .delete(url)
      .set({ Authorization: token !== null ? `Bearer ${token}` : '' })
    default: return await request(app)
      .get(url)
      .set({ Authorization: token !== null ? `Bearer ${token}` : '' })
  }
}

export async function getUser(username: string, password: string): 
  Promise<{ username: string, id: number, token: string }> {
    const user = await prisma.user.findFirst({ where: { username } })
    if (!user) throw new Error('Given user does not exist.')
    const response = await request(app).post('/login').type('form').send({ username, password })
    if (!('body' in response) || !('token' in response.body)) throw new Error('Failed logging in this user.')
    return { username, id: user.id, token: response.body.token as string }
}