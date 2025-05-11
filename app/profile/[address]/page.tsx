import type { Metadata } from "next"
import ProfileHeader from "@/components/profile/profile-header"
import ProfileTabs from "@/components/profile/profile-tabs"

interface ProfilePageProps {
  params: {
    address: string
  }
}

export async function generateMetadata({ params }: ProfilePageProps): Promise<Metadata> {
  // In a real app, you would fetch the user's name/data here
  return {
    title: `${params.address.slice(0, 6)}...${params.address.slice(-4)} | SolanaWatch`,
    description: "View wallet details, NFTs, transactions, and more on SolanaWatch",
  }
}

export default function ProfilePage({ params }: ProfilePageProps) {
  const { address } = params

  return (
    <div className="flex min-h-screen flex-col">
      <ProfileHeader address={address} />
      <main className="flex-1 container px-4 py-6 md:px-6 md:py-8">
        <ProfileTabs address={address} />
      </main>
    </div>
  )
}
