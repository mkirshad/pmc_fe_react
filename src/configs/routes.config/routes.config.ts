import { lazy } from 'react'
import authRoute from './authRoute'
import othersRoute from './othersRoute'
import type { Routes } from '@/@types/routes'

export const publicRoutes: Routes = [...authRoute]

export const protectedRoutes: Routes = [
    {
        key: 'auth.mis.directory',
        path: `/auth/mis/directory`,
        component: lazy(() => import('@/views/demo/MISDirectory')),
        authority: [],
    },
    {
        key: 'auth.mis.clubs-directory',
        path: `/auth/mis/clubs/directory`,
        component: lazy(() => import('@/views/demo/ClubDirectory2')),
        authority: ['EEC', 'Super'],
    },    
    {
        key: 'auth.EPAOperation.AllInspections',
        path: `/auth/EPAOperations/AllInspections`,
        component: lazy(() => import('@/views/supid/EPA/InspectionReportsList')),
        authority: [],
    },
    {
        key: 'auth.EPAOperation.ReportViolation',
        path: `/auth/EPAOperations/ReportViolation`,
        component: lazy(() => import('@/views/supid/EPA/InspectionCreate')),
        authority: [],
    },
    {
        key: 'auth.EPAOperation.Dashboard',
        path: `/auth/EPAOperation/Dashboard`,
        component: lazy(() => import('@/views/supid/EPA/InspectionDashboard')),
        authority: [],
    },
    {
        key: 'auth.EPAOperation.UserProfile',
        path: `/auth/EPAOperation/UserProfile`,
        component: lazy(() => import('@/views/supid/EPA/FieldInspectors')),
        authority: [],
    },
    {
        key: 'auth.EPAOperation.DocumentDashboard',
        path: `/auth/EPAOperation/DocumentsDashboard`,
        component: lazy(() => import('@/views/supid/EPA/DocumentDashboard')),
        authority: ['DO', 'TL', 'DEO', 'DG', 'Admin'],
    },    
    {
        key: 'auth.mis.recycling-efficency',
        path: `/auth/mis/recycling-efficiency`,
        component: lazy(() => import('@/views/demo/MISRecyclingEfficiency')),
        authority: [],
    },
    {
        key: 'home',
        path: '/home',
        component: lazy(() => import('@/views/Home')),
        authority: [],
    },
    {
        key: 'home.license',
        path: '/home-license',
        component: lazy(() => import('@/views/HomeLicense')),
        authority: [],
    },
    {
        key: 'home',
        path: '/home-super',
        component: lazy(() => import('@/views/HomeSuper')),
        authority: ['Super'],
    },
    {
        key: 'home',
        path: '/home-deo',
        component: lazy(() => import('@/views/HomeDEO')),
        authority: ['DEO', 'DG'],
    },
    {
        key: 'home',
        path: '/home-admin',
        component: lazy(() => import('@/views/HomeAdmin')),
        authority: ['Admin'],
    },
    {
        key: 'home',
        path: '/home-do',
        component: lazy(() => import('@/views/HomeDO')),
        authority: ['DO'],
    },
    {
        key: 'track.application',
        path: '/track-application',
        component: lazy(() => import('@/views/TrackApplication')),
        authority: [],
    },
    {
        key: 'reset.password',
        path: '/reset-password',
        component: lazy(() => import('@/views/auth/ResetPassword/ResetPassword2')),
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
        key: 'analyticsMenu.analytics2',
        path: '/collapse-menu-item-view-2',
        component: lazy(() => import('@/views/demo/CollapseMenuItemView2')),
        authority: ['Analytics2'],
    },
    {
        key: 'analyticsMenu.analytics3',
        path: '/collapse-menu-item-view-3',
        component: lazy(() => import('@/views/demo/CollapseMenuItemView3')),
        authority: ['Analytics3'],
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
        key: 'analyticsMenu.analytics1',
        path: '/analytics1',
        component: lazy(() =>
            import('@/views/demo/AnalyticsView')
        ),
        authority: ['Analytics1', 'Admin', 'DEO', 'DG', 'DO', 'LSM', 'LSO', 'TL', 'Super'],
    },
    {
        key: 'signUp',
        path: '/spuid-signup',
        component: lazy(() =>
            import('@/views/supid/CreateApplication/CustomerCreate')
        ),
        authority: [],
    },
    {
        key: 'register-competition',
        path: '/register-competition',
        component: lazy(() =>
            import('@/views/auth/competition/CompetitionFormPage')
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
