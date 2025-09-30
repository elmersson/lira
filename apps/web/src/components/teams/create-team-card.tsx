import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TeamForm } from "./team-form";

export function CreateTeamCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="rounded bg-blue-100 px-2 py-1 font-mono text-blue-800 text-xs">
            POST
          </span>
          /teams
        </CardTitle>
        <CardDescription>Create a new team</CardDescription>
      </CardHeader>
      <CardContent>
        <TeamForm />
      </CardContent>
    </Card>
  );
}
