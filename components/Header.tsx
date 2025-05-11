"use client"

import React from 'react'
import { Button } from './ui/button'
import { ArrowUpRight, Zap } from 'lucide-react'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react";

const Header = () => {
  const { data, status } = useSession()
  console.log("session => ", data);
  console.log("status => ",status);
  if (status === "loading") {
    return <div>Loading...</div>;
  }
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-full bg-orange-500/20 flex items-center justify-center">
            <div className="size-6 rounded-full bg-orange-500 flex items-center justify-center">
              <Zap className="size-4 text-white" />
            </div>
          </div>
          <span className="text-xl font-bold">SolanaWatch</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="#features" className="text-sm font-medium hover:text-primary">
            Features
          </Link>
          <Link href="#stats" className="text-sm font-medium hover:text-primary">
            Network Stats
          </Link>
          <Link href="#explore" className="text-sm font-medium hover:text-primary">
            Explore
          </Link>
          <Link href="#community" className="text-sm font-medium hover:text-primary">
            Community
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {status === "authenticated" ? (
            <Button size="sm">
              <Link href={"/home"} className="flex flex-row items-center">
              Launch App
              <ArrowUpRight className="ml-2 size-4" />
              </Link>
              <button onClick={() => signOut()}>Logout</button>
            </Button>
          ) : (
          <Button variant="outline" size="sm" className="hidden md:flex" asChild>
            <button onClick={() => signIn()}>Signin</button>
          </Button> 
          )}
        </div>
      </div>
    </header>
  )
}

export default Header