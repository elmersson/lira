import { View } from 'react-native';

interface WebLayoutProps {
  children: React.ReactNode;
}

export const WebLayout = ({ children }: WebLayoutProps) => {
  return (
    <View className="min-h-screen bg-white">
      {/* Main Content Area with Header and Sidebar on same row */}
      <View className="flex min-h-screen flex-row">
        {/* Sidebar */}
        <View className="flex min-h-screen flex-1 flex-col">
          {/* Header */}
          <View className="flex-1">{children}</View>
        </View>
      </View>
    </View>
  );
};
