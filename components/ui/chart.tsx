"use client"

import type React from "react"

import { createContext, useContext } from "react"

const ChartContext = createContext({})

const ChartProvider = ({ children }: { children: React.ReactNode }) => {
  return <ChartContext.Provider value={{}}>{children}</ChartContext.Provider>
}

export const Chart = ({ children }: { children: React.ReactNode }) => {
  return <ChartProvider>{children}</ChartProvider>
}

export const ChartContainer = () => {
  const context = useContext(ChartContext)

  if (!context) {
    throw new Error("ChartContainer must be used within a Chart")
  }

  return <div className="relative" />
}

export const ChartTooltip = () => {
  const context = useContext(ChartContext)

  if (!context) {
    throw new Error("ChartTooltip must be used within a Chart")
  }

  return <div className="absolute z-10 rounded-md border bg-popover p-4 shadow-md" />
}

export const ChartTooltipContent = () => {
  const context = useContext(ChartContext)

  if (!context) {
    throw new Error("ChartTooltipContent must be used within a Chart")
  }

  return <div className="text-sm" />
}

export const ChartLegend = () => {
  const context = useContext(ChartContext)

  if (!context) {
    throw new Error("ChartLegend must be used within a Chart")
  }

  return <div className="flex items-center justify-center" />
}

export const ChartLegendContent = () => {
  const context = useContext(ChartContext)

  if (!context) {
    throw new Error("ChartLegendContent must be used within a Chart")
  }

  return <div className="text-sm" />
}

export const ChartStyle = () => {
  const context = useContext(ChartContext)

  if (!context) {
    throw new Error("ChartStyle must be used within a Chart")
  }

  return null
}
