"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Heart, MessageSquare, Repeat2, Share2, ChevronRight } from "lucide-react"
import Image from "next/image"

interface StreamTabProps {
  address: string
}

export default function StreamTab({ address }: StreamTabProps) {
  const [newComment, setNewComment] = useState("")

  // Mock data - in a real app, this would be fetched from an API
  const posts = [
    {
      id: "post1",
      author: {
        name: "Ethereum",
        handle: "ethereum",
        avatar: "/placeholder.svg?height=40&width=40",
        isVerified: true,
      },
      content:
        "Kaito reminds me of Hyperliquid\n\n• Good product\n• Good revenue\n• Team heavily rewards users\n\nExcited for the $KAITO launch",
      image: "/placeholder.svg?height=400&width=600",
      link: {
        title: "Yaps",
        url: "yaps.kaito.ai",
        description: "Yapper Leaderboard",
      },
      timestamp: "Jan 14, 2025",
      likes: 204,
      comments: 21,
      reposts: 23,
      liked: false,
      reposted: false,
    },
    {
      id: "post2",
      author: {
        name: "SolWhale",
        handle: "solwhale",
        avatar: "/placeholder.svg?height=40&width=40",
        isVerified: false,
      },
      content:
        "Just bought more $SOL at $172. The ecosystem is growing faster than ever and I'm extremely bullish on the long-term prospects. Who else is accumulating?",
      image: null,
      link: null,
      timestamp: "Apr 18, 2025",
      likes: 87,
      comments: 32,
      reposts: 12,
      liked: true,
      reposted: false,
    },
    {
      id: "post3",
      author: {
        name: "DeFi Analyst",
        handle: "defianalyst",
        avatar: "/placeholder.svg?height=40&width=40",
        isVerified: true,
      },
      content:
        "Solana TVL has increased by 24% in the past month. The ecosystem is thriving with new projects launching every week. Here are my top 5 Solana DeFi protocols to watch:",
      image: "/placeholder.svg?height=400&width=600",
      link: null,
      timestamp: "Apr 15, 2025",
      likes: 156,
      comments: 45,
      reposts: 67,
      liked: false,
      reposted: true,
    },
  ]

  const comments = [
    {
      id: "comment1",
      author: {
        name: "CryptoTrader",
        handle: "cryptotrader",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: "Thanks for the airdrop, this is amazing!",
      timestamp: "Dec 3, 2024",
      likes: 1,
    },
    {
      id: "comment2",
      author: {
        name: "SolDev",
        handle: "soldev",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: "memecoin supercycle is real",
      timestamp: "Nov 16, 2024",
      likes: 3,
    },
    {
      id: "comment3",
      author: {
        name: "Web3Enthusiast",
        handle: "web3enthusiast",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: "Looks like my short is in profit now",
      timestamp: "Oct 19, 2024",
      likes: 0,
    },
    {
      id: "comment4",
      author: {
        name: "SolanaBuilder",
        handle: "solanabuilder",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: "dont really care, i know my bags are solid",
      timestamp: "Oct 14, 2024",
      likes: 1,
    },
    {
      id: "comment5",
      author: {
        name: "CryptoWhale",
        handle: "cryptowhale",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      content: "done",
      timestamp: "Jul 21, 2024",
      likes: 0,
    },
  ]

  const handlePostComment = () => {
    if (newComment.trim()) {
      // In a real app, you would send this to an API
      console.log("Posting comment:", newComment)
      setNewComment("")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold">Stream</h2>
      </div>

      <Tabs defaultValue="posted" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="posted">Posted</TabsTrigger>
          <TabsTrigger value="reposted">Reposted</TabsTrigger>
        </TabsList>

        <TabsContent value="posted" className="space-y-6">
          <div className="flex gap-4">
            <Avatar className="size-10">
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Profile" />
              <AvatarFallback>SW</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Input
                placeholder="What's happening in Web3?"
                className="mb-2"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <div className="flex justify-end">
                <Button
                  className="bg-orange-500 hover:bg-orange-600"
                  onClick={handlePostComment}
                  disabled={!newComment.trim()}
                >
                  Post
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {posts.map((post) => (
              <Card key={post.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <Avatar className="size-10">
                      <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                      <AvatarFallback>{post.author.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{post.author.name}</span>
                        {post.author.isVerified && (
                          <Badge variant="outline" className="bg-orange-500/10 text-orange-500 border-orange-500/20">
                            VIP
                          </Badge>
                        )}
                        <span className="text-sm text-muted-foreground">• {post.timestamp}</span>
                      </div>
                      <div className="mt-2 whitespace-pre-line">{post.content}</div>
                      {post.image && (
                        <div className="mt-3 rounded-lg overflow-hidden">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt="Post image"
                            width={600}
                            height={400}
                            className="w-full object-cover"
                          />
                        </div>
                      )}
                      {post.link && (
                        <div className="mt-3 border rounded-lg p-3">
                          <div className="text-sm font-medium">{post.link.title}</div>
                          <div className="text-xs text-muted-foreground">{post.link.url}</div>
                          {post.link.description && <div className="mt-1 text-sm">{post.link.description}</div>}
                        </div>
                      )}
                      <div className="mt-4 flex items-center gap-6">
                        <button
                          className={`flex items-center gap-1 text-sm ${post.liked ? "text-red-500" : "text-muted-foreground"} hover:text-red-500`}
                        >
                          <Heart className="size-4" />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                          <MessageSquare className="size-4" />
                          <span>{post.comments}</span>
                        </button>
                        <button
                          className={`flex items-center gap-1 text-sm ${post.reposted ? "text-green-500" : "text-muted-foreground"} hover:text-green-500`}
                        >
                          <Repeat2 className="size-4" />
                          <span>{post.reposts}</span>
                        </button>
                        <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
                          <Share2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reposted" className="space-y-6">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">No reposted content yet</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Comments posted</h3>
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 p-4 border rounded-lg">
              <Avatar className="size-8">
                <AvatarImage src={comment.author.avatar || "/placeholder.svg"} alt={comment.author.name} />
                <AvatarFallback>{comment.author.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{comment.author.name}</span>
                  <span className="text-xs text-muted-foreground">• {comment.timestamp}</span>
                </div>
                <div className="mt-1 text-sm">{comment.content}</div>
                <div className="mt-2 flex items-center gap-2">
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-red-500">
                    <Heart className="size-3" />
                    <span>{comment.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
                    <MessageSquare className="size-3" />
                    <span>Reply</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-center gap-2">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <span className="text-muted-foreground">...</span>
          <Button variant="outline" size="sm">
            9
          </Button>
          <Button variant="outline" size="sm">
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
