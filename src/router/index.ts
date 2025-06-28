import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
// 配置路由
// const routes: Array<RouteRecordRaw> = [
//     {
//         path: '/',
//         name: 'home',
//         component: () => import('../views//home/index.vue'),
//         meta: {}, // 一般用做权限，控制路由
//         children: [],
//     },
// ];
export const aboutRouter = {
    path: '/about',
    name: 'about',
    component: () => import('@/views/about/index.vue'),
    meta: {},
    children: []
} as RouteRecordRaw;

const routes: Array<RouteRecordRaw> = [];

const modules: Record<string, any> = import.meta.glob(['./modules/*.ts'], { eager: true });
Object.keys(modules).forEach((key) => {
    const module = modules[key].default;
    routes.push(module);
});
routes.push(aboutRouter);

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

const noStatusPage = ['/login', '/about']
router.beforeEach(async (_to, _from, next) => {
    NProgress.start();
    const token = sessionStorage.getItem('userInfo')
    const userIsLogin = token ? true : false
    if (userIsLogin || noStatusPage.includes(_to.path)) {
        next()
    } else {
        next('/login')
    }
    next();
});
router.afterEach((_to) => {
    NProgress.done();
});
export default router;
