import { cva, type VariantProps } from "class-variance-authority"
import {
  Button as AriaButton,
  composeRenderProps,
  type ButtonProps as AriaButtonProps,
} from "react-aria-components"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors",
    /* Disabled */
    "data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ",
    /* Focus Visible */
    "data-[focus-visible]:outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-blue-8 data-[focus-visible]:ring-offset-2",
    /* Resets */
    "focus-visible:outline-none",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-blue-a-9 text-blue-contrast data-[hovered]:bg-blue-a-10 data-[pressed]:bg-blue-a-10 data-[pressed]:brightness-[1.08]",
        destructive:
          "bg-red-9 data-[focus-visible]:ring-red-8 text-blue-contrast data-[hovered]:bg-red-10 data-[pressed]:bg-red-10 data-[pressed]:brightness-[0.92] data-[pressed]:saturate-[1.1]",
        outline:
          "text-blue-a-11 border border-blue-a-8 data-[pressed]:bg-blue-a-3 data-[hovered]:bg-blue-a-2",
        secondary:
          "bg-blue-a-3 text-blue-a-11 data-[hovered]:bg-blue-a-4 data-[pressed]:bg-blue-a-5",
        ghost: "data-[hovered]:bg-gray-a-3 data-[hovered]:text-gray-12",
        link: "underline-offset-4 data-[hovered]:underline",
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

interface ButtonProps
  extends AriaButtonProps,
    VariantProps<typeof buttonVariants> {}

const Button = ({ className, variant, size, ...props }: ButtonProps) => {
  return (
    <AriaButton
      className={composeRenderProps(className, (className) =>
        cn(
          buttonVariants({
            variant,
            size,
            className,
          })
        )
      )}
      {...props}
    />
  )
}

export { Button, buttonVariants }
export type { ButtonProps }
