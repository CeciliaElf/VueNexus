import { post } from '@/http/request';

export type LoginRequest = {
    username: string;
    password: string;
};

export type refreshLoginRequest = {
    accessToken: string;
};

export type LoginRespose = {
    username: string;
    roles: string[];
    accessToken: string;
};

// 用户登录
export const userLogin = async (data?: LoginRequest) => {
    return post<LoginRespose>({}, '/login', data);
};

// 刷新用户资讯
export const refreshUserInfo = async (data?: refreshLoginRequest) => {
    return post<LoginRespose>({}, '/getUserInfo', data);
};
