"use client"

import { Calendar, Dumbbell, TrendingUp, Plus, Trophy, Target, Timer } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const menuItems = [
  {
    title: "Calendar",
    icon: Calendar,
    id: "calendar",
  },
  {
    title: "Build Workout",
    icon: Plus,
    id: "build",
  },
  {
    title: "Log Workout",
    icon: Dumbbell,
    id: "log",
  },
  {
    title: "Progress",
    icon: TrendingUp,
    id: "progress",
  },
]

const quickStats = [
  {
    title: "Current Streak",
    value: "7 days",
    icon: Trophy,
  },
  {
    title: "This Week",
    value: "4 workouts",
    icon: Target,
  },
  {
    title: "Total Time",
    value: "5.2 hours",
    icon: Timer,
  },
]

interface AppSidebarProps {
  activeView: string
  setActiveView: (view: string) => void
}

export function AppSidebar({ activeView, setActiveView }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Dumbbell className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">FitTracker</h2>
            <p className="text-sm text-muted-foreground">Your fitness journey</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton isActive={activeView === item.id} onClick={() => setActiveView(item.id)}>
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Quick Stats</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="space-y-2 px-2">
              {quickStats.map((stat) => (
                <div key={stat.title} className="flex items-center gap-3 rounded-lg p-2 hover:bg-accent">
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>Achievements</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="flex flex-wrap gap-1 px-2">
              <Badge variant="secondary" className="text-xs">
                🔥 7 Day Streak
              </Badge>
              <Badge variant="secondary" className="text-xs">
                💪 100 Workouts
              </Badge>
              <Badge variant="secondary" className="text-xs">
                🏆 PR Crusher
              </Badge>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-muted-foreground">Level 12 Athlete</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
