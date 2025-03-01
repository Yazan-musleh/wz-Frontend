export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  role?: string[];
  isMainParent?: boolean;
}

export const NavigationItems: NavigationItem[] = [
  
  {
    id: 'page',
    title: 'Pages',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'Authentication',
        title: 'Authentication',
        type: 'collapse',
        icon: 'ti ti-key',
        children: [
          {
            id: 'login',
            title: 'Login',
            type: 'item',
            url: '/guest/login',
            target: true,
            breadcrumbs: false
           }
          // {
          //   id: 'dashboard',
          //   title: 'Dashboard',
          //   type: 'group',
          //   target: true,
          //   breadcrumbs: false,
          //   icon: 'icon-navigation',
          //   children: [
          //     {
          //       id: 'default',
          //       title: 'Dashboard',
          //       type: 'item',
          //       classes: 'nav-item',
          //       url: '/default',
          //       icon: 'ti ti-dashboard',
          //       breadcrumbs: false
          //     }
          //   ]
          // },
         
        ]
      }
    ]
  },
  {
    id: 'elements',
    title: 'groups',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'typography',
        title: 'Add members',
        type: 'item',
        classes: 'nav-item',
        url: '/add_members',
        icon: 'ti ti-typography'
      },
      {
        id: 'typography',
        title: 'Get members',
        type: 'item',
        classes: 'nav-item',
        url: '/get_members',
        icon: 'ti ti-typography'
      }
    ]
  },
  {
    id: 'messaging',
    title: 'Messaging',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'sample-page',
        title: 'Broadcast messages',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'ti ti-brand-chrome'
      }
    ]
  },{
    id: 'other',
    title: 'Other',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'document',
        title: 'Documentation',
        type: 'item',
        classes: 'nav-item',
        url: '/sample-page',
        icon: 'ti ti-vocabulary',
        target: true,
        external: true
      }
    ]
  }
];
