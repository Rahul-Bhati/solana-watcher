"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Copy, ExternalLink, MoreHorizontal, RefreshCw, Zap } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { formatNumber } from "@/lib/utils"

interface ProfileHeaderProps {
  address: string
}

export default function ProfileHeader({ address }: ProfileHeaderProps) {
  const [isFollowing, setIsFollowing] = useState(false)

  // Mock data - in a real app, this would be fetched from an API
  const profileData = {
    displayName: "SolWhale",
    address: address,
    avatarColor: "orange",
    isVerified: true,
    totalValue: 1458932.45,
    changePercentage: -0.27,
    tvf: "$2.1B",
    followers: 14200,
    following: 747,
    earnings: 2195.8,
    memberSince: "1480 days",
    hiOfferPrice: 15.0,
    answered: 2,
    lastUpdated: "36 mins ago",
  }

  const toggleFollow = () => {
    setIsFollowing(!isFollowing)
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(address)
    // In a real app, you would show a toast notification here
  }

  return (
    <div className="border-b bg-background">
      <div className="container px-4 py-6 md:px-6 md:py-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="size-16 md:size-20 rounded-full bg-orange-500/20 flex items-center justify-center">
              <div className="size-14 md:size-18 rounded-full bg-orange-500/40 flex items-center justify-center">
                <div className="size-12 md:size-16 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xl md:text-2xl">
                  {profileData.displayName.slice(0, 2)}
                </div>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold">{profileData.displayName}</h1>
                {profileData.isVerified && (
                  <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20">
                    VIP
                  </Badge>
                )}
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="font-mono">
                  {address.length > 10 ? `${address.slice(0, 6)}...${address.slice(-4)}` : address}
                </span>
                <button
                  onClick={copyAddress}
                  className="ml-1 text-muted-foreground hover:text-foreground"
                  aria-label="Copy address"
                >
                  <Copy className="size-3" />
                </button>
                <Link
                  href={`https://explorer.solana.com/address/${address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-muted-foreground hover:text-foreground"
                  aria-label="View on Solana Explorer"
                >
                  <ExternalLink className="size-3" />
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2">
              <div className="text-3xl font-bold">${formatNumber(profileData.totalValue)}</div>
              <div className={`text-sm ${profileData.changePercentage >= 0 ? "text-green-500" : "text-red-500"}`}>
                {profileData.changePercentage >= 0 ? "+" : ""}
                {profileData.changePercentage}%
              </div>
            </div>
            <div className="text-sm text-muted-foreground">TVF {profileData.tvf}</div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="grid grid-cols-3 gap-4 sm:flex sm:gap-8">
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Followers</span>
              <span className="font-bold">{formatNumber(profileData.followers, 0)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Following</span>
              <span className="font-bold">{formatNumber(profileData.following, 0)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground">Earnings</span>
              <span className="font-bold">${formatNumber(profileData.earnings)}</span>
            </div>
            <div className="hidden sm:flex sm:flex-col">
              <span className="text-sm text-muted-foreground">Member Since</span>
              <span className="font-bold">{profileData.memberSince}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={isFollowing ? "outline" : "default"}
              className={isFollowing ? "" : "bg-orange-500 hover:bg-orange-600"}
              onClick={toggleFollow}
            >
              {isFollowing ? "Following" : "Follow"}
            </Button>
            <Button variant="outline" size="icon">
              <Zap className="size-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Add to Watchlist</DropdownMenuItem>
                <DropdownMenuItem>Share Profile</DropdownMenuItem>
                <DropdownMenuItem>Report</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-end text-sm text-muted-foreground">
          <RefreshCw className="mr-2 size-3" />
          <span>Data updated {profileData.lastUpdated}</span>
        </div>
      </div>
    </div>
  )
}
