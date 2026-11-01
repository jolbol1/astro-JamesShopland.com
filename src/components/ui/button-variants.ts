import { cva } from "class-variance-authority"

/**
 * Plain CSS states rather than React Aria's data attributes, so the same
 * classes style the React buttons and the Astro links that ship no JS.
 * Tailwind's `hover:` only applies on devices that can hover.
 */
export const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors",
    /* Disabled */
    "disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50",
    /* Focus Visible */
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-8 focus-visible:ring-offset-2",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-blue-a-9 text-blue-contrast hover:bg-blue-a-10 active:bg-blue-a-10 active:brightness-[1.08]",
        destructive:
          "bg-red-9 text-blue-contrast focus-visible:ring-red-8 hover:bg-red-10 active:bg-red-10 active:brightness-[0.92] active:saturate-[1.1]",
        outline:
          "border border-blue-a-8 text-blue-a-11 hover:bg-blue-a-2 active:bg-blue-a-3",
        secondary:
          "bg-blue-a-3 text-blue-a-11 hover:bg-blue-a-4 active:bg-blue-a-5",
        ghost: "hover:bg-gray-a-3 hover:text-gray-12",
        link: "underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
