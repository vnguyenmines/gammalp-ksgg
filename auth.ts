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
        async signIn({ profile }) {
            console.log(`User ${profile?.name}/${profile?.email} is requesting authentication`);
            if (profile && profile.email && profile.name && profile.email.endsWith("@mines.edu")) {
                console.log(`User ${profile.email} passed email restriction`);
                // Ensure the user is created locally in the database
                await PRISMA.user.findUniqueOrThrow({
                    where: {
                        email: profile.email
                    }
                }).catch(async (err) => {
                    if (err.code == "P2025" && profile.email && profile.name) {
                        console.log(`User ${profile.email} does not exist in the database. Creating a new user...`);
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
                    // Check if there are any updates to data
                    if (user && profile.name && profile.email && user.name != profile.name) {
                        console.log(`User ${profile.email} name changed.`);
                        await PRISMA.user.update({
                            data: {
                                name: profile.name
                            },
                            where: {
                                email: profile.email
                            }
                        });
                    }
                    // else if (user) { return; }
                    // else {
                    //     throw Error(`Finding user ${profile.email} broke through Prisma error handling. User value: ${JSON.stringify(user)}`);
                    // }
                });

                return true;
            }
            else {
                console.log(`User ${profile?.email} failed to meet the email restriction`);
                return false;
            }
        },
    }
})