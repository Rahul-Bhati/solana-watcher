"use client"

import { BellIcon, CalendarIcon } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Mock data
const mockAirdrops = [
  {
    id: "1",
    name: "TokenX",
    symbol: "TKX",
    date: "2023-05-15T00:00:00Z",
    status: "upcoming",
    eligibility: "confirmed",
    notificationsEnabled: true,
  },
  {
    id: "2",
    name: "DeFi Protocol",
    symbol: "DFP",
    date: "2023-04-30T00:00:00Z",
    status: "upcoming",
    eligibility: "potential",
    notificationsEnabled: false,
  },
  {
    id: "3",
    name: "MetaDAO",
    symbol: "META",
    date: "2023-04-01T00:00:00Z",
    status: "completed",
    eligibility: "confirmed",
    received: "250 META",
    value: "$125.00",
    notificationsEnabled: true,
  },
  {
    id: "4",
    name: "LayerZero",
    symbol: "ZRO",
    date: "2023-03-15T00:00:00Z",
    status: "completed",
    eligibility: "confirmed",
    received: "100 ZRO",
    value: "$320.00",
    notificationsEnabled: true,
  },
]

export function AirdropTracker({ fullView = false }: { fullView?: boolean }) {
  const upcomingAirdrops = mockAirdrops.filter((airdrop) => airdrop.status === "upcoming")
  const pastAirdrops = mockAirdrops.filter((airdrop) => airdrop.status === "completed")

  const toggleNotification = (id: string) => {
    // Toggle notification logic would go here
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Airdrop Tracker</CardTitle>
        <CardDescription>Track upcoming and past airdrops for your wallets</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="mb-2 text-sm font-medium">Upcoming Airdrops</h3>
          <div className="space-y-3">
            {upcomingAirdrops.map((airdrop) => (
              <div key={airdrop.id} className="flex items-center justify-between rounded-lg border p-3">
                <div className="space-y-1">
                  <div className="flex items-center">
                    <h4 className="font-medium">{airdrop.name}</h4>
                    <Badge className="ml-2" variant={airdrop.eligibility === "confirmed" ? "default" : "outline"}>
                      {airdrop.eligibility === "confirmed" ? "Eligible" : "Potential"}
                    </Badge>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <CalendarIcon className="mr-1 h-3 w-3" />
                    {new Date(airdrop.date).toLocaleDateString()}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Switch
                          checked={airdrop.notificationsEnabled}
                          onCheckedChange={() => toggleNotification(airdrop.id)}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Toggle notifications</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            ))}
          </div>
        </div>

        {(fullView || pastAirdrops.length > 0) && (
          <div>
            <h3 className="mb-2 text-sm font-medium">Past Airdrops</h3>
            <div className="space-y-3">
              {pastAirdrops.slice(0, fullView ? undefined : 2).map((airdrop) => (
                <div key={airdrop.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div className="space-y-1">
                    <h4 className="font-medium">{airdrop.name}</h4>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span className="mr-2">Received: {airdrop.received}</span>
                      <span>Value: {airdrop.value}</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Badge variant="outline" className="ml-2">
                      {new Date(airdrop.date).toLocaleDateString()}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
      {fullView && (
        <CardFooter>
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center space-x-2">
              <BellIcon className="h-4 w-4" />
              <span className="text-sm">Notifications</span>
            </div>
            <Switch defaultChecked />
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
