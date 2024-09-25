import { getUser, req } from './helpers';

describe('getUser helper', () => {
  test('it works', async () => {
    const user = await getUser('admin', process.env.ADMIN_PASS as string);
    expect(user).toBeDefined();
    await Promise.all(['username', 'id', 'token'].map(async (property) => {
      expect(user).toHaveProperty(property);
    }));
  });
});

describe('req helper', () => {
  test('it works', async () => {
    const resWithoutAuth = await req('GET', '/', null, null);
    expect(resWithoutAuth.status).toBe(401);
    const { token } = await getUser('admin', process.env.ADMIN_PASS as string);
    const resWithAuth = await req('GET', '/', null, token);
    expect(resWithAuth.status).toBe(200);
  });
});
