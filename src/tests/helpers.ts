import request from 'supertest'

import app from "./app";
import prisma from '../prisma'

export async function getUser(username: string, password: string): 
  Promise<{ username: string, id: number, token: string }> {
    const user = await prisma.user.findFirst({ where: { username } })
    if (!user) throw new Error('Given user does not exist.')
    const response = await request(app).post('/login').type('form').send({ username, password })
    if (!('body' in response) || !('token' in response.body)) throw new Error('Failed logging in this user.')
    return { username, id: user.id, token: response.body.token as string }
}