import { getUser, req } from './helpers';

describe('deserialize user', () => {
  test('GET / - 401 without token', async () => {
    const response = await req('GET', '/', null, null);
    expect(response.status).toBe(401);
  });

  test('GET / - 200 with token', async () => {
    const { token } = await getUser('admin', process.env.ADMIN_PASS as string);
    const response = await req('GET', '/', null, token);
    expect(response.status).toBe(200);
  });
});

describe('change account detail', () => {
  const correctInputs = {
    username: 'admin',
    password: 'new-password',
    confirmPassword: 'new-password',
    currentPassword: process.env.ADMIN_PASS,
  };

  test('POST /account - 401 without token', async () => {
    const response = await req('POST', '/account', null, null);
    expect(response.status).toBe(401);
  });

  test('POST /account - 400 and errors (with password)', async () => {
    const { token } = await getUser('admin', process.env.ADMIN_PASS as string);

    const wrongInputsArray = [
      { username: '' },
      { confirmPassword: '' },
      { currentPassword: '' },
      { username: 'basic' },
      { username: 'a' },
      { username: '&&&&' },
      { password: '.' },
      { password: 'some mismatched password' },
      { confirmPassword: 'some mismatched password' },
      { currentPassword: 'some mismatched password' },
    ];

    await Promise.all(wrongInputsArray.map(async (wrongInputs) => {
      const response = await req('POST', '/account', { ...correctInputs, ...wrongInputs }, token);
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('errors');
    }));
  });

  test('POST /account - 200 and changes account details (with password)', async () => {
    const { token } = await getUser('admin', process.env.ADMIN_PASS as string);
    const response = await req('POST', '/account', correctInputs, token);
    expect(response.status).toBe(200);
    await req('POST', '/account', {
      ...correctInputs,
      password: process.env.ADMIN_PASS,
      confirmPassword: process.env.ADMIN_PASS,
      currentPassword: correctInputs.password,
    }, token);
  });

  test('POST /account - 200 and changes account details (without password)', async () => {
    const { token } = await getUser('admin', process.env.ADMIN_PASS as string);
    const response = await req('POST', '/account', { username: 'owo' }, token);
    expect(response.status).toBe(200);
    await req('POST', '/account', { username: 'admin' }, token);
  });
});
