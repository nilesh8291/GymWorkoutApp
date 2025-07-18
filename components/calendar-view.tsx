"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Dumbbell, Clock, TrendingUp } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const workoutData = {
  "2024-01-15": { type: "Push", duration: "45 min", exercises: 6 },
  "2024-01-17": { type: "Pull", duration: "50 min", exercises: 5 },
  "2024-01-19": { type: "Legs", duration: "60 min", exercises: 7 },
  "2024-01-22": { type: "Push", duration: "40 min", exercises: 5 },
  "2024-01-24": { type: "Pull", duration: "55 min", exercises: 6 },
}

const upcomingWorkouts = [
  { date: "Today", time: "6:00 PM", type: "Legs", exercises: 7 },
  { date: "Tomorrow", time: "7:00 AM", type: "Push", exercises: 6 },
  { date: "Friday", time: "6:00 PM", type: "Pull", exercises: 5 },
]

const recentWorkouts = [
  { date: "Jan 24", type: "Pull", duration: "55 min", volume: "12,450 lbs" },
  { date: "Jan 22", type: "Push", duration: "40 min", volume: "10,200 lbs" },
  { date: "Jan 19", type: "Legs", duration: "60 min", volume: "15,800 lbs" },
]

export function CalendarView() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  const hasWorkout = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return workoutData[dateStr as keyof typeof workoutData]
  }

  const getWorkoutForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return workoutData[dateStr as keyof typeof workoutData]
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Workout Calendar</h2>
          <p className="text-muted-foreground">Track your fitness journey</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Schedule Workout
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>View and schedule your workouts</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              modifiers={{
                workout: (date) => hasWorkout(date),
              }}
              modifiersStyles={{
                workout: { backgroundColor: "hsl(var(--primary))", color: "hsl(var(--primary-foreground))" },
              }}
            />
            {date && getWorkoutForDate(date) && (
              <div className="mt-4 p-4 rounded-lg bg-muted">
                <h4 className="font-semibold mb-2">Workout Details</h4>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong>Type:</strong> {getWorkoutForDate(date)?.type}
                  </p>
                  <p>
                    <strong>Duration:</strong> {getWorkoutForDate(date)?.duration}
                  </p>
                  <p>
                    <strong>Exercises:</strong> {getWorkoutForDate(date)?.exercises}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upcoming Workouts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingWorkouts.map((workout, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                  <div>
                    <p className="font-medium">{workout.type}</p>
                    <p className="text-sm text-muted-foreground">
                      {workout.date} at {workout.time}
                    </p>
                  </div>
                  <Badge variant="outline">{workout.exercises} exercises</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">This Week</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Dumbbell className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">4 Workouts</p>
                  <p className="text-sm text-muted-foreground">2 more to goal</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">3.2 Hours</p>
                  <p className="text-sm text-muted-foreground">Total training time</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">52,450 lbs</p>
                  <p className="text-sm text-muted-foreground">Total volume</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Workouts</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="list" className="w-full">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="stats">Statistics</TabsTrigger>
            </TabsList>
            <TabsContent value="list" className="space-y-4">
              {recentWorkouts.map((workout, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Dumbbell className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{workout.type} Workout</p>
                      <p className="text-sm text-muted-foreground">{workout.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{workout.volume}</p>
                    <p className="text-sm text-muted-foreground">{workout.duration}</p>
                  </div>
                </div>
              ))}
            </TabsContent>
            <TabsContent value="stats">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 rounded-lg bg-muted">
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">Workouts this month</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted">
                  <p className="text-2xl font-bold">8.5h</p>
                  <p className="text-sm text-muted-foreground">Total time</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted">
                  <p className="text-2xl font-bold">156k</p>
                  <p className="text-sm text-muted-foreground">Total volume (lbs)</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted">
                  <p className="text-2xl font-bold">7</p>
                  <p className="text-sm text-muted-foreground">Current streak</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
