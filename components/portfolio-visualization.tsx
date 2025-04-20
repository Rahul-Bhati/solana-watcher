"use client"

import { useState } from "react"
import { InfoIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Chart } from "@/components/ui/chart"
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

// Mock data
const portfolioHistory = [
  { date: "Jan", value: 5000 },
  { date: "Feb", value: 5200 },
  { date: "Mar", value: 4800 },
  { date: "Apr", value: 5500 },
  { date: "May", value: 6200 },
  { date: "Jun", value: 7000 },
  { date: "Jul", value: 7500 },
  { date: "Aug", value: 8200 },
  { date: "Sep", value: 9000 },
  { date: "Oct", value: 10500 },
  { date: "Nov", value: 11200 },
  { date: "Dec", value: 12345 },
]

const assetAllocation = [
  { name: "ETH", value: 5500, color: "#3b82f6" },
  { name: "BTC", value: 3200, color: "#f59e0b" },
  { name: "USDC", value: 2000, color: "#10b981" },
  { name: "MATIC", value: 1000, color: "#8b5cf6" },
  { name: "Other", value: 645, color: "#6b7280" },
]

const timeRanges = ["1D", "1W", "1M", "3M", "1Y", "ALL"]

export function PortfolioVisualization() {
  const [timeRange, setTimeRange] = useState("1Y")

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Portfolio Visualization</CardTitle>
        <CardDescription>Track your portfolio performance and allocation</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">$12,345.67</h3>
            <p className="text-sm text-green-500">+$845.32 (7.35%)</p>
          </div>
          <div className="flex space-x-1">
            {timeRanges.map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(range)}
                className="h-7 px-2 text-xs"
              >
                {range}
              </Button>
            ))}
          </div>
        </div>

        <Tabs defaultValue="growth" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="growth">Growth</TabsTrigger>
            <TabsTrigger value="allocation">Allocation</TabsTrigger>
          </TabsList>
          <TabsContent value="growth" className="pt-4">
            <div className="h-64 w-full">
              <Chart>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={portfolioHistory}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <RechartsTooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={false}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Chart>
            </div>
          </TabsContent>
          <TabsContent value="allocation" className="pt-4">
            <div className="h-64 w-full">
              <Chart>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={assetAllocation}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {assetAllocation.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend />
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Chart>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1">
            <InfoIcon className="h-4 w-4" />
            <span className="text-muted-foreground">Last updated: Today, 12:30 PM</span>
          </div>
          <Button variant="ghost" size="sm">
            Refresh
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
