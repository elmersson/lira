import { Link, usePathname, useRouter } from 'expo-router';
import React from 'react';
import { twMerge } from 'tailwind-merge';

import { Image, Pressable, View } from '@/components/ui';

import { NavigationItem } from './navigation-item';
import type { NavigationHref, SidebarProps } from './types';

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (href: NavigationHref) => {
    router.push(href);
    // Close sidebar on mobile after navigation
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <Pressable
          onPress={onClose}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <View
        className={twMerge(
          'fixed left-0 top-0 z-50 h-full w-64 transform bg-white transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:static lg:z-auto lg:translate-x-0'
        )}
      >
        {/* Sidebar Header */}
        <View className="p-6">
          <Link href="/">
            <Image
              source={require('../../../../assets/icon.png')}
              className="size-10"
            />
          </Link>
        </View>

        {/* Navigation Items */}
        <NavigationItem
          pathname={pathname}
          handleNavigation={handleNavigation}
        />
      </View>
    </>
  );
};
