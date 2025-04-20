"use client"

import { useState } from "react"
import { BellIcon, PlusIcon, TrashIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Mock data
const mockAlerts = [
  {
    id: "1",
    type: "large_transfer",
    direction: "incoming",
    threshold: "1000",
    asset: "ETH",
    enabled: true,
  },
  {
    id: "2",
    type: "price_change",
    asset: "BTC",
    threshold: "5",
    enabled: true,
  },
  {
    id: "3",
    type: "large_transfer",
    direction: "outgoing",
    threshold: "500",
    asset: "USDC",
    enabled: false,
  },
]

export function AlertsSettings() {
  const [alerts, setAlerts] = useState(mockAlerts)
  const [newAlert, setNewAlert] = useState({
    type: "large_transfer",
    direction: "incoming",
    threshold: "1000",
    asset: "ETH",
  })

  const handleAddAlert = () => {
    const alert = {
      id: Date.now().toString(),
      ...newAlert,
      enabled: true,
    }
    setAlerts([...alerts, alert])
  }

  const handleDeleteAlert = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
  }

  const handleToggleAlert = (id: string) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, enabled: !alert.enabled } : alert)))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alerts Settings</CardTitle>
        <CardDescription>Configure custom alerts for your portfolio</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-medium">Add New Alert</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <label htmlFor="alert-type" className="text-sm font-medium">
                Alert Type
              </label>
              <Select value={newAlert.type} onValueChange={(value) => setNewAlert({ ...newAlert, type: value })}>
                <SelectTrigger id="alert-type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="large_transfer">Large Transfer</SelectItem>
                  <SelectItem value="price_change">Price Change</SelectItem>
                  <SelectItem value="low_balance">Low Balance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {newAlert.type === "large_transfer" && (
              <div className="space-y-2">
                <label htmlFor="direction" className="text-sm font-medium">
                  Direction
                </label>
                <Select
                  value={newAlert.direction}
                  onValueChange={(value) => setNewAlert({ ...newAlert, direction: value })}
                >
                  <SelectTrigger id="direction">
                    <SelectValue placeholder="Select direction" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="incoming">Incoming</SelectItem>
                    <SelectItem value="outgoing">Outgoing</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="asset" className="text-sm font-medium">
                Asset
              </label>
              <Select value={newAlert.asset} onValueChange={(value) => setNewAlert({ ...newAlert, asset: value })}>
                <SelectTrigger id="asset">
                  <SelectValue placeholder="Select asset" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ETH">ETH</SelectItem>
                  <SelectItem value="BTC">BTC</SelectItem>
                  <SelectItem value="USDC">USDC</SelectItem>
                  <SelectItem value="MATIC">MATIC</SelectItem>
                  <SelectItem value="ALL">All Assets</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="threshold" className="text-sm font-medium">
                Threshold
              </label>
              <div className="flex items-center space-x-2">
                <Input
                  id="threshold"
                  type="number"
                  value={newAlert.threshold}
                  onChange={(e) => setNewAlert({ ...newAlert, threshold: e.target.value })}
                  className="w-full"
                />
                {newAlert.type === "price_change" && <span>%</span>}
              </div>
            </div>
          </div>

          <Button onClick={handleAddAlert} className="mt-2">
            <PlusIcon className="mr-2 h-4 w-4" />
            Add Alert
          </Button>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Current Alerts</h3>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Asset</TableHead>
                  <TableHead>Threshold</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alerts.map((alert) => (
                  <TableRow key={alert.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="capitalize">
                          {alert.type.replace("_", " ")}
                        </Badge>
                        {alert.direction && (
                          <Badge variant="secondary" className="capitalize">
                            {alert.direction}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{alert.asset}</TableCell>
                    <TableCell>
                      {alert.threshold}
                      {alert.type === "price_change" && "%"}
                    </TableCell>
                    <TableCell>
                      <Switch checked={alert.enabled} onCheckedChange={() => handleToggleAlert(alert.id)} />
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => handleDeleteAlert(alert.id)}>
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center space-x-2">
          <BellIcon className="h-4 w-4" />
          <span className="text-sm">Notification methods</span>
        </div>
        <Button variant="outline">Configure</Button>
      </CardFooter>
    </Card>
  )
}
