"use client";
import {
  CreditCard,
  FileText,
  FolderOpen,
  Settings,
  User,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import {
  CommandDialog as CommandDialogPrimitive,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useSearch, useSuggestions } from "@/hooks/api/use-search";
import { Spinner } from "./ui/spinner";

export function CommandDialog({
  open: externalOpen,
  onOpenChange: externalOnOpenChange,
}: {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
} = {}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const open = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = externalOnOpenChange || setInternalOpen;

  const { data: searchResults, isLoading: isSearchLoading } = useSearch(
    {
      q: searchQuery,
      type: "all",
      limit: 10,
      offset: 0,
    },
    searchQuery.length >= 2
  );

  const { data: suggestions, isLoading: isSuggestionsLoading } = useSuggestions(
    { q: searchQuery },
    searchQuery.length >= 2
  );

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, setOpen]);

  console.log({ searchResults, suggestions, searchQuery });

  return (
    <CommandDialogPrimitive onOpenChange={setOpen} open={open}>
      <CommandInput
        onValueChange={setSearchQuery}
        placeholder="Type a command or search..."
      />
      <CommandList key={`${searchQuery}`}>
        <div key={searchResults?.results.total}>
          <CommandEmpty>No results found.</CommandEmpty>

          {searchQuery.length >= 2 && (
            <>
              <CommandGroup heading="Suggestions">
                {isSuggestionsLoading && (
                  <CommandItem>
                    <Spinner />
                  </CommandItem>
                )}
                {suggestions?.suggestions?.map((item) => (
                  <CommandItem key={`suggestion-${item}`}>
                    <span>{item}</span>
                  </CommandItem>
                ))}
                {suggestions &&
                  suggestions.suggestions.length === 0 &&
                  !isSuggestionsLoading && (
                    <CommandItem>No suggestions found.</CommandItem>
                  )}
              </CommandGroup>
              <CommandSeparator />

              <CommandGroup heading="Results">
                {isSearchLoading && (
                  <CommandItem>
                    <Spinner />
                  </CommandItem>
                )}
                {searchResults?.results.projects?.map((item) => (
                  <CommandItem key={`project-${item.id}`}>
                    <FolderOpen className="mr-2 h-4 w-4" />
                    <span>{item.name}</span>
                  </CommandItem>
                ))}
                {searchResults?.results.tasks?.map((item) => (
                  <CommandItem key={`task-${item.id}`}>
                    <FileText className="mr-2 h-4 w-4" />
                    <span>{item.title}</span>
                  </CommandItem>
                ))}
                {searchResults?.results.users?.map((item) => (
                  <CommandItem key={`user-${item.userId}`}>
                    <User className="mr-2 h-4 w-4" />
                    <span>{item.username}</span>
                  </CommandItem>
                ))}
                {searchResults?.results.teams?.map((item) => (
                  <CommandItem key={`team-${item.id}`}>
                    <Users className="mr-2 h-4 w-4" />
                    <span>{item.teamName}</span>
                  </CommandItem>
                ))}
                {searchResults &&
                  searchResults.results.total === 0 &&
                  !isSearchLoading && (
                    <CommandItem>No search results found.</CommandItem>
                  )}
              </CommandGroup>
              <CommandSeparator />
            </>
          )}

          <CommandGroup heading="Settings">
            <CommandItem>
              <User />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <CreditCard />
              <span>Billing</span>
              <CommandShortcut>⌘B</CommandShortcut>
            </CommandItem>
            <CommandItem>
              <Settings />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </div>
      </CommandList>
    </CommandDialogPrimitive>
  );
}
