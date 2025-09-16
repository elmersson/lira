import { useEffect, useState } from 'react';
import { View } from 'react-native';

import { Header } from './header/header';
import { Sidebar } from './sidebar/sidebar';

interface WebLayoutProps {
  children: React.ReactNode;
}

export const WebLayout = ({ children }: WebLayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  return (
    <View className="min-h-screen bg-white">
      {/* Main Content Area with Header and Sidebar on same row */}
      <View className="flex min-h-screen flex-row">
        {/* Sidebar */}
        <Sidebar isOpen={isMenuOpen} onClose={closeMenu} />
        <View className="flex min-h-screen flex-1 flex-col">
          {/* Header */}
          <Header
            onMenuToggle={toggleMenu}
            isMenuOpen={isMenuOpen}
            isLargeScreen={isLargeScreen}
          />
          <View className="flex-1">{children}</View>
        </View>
      </View>
    </View>
  );
};
