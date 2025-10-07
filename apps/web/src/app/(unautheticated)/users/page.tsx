"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CreateUserCard } from "@/components/users/create-user-card";
import { DeleteUserCard } from "@/components/users/delete-user-card";
import { GetUserCard } from "@/components/users/get-user-card";
import { UpdateUserCard } from "@/components/users/update-user-card";
import { UserApiMethodsInfo } from "@/components/users/user-api-methods-info";
import { UsersList } from "@/components/users/users-list";

export default function UsersPage() {
  return (
    <div className="container mx-auto max-w-6xl space-y-6 p-4">
      <div className="flex items-center gap-4">
        <Link href="/">
          <Button variant="outline">← Back</Button>
        </Link>
        <h1 className="font-bold text-2xl">Users API</h1>
      </div>

      {/* Users List */}
      <UsersList />

      {/* CRUD Operations Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        <CreateUserCard />
        <GetUserCard />
        <UpdateUserCard />
        <DeleteUserCard />
      </div>

      {/* API Documentation */}
      <UserApiMethodsInfo />
    </div>
  );
}
