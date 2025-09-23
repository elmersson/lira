"use client";

import { Bell, Eye, Monitor, Palette, Shield } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  useNotifications,
  useSetTheme,
  useUserSettings as useSettings,
  useSidebarCollapsed,
  useTheme,
  useToggleSidebar,
  useUpdateNotifications,
  useUserSettings,
} from "@/store/user-settings";

export default function Settings() {
  const theme = useTheme();
  const setTheme = useSetTheme();
  const sidebarCollapsed = useSidebarCollapsed();
  const toggleSidebar = useToggleSidebar();
  const notifications = useNotifications();
  const updateNotifications = useUpdateNotifications();
  const settings = useSettings();

  return (
    <div className="container mx-auto space-y-6 p-6">
      <div>
        <h1 className="font-bold text-3xl">Settings</h1>
        <p className="text-muted-foreground">
          Manage your application preferences and personalization options.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Appearance
            </CardTitle>
            <CardDescription>
              Customize the look and feel of your application
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Theme</Label>
                <p className="text-muted-foreground text-sm">
                  Choose your preferred color scheme
                </p>
              </div>
              <ModeToggle />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>Sidebar</Label>
                <p className="text-muted-foreground text-sm">
                  Toggle sidebar visibility
                </p>
              </div>
              <Button onClick={toggleSidebar} variant="outline">
                {sidebarCollapsed ? "Show" : "Hide"} Sidebar
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            <CardDescription>
              Configure how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={notifications.email}
                id="email-notifications"
                onCheckedChange={(checked) =>
                  updateNotifications({ email: checked as boolean })
                }
              />
              <Label htmlFor="email-notifications">Email notifications</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                checked={notifications.push}
                id="push-notifications"
                onCheckedChange={(checked) =>
                  updateNotifications({ push: checked as boolean })
                }
              />
              <Label htmlFor="push-notifications">Push notifications</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                checked={notifications.desktop}
                id="desktop-notifications"
                onCheckedChange={(checked) =>
                  updateNotifications({ desktop: checked as boolean })
                }
              />
              <Label htmlFor="desktop-notifications">
                Desktop notifications
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Privacy
            </CardTitle>
            <CardDescription>
              Control your privacy and data sharing preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={settings.privacy.analytics}
                id="analytics"
                onCheckedChange={(checked) =>
                  settings.updatePrivacy({ analytics: checked as boolean })
                }
              />
              <Label htmlFor="analytics">Allow analytics</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                checked={settings.privacy.crashReports}
                id="crash-reports"
                onCheckedChange={(checked) =>
                  settings.updatePrivacy({ crashReports: checked as boolean })
                }
              />
              <Label htmlFor="crash-reports">Send crash reports</Label>
            </div>
          </CardContent>
        </Card>

        {/* Accessibility Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Accessibility
            </CardTitle>
            <CardDescription>
              Adjust settings for better accessibility
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={settings.accessibility.reducedMotion}
                id="reduced-motion"
                onCheckedChange={(checked) =>
                  settings.updateAccessibility({
                    reducedMotion: checked as boolean,
                  })
                }
              />
              <Label htmlFor="reduced-motion">Reduce motion</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                checked={settings.accessibility.highContrast}
                id="high-contrast"
                onCheckedChange={(checked) =>
                  settings.updateAccessibility({
                    highContrast: checked as boolean,
                  })
                }
              />
              <Label htmlFor="high-contrast">High contrast mode</Label>
            </div>
          </CardContent>
        </Card>

        {/* Reset Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Reset Settings</CardTitle>
            <CardDescription>
              Reset all settings to their default values
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={settings.resetSettings} variant="destructive">
              Reset All Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
