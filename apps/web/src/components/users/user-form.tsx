"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  type CreateUserForm,
  createUserSchema,
  type UpdateUserForm,
  type User,
  updateUserSchema,
} from "@/lib/types/user";

type UserFormProps = {
  mode: "create" | "update";
  initialData?: User;
  onSubmit: (data: CreateUserForm | UpdateUserForm) => void;
  isLoading?: boolean;
};

export function UserForm({
  mode,
  initialData,
  onSubmit,
  isLoading = false,
}: UserFormProps) {
  const schema = mode === "create" ? createUserSchema : updateUserSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserForm | UpdateUserForm>({
    resolver: zodResolver(schema),
    defaultValues: initialData
      ? {
          cognitoId: initialData.cognitoId,
          username: initialData.username,
          emoji: initialData.emoji || "",
          profilePictureUrl: initialData.profilePictureUrl || "",
          teamId: initialData.teamId,
        }
      : {
          cognitoId: "",
          username: "",
          emoji: "",
          profilePictureUrl: "",
        },
  });

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="cognitoId">Cognito ID {mode === "create" && "*"}</Label>
        <Input
          id="cognitoId"
          {...register("cognitoId")}
          placeholder="Enter Cognito ID"
        />
        {errors.cognitoId && (
          <p className="text-destructive text-sm">{errors.cognitoId.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="username">Username {mode === "create" && "*"}</Label>
        <Input
          id="username"
          {...register("username")}
          placeholder="Enter username"
        />
        {errors.username && (
          <p className="text-destructive text-sm">{errors.username.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="emoji">Emoji</Label>
        <Input
          id="emoji"
          {...register("emoji")}
          maxLength={10}
          placeholder="👤"
        />
        {errors.emoji && (
          <p className="text-destructive text-sm">{errors.emoji.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="profilePictureUrl">Profile Picture URL</Label>
        <Input
          id="profilePictureUrl"
          {...register("profilePictureUrl")}
          placeholder="Enter profile picture URL"
          type="url"
        />
        {errors.profilePictureUrl && (
          <p className="text-destructive text-sm">
            {errors.profilePictureUrl.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="teamId">Team ID</Label>
        <Input
          id="teamId"
          {...register("teamId", {
            setValueAs: (value) => {
              if (value === "" || value === null || value === undefined) {
                return;
              }
              const num = Number(value);
              return Number.isNaN(num) ? undefined : num;
            },
          })}
          placeholder="Enter team ID"
          type="number"
        />
        {errors.teamId && (
          <p className="text-destructive text-sm">{errors.teamId.message}</p>
        )}
      </div>

      <Button className="w-full" disabled={isLoading} type="submit">
        {isLoading
          ? "Saving..."
          : `${mode === "create" ? "Create" : "Update"} User`}
      </Button>
    </form>
  );
}
