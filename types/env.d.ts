/// <reference types="vite/client" />
interface ImportMetaEnv {
    // 每次添加完新的环境变量就在此添加一次ts类型
    // 这样就能在使用 import.meta.env 时获得ts语法提示
    readonly VITE_APP_API_BASEURL: string;
    readonly VITE_APP_MOCK_BASEURL: string;
    readonly VITE_APP_USE_MOCK: string;
}
interface ImportMeta {
    readonly env: ImportMetaEnv;
}
