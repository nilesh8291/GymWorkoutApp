"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Pause, RotateCcw, Check, Plus, Timer, TrendingUp, Award, Search } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreateExerciseModal } from "@/components/create-exercise-modal"

interface WorkoutSet {
  id: string
  weight: string
  reps: string
  completed: boolean
  rpe?: number
  notes?: string
}

interface LoggedExercise {
  id: string
  name: string
  sets: WorkoutSet[]
  restTime: number
  personalRecord?: string
  previousData?: Array<{
    date: string
    sets: Array<{ weight: string; reps: string; rpe?: number }>
  }>
}

const availableWorkouts = [
  {
    id: "push",
    name: "Push Day",
    exercises: ["Bench Press", "Overhead Press", "Incline Dumbbell Press", "Tricep Dips"],
  },
  { id: "pull", name: "Pull Day", exercises: ["Pull-ups", "Dumbbell Rows", "Lat Pulldown", "Bicep Curls"] },
  { id: "legs", name: "Leg Day", exercises: ["Squat", "Leg Press", "Romanian Deadlift", "Leg Curl"] },
  { id: "upper", name: "Upper Body", exercises: ["Bench Press", "Pull-ups", "Overhead Press", "Dumbbell Rows"] },
  { id: "custom", name: "Custom Workout", exercises: [] },
]

const exerciseLibrary = [
  "Bench Press",
  "Squat",
  "Deadlift",
  "Pull-ups",
  "Overhead Press",
  "Dumbbell Rows",
  "Leg Press",
  "Incline Dumbbell Press",
  "Lat Pulldown",
  "Leg Curl",
  "Tricep Dips",
  "Bicep Curls",
  "Shoulder Lateral Raises",
  "Romanian Deadlift",
  "Push-ups",
]

// Sample previous workout data
const previousWorkoutData = {
  "Bench Press": [
    {
      date: "Jan 22",
      sets: [
        { weight: "185", reps: "8", rpe: 8 },
        { weight: "185", reps: "7", rpe: 9 },
        { weight: "175", reps: "8", rpe: 8 },
      ],
    },
    {
      date: "Jan 19",
      sets: [
        { weight: "180", reps: "8", rpe: 7 },
        { weight: "180", reps: "8", rpe: 8 },
        { weight: "180", reps: "6", rpe: 9 },
      ],
    },
    {
      date: "Jan 15",
      sets: [
        { weight: "175", reps: "10", rpe: 7 },
        { weight: "175", reps: "9", rpe: 8 },
        { weight: "175", reps: "8", rpe: 8 },
      ],
    },
    {
      date: "Jan 12",
      sets: [
        { weight: "175", reps: "8", rpe: 7 },
        { weight: "175", reps: "8", rpe: 8 },
        { weight: "165", reps: "10", rpe: 8 },
      ],
    },
    {
      date: "Jan 8",
      sets: [
        { weight: "170", reps: "10", rpe: 7 },
        { weight: "170", reps: "9", rpe: 8 },
        { weight: "170", reps: "8", rpe: 8 },
      ],
    },
  ],
  Squat: [
    {
      date: "Jan 21",
      sets: [
        { weight: "225", reps: "5", rpe: 8 },
        { weight: "225", reps: "5", rpe: 9 },
        { weight: "205", reps: "8", rpe: 8 },
      ],
    },
    {
      date: "Jan 17",
      sets: [
        { weight: "220", reps: "5", rpe: 8 },
        { weight: "220", reps: "4", rpe: 9 },
        { weight: "200", reps: "8", rpe: 7 },
      ],
    },
    {
      date: "Jan 14",
      sets: [
        { weight: "215", reps: "6", rpe: 7 },
        { weight: "215", reps: "6", rpe: 8 },
        { weight: "215", reps: "5", rpe: 9 },
      ],
    },
    {
      date: "Jan 10",
      sets: [
        { weight: "210", reps: "6", rpe: 7 },
        { weight: "210", reps: "6", rpe: 8 },
        { weight: "210", reps: "5", rpe: 8 },
      ],
    },
    {
      date: "Jan 7",
      sets: [
        { weight: "205", reps: "8", rpe: 7 },
        { weight: "205", reps: "7", reps: 8 },
        { weight: "205", reps: "6", rpe: 8 },
      ],
    },
  ],
}

export function WorkoutLogger() {
  const [selectedWorkout, setSelectedWorkout] = useState("")
  const [currentWorkout, setCurrentWorkout] = useState<any>(null)
  const [loggedExercises, setLoggedExercises] = useState<LoggedExercise[]>([])
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0)
  const [isResting, setIsResting] = useState(false)
  const [restTimer, setRestTimer] = useState(0)
  const [workoutStartTime] = useState(new Date())
  const [workoutNotes, setWorkoutNotes] = useState("")
  const [searchExercise, setSearchExercise] = useState("")

  const initializeExercise = (exerciseName: string, targetSets = 3) => {
    const sets: WorkoutSet[] = Array.from({ length: targetSets }, (_, i) => ({
      id: `${exerciseName}-${i}`,
      weight: "",
      reps: "",
      completed: false,
    }))

    // Pre-populate with previous workout data if available
    const previousData = previousWorkoutData[exerciseName as keyof typeof previousWorkoutData]
    if (previousData && previousData.length > 0) {
      const lastWorkout = previousData[0]
      sets.forEach((set, index) => {
        if (lastWorkout.sets[index]) {
          set.weight = lastWorkout.sets[index].weight
          set.reps = lastWorkout.sets[index].reps
        }
      })
    }

    return {
      id: exerciseName,
      name: exerciseName,
      sets,
      restTime: 60,
      previousData,
    }
  }

  const startWorkout = (workoutId: string) => {
    const workout = availableWorkouts.find((w) => w.id === workoutId)
    if (workout) {
      setCurrentWorkout(workout)
      const exercises = workout.exercises.map((name) => initializeExercise(name))
      setLoggedExercises(exercises)
    }
  }

  const addExerciseToLog = (exerciseName: string, targetSets = 3) => {
    const newExercise = initializeExercise(exerciseName, targetSets)
    setLoggedExercises([...loggedExercises, newExercise])
  }

  const updateSet = (exerciseId: string, setId: string, field: keyof WorkoutSet, value: string | number | boolean) => {
    setLoggedExercises((exercises) =>
      exercises.map((exercise) =>
        exercise.id === exerciseId
          ? {
              ...exercise,
              sets: exercise.sets.map((set) => (set.id === setId ? { ...set, [field]: value } : set)),
            }
          : exercise,
      ),
    )
  }

  const completeSet = (exerciseId: string, setId: string) => {
    updateSet(exerciseId, setId, "completed", true)
    setIsResting(true)
  }

  const getWorkoutDuration = () => {
    const now = new Date()
    const diff = now.getTime() - workoutStartTime.getTime()
    const minutes = Math.floor(diff / 60000)
    return `${minutes} min`
  }

  const getCompletedSets = () => {
    return loggedExercises.reduce((total, exercise) => total + exercise.sets.filter((set) => set.completed).length, 0)
  }

  const getTotalSets = () => {
    return loggedExercises.reduce((total, exercise) => total + exercise.sets.length, 0)
  }

  const filteredExercises = exerciseLibrary.filter((exercise) =>
    exercise.toLowerCase().includes(searchExercise.toLowerCase()),
  )

  if (!currentWorkout) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Workout Logger</h2>
            <p className="text-muted-foreground">Select a workout to start tracking</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {availableWorkouts.map((workout) => (
            <Card key={workout.id} className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{workout.name}</CardTitle>
                <CardDescription>
                  {workout.exercises.length > 0 ? `${workout.exercises.length} exercises` : "Custom workout"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {workout.exercises.length > 0 && (
                  <div className="space-y-2 mb-4">
                    {workout.exercises.slice(0, 3).map((exercise, index) => (
                      <div key={index} className="text-sm text-muted-foreground">
                        • {exercise}
                      </div>
                    ))}
                    {workout.exercises.length > 3 && (
                      <div className="text-sm text-muted-foreground">+ {workout.exercises.length - 3} more</div>
                    )}
                  </div>
                )}
                <Button className="w-full" onClick={() => startWorkout(workout.id)}>
                  Start Workout
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Workout Logger</h2>
          <p className="text-muted-foreground">Track your workout performance</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setCurrentWorkout(null)}>
            Change Workout
          </Button>
          <Button variant="outline">Pause Workout</Button>
          <Button>Finish Workout</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{currentWorkout.name}</CardTitle>
                  <CardDescription>Started at {workoutStartTime.toLocaleTimeString()}</CardDescription>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{getWorkoutDuration()}</p>
                  <p className="text-sm text-muted-foreground">Duration</p>
                </div>
              </div>
              <Progress value={(getCompletedSets() / Math.max(getTotalSets(), 1)) * 100} className="w-full" />
              <p className="text-sm text-muted-foreground">
                {getCompletedSets()} of {getTotalSets()} sets completed
              </p>
            </CardHeader>
          </Card>

          <Tabs defaultValue="current" className="w-full">
            <TabsList>
              <TabsTrigger value="current">Current Workout</TabsTrigger>
              <TabsTrigger value="add-exercise">Add Exercise</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="space-y-4">
              {loggedExercises.map((exercise, index) => (
                <Card key={exercise.id} className={index === currentExerciseIndex ? "ring-2 ring-primary" : ""}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{exercise.name}</CardTitle>
                        <CardDescription>{exercise.sets.length} sets</CardDescription>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    {/* Previous workout data */}
                    {exercise.previousData && exercise.previousData.length > 0 && (
                      <div className="mb-4 p-3 bg-muted rounded-lg">
                        <h4 className="font-medium text-sm mb-2">Previous Workouts</h4>
                        <div className="space-y-1 text-xs">
                          {exercise.previousData.slice(0, 3).map((prev, i) => (
                            <div key={i} className="flex justify-between">
                              <span>{prev.date}:</span>
                              <span>{prev.sets.map((set, j) => `${set.weight}×${set.reps}`).join(", ")}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-3">
                      {exercise.sets.map((set, setIndex) => (
                        <div key={set.id} className="flex items-center gap-4 p-3 rounded-lg border">
                          <span className="font-medium w-8">#{setIndex + 1}</span>
                          <div className="flex gap-2 flex-1">
                            <div>
                              <Label className="text-xs">Weight</Label>
                              <Input
                                placeholder="185"
                                value={set.weight}
                                onChange={(e) => updateSet(exercise.id, set.id, "weight", e.target.value)}
                                className="w-20"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Reps</Label>
                              <Input
                                placeholder="10"
                                value={set.reps}
                                onChange={(e) => updateSet(exercise.id, set.id, "reps", e.target.value)}
                                className="w-16"
                              />
                            </div>
                            <div>
                              <Label className="text-xs">RPE</Label>
                              <Select
                                onValueChange={(value) => updateSet(exercise.id, set.id, "rpe", Number.parseInt(value))}
                              >
                                <SelectTrigger className="w-16">
                                  <SelectValue placeholder="?" />
                                </SelectTrigger>
                                <SelectContent>
                                  {[6, 7, 8, 9, 10].map((rpe) => (
                                    <SelectItem key={rpe} value={rpe.toString()}>
                                      {rpe}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <Button
                            variant={set.completed ? "default" : "outline"}
                            size="sm"
                            onClick={() => completeSet(exercise.id, set.id)}
                            disabled={set.completed}
                          >
                            {set.completed ? <Check className="h-4 w-4" /> : "Complete"}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="add-exercise">
              <Card>
                <CardHeader>
                  <CardTitle>Add Exercise</CardTitle>
                  <CardDescription>Add additional exercises to your current workout</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2 mb-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search exercises..."
                        value={searchExercise}
                        onChange={(e) => setSearchExercise(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                    <CreateExerciseModal
                      onExerciseCreated={(exercise) => {
                        console.log("New exercise created:", exercise)
                        // Add logic to add exercise to library and current workout
                        addExerciseToLog(exercise.name)
                      }}
                      trigger={
                        <Button variant="outline">
                          <Plus className="mr-2 h-4 w-4" />
                          Create New
                        </Button>
                      }
                    />
                  </div>
                  <div className="grid gap-2 max-h-96 overflow-y-auto">
                    {filteredExercises.map((exercise, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent cursor-pointer"
                        onClick={() => addExerciseToLog(exercise)}
                      >
                        <span className="font-medium">{exercise}</span>
                        <Plus className="h-4 w-4" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes">
              <Card>
                <CardHeader>
                  <CardTitle>Workout Notes</CardTitle>
                  <CardDescription>Add notes about your workout</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="How did the workout feel? Any observations or adjustments for next time..."
                    value={workoutNotes}
                    onChange={(e) => setWorkoutNotes(e.target.value)}
                    rows={6}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Rest Timer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold">
                  {Math.floor(restTimer / 60)}:{(restTimer % 60).toString().padStart(2, "0")}
                </div>
                <p className="text-sm text-muted-foreground">Rest time</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Play className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <Pause className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Timer className="mr-2 h-4 w-4" />
                  1:00 - Light
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Timer className="mr-2 h-4 w-4" />
                  2:00 - Moderate
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Timer className="mr-2 h-4 w-4" />
                  3:00 - Heavy
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Today's Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">2,450 lbs</p>
                  <p className="text-sm text-muted-foreground">Volume so far</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">2 PRs</p>
                  <p className="text-sm text-muted-foreground">Personal records</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">
                    {getCompletedSets()}/{getTotalSets()}
                  </p>
                  <p className="text-sm text-muted-foreground">Sets completed</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
