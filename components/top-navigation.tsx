"use client"

import { Menu, X, Calendar, Dumbbell, TrendingUp, Plus, Trophy, Target, Timer, Library, LogOut } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"

const menuItems = [
  { title: "Calendar", icon: Calendar, id: "calendar" },
  { title: "Build Workout", icon: Plus, id: "build" },
  { title: "Exercise Library", icon: Library, id: "exercises" },
  { title: "Log Workout", icon: Dumbbell, id: "log" },
  { title: "Progress", icon: TrendingUp, id: "progress" },
] as const

const quickStats = [
  { title: "Current Streak", value: "7 days", icon: Trophy },
  { title: "This Week", value: "4 workouts", icon: Target },
  { title: "Total Time", value: "5.2 hours", icon: Timer },
] as const

interface TopNavigationProps {
  activeView: string
  setActiveView: (view: string) => void
}

function TopNavigation({ activeView, setActiveView }: TopNavigationProps) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const toggleBtnRef = useRef<HTMLButtonElement>(null)

  /* ----------------  Close on outside click  ---------------- */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        open &&
        menuRef.current &&
        toggleBtnRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !toggleBtnRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open])

  /* ----------------  Close on escape  ---------------- */
  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    document.addEventListener("keydown", esc)
    return () => document.removeEventListener("keydown", esc)
  }, [])

  const activeItem = menuItems.find((m) => m.id === activeView)

  function handleNav(id: string) {
    setActiveView(id)
    setOpen(false)
  }

  const handleLogout = () => {
    // In a real app, this would clear auth tokens and redirect
    window.location.reload()
  }

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <span className="text-primary-foreground font-bold text-sm">WAMP</span>
            </div>
            <div>
              <span className="font-bold text-lg">WAMP LDN</span>
              <p className="text-xs text-muted-foreground">Fitness Tracker</p>
            </div>
          </div>

          {/* Current page label (desktop) */}
          {activeItem && (
            <div className="hidden md:flex items-center gap-2 text-sm text-muted-foreground">
              <activeItem.icon className="h-4 w-4" />
              <span>{activeItem.title}</span>
            </div>
          )}

          {/* Toggle button */}
          <Button ref={toggleBtnRef} variant="ghost" size="icon" onClick={() => setOpen((p) => !p)}>
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle navigation</span>
          </Button>
        </div>
      </header>

      {/* Dropdown menu */}
      {open && (
        <div className="fixed inset-0 z-30">
          {/* overlay */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          {/* panel */}
          <div
            ref={menuRef}
            className="absolute right-4 top-20 w-80 max-w-[calc(100vw-2rem)] animate-in slide-in-from-top-2 rounded-lg border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-lg"
          >
            <Card className="border-0 shadow-none bg-transparent">
              <CardContent className="p-6 space-y-6">
                {/* nav items */}
                <div className="space-y-1">
                  {menuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleNav(item.id)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors ${
                        activeView === item.id ? "bg-primary text-primary-foreground" : "hover:bg-accent"
                      }`}
                    >
                      <item.icon className="h-4 w-4 shrink-0" />
                      <span className="font-medium">{item.title}</span>
                    </button>
                  ))}
                </div>

                {/* quick stats */}
                <div className="space-y-2">
                  <h4 className="text-xs font-semibold uppercase text-muted-foreground">Quick Stats</h4>
                  {quickStats.map((s) => (
                    <div key={s.title} className="flex items-center gap-3 rounded-lg p-2 hover:bg-accent">
                      <s.icon className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{s.value}</p>
                        <p className="text-xs text-muted-foreground">{s.title}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* user */}
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">John Doe</p>
                      <p className="text-xs text-muted-foreground">Level 12 Athlete</p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-muted-foreground hover:text-foreground"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  )
}

/* ---------------  exports --------------- */
export { TopNavigation }
export default TopNavigation
