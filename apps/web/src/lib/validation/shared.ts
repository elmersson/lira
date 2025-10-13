import emojiRegex from "emoji-regex";
import { z } from "zod";

const regex = emojiRegex();

// Shared emoji validation schema - matches backend validation
export const emojiSchema = z
  .string()
  .trim()
  .refine(
    (val) => {
      if (val === "") {
        return true;
      }

      const matches = val.match(regex);
      if (!matches) {
        return false;
      }

      // Check if the entire string is made up of exactly one emoji
      return matches.length === 1 && matches[0] === val;
    },
    {
      message: "Must contain exactly one emoji",
    }
  )
  .optional()
  .or(z.literal(""));

// Export for reuse in other schemas
export { emojiSchema as emoji };
