import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type UserPageProps = {
  params: {
    id: string;
  };
};

export default function UserPage({ params }: UserPageProps) {
  // In a real app, you'd fetch user data based on params.id
  const userId = params.id;

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/users">
            <button
              className="flex h-8 w-8 items-center justify-center rounded-md border hover:bg-muted"
              type="button"
            >
              ←
            </button>
          </Link>
          <h2 className="font-bold text-3xl tracking-tight">User Details</h2>
        </div>
        <div className="flex space-x-2">
          <Link href={`/dashboard/users/${userId}/edit`}>
            <button
              className="h-10 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm hover:bg-primary/90"
              type="button"
            >
              Edit User
            </button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
            <CardDescription>Basic user details and profile</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-500 font-medium text-2xl text-white">
                🧑‍💻
              </div>
              <div>
                <h3 className="font-semibold text-lg">John Doe</h3>
                <p className="text-muted-foreground">john.doe@company.com</p>
                <p className="text-muted-foreground text-sm">
                  User ID: {userId}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-sm">Username</p>
                <p className="text-muted-foreground">john_doe</p>
              </div>
              <div>
                <p className="font-medium text-sm">Status</p>
                <span className="rounded bg-green-100 px-2 py-1 text-green-800 text-sm">
                  Active
                </span>
              </div>
              <div>
                <p className="font-medium text-sm">Team</p>
                <Link
                  className="text-blue-600 hover:underline"
                  href="/dashboard/teams/1"
                >
                  Team Alpha
                </Link>
              </div>
              <div>
                <p className="font-medium text-sm">Joined</p>
                <p className="text-muted-foreground">Jan 15, 2024</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity Summary</CardTitle>
            <CardDescription>
              User performance and contributions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="font-bold text-2xl text-blue-600">12</p>
                <p className="text-muted-foreground text-sm">Authored Tasks</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-2xl text-green-600">8</p>
                <p className="text-muted-foreground text-sm">Assigned Tasks</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-2xl text-purple-600">24</p>
                <p className="text-muted-foreground text-sm">Comments</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-2xl text-orange-600">6</p>
                <p className="text-muted-foreground text-sm">Attachments</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Tasks</CardTitle>
          <CardDescription>
            Tasks authored or assigned to this user
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Link href="/dashboard/tasks/1">
              <div className="flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">🚀</span>
                  <div>
                    <p className="font-medium">Implement user authentication</p>
                    <p className="text-muted-foreground text-sm">
                      Project Alpha • Authored
                    </p>
                  </div>
                </div>
                <span className="rounded bg-yellow-100 px-2 py-1 text-sm text-yellow-800">
                  In Progress
                </span>
              </div>
            </Link>

            <Link href="/dashboard/tasks/2">
              <div className="flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">🎨</span>
                  <div>
                    <p className="font-medium">Design system updates</p>
                    <p className="text-muted-foreground text-sm">
                      Project Beta • Assigned
                    </p>
                  </div>
                </div>
                <span className="rounded bg-green-100 px-2 py-1 text-green-800 text-sm">
                  Completed
                </span>
              </div>
            </Link>

            <Link href="/dashboard/tasks/3">
              <div className="flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors hover:bg-muted/50">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">📝</span>
                  <div>
                    <p className="font-medium">Update documentation</p>
                    <p className="text-muted-foreground text-sm">
                      Project Alpha • Authored
                    </p>
                  </div>
                </div>
                <span className="rounded bg-red-100 px-2 py-1 text-red-800 text-sm">
                  High Priority
                </span>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
