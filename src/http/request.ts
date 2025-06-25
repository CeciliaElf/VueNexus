import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig, AxiosRequestConfig } from 'axios';
import { ElMessage } from 'element-plus';
import { getMessageInfo } from './status';

// 创建 axios 实例
interface BaseResponse<T = any> {
    code: number | string;
    message: string;
    data: T;
    status?: number;
}

const service = axios.create({
    baseURL: import.meta.env.VITE_APP_API_BASEURL,
    timeout: 15000
});

// axios 实例拦截请求
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

// axios 响应拦截请求
service.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.status === 200) {
            return response.data;
        }
        ElMessage({
            message: getMessageInfo(response.status),
            type: 'error'
        });
        return response.data;
    },
    // 请求失败
    (error: any) => {
        const { response } = error;
        if (response) {
            ElMessage({
                message: '网路连接异常，请稍后重试',
                type: 'error'
            });
        }
    }
);

// 此处相当于二次响应拦截
// 为响应数据进行定制化处理
const requestInstance = <T = any>(config: AxiosRequestConfig): Promise<T> => {
    const conf = config;
    return new Promise((resolve, reject) => {
        service.request<any, AxiosResponse<BaseResponse>>(conf).then((res: AxiosResponse<BaseResponse>) => {
            const data = res.data; // 如果 data.code 为错误代码返回 message 信息
            if (data.code != 0) {
                ElMessage({
                    message: data.message,
                    type: 'error'
                });
                reject(data.message);
            } else {
                ElMessage({
                    message: data.message,
                    type: 'success'
                }); // 此处返回 data 信息 也就是 api 中配置好的 Response 类型
                resolve(data.data as T); // // 解析 Promise，返回实际的业务数据 (data.data)，并斷言为 T 类型
            }
        });
    });
};

export function get<T = any, U = any>(config: AxiosRequestConfig, url: string, parms?: U): Promise<T> {
    return requestInstance({ ...config, url, method: 'GET', params: parms });
}

export function post<T = any, U = any>(config: AxiosRequestConfig, url: string, data: U): Promise<T> {
    return requestInstance({ ...config, url, method: 'POST', data: data });
}

export function put<T = any, U = any>(config: AxiosRequestConfig, url: string, parms?: U): Promise<T> {
    return requestInstance({ ...config, url, method: 'PUT', params: parms });
}

export function del<T = any, U = any>(config: AxiosRequestConfig, url: string, data: U): Promise<T> {
    return requestInstance({ ...config, url, method: 'DELETE', data: data });
}

// 一般的后端返回的数据结构
// {
//     'code': 1,
//     'message': '成功',
//     'data': {
//         'id': 1,
//         'name': 'Jack',
//         'age': 20,
//         'sex': 1,
//         'address': 'UK',
//         'createTime': '2025-05-30 15:49:16',
//         'updateTime': '2025-05-30 15:49:16',
//         'deleteTime': null,
//         'createBy': 1,
//         'updateBy': 1,
//     }
// }
