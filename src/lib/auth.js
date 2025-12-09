//lib/auth.js
import Credentials from "next-auth/providers/credentials"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/backend/firebase"

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "credentials",
      async authorize(credentials) {
        try {
          const cred = await signInWithEmailAndPassword(
              auth,
              credentials.email,
              credentials.password
            )

          const user = cred.user

          return {
            id: user.uid,
            name: user.displayName || "",
            email: user.email,
          }
        } catch {
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt ({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session ({ session, token }) {
      session.user.id = token.id
      return session
    },
  },

  pages: {
    signIn: "/login",
  },
}
