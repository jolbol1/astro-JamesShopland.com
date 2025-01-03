import { Button, type ButtonProps } from "@/components/ui/button"

export function DarkModeButton(props: ButtonProps) {
  return (
    <Button
      onPress={() => {
        const element = document.documentElement
        element.classList.toggle("dark")

        const isDark = element.classList.contains("dark")
        localStorage.setItem("theme", isDark ? "dark" : "light")
      }}
      className="overflow-hidden bg-blue-surface"
      variant="outline"
      size="icon"
      id="theme-toggle"
      {...props}
    >
      <div className="relative size-8">
        <span
          className="absolute inset-0 top-1 rotate-90 transition duration-1000 motion-reduce:duration-0 dark:rotate-0"
          style={{ transformOrigin: "50% 100px" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="mx-auto size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
            ></path>
          </svg>
        </span>
        <span
          className="absolute inset-0 top-1 rotate-0 transition duration-1000 motion-reduce:duration-0 dark:-rotate-90"
          style={{ transformOrigin: "50% 100px" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="mx-auto size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            ></path>
          </svg>
        </span>
      </div>
      <p className="sr-only">Toggle theme</p>
    </Button>
  )
}
