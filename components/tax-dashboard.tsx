"use client"

import { DownloadIcon, FileTextIcon, InfoIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Chart } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip } from "recharts"

// Mock data
const mockTaxData = {
  income: {
    total: "$2,450.75",
    sources: [
      { name: "Staking", value: 1200 },
      { name: "Airdrops", value: 850 },
      { name: "Interest", value: 400 },
    ],
  },
  gains: {
    total: "$5,320.30",
    shortTerm: "$1,820.30",
    longTerm: "$3,500.00",
    byMonth: [
      { name: "Jan", value: 300 },
      { name: "Feb", value: 450 },
      { name: "Mar", value: 750 },
      { name: "Apr", value: 320 },
      { name: "May", value: 1200 },
      { name: "Jun", value: 800 },
      { name: "Jul", value: 500 },
      { name: "Aug", value: 600 },
      { name: "Sep", value: 400 },
      { name: "Oct", value: -200 },
      { name: "Nov", value: -300 },
      { name: "Dec", value: 500 },
    ],
  },
  losses: {
    total: "$1,250.45",
  },
}

export function TaxDashboard({ fullView = false }: { fullView?: boolean }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Tax Dashboard</CardTitle>
        <CardDescription>Track your crypto tax obligations</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-sm font-medium">Income</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold">{mockTaxData.income.total}</div>
              <p className="text-xs text-muted-foreground">From staking, airdrops, etc.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-sm font-medium">Capital Gains</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold">{mockTaxData.gains.total}</div>
              <p className="text-xs text-muted-foreground">From trading activities</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="p-4">
              <CardTitle className="text-sm font-medium">Capital Losses</CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-2xl font-bold">{mockTaxData.losses.total}</div>
              <p className="text-xs text-muted-foreground">Offset against gains</p>
            </CardContent>
          </Card>
        </div>

        {fullView && (
          <div className="mt-6">
            <Tabs defaultValue="gains" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="gains">Capital Gains</TabsTrigger>
                <TabsTrigger value="income">Income Sources</TabsTrigger>
              </TabsList>
              <TabsContent value="gains" className="pt-4">
                <div className="h-80 w-full">
                  <Chart>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mockTaxData.gains.byMonth}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <RechartsTooltip />
                        <Bar dataKey="value" fill="#3b82f6" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Chart>
                </div>
              </TabsContent>
              <TabsContent value="income" className="pt-4">
                <div className="h-80 w-full">
                  <Chart>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={mockTaxData.income.sources}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <RechartsTooltip />
                        <Bar dataKey="value" fill="#10b981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Chart>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <DownloadIcon className="h-4 w-4" />
                  <span>CSV Export</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Export all transactions for tax reporting</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <FileTextIcon className="h-4 w-4" />
                  <span>Tax Report</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Generate a detailed tax report</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
      {fullView && (
        <CardFooter>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center space-x-2">
              <InfoIcon className="h-4 w-4" />
              <span className="text-sm">Tax year: 2023</span>
            </div>
            <Button variant="outline" size="sm">
              Change Tax Year
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
