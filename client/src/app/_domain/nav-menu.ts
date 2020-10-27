export interface NavMenu {
  name: string;
  icon: string;
  routerLink: string;
}

export const NavMenuItems: NavMenu[] = [
  { name: 'Matches', icon: 'favorite', routerLink: '/members' },
  { name: 'Lists', icon: 'emoji_people', routerLink: '/lists' },
  { name: 'Messages', icon: 'chat', routerLink: '/messages' },
];

export const AdminMenuItems: NavMenu[] = [
  { name: 'Admin', icon: 'admin_panel_settings', routerLink: '/admin' },
  { name: 'Test Errors', icon: 'error_outline', routerLink: '/test-errors' },
];
