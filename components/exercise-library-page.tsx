"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Plus, Dumbbell, Target, Clock, Zap, Edit, Trash2, Eye } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreateExerciseModal } from "@/components/create-exercise-modal"

const exerciseLibrary = [
  {
    id: "1",
    name: "Bench Press",
    muscleGroup: "Chest",
    equipment: "Barbell",
    difficulty: "Intermediate",
    lastUsed: "2 days ago",
    timesUsed: 12,
  },
  {
    id: "2",
    name: "Squat",
    muscleGroup: "Legs",
    equipment: "Barbell",
    difficulty: "Intermediate",
    lastUsed: "3 days ago",
    timesUsed: 10,
  },
  {
    id: "3",
    name: "Deadlift",
    muscleGroup: "Back",
    equipment: "Barbell",
    difficulty: "Advanced",
    lastUsed: "1 week ago",
    timesUsed: 8,
  },
  {
    id: "4",
    name: "Pull-ups",
    muscleGroup: "Back",
    equipment: "Bodyweight",
    difficulty: "Intermediate",
    lastUsed: "2 days ago",
    timesUsed: 15,
  },
  {
    id: "5",
    name: "Overhead Press",
    muscleGroup: "Shoulders",
    equipment: "Barbell",
    difficulty: "Intermediate",
    lastUsed: "4 days ago",
    timesUsed: 9,
  },
  {
    id: "6",
    name: "Dumbbell Rows",
    muscleGroup: "Back",
    equipment: "Dumbbell",
    difficulty: "Beginner",
    lastUsed: "1 week ago",
    timesUsed: 7,
  },
  {
    id: "7",
    name: "Leg Press",
    muscleGroup: "Legs",
    equipment: "Machine",
    difficulty: "Beginner",
    lastUsed: "5 days ago",
    timesUsed: 6,
  },
  {
    id: "8",
    name: "Incline Dumbbell Press",
    muscleGroup: "Chest",
    equipment: "Dumbbell",
    difficulty: "Intermediate",
    lastUsed: "3 days ago",
    timesUsed: 8,
  },
  {
    id: "9",
    name: "Lat Pulldown",
    muscleGroup: "Back",
    equipment: "Machine",
    difficulty: "Beginner",
    lastUsed: "1 week ago",
    timesUsed: 5,
  },
  {
    id: "10",
    name: "Leg Curl",
    muscleGroup: "Legs",
    equipment: "Machine",
    difficulty: "Beginner",
    lastUsed: "6 days ago",
    timesUsed: 4,
  },
  {
    id: "11",
    name: "Tricep Dips",
    muscleGroup: "Arms",
    equipment: "Bodyweight",
    difficulty: "Intermediate",
    lastUsed: "4 days ago",
    timesUsed: 6,
  },
  {
    id: "12",
    name: "Bicep Curls",
    muscleGroup: "Arms",
    equipment: "Dumbbell",
    difficulty: "Beginner",
    lastUsed: "3 days ago",
    timesUsed: 11,
  },
  {
    id: "13",
    name: "Shoulder Lateral Raises",
    muscleGroup: "Shoulders",
    equipment: "Dumbbell",
    difficulty: "Beginner",
    lastUsed: "5 days ago",
    timesUsed: 7,
  },
  {
    id: "14",
    name: "Romanian Deadlift",
    muscleGroup: "Legs",
    equipment: "Barbell",
    difficulty: "Intermediate",
    lastUsed: "1 week ago",
    timesUsed: 5,
  },
  {
    id: "15",
    name: "Push-ups",
    muscleGroup: "Chest",
    equipment: "Bodyweight",
    difficulty: "Beginner",
    lastUsed: "2 days ago",
    timesUsed: 20,
  },
]

const recentExercises = [
  { name: "Bench Press", lastUsed: "2 days ago", frequency: "12 times" },
  { name: "Squat", lastUsed: "3 days ago", frequency: "10 times" },
  { name: "Deadlift", lastUsed: "1 week ago", frequency: "8 times" },
  { name: "Pull-ups", lastUsed: "2 days ago", frequency: "15 times" },
]

const customExercises = [
  {
    id: "c1",
    name: "Cable Crossover",
    muscleGroup: "Chest",
    equipment: "Cable",
    createdDate: "Jan 20",
    difficulty: "Intermediate",
  },
  {
    id: "c2",
    name: "Bulgarian Split Squat",
    muscleGroup: "Legs",
    equipment: "Bodyweight",
    createdDate: "Jan 18",
    difficulty: "Advanced",
  },
  {
    id: "c3",
    name: "Face Pulls",
    muscleGroup: "Shoulders",
    equipment: "Cable",
    createdDate: "Jan 15",
    difficulty: "Beginner",
  },
]

export function ExerciseLibraryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("all")
  const [selectedEquipment, setSelectedEquipment] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")
  const [sortBy, setSortBy] = useState("name")

  const muscleGroups = [...new Set(exerciseLibrary.map((ex) => ex.muscleGroup))]
  const equipment = [...new Set(exerciseLibrary.map((ex) => ex.equipment))]
  const difficulties = [...new Set(exerciseLibrary.map((ex) => ex.difficulty))]

  const filteredExercises = exerciseLibrary
    .filter((exercise) => {
      const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesMuscleGroup = selectedMuscleGroup === "all" || exercise.muscleGroup === selectedMuscleGroup
      const matchesEquipment = selectedEquipment === "all" || exercise.equipment === selectedEquipment
      const matchesDifficulty = selectedDifficulty === "all" || exercise.difficulty === selectedDifficulty
      return matchesSearch && matchesMuscleGroup && matchesEquipment && matchesDifficulty
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "muscle":
          return a.muscleGroup.localeCompare(b.muscleGroup)
        case "frequency":
          return b.timesUsed - a.timesUsed
        case "recent":
          return new Date(b.lastUsed).getTime() - new Date(a.lastUsed).getTime()
        default:
          return 0
      }
    })

  const handleExerciseCreated = (exercise: any) => {
    console.log("New exercise created:", exercise)
    // Add logic to add exercise to library
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Exercise Library</h2>
          <p className="text-muted-foreground">Manage your complete exercise collection</p>
        </div>
        <div className="flex gap-2">
          <CreateExerciseModal onExerciseCreated={handleExerciseCreated} />
          <Button variant="outline">Import Exercises</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Exercises</CardTitle>
            <Dumbbell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{exerciseLibrary.length + customExercises.length}</div>
            <p className="text-xs text-muted-foreground">{customExercises.length} custom exercises</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Used</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Push-ups</div>
            <p className="text-xs text-muted-foreground">Used 20 times</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Muscle Groups</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{muscleGroups.length}</div>
            <p className="text-xs text-muted-foreground">Different muscle groups</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recently Added</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Exercises</TabsTrigger>
          <TabsTrigger value="recent">Recently Used</TabsTrigger>
          <TabsTrigger value="custom">Custom Exercises</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {/* Filters and Search */}
          <Card>
            <CardHeader>
              <CardTitle>Search & Filter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <div className="relative flex-1 min-w-64">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search exercises..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={selectedMuscleGroup} onValueChange={setSelectedMuscleGroup}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Muscle Group" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Muscles</SelectItem>
                    {muscleGroups.map((group) => (
                      <SelectItem key={group} value={group}>
                        {group}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedEquipment} onValueChange={setSelectedEquipment}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Equipment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Equipment</SelectItem>
                    {equipment.map((eq) => (
                      <SelectItem key={eq} value={eq}>
                        {eq}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    {difficulties.map((diff) => (
                      <SelectItem key={diff} value={diff}>
                        {diff}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="muscle">Muscle Group</SelectItem>
                    <SelectItem value="frequency">Most Used</SelectItem>
                    <SelectItem value="recent">Recently Used</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Exercise Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredExercises.map((exercise) => (
              <Card key={exercise.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{exercise.name}</CardTitle>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="secondary" className="text-xs">
                          {exercise.muscleGroup}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {exercise.equipment}
                        </Badge>
                        <Badge
                          variant={
                            exercise.difficulty === "Beginner"
                              ? "default"
                              : exercise.difficulty === "Intermediate"
                                ? "secondary"
                                : "destructive"
                          }
                          className="text-xs"
                        >
                          {exercise.difficulty}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Last used:</span>
                      <span>{exercise.lastUsed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Times used:</span>
                      <span>{exercise.timesUsed} times</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" className="flex-1">
                      Add to Workout
                    </Button>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredExercises.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Target className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p className="text-lg font-medium">No exercises found</p>
              <p className="text-sm">Try adjusting your search or filters</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentExercises.map((exercise, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Clock className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{exercise.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">Last used {exercise.lastUsed}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-muted-foreground">Usage frequency:</span>
                    <Badge variant="secondary">{exercise.frequency}</Badge>
                  </div>
                  <Button size="sm" className="w-full">
                    Add to Workout
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="custom" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {customExercises.map((exercise) => (
              <Card key={exercise.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Zap className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{exercise.name}</CardTitle>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            {exercise.muscleGroup}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {exercise.equipment}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex justify-between">
                      <span>Created:</span>
                      <span>{exercise.createdDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Difficulty:</span>
                      <Badge variant="outline" className="text-xs">
                        {exercise.difficulty}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      Add to Workout
                    </Button>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {customExercises.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Plus className="mx-auto h-12 w-12 mb-4 opacity-50" />
              <p className="text-lg font-medium">No custom exercises yet</p>
              <p className="text-sm">Create your own exercises to track unique movements</p>
              <CreateExerciseModal
                onExerciseCreated={handleExerciseCreated}
                trigger={
                  <Button className="mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Exercise
                  </Button>
                }
              />
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
