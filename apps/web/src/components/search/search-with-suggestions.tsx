import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSuggestions } from "@/hooks/api/use-search";

const SUGGESTION_BLUR_DELAY = 200; // Delay in milliseconds before hiding suggestions

type SearchWithSuggestionsProps = {
  value: string;
  onChange: (value: string) => void;
  onSuggestionSelect: (suggestion: string) => void;
  label?: string;
  placeholder?: string;
};

export function SearchWithSuggestions({
  value,
  onChange,
  onSuggestionSelect,
  label = "Search Query",
  placeholder = "Enter search query...",
}: SearchWithSuggestionsProps) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { data: suggestions, isLoading } = useSuggestions(
    { q: value },
    showSuggestions && value.length >= 2
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion: string) => {
    onSuggestionSelect(suggestion);
    setShowSuggestions(false);
  };

  const handleBlur = () => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => setShowSuggestions(false), SUGGESTION_BLUR_DELAY);
  };

  const handleFocus = () => {
    if (value.length >= 2) {
      setShowSuggestions(true);
    }
  };

  return (
    <div>
      <Label htmlFor="search-input">{label}</Label>
      <div className="relative">
        <Input
          id="search-input"
          onBlur={handleBlur}
          onChange={handleInputChange}
          onFocus={handleFocus}
          placeholder={placeholder}
          value={value}
        />
        {showSuggestions &&
          suggestions &&
          suggestions.suggestions.length > 0 && (
            <div className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow-lg dark:bg-black">
              {suggestions.suggestions.map((suggestion: string) => (
                <button
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-800"
                  key={suggestion}
                  onClick={() => handleSuggestionClick(suggestion)}
                  type="button"
                >
                  {suggestion}
                </button>
              ))}
              {isLoading && (
                <div className="px-4 py-2 text-muted-foreground text-sm">
                  Loading suggestions...
                </div>
              )}
            </div>
          )}
      </div>
    </div>
  );
}
