import { lazy } from 'react'
import authRoute from './authRoute'
import othersRoute from './othersRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes: Routes = [
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/Home')),
        authority: [],
    },
    {
        key: 'homeSuper',
        path: '/home-super',
        component: lazy(() => import('@/views/HomeSuper')),
        authority: [],
    },
    {
        key: 'homeAdmin',
        path: '/home-admin',
        component: lazy(() => import('@/views/HomeAdmin')),
        authority: [],
    },
    {
        key: 'homeDO',
        path: '/home-do',
        component: lazy(() => import('@/views/HomeDO')),
        authority: [],
    },
    {
        key: 'error',
        path: '/error',
        component: lazy(() => import('@/views/ErrorPage')), // ErrorPage component
        authority: [], // Accessible by all users
    },


    /** Example purpose only, please remove */
    {
        key: 'singleMenuItem',
        path: '/single-menu-view',
        component: lazy(() => import('@/views/demo/SingleMenuView')),
        authority: [],
    },
    {
        key: 'collapseMenu.item1',
        path: '/collapse-menu-item-view-1',
        component: lazy(() => import('@/views/demo/CollapseMenuItemView1')),
        authority: [],
    },
    {
        key: 'collapseMenu.item2',
        path: '/collapse-menu-item-view-2',
        component: lazy(() => import('@/views/demo/CollapseMenuItemView2')),
        authority: [],
    },
    {
        key: 'groupMenu.single',
        path: '/group-single-menu-item-view',
        component: lazy(() =>
            import('@/views/demo/GroupSingleMenuItemView')
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item1',
        path: '/group-collapse-menu-item-view-1',
        component: lazy(() =>
            import('@/views/demo/GroupCollapseMenuItemView1')
        ),
        authority: [],
    },
    {
        key: 'groupMenu.collapse.item2',
        path: '/group-collapse-menu-item-view-2',
        component: lazy(() =>
            import('@/views/demo/GroupCollapseMenuItemView2')
        ),
        authority: [],
    },
    {
        key: 'single.analytics1',
        path: '/analytics1',
        component: lazy(() =>
            import('@/views/demo/AnalyticsView')
        ),
        authority: [],
    },
    {
        key: 'single.signup',
        path: '/spuid-signup',
        component: lazy(() =>
            import('@/views/supid/CreateApplication/CustomerCreate')
        ),
        authority: [],
    },
    {
        key: 'single.signup2',
        path: '/spuid-signup/:id',
        component: lazy(() =>
            import('@/views/supid/CreateApplication/CustomerCreate')
        ),
        authority: [],
    },
    {
        key: 'single.signup3',
        path: '/spuid-review/:id',
        component: lazy(() =>
            import('@/views/supid/ReviewApplication/ReviewApplicationMain')
        ),
        authority: [],
    },
    ...othersRoute,
]
