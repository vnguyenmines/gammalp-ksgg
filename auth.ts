import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import PRISMA from "@/prisma"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [Google({
        clientId: process.env.AUTH_GOOGLE_ID ?? "",
        clientSecret: process.env.AUTH_GOOGLE_SECRET ?? "",
        authorization: {
            params: {
                prompt: "consent",
                access_type: "offline",
                response_type: "code",
            }
        }
    })],
    callbacks: {
        async signIn({ account, profile }) {
            if (profile && profile.email && profile.name) {
                // Ensure the user is created locally in the database
                await PRISMA.user.findUniqueOrThrow({
                    where: {
                        email: profile.email
                    }
                }).catch(async (err) => {
                    if (err.code == "P2025" && profile.email && profile.name) {
                        await PRISMA.user.create({
                            data: {
                                email: profile.email,
                                name: profile.name,
                                notes: "sample note"
                            }
                        });
                    }
                // Check whether the name matches the one in the database
                }).then(async (user) => {
                    if (user && user.name != profile.name && profile.name && profile.email) {
                        await PRISMA.user.update({
                            data: {
                                name: profile.name
                            },
                            where: {
                                email: profile.email
                            }
                        });
                    }
                    else if (user) { return; }
                    else {
                        throw Error(`Finding user ${profile.email} broke through Prisma error handling. User value: ${JSON.stringify(user)}`);
                    }
                });

                return true;
            }
            else {
                return false;
            }
        },
    }
})