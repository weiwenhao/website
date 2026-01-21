"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function LandingNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Documents</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {/* <ListItem
                title="Get Started"
                href="/docs/get-started"
              >
              </ListItem> */}

              <ListItem
                title="Syntax"
                href="/docs/syntax"
              >
                Syntax Documentation
              </ListItem>

              <ListItem
                title="Std Library"
                href="/stds"
              >
                Standard Library Documentation
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs/contribute" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Contribute
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/news" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              News
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/blog" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Blog
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem
                title="Dbdriver"
                href="https://github.com/weiwenhao/dbdriver"
                target="_blank"
                rel="noopener noreferrer"
              >
                mysql/postgresql/redis driver
              </ListItem>
              <ListItem
                title="API Framework"
                href="https://github.com/weiwenhao/emoji-api"
                target="_blank"
                rel="noopener noreferrer"
              >
                Although this is a RESTful api example, it can be used as a api framework.
              </ListItem>
              <ListItem
                title="Parker"
                href="https://github.com/weiwenhao/parker"
                target="_blank"
                rel="noopener noreferrer"
              >
                Lightweight packaging tool
              </ListItem>
              <ListItem
                title="Llama.n"
                href="https://github.com/weiwenhao/llama.n"
                target="_blank"
                rel="noopener noreferrer"
              >
                Llama2 implementation in Nature language
              </ListItem>
              <ListItem
                title="Tetris Game"
                href="https://github.com/weiwenhao/tetris"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tetris game based on raylib, macOS only
              </ListItem>
              <ListItem
                title="Playground Server"
                href="https://github.com/weiwenhao/playground"
                target="_blank"
                rel="noopener noreferrer"
              >
                Playground server API implementation
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/playground" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Playground
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
