import { lazy } from 'react'
import type { Routes } from '@/@types/routes'

const authRoute: Routes = [
    {
        key: 'pub',
        path: `/pub`,
        component: lazy(() => import('@/views/auth/Analytics')),
        authority: [],
    },
    {
        key: 'pub',
        path: `/mis-directory`,
        component: lazy(() => import('@/views/demo/MISAnalyticsView2')),
        authority: [],
    },
    {
        key: 'pub',
        path: `/mis/directory`,
        component: lazy(() => import('@/views/demo/MISDirectoryPage')),
        authority: [],
    },
    {
        key: 'pub',
        path: `/mis/clubs/directory`,
        component: lazy(() => import('@/views/demo/ClubDirectoryPage')),
        authority: [],
    },
    {
        key: 'pub',
        path: `/ComingSoon`,
        component: lazy(() => import('@/views/demo/ComingSoon')),
        authority: [],
    },
    {
        key: 'pub',
        path: `/mis/recycling-efficiency`,
        component: lazy(() => import('@/views/demo/MISRecyclingEfficiencyPage')),
        authority: [],
    },
    {
        key: 'signIn',
        path: `/sign-in`,
        component: lazy(() => import('@/views/auth/SignIn')),
        authority: [],
    },
    {
        key: 'signUp',
        path: `/sign-up`,
        component: lazy(() => import('@/views/auth/SignUp')),
        authority: [],
    },
    {
        key: 'forgotPassword',
        path: `/forgot-password`,
        component: lazy(() => import('@/views/auth/ForgotPassword')),
        authority: [],
    },
    {
        key: 'resetPassword',
        path: `/reset-password`,
        component: lazy(() => import('@/views/auth/ResetPassword')),
        authority: [],
    },
    {
        key: 'cr',
        path: `/cr`,
        component: lazy(() => import('@/views/auth/Analytics/CR')),
        authority: [],
    },    
]

export default authRoute
