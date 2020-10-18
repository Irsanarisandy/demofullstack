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
