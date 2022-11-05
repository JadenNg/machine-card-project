export default [
    {
        _name: 'CSidebarNav',
        _children: [
            // {
            //   _name: 'CSidebarNavItem',
            //   name: 'Dashboard',
            //   to: '/dashboard',
            //   icon: 'cil-speedometer',
            //   badge: {
            //     color: 'primary',
            //     text: 'NEW'
            //   }
            // },
            {
                _name: 'CSidebarNavTitle',
                _children: ['Chức Năng']
            },
            {
                _name: 'CSidebarNavItem',
                name: 'Danh sách phản ánh',
                to: 'sentiments',
                icon: 'cil-list'
            },

            {
                _name: 'CSidebarNavItem',
                name: 'Danh sách văn bản',
                to: 'docs',
                icon: 'cil-list'
            },
            {
                _name: 'CSidebarNavItem',
                name: 'Danh sách quyết định',
                to: 'decisions',
                icon: 'cil-list'
            },
            {
                _name: 'CSidebarNavItem',
                name: 'Danh sách người dùng',
                to: 'users',
                icon: 'cil-list'
            },
            //
            // {
            //   _name: 'CSidebarNavItem',
            //   name: 'Try CoreUI PRO',
            //   href: 'http://coreui.io/pro/vue/',
            //   icon: { name: 'cil-layers', class: 'text-white' },
            //   _class: 'bg-danger text-white',
            //   target: '_blank'
            // }
        ]
    }
]