import { defineStore } from 'pinia';
import pinia from '@/store';
import { userLogin, refreshUserInfo } from '@/api/user';

export interface IUserState {
    username: string;
    accessToken: string;
    refreshToken?: string;
    roles: string[]; // Array<string>
}

export interface LoginRequest {
    username: string;
    password: string;
}

export const useUserStoreHook = defineStore('user', {
    state: (): IUserState => ({
        username: 'admin',
        accessToken: '',
        roles: ['common']
    }),
    getters: {},
    actions: {
        storeUserLogin(data: LoginRequest) {
            return userLogin(data)
                .then((res) => {
                    this.username = res.username;
                    this.accessToken = res.accessToken;
                    this.roles = res.roles;
                    return res;
                })
                .catch((error) => {
                    console.error("Error in userLogin API call:", error);
                    throw error; // Re-throw the error so it can be caught by the component
                });
        },
        storeRefreshUserInfo() {
            if (this.username === 'Cecilia' && this.accessToken != '') {
                refreshUserInfo({
                    accessToken: this.accessToken
                })
                    .then((res) => {
                        this.username = res.username;
                        this.accessToken = res.accessToken;
                        this.roles = res.roles;
                    })
                    .catch((error) => {
                        this.accessToken = '';
                    });
            }
        }
    },
    persist: {
        key: 'userInfo',
        storage: sessionStorage,
        paths: ['accessToken', 'username']
    }
});

export function useUserStore() {
    return useUserStoreHook(pinia);
}
