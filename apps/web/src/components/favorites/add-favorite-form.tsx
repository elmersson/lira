"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddFavorite } from "@/hooks/api/use-favorites";

type AddFavoriteFormProps = {
  userId: number;
};

export function AddFavoriteForm({ userId }: AddFavoriteFormProps) {
  const [entityType, setEntityType] = useState<string>("");
  const [entityId, setEntityId] = useState<string>("");
  const addFavorite = useAddFavorite();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!(entityType && entityId)) {
      return;
    }

    addFavorite.mutate(
      {
        userId,
        entityType,
        entityId: Number.parseInt(entityId, 10),
      },
      {
        onSuccess: () => {
          setEntityType("");
          setEntityId("");
        },
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Add Favorite</CardTitle>
        <CardDescription>
          Quickly add any item to your favorites by ID
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="entityType">Type</Label>
            <Select onValueChange={setEntityType} value={entityType}>
              <SelectTrigger>
                <SelectValue placeholder="Select entity type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="project">📁 Project</SelectItem>
                <SelectItem value="task">✅ Task</SelectItem>
                <SelectItem value="team">👥 Team</SelectItem>
                <SelectItem value="user">👤 User</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="entityId">ID</Label>
            <Input
              id="entityId"
              min="1"
              onChange={(e) => setEntityId(e.target.value)}
              placeholder="Enter entity ID"
              type="number"
              value={entityId}
            />
          </div>

          <Button
            className="w-full"
            disabled={!(entityType && entityId) || addFavorite.isPending}
            type="submit"
          >
            {addFavorite.isPending ? "Adding..." : "Add to Favorites"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
