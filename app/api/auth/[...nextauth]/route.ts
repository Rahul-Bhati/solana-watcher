// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { prisma } from "@/prisma/prisma";

// export const authOptions = {
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID!,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//         }),
//     ],
//     callbacks: {
//         async signIn({ account, profile }: any) {
//             if (account.provider === "google") {
//                 const isAllowed = profile.email_verified && profile.email.endsWith("@gmail.com");
//                 if (!isAllowed) return false;

//                 await prisma.user.upsert({
//                     where: { email: profile.email },
//                     update: {
//                         name: profile.name,
//                         image: profile.picture,
//                         emailVerified: new Date(),
//                     },
//                     create: {
//                         email: profile.email,
//                         name: profile.name,
//                         image: profile.picture,
//                         emailVerified: new Date(),
//                     },
//                 });
//             }
//             return true;
//         },
//     },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };

import { handlers } from "@/auth"
export const { GET, POST } = handlers