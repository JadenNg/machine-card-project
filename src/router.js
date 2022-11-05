import Router from 'vue-router';
import Vue from 'vue'


Vue.use(Router)
const Login = () => import('./pages/login/index')
export const router = new Router({
    mode: 'history',
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login,
            redirect: '/login',
            children: [
                {
                    name: 'auth.login',
                    path: '/login',
                    component: () => import('./pages/login/Login')
                }
            ]
        },
        {
            path: '/admin',
            name: 'app',
            component: () => import('./pages/app'),
            redirect: '/admin/home',
            children: [
                {
                    name: 'admin',
                    path: '/',
                    component: () => import('./pages/app/home/index'),
                    redirect: {
                        name: 'admin.home',
                    },
                },
                {
                    name: 'admin.profile',
                    path: '/admin/profile',
                    component: () => import('./pages/app/profile/update'),
                },
                {
                    name: 'admin.change-password',
                    path: '/admin/change-password',
                    component: () => import('./pages/app/profile/change-password'),
                },
                {
                    name: 'admin.home',
                    path: '/admin/home',
                    component: () => import('./pages/app/home/index'),
                },
                {
                    name: 'admin.machines',
                    path: '/admin/machines',
                    component: () => import('./pages/app/machines'),
                    redirect: {
                        name: 'admin.machines.list',
                    },
                    children: [
                        {
                            path: 'list',
                            name: 'admin.machines.list',
                            component: () => import('./pages/app/machines/list'),
                        },
                        {
                            path: 'create',
                            name: 'admin.machines.create',
                            component: () => import('./pages/app/machines/create'),
                        },
                        {
                            path: 'edit/:id',
                            name: 'admin.machines.edit',
                            component: () => import('./pages/app/machines/edit'),
                        },
                        {
                            path: 'statistic/:id',
                            name: 'admin.machines.statistic',
                            component: () => import('./pages/app/machines/statistic'),
                        }
                    ],
                },
                {
                    name: 'admin.workstations',
                    path: '/admin/workstations',
                    component: () => import('./pages/app/workstations'),
                    redirect: {
                        name: 'admin.workstations.list',
                    },
                    children: [
                        {
                            path: 'list',
                            name: 'admin.workstations.list',
                            component: () => import('./pages/app/workstations/list'),
                        }, {
                            path: 'create',
                            name: 'admin.workstations.create',
                            component: () => import('./pages/app/workstations/create'),
                        }, {
                            path: 'edit/:id',
                            name: 'admin.workstations.edit',
                            component: () => import('./pages/app/workstations/edit'),
                        }
                    ],
                },
                {
                    name: 'admin.users',
                    path: '/admin/users',
                    component: () => import('./pages/app/users'),
                    redirect: {
                        name: 'admin.users.list',
                    },
                    children: [
                        {
                            path: 'list',
                            name: 'admin.users.list',
                            component: () => import('./pages/app/users/list'),
                        }, {
                            path: 'edit/:id',
                            name: 'admin.users.edit',
                            component: () => import('./pages/app/users/edit'),
                        }, {
                            path: 'create',
                            name: 'admin.users.create',
                            component: () => import('./pages/app/users/create'),
                        },
                    ],
                },
            ]
        },
        {
            path: "*",
            name: 'admin.home',
            component: () => import('./pages/app/home/index'),
            redirect: {
                name: 'admin.home',
            },
        },
    ]
});

router.beforeEach((to, from, next) => {
    const publicPages = ['/','/login'];
    let authRequired = false
    if(!(publicPages.includes(to.path)) ) authRequired = true
    const loggedIn = localStorage.getItem('position');
    if (loggedIn && !authRequired) {
        return next('/admin')
    }
    if (authRequired && !loggedIn) {
        return next('/login');
    }
    next();
})
