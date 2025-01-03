import { MenuIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Link } from "@/components/ui/link"
import { Separator } from "@/components/ui/separator"

export function MobileNav({ socials }: { socials?: React.ReactNode }) {
  return (
    <>
      <DialogTrigger>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden bg-blue-surface"
        >
          <MenuIcon className="size-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
        <DialogOverlay>
          <DialogContent side="right" className="w-3/4 px-0">
            <>
              <h2 className="mb-4 bg-background pl-4 text-xl font-medium uppercase tracking-widest text-blue-11">
                Navigation
              </h2>{" "}
              <nav>
                <ul className="my-2 flex flex-col gap-4 px-4">
                  <li>
                    <Link
                      href="/blog"
                      variant="link"
                      className="h-fit justify-start p-0 text-lg"
                    >
                      Blog
                    </Link>
                  </li>
                  {/* <li>
                      <Link
                        href="/videos"
                        variant="link"
                        className="h-fit p-0 justify-start text-lg"
                      >
                        Videos
                      </Link>
                    </li> */}
                  <li>
                    <Link
                      href="/about"
                      variant="link"
                      className="h-fit justify-start p-0 text-lg"
                    >
                      About
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className="flex justify-center p-4">
                <Separator className="w-full" />
              </div>
              <h2 className="bg-background  pl-4 text-xl font-medium uppercase tracking-widest text-blue-11">
                Follow Me
              </h2>{" "}
              {socials}
              <div className="h-[calc(100vh-8rem)] overflow-y-auto p-4 pb-10 pt-1"></div>
            </>
          </DialogContent>
        </DialogOverlay>
      </DialogTrigger>
    </>
  )
}
