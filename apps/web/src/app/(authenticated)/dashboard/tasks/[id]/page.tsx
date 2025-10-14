import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type TaskPageProps = {
  params: {
    id: string;
  };
};

export default function TaskPage({ params }: TaskPageProps) {
  const taskId = params.id;

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/tasks">
            <button
              className="flex h-8 w-8 items-center justify-center rounded-md border hover:bg-muted"
              type="button"
            >
              ←
            </button>
          </Link>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🔐</span>
            <h2 className="font-bold text-3xl tracking-tight">Task Details</h2>
          </div>
        </div>
        <div className="flex space-x-2">
          <Link href={`/dashboard/tasks/${taskId}/edit`}>
            <button
              className="h-10 rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground text-sm hover:bg-primary/90"
              type="button"
            >
              Edit Task
            </button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Task Information</CardTitle>
            <CardDescription>Task details and metadata</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium text-sm">Title</p>
              <p className="text-lg">Implement user authentication</p>
            </div>
            <div>
              <p className="font-medium text-sm">Description</p>
              <p className="text-muted-foreground">
                Implement secure user authentication system with JWT tokens,
                password hashing, and session management.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-sm">Status</p>
                <span className="rounded bg-yellow-100 px-2 py-1 text-sm text-yellow-800">
                  In Progress
                </span>
              </div>
              <div>
                <p className="font-medium text-sm">Priority</p>
                <span className="rounded bg-red-100 px-2 py-1 text-red-800 text-sm">
                  High
                </span>
              </div>
              <div>
                <p className="font-medium text-sm">Points</p>
                <p className="text-muted-foreground">5</p>
              </div>
              <div>
                <p className="font-medium text-sm">Tags</p>
                <p className="text-muted-foreground">
                  authentication, security
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Assignment & Timeline</CardTitle>
            <CardDescription>Task assignment and dates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-medium text-sm">Project</p>
              <Link
                className="text-blue-600 hover:underline"
                href="/dashboard/projects/1"
              >
                Project Alpha
              </Link>
            </div>
            <div>
              <p className="font-medium text-sm">Author</p>
              <Link
                className="text-blue-600 hover:underline"
                href="/dashboard/users/1"
              >
                John Doe
              </Link>
            </div>
            <div>
              <p className="font-medium text-sm">Assignee</p>
              <Link
                className="text-blue-600 hover:underline"
                href="/dashboard/users/2"
              >
                Sarah Wilson
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-sm">Start Date</p>
                <p className="text-muted-foreground">Oct 10, 2024</p>
              </div>
              <div>
                <p className="font-medium text-sm">Due Date</p>
                <p className="text-muted-foreground">Oct 25, 2024</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Task Assignments</CardTitle>
            <CardDescription>Additional team members assigned</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-sm text-white">
                  JD
                </div>
                <div>
                  <p className="font-medium text-sm">John Doe</p>
                  <p className="text-muted-foreground text-xs">
                    Primary assignee
                  </p>
                </div>
              </div>
              <span className="rounded bg-green-100 px-2 py-1 text-green-800 text-xs">
                Active
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500 text-sm text-white">
                  SW
                </div>
                <div>
                  <p className="font-medium text-sm">Sarah Wilson</p>
                  <p className="text-muted-foreground text-xs">Collaborator</p>
                </div>
              </div>
              <span className="rounded bg-blue-100 px-2 py-1 text-blue-800 text-xs">
                Reviewer
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Attachments</CardTitle>
            <CardDescription>
              Files and documents related to this task
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center space-x-3">
                <span className="text-lg">📄</span>
                <div>
                  <p className="font-medium text-sm">auth_requirements.pdf</p>
                  <p className="text-muted-foreground text-xs">
                    Uploaded by John Doe • 2.4 MB
                  </p>
                </div>
              </div>
              <button
                className="text-blue-600 text-sm hover:underline"
                type="button"
              >
                Download
              </button>
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
              <div className="flex items-center space-x-3">
                <span className="text-lg">🖼️</span>
                <div>
                  <p className="font-medium text-sm">login_mockup.png</p>
                  <p className="text-muted-foreground text-xs">
                    Uploaded by Sarah Wilson • 1.2 MB
                  </p>
                </div>
              </div>
              <button
                className="text-blue-600 text-sm hover:underline"
                type="button"
              >
                Download
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Comments</CardTitle>
          <CardDescription>Task discussion and updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="rounded-lg border p-4">
              <div className="mb-2 flex items-center space-x-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-white text-xs">
                  JD
                </div>
                <span className="font-medium text-sm">John Doe</span>
                <span className="text-muted-foreground text-xs">
                  2 hours ago
                </span>
              </div>
              <p className="text-sm">
                Started working on the JWT implementation. I've set up the basic
                structure and dependencies.
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <div className="mb-2 flex items-center space-x-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-500 text-white text-xs">
                  SW
                </div>
                <span className="font-medium text-sm">Sarah Wilson</span>
                <span className="text-muted-foreground text-xs">
                  1 hour ago
                </span>
              </div>
              <p className="text-sm">
                Great progress! I've uploaded the login page mockup. Let me know
                if you need any clarifications on the design.
              </p>
            </div>

            <div className="rounded-lg border p-4">
              <div className="mb-2 flex items-center space-x-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-white text-xs">
                  MC
                </div>
                <span className="font-medium text-sm">Mike Chen</span>
                <span className="text-muted-foreground text-xs">
                  30 minutes ago
                </span>
              </div>
              <p className="text-sm">
                I've reviewed the security requirements document. Make sure to
                implement rate limiting for login attempts.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
