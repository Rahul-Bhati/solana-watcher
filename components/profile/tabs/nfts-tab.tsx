"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Filter, Grid3X3, List, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface NFTsTabProps {
  address: string
}

export default function NFTsTab({ address }: NFTsTabProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Mock data - in a real app, this would be fetched from an API
  const collections = [
    {
      id: "bored-ape",
      name: "Bored Ape Solana Club",
      items: 3,
      floor: 75,
      totalSpent: 225,
      avgPrice: 15.3846,
      volume: 15.3846,
      change24h: -18.62,
    },
    {
      id: "milady",
      name: "Milady Maker",
      items: 6,
      floor: 2.86,
      totalSpent: 17.16,
      avgPrice: 2.9139,
      volume: 37.881,
      change24h: -2.98,
    },
    {
      id: "hashmasks",
      name: "Hashmasks",
      items: 21,
      floor: 0,
      totalSpent: 0,
      avgPrice: 0.06,
      volume: 0.12,
      change24h: 0,
    },
    {
      id: "mfers",
      name: "mfers",
      items: 27,
      floor: 2.89,
      totalSpent: 78.03,
      avgPrice: 0.5495,
      volume: 2.1981,
      change24h: 25.46,
    },
    {
      id: "honeycomb",
      name: "Honey Comb",
      items: 33,
      floor: 0.0092,
      totalSpent: 0.3036,
      avgPrice: 0.051,
      volume: 0.7647,
      change24h: -9.98,
    },
    {
      id: "gemesis",
      name: "Gemesis",
      items: 37,
      floor: 0.0053,
      totalSpent: 0.1961,
      avgPrice: 0.0376,
      volume: 7.551,
      change24h: 666.67,
    },
  ]

  // Mock NFT data
  const nfts = [
    {
      id: "bored-ape-1",
      name: "Bored Ape #1234",
      collection: "Bored Ape Solana Club",
      image: "/placeholder.svg?height=300&width=300",
      price: 75,
      rarity: "Legendary",
      attributes: [
        { trait: "Background", value: "Blue" },
        { trait: "Fur", value: "Golden" },
        { trait: "Eyes", value: "Laser" },
        { trait: "Mouth", value: "Bored" },
      ],
    },
    {
      id: "bored-ape-2",
      name: "Bored Ape #5678",
      collection: "Bored Ape Solana Club",
      image: "/placeholder.svg?height=300&width=300",
      price: 75,
      rarity: "Rare",
      attributes: [
        { trait: "Background", value: "Red" },
        { trait: "Fur", value: "Brown" },
        { trait: "Eyes", value: "Angry" },
        { trait: "Mouth", value: "Cigarette" },
      ],
    },
    {
      id: "milady-1",
      name: "Milady #2345",
      collection: "Milady Maker",
      image: "/placeholder.svg?height=300&width=300",
      price: 2.86,
      rarity: "Uncommon",
      attributes: [
        { trait: "Background", value: "Pink" },
        { trait: "Hair", value: "Blonde" },
        { trait: "Eyes", value: "Blue" },
        { trait: "Outfit", value: "Dress" },
      ],
    },
    {
      id: "milady-2",
      name: "Milady #6789",
      collection: "Milady Maker",
      image: "/placeholder.svg?height=300&width=300",
      price: 2.86,
      rarity: "Common",
      attributes: [
        { trait: "Background", value: "Green" },
        { trait: "Hair", value: "Black" },
        { trait: "Eyes", value: "Brown" },
        { trait: "Outfit", value: "Casual" },
      ],
    },
    {
      id: "mfer-1",
      name: "mfer #3456",
      collection: "mfers",
      image: "/placeholder.svg?height=300&width=300",
      price: 2.89,
      rarity: "Epic",
      attributes: [
        { trait: "Background", value: "White" },
        { trait: "Head", value: "Beanie" },
        { trait: "Eyes", value: "Shades" },
        { trait: "Smoke", value: "Cigarette" },
      ],
    },
    {
      id: "mfer-2",
      name: "mfer #7890",
      collection: "mfers",
      image: "/placeholder.svg?height=300&width=300",
      price: 2.89,
      rarity: "Rare",
      attributes: [
        { trait: "Background", value: "Yellow" },
        { trait: "Head", value: "Hoodie" },
        { trait: "Eyes", value: "3D Glasses" },
        { trait: "Smoke", value: "Pipe" },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold">NFTs</h2>
        <div className="flex items-center gap-2">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input type="search" placeholder="Search NFTs..." className="w-full pl-9" />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "bg-muted" : ""}
          >
            <Grid3X3 className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "bg-muted" : ""}
          >
            <List className="size-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 size-4" />
            Filter
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="all">All NFTs</TabsTrigger>
          <TabsTrigger value="collections">Collections</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {nfts.map((nft) => (
                <Card key={nft.id} className="overflow-hidden">
                  <div className="aspect-square relative">
                    <Image src={nft.image || "/placeholder.svg"} alt={nft.name} fill className="object-cover" />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold truncate">{nft.name}</h3>
                    <p className="text-sm text-muted-foreground truncate">{nft.collection}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20">
                        {nft.rarity}
                      </Badge>
                      <span className="font-medium">{nft.price} SOL</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="h-12 px-4 text-left align-middle font-medium">NFT</th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Collection</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Rarity</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Price</th>
                        <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {nfts.map((nft) => (
                        <tr key={nft.id} className="border-b">
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-3">
                              <div className="size-10 rounded-md overflow-hidden bg-muted">
                                <Image
                                  src={nft.image || "/placeholder.svg"}
                                  alt={nft.name}
                                  width={40}
                                  height={40}
                                  className="size-10 object-cover"
                                />
                              </div>
                              <span className="font-medium">{nft.name}</span>
                            </div>
                          </td>
                          <td className="p-4 align-middle text-muted-foreground">{nft.collection}</td>
                          <td className="p-4 align-middle text-right">
                            <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20">
                              {nft.rarity}
                            </Badge>
                          </td>
                          <td className="p-4 align-middle text-right font-medium">{nft.price} SOL</td>
                          <td className="p-4 align-middle text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="collections" className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>NFT Collections</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="h-12 px-4 text-left align-middle font-medium">Collection</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">Items</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">Floor (SOL)</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">Total Spent (SOL)</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">Avg Price (SOL)</th>
                      <th className="h-12 px-4 text-right align-middle font-medium">24h</th>
                    </tr>
                  </thead>
                  <tbody>
                    {collections.map((collection) => (
                      <tr key={collection.id} className="border-b">
                        <td className="p-4 align-middle font-medium">{collection.name}</td>
                        <td className="p-4 align-middle text-right">{collection.items}</td>
                        <td className="p-4 align-middle text-right">{collection.floor}</td>
                        <td className="p-4 align-middle text-right">{collection.totalSpent}</td>
                        <td className="p-4 align-middle text-right">{collection.avgPrice}</td>
                        <td
                          className={`p-4 align-middle text-right ${collection.change24h >= 0 ? "text-green-500" : "text-red-500"}`}
                        >
                          {collection.change24h >= 0 ? "+" : ""}
                          {collection.change24h}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
