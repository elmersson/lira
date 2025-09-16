import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';

import { Image, Pressable, View } from '@/components/ui';

interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
  isLargeScreen: boolean;
}

export const Header = ({
  onMenuToggle,
  isMenuOpen,
  isLargeScreen,
}: HeaderProps) => {
  return (
    <View className="flex-row items-center justify-between bg-white px-6 py-4">
      {/* Logo/Brand */}
      {!isLargeScreen ? (
        <View className="flex-row items-center gap-2">
          <Link href="/">
            <Image
              source={require('../../../../assets/icon.png')}
              className="size-10"
            />
          </Link>
        </View>
      ) : (
        <></>
      )}

      {/* Hamburger Menu Button - Only visible on small screens */}
      <Pressable
        onPress={onMenuToggle}
        className="rounded-md p-2 hover:bg-gray-100 lg:hidden"
      >
        <Ionicons
          name={isMenuOpen ? 'close' : 'menu'}
          size={24}
          color="#374151"
        />
      </Pressable>

      {/* Desktop Navigation - Hidden on small screens */}
      <View className="hidden lg:flex lg:flex-row lg:items-center lg:space-x-6"></View>
    </View>
  );
};
