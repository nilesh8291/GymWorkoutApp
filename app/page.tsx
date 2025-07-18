"use client"

import { useState } from "react"
import { LoginPage } from "@/components/login-page"
import { TopNavigation } from "@/components/top-navigation"
import { CalendarView } from "@/components/calendar-view"
import { WorkoutBuilder } from "@/components/workout-builder"
import { WorkoutLogger } from "@/components/workout-logger"
import { ProgressDashboard } from "@/components/progress-dashboard"
import { ExerciseLibraryPage } from "@/components/exercise-library-page"

export default function GymTrackerDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [activeView, setActiveView] = useState("calendar")

  const handleLogin = (username: string, password: string) => {
    // Simple authentication - in real app, this would validate against a backend
    if (username && password) {
      setIsLoggedIn(true)
    }
  }

  const renderActiveView = () => {
    switch (activeView) {
      case "calendar":
        return <CalendarView />
      case "build":
        return <WorkoutBuilder />
      case "exercises":
        return <ExerciseLibraryPage />
      case "log":
        return <WorkoutLogger />
      case "progress":
        return <ProgressDashboard />
      default:
        return <CalendarView />
    }
  }

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />
  }

  return (
    <div className="min-h-screen bg-background">
      <TopNavigation activeView={activeView} setActiveView={setActiveView} />
      <main className="container mx-auto px-4 py-6">{renderActiveView()}</main>
    </div>
  )
}
