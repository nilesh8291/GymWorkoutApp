"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, Target, Dumbbell, Scale, Activity } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

const strengthData = [
  { date: "Jan 1", benchPress: 185, squat: 225, deadlift: 275 },
  { date: "Jan 8", benchPress: 190, squat: 230, deadlift: 280 },
  { date: "Jan 15", benchPress: 195, squat: 235, deadlift: 285 },
  { date: "Jan 22", benchPress: 200, squat: 240, deadlift: 290 },
  { date: "Jan 29", benchPress: 205, squat: 245, deadlift: 295 },
]

const volumeData = [
  { week: "Week 1", volume: 12500 },
  { week: "Week 2", volume: 13200 },
  { week: "Week 3", volume: 14100 },
  { week: "Week 4", volume: 13800 },
  { week: "Week 5", volume: 15200 },
]

const muscleGroupData = [
  { name: "Chest", value: 25, color: "#8884d8" },
  { name: "Back", value: 22, color: "#82ca9d" },
  { name: "Legs", value: 30, color: "#ffc658" },
  { name: "Shoulders", value: 15, color: "#ff7300" },
  { name: "Arms", value: 8, color: "#00ff00" },
]

const personalRecords = [
  { exercise: "Bench Press", weight: "205 lbs", date: "Jan 29", improvement: "+20 lbs" },
  { exercise: "Squat", weight: "245 lbs", date: "Jan 29", improvement: "+25 lbs" },
  { exercise: "Deadlift", weight: "295 lbs", date: "Jan 29", improvement: "+30 lbs" },
  { exercise: "Overhead Press", weight: "135 lbs", date: "Jan 22", improvement: "+15 lbs" },
]

// Body metrics data
const weightData = [
  { date: "Dec 1", weight: 178.2, bodyFat: 14.2 },
  { date: "Dec 8", weight: 177.8, bodyFat: 14.0 },
  { date: "Dec 15", weight: 177.1, bodyFat: 13.8 },
  { date: "Dec 22", weight: 176.5, bodyFat: 13.5 },
  { date: "Dec 29", weight: 176.0, bodyFat: 13.2 },
  { date: "Jan 5", weight: 175.8, bodyFat: 13.0 },
  { date: "Jan 12", weight: 175.5, bodyFat: 12.9 },
  { date: "Jan 19", weight: 175.3, bodyFat: 12.8 },
  { date: "Jan 26", weight: 175.2, bodyFat: 12.8 },
]

const bodyMeasurements = [
  { date: "Jan 1", chest: 42.0, arms: 14.8, waist: 32.5, thighs: 24.2 },
  { date: "Jan 8", chest: 42.2, arms: 15.0, waist: 32.3, thighs: 24.4 },
  { date: "Jan 15", chest: 42.3, arms: 15.1, waist: 32.2, thighs: 24.6 },
  { date: "Jan 22", chest: 42.4, arms: 15.2, waist: 32.1, thighs: 24.7 },
  { date: "Jan 29", chest: 42.5, arms: 15.2, waist: 32.1, thighs: 24.8 },
]

export function ProgressDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Progress Dashboard</h2>
          <p className="text-muted-foreground">Track your fitness journey and achievements</p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="3months">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1month">1 Month</SelectItem>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">Export Data</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Workouts</CardTitle>
            <Dumbbell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Volume</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68,800 lbs</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8% from last month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Weight</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">175.2 lbs</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingDown className="h-3 w-3 mr-1" />
                -3.0 lbs this month
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Body Fat</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.8%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 flex items-center">
                <TrendingDown className="h-3 w-3 mr-1" />
                -1.4% this month
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="strength" className="space-y-4">
        <TabsList>
          <TabsTrigger value="strength">Strength Progress</TabsTrigger>
          <TabsTrigger value="volume">Volume Tracking</TabsTrigger>
          <TabsTrigger value="body">Body Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="strength" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>1-Rep Max Progress</CardTitle>
                <CardDescription>Track your strength gains over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={strengthData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="benchPress" stroke="#8884d8" name="Bench Press" />
                    <Line type="monotone" dataKey="squat" stroke="#82ca9d" name="Squat" />
                    <Line type="monotone" dataKey="deadlift" stroke="#ffc658" name="Deadlift" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Personal Records</CardTitle>
                <CardDescription>Your best lifts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {personalRecords.map((pr, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                    <div>
                      <p className="font-medium">{pr.exercise}</p>
                      <p className="text-sm text-muted-foreground">{pr.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{pr.weight}</p>
                      <Badge variant="secondary" className="text-xs">
                        {pr.improvement}
                      </Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="volume" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Weekly Volume</CardTitle>
                <CardDescription>Total weight lifted per week</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={volumeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="volume" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Muscle Group Distribution</CardTitle>
                <CardDescription>Training focus breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={muscleGroupData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {muscleGroupData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="body" className="space-y-4">
          <div className="grid gap-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Weight Progress</CardTitle>
                  <CardDescription>Track your weight changes over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={weightData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={["dataMin - 2", "dataMax + 2"]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="weight" stroke="#8884d8" name="Weight (lbs)" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Body Fat Progress</CardTitle>
                  <CardDescription>Track your body composition changes</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={weightData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={["dataMin - 1", "dataMax + 1"]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="bodyFat" stroke="#82ca9d" name="Body Fat %" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Body Measurements</CardTitle>
                <CardDescription>Track muscle growth and body changes</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={bodyMeasurements}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="chest" stroke="#8884d8" name="Chest (in)" />
                    <Line type="monotone" dataKey="arms" stroke="#82ca9d" name="Arms (in)" />
                    <Line type="monotone" dataKey="waist" stroke="#ffc658" name="Waist (in)" />
                    <Line type="monotone" dataKey="thighs" stroke="#ff7300" name="Thighs (in)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Current Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Weight</span>
                    <span className="font-medium">175.2 lbs</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Body Fat</span>
                    <span className="font-medium">12.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>BMI</span>
                    <span className="font-medium">23.1</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Measurements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Chest</span>
                    <span className="font-medium">42.5"</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Arms</span>
                    <span className="font-medium">15.2"</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Waist</span>
                    <span className="font-medium">32.1"</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Thighs</span>
                    <span className="font-medium">24.8"</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Monthly Change</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Weight</span>
                    <span className="font-medium text-green-600">-3.0 lbs</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Body Fat</span>
                    <span className="font-medium text-green-600">-1.4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Chest</span>
                    <span className="font-medium text-green-600">+0.5"</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Arms</span>
                    <span className="font-medium text-green-600">+0.4"</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Progress Photos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                      <span className="text-sm text-muted-foreground">Front</span>
                    </div>
                    <div className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                      <span className="text-sm text-muted-foreground">Side</span>
                    </div>
                  </div>
                  <Button className="w-full bg-transparent" variant="outline">
                    Add New Photos
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
