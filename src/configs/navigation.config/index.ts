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
        icon: 'collapseMenu',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: ['Analytics', 'Analytics1', 'Analytics2', 'Analytics3'],
        subMenu: [
            {
                key: 'analyticsMenu.analytics1',
                path: '/analytics1',
                title: 'Summary Analytics',
                translateKey: 'nav.analyticsMenu.analytics1',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['Analytics1'],
                subMenu: [],
            },
            {
                key: 'analyticsMenu.analytics2',
                path: '/collapse-menu-item-view-2',
                title: 'Downloadable Reports',
                translateKey: 'nav.collapseMenu.item22',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['Analytics2'],
                subMenu: [],
            },
            {
                key: 'analyticsMenu.analytics3',
                path: '/collapse-menu-item-view-3',
                title: 'Downloadable Reports',
                translateKey: 'nav.collapseMenu.item22',
                icon: '',
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
        icon: 'collapseMenu',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: ['Super'],
        subMenu: [
            {
                key: 'auth.mis.directory',
                path: '/auth/mis/directory',
                title: 'Public Directory',
                translateKey: 'nav.analyticsMenu.analytics1',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['Super'],
                subMenu: [],
            },
            {
                key: 'auth.mis.recycling-efficency',
                path: '/auth/mis/recycling-efficency',
                title: 'Recycling Efficiency',
                translateKey: 'nav.analyticsMenu.analytics1',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: ['Super'],
                subMenu: [],
            }
        ],
    },
    // /** Example purpose only, please remove */
    // {
    //     key: 'singleMenuItem',
    //     path: '/single-menu-view',
    //     title: 'Single menu item',
    //     translateKey: 'nav.singleMenuItem',
    //     icon: 'singleMenu',
    //     type: NAV_ITEM_TYPE_ITEM,
    //     authority: [],
    //     subMenu: [],
    // },
    // {
    //     key: 'collapseMenu',
    //     path: '',
    //     title: 'Collapse Menu',
    //     translateKey: 'nav.collapseMenu.collapseMenu',
    //     icon: 'collapseMenu',
    //     type: NAV_ITEM_TYPE_COLLAPSE,
    //     authority: [],
    //     subMenu: [
    //         {
    //             key: 'collapseMenu.item1',
    //             path: '/collapse-menu-item-view-1',
    //             title: 'Collapse menu item 1',
    //             translateKey: 'nav.collapseMenu.item1',
    //             icon: '',
    //             type: NAV_ITEM_TYPE_ITEM,
    //             authority: [],
    //             subMenu: [],
    //         },
    //         {
    //             key: 'collapseMenu.item2',
    //             path: '/collapse-menu-item-view-2',
    //             title: 'Collapse menu item 2',
    //             translateKey: 'nav.collapseMenu.item2',
    //             icon: '',
    //             type: NAV_ITEM_TYPE_ITEM,
    //             authority: [],
    //             subMenu: [],
    //         },
    //     ],
    // },
    // {
    //     key: 'groupMenu',
    //     path: '',
    //     title: 'Group Menu',
    //     translateKey: 'nav.groupMenu.groupMenu',
    //     icon: 'groupMenu',
    //     type: NAV_ITEM_TYPE_TITLE,
    //     authority: [],
    //     subMenu: [
    //         {
    //             key: 'groupMenu.single',
    //             path: '/group-single-menu-item-view',
    //             title: 'Group single menu item',
    //             translateKey: 'nav.groupMenu.single',
    //             icon: 'groupSingleMenu',
    //             type: NAV_ITEM_TYPE_ITEM,
    //             authority: [],
    //             subMenu: [],
    //         },
    //         {
    //             key: 'groupMenu.collapse',
    //             path: '',
    //             title: 'Group collapse menu',
    //             translateKey: 'nav.groupMenu.collapse.collapse',
    //             icon: 'groupCollapseMenu',
    //             type: NAV_ITEM_TYPE_COLLAPSE,
    //             authority: [],
    //             subMenu: [
    //                 {
    //                     key: 'groupMenu.collapse.item1',
    //                     path: '/group-collapse-menu-item-view-1',
    //                     title: 'Menu item 1',
    //                     translateKey: 'nav.groupMenu.collapse.item1',
    //                     icon: '',
    //                     type: NAV_ITEM_TYPE_ITEM,
    //                     authority: [],
    //                     subMenu: [],
    //                 },
    //                 {
    //                     key: 'groupMenu.collapse.item2',
    //                     path: '/group-collapse-menu-item-view-2',
    //                     title: 'Menu item 2',
    //                     translateKey: 'nav.groupMenu.collapse.item2',
    //                     icon: '',
    //                     type: NAV_ITEM_TYPE_ITEM,
    //                     authority: [],
    //                     subMenu: [],
    //                 },
    //             ],
    //         },
    //     ],
    // },
    // {
    //     key: 'Analytics1',
    //     path: '/analytics1',
    //     title: 'Analytics 1',
    //     translateKey: 'nav.analytics1',
    //     icon: 'singleMenu',
    //     type: NAV_ITEM_TYPE_ITEM,
    //     authority: [],
    //     subMenu: [],
    // },

]

export default navigationConfig
