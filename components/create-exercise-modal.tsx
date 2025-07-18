"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"

interface CreateExerciseModalProps {
  onExerciseCreated?: (exercise: {
    name: string
    muscleGroup: string
    equipment: string
    difficulty: string
    instructions: string
  }) => void
  trigger?: React.ReactNode
}

const muscleGroups = ["Chest", "Back", "Legs", "Shoulders", "Arms", "Core", "Full Body"]
const equipment = ["Barbell", "Dumbbell", "Machine", "Cable", "Bodyweight", "Resistance Band", "Other"]
const difficulties = ["Beginner", "Intermediate", "Advanced"]

export function CreateExerciseModal({ onExerciseCreated, trigger }: CreateExerciseModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    muscleGroup: "",
    equipment: "",
    difficulty: "",
    instructions: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onExerciseCreated) {
      onExerciseCreated(formData)
    }
    setFormData({
      name: "",
      muscleGroup: "",
      equipment: "",
      difficulty: "",
      instructions: "",
    })
    setOpen(false)
  }

  const defaultTrigger = (
    <Button>
      <Plus className="mr-2 h-4 w-4" />
      Create Exercise
    </Button>
  )

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Exercise</DialogTitle>
          <DialogDescription>Add a custom exercise to your library</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Exercise Name</Label>
            <Input
              id="name"
              placeholder="e.g., Cable Crossover"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="muscleGroup">Muscle Group</Label>
              <Select
                value={formData.muscleGroup}
                onValueChange={(value) => setFormData({ ...formData, muscleGroup: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select muscle group" />
                </SelectTrigger>
                <SelectContent>
                  {muscleGroups.map((group) => (
                    <SelectItem key={group} value={group}>
                      {group}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="equipment">Equipment</Label>
              <Select
                value={formData.equipment}
                onValueChange={(value) => setFormData({ ...formData, equipment: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select equipment" />
                </SelectTrigger>
                <SelectContent>
                  {equipment.map((eq) => (
                    <SelectItem key={eq} value={eq}>
                      {eq}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="difficulty">Difficulty</Label>
            <Select
              value={formData.difficulty}
              onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map((diff) => (
                  <SelectItem key={diff} value={diff}>
                    {diff}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructions">Instructions (Optional)</Label>
            <Textarea
              id="instructions"
              placeholder="Describe how to perform this exercise..."
              value={formData.instructions}
              onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Create Exercise</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
