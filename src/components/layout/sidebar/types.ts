import { type Ionicons } from '@expo/vector-icons';

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export type NavigationHref = '/' | '/settings' | '/style';

type NavigationItem = {
  name: string;
  href: NavigationHref;
  icon: keyof typeof Ionicons.glyphMap;
  focusedIcon: keyof typeof Ionicons.glyphMap;
};

export const navigationItems: NavigationItem[] = [
  {
    name: 'Home',
    href: '/' as NavigationHref,
    icon: 'home-outline',
    focusedIcon: 'home',
  },
  {
    name: 'Settings',
    href: '/settings' as NavigationHref,
    icon: 'settings-outline',
    focusedIcon: 'settings',
  },
  {
    name: 'Style',
    href: '/style' as NavigationHref,
    icon: 'color-palette-outline',
    focusedIcon: 'color-palette',
  },
];
