import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE
} from '@/constants/navigation.constant'
import type { NavigationTree } from '@/@types/navigation'

const navigationConfig: NavigationTree[] = [

    {
        key: 'signUp',
        path: '/spuid-signup',
        title: 'New Application',
        translateKey: 'nav.spuid.signup',
        icon: 'FaUserPlus',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'home',
        path: '/home',
        title: 'My Applications',
        translateKey: 'nav.home1',
        icon: 'home',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'home.license',
        path: '/home-license',
        title: 'Download License',
        translateKey: 'nav.home1',
        icon: 'MdDownload', // Material Icons
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
        key: 'track.application',
        path: '/track-application',
        title: 'Track Application',
        translateKey: 'nav.home1',
        icon: 'MdOutlineTrackChanges', // Material Icons
        type: NAV_ITEM_TYPE_ITEM,
        authority: [],
        subMenu: [],
    },
    {
            key: 'analyticsMenu',
            path: '',
            title: 'Analytics',
            translateKey: 'nav.collapseMenu.analyticsMenu',
            icon: 'MdAnalytics',
            type: NAV_ITEM_TYPE_COLLAPSE,
            authority: ['Analytics', 'Analytics1', 'Analytics2', 'Analytics3'],
            subMenu: [
                {
                    key: 'analyticsMenu.analytics1',
                    path: '/analytics1',
                    title: 'Summary Analytics',
                    translateKey: 'nav.analyticsMenu.analytics1',
                    icon: 'FaChartLine',
                    type: NAV_ITEM_TYPE_ITEM,
                    authority: ['Analytics1'],
                    subMenu: [],
                },
                {
                    key: 'analyticsMenu.analytics2',
                    path: '/collapse-menu-item-view-2',
                    title: 'Downloadable Reports',
                    translateKey: 'nav.collapseMenu.item22',
                    icon: 'MdDownload',
                    type: NAV_ITEM_TYPE_ITEM,
                    authority: ['Analytics2'],
                    subMenu: [],
                },
                {
                    key: 'analyticsMenu.analytics3',
                    path: '/collapse-menu-item-view-3',
                    title: 'Downloadable Reports',
                    translateKey: 'nav.collapseMenu.item22',
                    icon: 'MdDownload',
                    type: NAV_ITEM_TYPE_ITEM,
                    authority: ['Analytics3'],
                    subMenu: [],
                },
            ],
        },
    {
        key: 'auth.mis',
        path: '',
        title: 'Management Information System',
        translateKey: 'nav.collapseMenu.analyticsMenu',
        icon: 'FaDatabase',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: ['Analytics3'],
        subMenu: [
            {
                key: 'auth.mis.directory',
                path: '/auth/mis/directory',
                title: 'Public Directory',
                translateKey: 'nav.analyticsMenu.analytics1',
                icon: 'FaAddressBook',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['Super'],
                subMenu: [],
            },
            {
                key: 'auth.mis.recycling-efficency',
                path: '/auth/mis/recycling-efficiency',
                title: 'Recycling Efficiency',
                translateKey: 'nav.analyticsMenu.analytics1',
                icon: 'MdRecycling',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['Super'],
                subMenu: [],
            }
        ],
    },
    {
        key: 'auth.EPAOperations',
        path: '',
        title: 'EPA Operations',
        translateKey: 'nav.collapseMenu.analyticsMenu',
        icon: 'FaTools',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: ['TL', 'DO', 'DEO', 'Admin'],
        subMenu: [
            {
                key: 'auth.EPAOperation.ReportViolation',
                path: '/auth/EPAOperations/ReportViolation',
                title: 'Add New Inspection',
                translateKey: 'nav.analyticsMenu.ReportViolation',
                icon: 'MdAssignmentTurnedIn',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['TL', 'DO', 'DEO', 'Admin'],
                subMenu: [],
            },
            {
                key: 'auth.EPAOperation.AllInspections',
                path: '/auth/EPAOperations/AllInspections',
                title: 'All Inspections',
                translateKey: 'nav.analyticsMenu.AllInspections',
                icon: 'MdFactCheck',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['TL', 'DO', 'DEO', 'Admin'],
                subMenu: [],
            },
            {
                key: 'auth.EPAOperation.Dashboard',
                path: '/auth/EPAOperation/Dashboard',
                title: 'Dashboard',
                translateKey: 'nav.analyticsMenu.analytics1',
                icon: 'MdDashboard',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['TL', 'DO', 'DEO', 'Admin'],
                subMenu: [],
            }
        ],
    },

]

export default navigationConfig
