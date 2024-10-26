import { mapUserToResponse } from "@/app/(user-dashboard)/profile/questions/mappings";
import { authenticateWithEmail } from "@/services/auth/auth";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile",
        },
      },
    }),
    CredentialsProvider({
      id: "email-otp",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        //console.log("Authorize function called with credentials:", credentials);

        const authResponse = await authenticateWithEmail(
          credentials.email,
          credentials.otp
        );

        if (authResponse.success && authResponse.user) {
          //console.log("User authenticated successfully:", authResponse.user);
          //return authResponse.user;
          //TODO check if it is better to set the graphql client header here after a success
          return {
            ...authResponse.user,
            accessToken: authResponse.authData?.accessToken,
            refreshToken: authResponse.authData?.refreshToken,
          };
        } else {
          // console.log("Authentication failed");
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.userData = user;
      }

      // Handle session update
      if (trigger === "update" && session?.userData) {
        token.userData = session.userData;
      }
      return token;
    },
    async session({ session, token }) {
      //console.log("Session callback:", { session, token });
      if (session.user) {
        session.user = {
          ...session.user,
          id: token.id,
          email: token.email,
          accessToken: token.accessToken,
          ...token.userData,
          // Map user data to questionnaire responses
          questionnaireResponses: mapUserToResponse(token.userData),
        };
        console.log(
          "questionnaireResponses is:",
          session.user.questionnaireResponses
        );
      }
      return session;
    },
  },
  debug: process.env.NODE_ENV !== "production",
};
