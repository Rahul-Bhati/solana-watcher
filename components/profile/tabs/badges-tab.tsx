import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"
import Image from "next/image"

interface BadgesTabProps {
  address: string
}

export default function BadgesTab({ address }: BadgesTabProps) {
  // Mock data - in a real app, this would be fetched from an API
  const badges = [
    {
      id: "top-10",
      name: "TOP 10",
      description: "Ranked in the top 10 wallets by total value",
      image: "/placeholder.svg?height=120&width=120",
      earned: true,
      category: "Ranking",
    },
    {
      id: "1b-tvf",
      name: "$1B TVF",
      description: "Reached $1 billion in total value flow",
      image: "/placeholder.svg?height=120&width=120",
      earned: true,
      category: "Value",
    },
    {
      id: "100-eth-gas",
      name: "100 ETH Gas",
      description: "Spent over 100 ETH on gas fees",
      image: "/placeholder.svg?height=120&width=120",
      earned: true,
      category: "Activity",
    },
    {
      id: "top-100",
      name: "TOP 100",
      description: "Ranked in the top 100 wallets by total value",
      image: "/placeholder.svg?height=120&width=120",
      earned: true,
      category: "Ranking",
    },
    {
      id: "10k-followers",
      name: "10000 Followers",
      description: "Reached 10,000 followers",
      image: "/placeholder.svg?height=120&width=120",
      earned: true,
      category: "Social",
    },
    {
      id: "365-active",
      name: "365 Active Days",
      description: "Active on the platform for 365 consecutive days",
      image: "/placeholder.svg?height=120&width=120",
      earned: true,
      category: "Activity",
    },
    {
      id: "1k-earnings",
      name: "$1K Earnings",
      description: "Earned over $1,000 in trading profits",
      image: "/placeholder.svg?height=120&width=120",
      earned: true,
      category: "Earnings",
    },
    {
      id: "top-1000",
      name: "TOP 1000",
      description: "Ranked in the top 1,000 wallets by total value",
      image: "/placeholder.svg?height=120&width=120",
      earned: true,
      category: "Ranking",
    },
    {
      id: "100m-tvf",
      name: "$100M TVF",
      description: "Reached $100 million in total value flow",
      image: "/placeholder.svg?height=120&width=120",
      earned: true,
      category: "Value",
    },
    {
      id: "100-active",
      name: "100 Active Days",
      description: "Active on the platform for 100 consecutive days",
      image: "/placeholder.svg?height=120&width=120",
      earned: true,
      category: "Activity",
    },
    {
      id: "ape-holder",
      name: "APE Holder",
      description: "Holds at least one APE NFT",
      image: "/placeholder.svg?height=120&width=120",
      earned: true,
      category: "NFT",
    },
    {
      id: "10k-likes",
      name: "10000 Likes",
      description: "Received 10,000 likes on posts",
      image: "/placeholder.svg?height=120&width=120",
      earned: true,
      category: "Social",
    },
    {
      id: "top-10000",
      name: "TOP 10000",
      description: "Ranked in the top 10,000 wallets by total value",
      image: "/placeholder.svg?height=120&width=120",
      earned: true,
      category: "Ranking",
    },
    {
      id: "100-earnings",
      name: "$100 Earnings",
      description: "Earned over $100 in trading profits",
      image: "/placeholder.svg?height=120&width=120",
      earned: true,
      category: "Earnings",
    },
    {
      id: "10-eth-gas",
      name: "10 ETH Gas",
      description: "Spent over 10 ETH on gas fees",
      image: "/placeholder.svg?height=120&width=120",
      earned: true,
      category: "Activity",
    },
  ]

  const categories = [
    { id: "all", name: "All Badges", count: badges.length },
    { id: "ranking", name: "Ranking", count: badges.filter((b) => b.category === "Ranking").length },
    { id: "value", name: "Value", count: badges.filter((b) => b.category === "Value").length },
    { id: "activity", name: "Activity", count: badges.filter((b) => b.category === "Activity").length },
    { id: "social", name: "Social", count: badges.filter((b) => b.category === "Social").length },
    { id: "earnings", name: "Earnings", count: badges.filter((b) => b.category === "Earnings").length },
    { id: "nft", name: "NFT", count: badges.filter((b) => b.category === "NFT").length },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Web3 Badges</h2>
          <p className="text-muted-foreground">
            Earned {badges.filter((b) => b.earned).length} of {badges.length} badges
          </p>
        </div>
        <Button variant="outline" size="sm" className="sm:self-start">
          View all badges
          <ChevronRight className="ml-2 size-4" />
        </Button>
      </div>

      <div className="flex overflow-x-auto pb-2 gap-2 -mx-4 px-4 sm:mx-0 sm:px-0">
        {categories.map((category) => (
          <Badge key={category.id} variant="outline" className="px-3 py-1 cursor-pointer hover:bg-muted">
            {category.name} ({category.count})
          </Badge>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {badges.map((badge) => (
          <Card key={badge.id} className="overflow-hidden border-0 shadow-none hover:bg-muted/50 transition-colors">
            <CardContent className="p-4 flex flex-col items-center text-center">
              <div className="relative w-24 h-24 mb-3">
                <Image src={badge.image || "/placeholder.svg"} alt={badge.name} fill className="object-contain" />
              </div>
              <h3 className="font-semibold">{badge.name}</h3>
              <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{badge.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
