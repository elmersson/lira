import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UsersPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="font-bold text-3xl tracking-tight">Users Management</h2>
        <Link href="/dashboard/users/new">
          <button className="h-10 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm hover:bg-primary/90">
            Add User
          </button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Total Users</CardTitle>
            <span className="text-2xl">👥</span>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">24</div>
            <p className="text-muted-foreground text-xs">+2 new this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">Active Users</CardTitle>
            <span className="text-2xl">🟢</span>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">18</div>
            <p className="text-muted-foreground text-xs">75% active rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Product Owners
            </CardTitle>
            <span className="text-2xl">👑</span>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">4</div>
            <p className="text-muted-foreground text-xs">Across all teams</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="font-medium text-sm">
              Project Managers
            </CardTitle>
            <span className="text-2xl">📋</span>
          </CardHeader>
          <CardContent>
            <div className="font-bold text-2xl">6</div>
            <p className="text-muted-foreground text-xs">Managing projects</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>User List</CardTitle>
          <CardDescription>
            Manage user accounts and permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Link href="/dashboard/users/1">
              <div className="flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50">
                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 font-medium text-white">
                    🧑‍💻
                  </div>
                  <div>
                    <p className="font-medium">John Doe</p>
                    <p className="text-muted-foreground text-sm">
                      john.doe@company.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="rounded bg-green-100 px-2 py-1 text-green-800 text-sm">
                    Active
                  </span>
                  <span className="rounded bg-blue-100 px-2 py-1 text-blue-800 text-sm">
                    Team Alpha
                  </span>
                </div>
              </div>
            </Link>

            <Link href="/dashboard/users/2">
              <div className="flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50">
                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-500 font-medium text-white">
                    👩‍🎨
                  </div>
                  <div>
                    <p className="font-medium">Sarah Wilson</p>
                    <p className="text-muted-foreground text-sm">
                      sarah.wilson@company.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="rounded bg-green-100 px-2 py-1 text-green-800 text-sm">
                    Active
                  </span>
                  <span className="rounded bg-purple-100 px-2 py-1 text-purple-800 text-sm">
                    Team Beta
                  </span>
                </div>
              </div>
            </Link>

            <Link href="/dashboard/users/3">
              <div className="flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50">
                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-500 font-medium text-white">
                    🚀
                  </div>
                  <div>
                    <p className="font-medium">Mike Chen</p>
                    <p className="text-muted-foreground text-sm">
                      mike.chen@company.com
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="rounded bg-yellow-100 px-2 py-1 text-sm text-yellow-800">
                    Away
                  </span>
                  <span className="rounded bg-green-100 px-2 py-1 text-green-800 text-sm">
                    Team Gamma
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
