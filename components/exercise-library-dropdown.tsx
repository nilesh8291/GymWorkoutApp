"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Plus, Dumbbell, Target, Clock, Zap, ChevronDown, ChevronUp } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const exerciseLibrary = [
  { id: "1", name: "Bench Press", muscleGroup: "Chest", equipment: "Barbell", difficulty: "Intermediate" },
  { id: "2", name: "Squat", muscleGroup: "Legs", equipment: "Barbell", difficulty: "Intermediate" },
  { id: "3", name: "Deadlift", muscleGroup: "Back", equipment: "Barbell", difficulty: "Advanced" },
  { id: "4", name: "Pull-ups", muscleGroup: "Back", equipment: "Bodyweight", difficulty: "Intermediate" },
  { id: "5", name: "Overhead Press", muscleGroup: "Shoulders", equipment: "Barbell", difficulty: "Intermediate" },
  { id: "6", name: "Dumbbell Rows", muscleGroup: "Back", equipment: "Dumbbell", difficulty: "Beginner" },
  { id: "7", name: "Leg Press", muscleGroup: "Legs", equipment: "Machine", difficulty: "Beginner" },
  { id: "8", name: "Incline Dumbbell Press", muscleGroup: "Chest", equipment: "Dumbbell", difficulty: "Intermediate" },
  { id: "9", name: "Lat Pulldown", muscleGroup: "Back", equipment: "Machine", difficulty: "Beginner" },
  { id: "10", name: "Leg Curl", muscleGroup: "Legs", equipment: "Machine", difficulty: "Beginner" },
  { id: "11", name: "Tricep Dips", muscleGroup: "Arms", equipment: "Bodyweight", difficulty: "Intermediate" },
  { id: "12", name: "Bicep Curls", muscleGroup: "Arms", equipment: "Dumbbell", difficulty: "Beginner" },
  {
    id: "13",
    name: "Shoulder Lateral Raises",
    muscleGroup: "Shoulders",
    equipment: "Dumbbell",
    difficulty: "Beginner",
  },
  { id: "14", name: "Romanian Deadlift", muscleGroup: "Legs", equipment: "Barbell", difficulty: "Intermediate" },
  { id: "15", name: "Push-ups", muscleGroup: "Chest", equipment: "Bodyweight", difficulty: "Beginner" },
]

const recentExercises = [
  { name: "Bench Press", lastUsed: "2 days ago", frequency: "12 times" },
  { name: "Squat", lastUsed: "3 days ago", frequency: "10 times" },
  { name: "Deadlift", lastUsed: "1 week ago", frequency: "8 times" },
  { name: "Pull-ups", lastUsed: "2 days ago", frequency: "15 times" },
]

const customExercises = [
  { name: "Cable Crossover", muscleGroup: "Chest", equipment: "Cable", createdDate: "Jan 20" },
  { name: "Bulgarian Split Squat", muscleGroup: "Legs", equipment: "Bodyweight", createdDate: "Jan 18" },
]

interface ExerciseLibraryDropdownProps {
  onExerciseSelect?: (exerciseName: string) => void
}

export function ExerciseLibraryDropdown({ onExerciseSelect }: ExerciseLibraryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("all")
  const [selectedEquipment, setSelectedEquipment] = useState("all")
  const [selectedDifficulty, setSelectedDifficulty] = useState("all")

  const muscleGroups = [...new Set(exerciseLibrary.map((ex) => ex.muscleGroup))]
  const equipment = [...new Set(exerciseLibrary.map((ex) => ex.equipment))]
  const difficulties = [...new Set(exerciseLibrary.map((ex) => ex.difficulty))]

  const filteredExercises = exerciseLibrary.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesMuscleGroup = selectedMuscleGroup === "all" || exercise.muscleGroup === selectedMuscleGroup
    const matchesEquipment = selectedEquipment === "all" || exercise.equipment === selectedEquipment
    const matchesDifficulty = selectedDifficulty === "all" || exercise.difficulty === selectedDifficulty
    return matchesSearch && matchesMuscleGroup && matchesEquipment && matchesDifficulty
  })

  const handleExerciseSelect = (exerciseName: string) => {
    if (onExerciseSelect) {
      onExerciseSelect(exerciseName)
    }
    setIsOpen(false)
  }

  return (
    <div className="border-b bg-muted/30">
      <div className="container mx-auto px-4">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between py-4 h-auto">
              <div className="flex items-center gap-2">
                <Dumbbell className="h-5 w-5" />
                <span className="font-medium">Exercise Library</span>
                <Badge variant="secondary" className="ml-2">
                  {exerciseLibrary.length} exercises
                </Badge>
              </div>
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>

          <CollapsibleContent className="pb-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Dumbbell className="h-5 w-5" />
                      Exercise Library
                    </CardTitle>
                    <CardDescription>Browse and manage your exercise collection</CardDescription>
                  </div>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Custom Exercise
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="library" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="library">Exercise Library</TabsTrigger>
                    <TabsTrigger value="recent">Recently Used</TabsTrigger>
                    <TabsTrigger value="custom">Custom Exercises</TabsTrigger>
                  </TabsList>

                  <TabsContent value="library" className="space-y-4">
                    {/* Filters */}
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
                          <Filter className="h-4 w-4 mr-2" />
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
                    </div>

                    {/* Exercise Grid */}
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-h-96 overflow-y-auto">
                      {filteredExercises.map((exercise) => (
                        <div
                          key={exercise.id}
                          className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent cursor-pointer transition-colors"
                          onClick={() => handleExerciseSelect(exercise.name)}
                        >
                          <div className="flex-1">
                            <p className="font-medium">{exercise.name}</p>
                            <div className="flex gap-1 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {exercise.muscleGroup}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {exercise.equipment}
                              </Badge>
                            </div>
                          </div>
                          <Plus className="h-4 w-4" />
                        </div>
                      ))}
                    </div>

                    {filteredExercises.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <Target className="mx-auto h-12 w-12 mb-4 opacity-50" />
                        <p>No exercises found</p>
                        <p className="text-sm">Try adjusting your search or filters</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="recent" className="space-y-3 max-h-96 overflow-y-auto">
                    {recentExercises.map((exercise, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent cursor-pointer"
                        onClick={() => handleExerciseSelect(exercise.name)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Clock className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{exercise.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Last used {exercise.lastUsed} • Used {exercise.frequency}
                            </p>
                          </div>
                        </div>
                        <Plus className="h-4 w-4" />
                      </div>
                    ))}
                  </TabsContent>

                  <TabsContent value="custom" className="space-y-3 max-h-96 overflow-y-auto">
                    {customExercises.map((exercise, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 rounded-lg border hover:bg-accent cursor-pointer"
                        onClick={() => handleExerciseSelect(exercise.name)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Zap className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{exercise.name}</p>
                            <div className="flex gap-2 mt-1">
                              <Badge variant="secondary" className="text-xs">
                                {exercise.muscleGroup}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {exercise.equipment}
                              </Badge>
                              <span className="text-xs text-muted-foreground">Created {exercise.createdDate}</span>
                            </div>
                          </div>
                        </div>
                        <Plus className="h-4 w-4" />
                      </div>
                    ))}
                    {customExercises.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <Plus className="mx-auto h-12 w-12 mb-4 opacity-50" />
                        <p>No custom exercises yet</p>
                        <p className="text-sm">Create your own exercises to track unique movements</p>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  )
}
