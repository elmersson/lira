import { Ionicons } from '@expo/vector-icons';
import { twMerge } from 'tailwind-merge';

import { Pressable, Text, View } from '@/components/ui';
import colors from '@/components/ui/colors';

import { type NavigationHref, navigationItems } from './types';

export const NavigationItem = ({
  pathname,
  handleNavigation,
}: {
  pathname: string;
  handleNavigation: (href: NavigationHref) => void;
}) => {
  return (
    <View className="flex-1">
      <View className="space-y-2">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Pressable
              key={item.name}
              onPress={() => handleNavigation(item.href)}
              className={twMerge(
                'flex-row items-center gap-5 transition-colors',
                isActive
                  ? 'bg-primary-200 text-primary-700 '
                  : 'text-gray-700 hover:bg-gray-50'
              )}
            >
              <View
                className={twMerge(
                  'h-11 w-1 rounded-full rounded-l-lg bg-primary-800',
                  isActive ? 'bg-primary-800' : 'bg-transparent'
                )}
              />
              <View className="flex-row items-center gap-2">
                <Ionicons
                  name={isActive ? item.focusedIcon : item.icon}
                  size={20}
                  color={colors.charcoal[900]}
                />
                <Text className="text-sm font-medium">{item.name}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};
