import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Theme = "light" | "dark" | "system";

export type UserSettings = {
  // Theme settings
  theme: Theme;

  // UI preferences
  sidebarCollapsed: boolean;
  sidebarWidth: number;

  // Notification preferences
  notifications: {
    email: boolean;
    push: boolean;
    desktop: boolean;
  };

  // Privacy settings
  privacy: {
    analytics: boolean;
    crashReports: boolean;
  };

  // Accessibility settings
  accessibility: {
    reducedMotion: boolean;
    highContrast: boolean;
    fontSize: "small" | "medium" | "large";
  };
};

export type UserSettingsActions = {
  setTheme: (theme: Theme) => void;
  toggleSidebar: () => void;
  setSidebarWidth: (width: number) => void;
  updateNotifications: (
    notifications: Partial<UserSettings["notifications"]>
  ) => void;
  updatePrivacy: (privacy: Partial<UserSettings["privacy"]>) => void;
  updateAccessibility: (
    accessibility: Partial<UserSettings["accessibility"]>
  ) => void;
  resetSettings: () => void;
};

export type UserSettingsStore = UserSettings & UserSettingsActions;

const defaultSettings: UserSettings = {
  theme: "system",
  sidebarCollapsed: false,
  sidebarWidth: 256,
  notifications: {
    email: true,
    push: true,
    desktop: true,
  },
  privacy: {
    analytics: true,
    crashReports: true,
  },
  accessibility: {
    reducedMotion: false,
    highContrast: false,
    fontSize: "medium",
  },
};

export const useUserSettings = create<UserSettingsStore>()(
  persist(
    (set, get) => ({
      ...defaultSettings,

      setTheme: (theme) => set({ theme }),

      toggleSidebar: () =>
        set((state) => ({
          sidebarCollapsed: !state.sidebarCollapsed,
        })),

      setSidebarWidth: (width) => set({ sidebarWidth: width }),

      updateNotifications: (notifications) =>
        set((state) => ({
          notifications: { ...state.notifications, ...notifications },
        })),

      updatePrivacy: (privacy) =>
        set((state) => ({
          privacy: { ...state.privacy, ...privacy },
        })),

      updateAccessibility: (accessibility) =>
        set((state) => ({
          accessibility: { ...state.accessibility, ...accessibility },
        })),

      resetSettings: () => set(defaultSettings),
    }),
    {
      name: "user-settings-storage",
      version: 1,
      // Only persist certain settings, exclude sensitive data if needed
      partialize: (state) => ({
        theme: state.theme,
        sidebarCollapsed: state.sidebarCollapsed,
        sidebarWidth: state.sidebarWidth,
        notifications: state.notifications,
        privacy: state.privacy,
        accessibility: state.accessibility,
      }),
      // Handle rehydration
      onRehydrateStorage: () => (state) => {
        if (state) {
          console.log("User settings rehydrated:", state);
        }
      },
    }
  )
);

// Selectors for common use cases
export const useTheme = () => useUserSettings((state) => state.theme);
export const useSetTheme = () => useUserSettings((state) => state.setTheme);
export const useSidebarCollapsed = () =>
  useUserSettings((state) => state.sidebarCollapsed);
export const useToggleSidebar = () =>
  useUserSettings((state) => state.toggleSidebar);
export const useNotifications = () =>
  useUserSettings((state) => state.notifications);
export const useUpdateNotifications = () =>
  useUserSettings((state) => state.updateNotifications);
