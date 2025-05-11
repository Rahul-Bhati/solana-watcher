import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/prisma/prisma"

export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [Google],
    
    events: {
        async signIn({ user }) {
            // Custom logic to ensure the user exists in database
            if (user.email) {
                const existingUser = await prisma.user.findUnique({
                    where: { email: user.email },
                })

                if (!existingUser) {
                    await prisma.user.create({
                        data: {
                            name: user.name,
                            email: user.email,
                            image: user.image,
                        },
                    })
                }
            }
        },
    },
})