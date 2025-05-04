"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Info, Mail, Upload, Menu, Github } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState } from "react"

// Update the navigation array to include GitHub page
const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: Info },
  { name: "Team", href: "/contact", icon: Mail },
  { name: "Try Now", href: "/try", icon: Upload },
  { name: "GitHub", href: "/github", icon: Github },
]

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow border-r border-border bg-card px-4 py-5">
          <div className="flex items-center h-16 flex-shrink-0 px-4">
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent">
              PINNs for Spaghetti Bridge Weight Prediction
            </h1>
          </div>
          <div className="mt-5 flex-1 flex flex-col">
            <nav className="flex-1 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-4 py-3 text-sm font-medium rounded-md transition-all duration-200",
                    pathname === item.href
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-3 h-5 w-5 flex-shrink-0 transition-colors duration-200",
                      pathname === item.href ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="flex flex-col flex-1">
        {/* Mobile header */}
        <div className="md:hidden flex items-center h-16 px-4 border-b border-border">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-4">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="flex flex-col flex-grow bg-card px-4 py-5">
                <div className="flex items-center h-16 flex-shrink-0 px-4">
                  <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent">
                    PINNs for Spaghetti Bridge Weight Prediction
                  </h1>
                </div>
                <div className="mt-5 flex-1 flex flex-col">
                  <nav className="flex-1 space-y-1">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "group flex items-center px-4 py-3 text-sm font-medium rounded-md transition-all duration-200",
                          pathname === item.href
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground",
                        )}
                        onClick={() => setOpen(false)}
                      >
                        <item.icon
                          className={cn(
                            "mr-3 h-5 w-5 flex-shrink-0 transition-colors duration-200",
                            pathname === item.href
                              ? "text-primary"
                              : "text-muted-foreground group-hover:text-foreground",
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent">
            PINNs for Spaghetti Bridge Weight Prediction
          </h1>
        </div>

        <main className="flex-1 pb-8">
          <div className="px-4 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </div>
  )
}
