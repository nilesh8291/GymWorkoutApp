"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Copy, Dumbbell, Target, Clock } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"

interface Exercise {
  id: string
  name: string
  sets: number
  reps: string
  weight: string
  restTime: number
  notes: string
  muscleGroup: string
  equipment: string
}

const workoutTemplates = [
  { name: "Push Day", exercises: ["Bench Press", "Overhead Press", "Incline Dumbbell Press"] },
  { name: "Pull Day", exercises: ["Pull-ups", "Dumbbell Rows", "Deadlift"] },
  { name: "Leg Day", exercises: ["Squat", "Leg Press", "Romanian Deadlift"] },
]

export function WorkoutBuilder() {
  const [workoutName, setWorkoutName] = useState("")
  const [workoutDescription, setWorkoutDescription] = useState("")
  const [exercises, setExercises] = useState<Exercise[]>([])

  const addExercise = (exerciseName?: string) => {
    const newExercise: Exercise = {
      id: Date.now().toString(),
      name: exerciseName || "",
      sets: 3,
      reps: "8-12",
      weight: "",
      restTime: 60,
      notes: "",
      muscleGroup: "",
      equipment: "",
    }
    setExercises([...exercises, newExercise])
  }

  const updateExercise = (id: string, field: keyof Exercise, value: string | number) => {
    setExercises(exercises.map((ex) => (ex.id === id ? { ...ex, [field]: value } : ex)))
  }

  const removeExercise = (id: string) => {
    setExercises(exercises.filter((ex) => ex.id !== id))
  }

  const duplicateExercise = (id: string) => {
    const exercise = exercises.find((ex) => ex.id === id)
    if (exercise) {
      const newExercise = { ...exercise, id: Date.now().toString() }
      setExercises([...exercises, newExercise])
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Workout Builder</h2>
          <p className="text-muted-foreground">Create and customize your workout routines</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Save as Template</Button>
          <Button>Save Workout</Button>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Workout Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="workout-name">Workout Name</Label>
              <Input
                id="workout-name"
                placeholder="e.g., Push Day, Upper Body, etc."
                value={workoutName}
                onChange={(e) => setWorkoutName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="workout-description">Description (Optional)</Label>
              <Textarea
                id="workout-description"
                placeholder="Add notes about this workout..."
                value={workoutDescription}
                onChange={(e) => setWorkoutDescription(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Exercises ({exercises.length})</CardTitle>
              <Button onClick={() => addExercise()}>
                <Plus className="mr-2 h-4 w-4" />
                Add Exercise
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {exercises.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Dumbbell className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <p>No exercises added yet</p>
                <p className="text-sm">Add exercises from the library or create custom ones</p>
              </div>
            ) : (
              exercises.map((exercise, index) => (
                <Collapsible key={exercise.id} defaultOpen>
                  <div className="border rounded-lg p-4">
                    <CollapsibleTrigger className="flex items-center justify-between w-full">
                      <div className="flex items-center gap-3">
                        <span className="font-medium">{index + 1}.</span>
                        <Input
                          placeholder="Exercise name"
                          value={exercise.name}
                          onChange={(e) => updateExercise(exercise.id, "name", e.target.value)}
                          className="font-medium border-none p-0 h-auto focus-visible:ring-0"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" onClick={() => duplicateExercise(exercise.id)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => removeExercise(exercise.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <Label>Sets</Label>
                          <Input
                            type="number"
                            value={exercise.sets}
                            onChange={(e) => updateExercise(exercise.id, "sets", Number.parseInt(e.target.value))}
                          />
                        </div>
                        <div>
                          <Label>Reps</Label>
                          <Input
                            placeholder="8-12"
                            value={exercise.reps}
                            onChange={(e) => updateExercise(exercise.id, "reps", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Weight</Label>
                          <Input
                            placeholder="135 lbs"
                            value={exercise.weight}
                            onChange={(e) => updateExercise(exercise.id, "weight", e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Rest (seconds)</Label>
                          <Input
                            type="number"
                            value={exercise.restTime}
                            onChange={(e) => updateExercise(exercise.id, "restTime", Number.parseInt(e.target.value))}
                          />
                        </div>
                      </div>
                      <div className="mt-4">
                        <Label>Notes</Label>
                        <Textarea
                          placeholder="Exercise notes..."
                          value={exercise.notes}
                          onChange={(e) => updateExercise(exercise.id, "notes", e.target.value)}
                        />
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Templates</CardTitle>
            <CardDescription>Quick start with pre-built workouts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {workoutTemplates.map((template, index) => (
              <div key={index} className="p-3 rounded-lg border">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{template.name}</h4>
                  <Button variant="ghost" size="sm">
                    Use
                  </Button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {template.exercises.map((exercise, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {exercise}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Workout Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-3">
              <Target className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">{exercises.length} Exercises</p>
                <p className="text-sm text-muted-foreground">Total exercises</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">~{Math.max(30, exercises.length * 8)} min</p>
                <p className="text-sm text-muted-foreground">Estimated duration</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Dumbbell className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">{exercises.reduce((acc, ex) => acc + ex.sets, 0)} Sets</p>
                <p className="text-sm text-muted-foreground">Total sets</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
