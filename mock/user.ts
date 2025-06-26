import { MockMethod } from 'vite-plugin-mock';

export default [
    {
        url: '/mock/api/user',
        method: 'post',
        // 可以获取请求体
        response: ({ body }) => {
            if (body.username !== body.password) {
                return {
                    code: 100,
                    message: '用户或密码错误，',
                    data: {
                        username: '',
                        role: [],
                        accessToken: ''
                    }
                };
            }
            if (body.username === 'admin') {
                return {
                    code: 0,
                    message: '登录成功',
                    data: {
                        username: 'admin',
                        roles: ['admin'],
                        accessToken: 'admin'
                    }
                };
            } else {
                return {
                    code: 0,
                    message: 'Token失败',
                    data: {
                        username: '',
                        roles: [],
                        accessToken: ''
                    }
                };
            }
        }
    }
] as MockMethod[];
