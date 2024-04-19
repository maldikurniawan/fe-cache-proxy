import {
    HiOutlineViewGrid,
    HiOutlineCube,
    HiOutlineShoppingCart,
    HiOutlineUsers,
    HiOutlineDocumentText,
    HiOutlineAnnotation,
    HiOutlineQuestionMarkCircle,
    HiOutlineCog
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
    {
        key: 'dashboard',
        label: 'Dashboard',
        path: '/',
        icon: <HiOutlineViewGrid />
    },
    {
        key: 'monitoring',
        label: 'Monitoring',
        path: '/monitoring',
        icon: <HiOutlineCube />
    },
    // {
    //     key: 'orders',
    //     label: 'Orders',
    //     path: '#',
    //     icon: <HiOutlineShoppingCart />
    // },
    // {
    //     key: 'customers',
    //     label: 'Customers',
    //     path: '#',
    //     icon: <HiOutlineUsers />
    // },
    // {
    //     key: 'transactions',
    //     label: 'Transactions',
    //     path: '#',
    //     icon: <HiOutlineDocumentText />
    // },
    // {
    //     key: 'messages',
    //     label: 'Messages',
    //     path: '#',
    //     icon: <HiOutlineAnnotation />
    // }
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
    {
        key: 'settings',
        label: 'Settings',
        path: '#',
        icon: <HiOutlineCog />
    },
    {
        key: 'support',
        label: 'Help & Support',
        path: '#',
        icon: <HiOutlineQuestionMarkCircle />
    }
]