
import GoogleProvider from "next-auth/providers/google";


import { eq } from "drizzle-orm";
import { db } from "./db";
import { users } from "./db/schema";


export const NEXT_AUTH_CONFIG = {

    providers: [

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
        }),

    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        jwt: async ({ user, token }: any) => {
            if (user) {
                token.uid = user.id;
            }
            return token;
        },
        session: ({ session, token }: any) => {
            if (session.user) {
                session.user.id = token.uid
            }
            return session
        },
        signIn: async ({ profile }: any) => {
            console.log(profile)

            const { email, name } = profile;

            // Initialize Drizzle or your database client


            try {
                // Check if the user already exists
                const existingUser = await db.select().from(users).where(eq(users.email, email));
                console.log(existingUser)
                if (existingUser[0]) {
                    // User exists
                    console.log('User already exists:', existingUser);
                    return true;
                } else {
                    // User does not exist, create a new user
                    await db.insert(users).values({
                        email,
                        name,
                        linkedin: "",
                        about: "",
                        contact: "",
                    });

                    console.log('User created:', { name, email });
                    return true;
                }
            } catch (error) {
                console.error('Error handling sign-in:', error);
                return false;
            }
        }
    },
    pages: {
        signIn: '/signin',
    }
}