export const getMessageInfo = (status: number | string): string => {
    let message = '';
    switch (status) {
        case 400:
            message = '请求错误(400)';
            break;
        case 403:
            message = '拒绝访问(403)';
            break;
        case 401:
            message = '未授权(401)';
            break;
        case 500:
            message = '服务器错误(500)';
            break;
        case 503:
            message = '服务不可用(503)';
            break;
        default:
            message = `连接出错(${status})!`;
    }
    return message;
};
