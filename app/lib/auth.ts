import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import Credentials from "next-auth/providers/credentials";
import { AUTHENTICATE_OTP_MUTATION } from "./mutations";
import { graphqlClient } from "@/utils/graphql-client";
import { getObjectSize } from "@/utils/getObjectByteSize";
export const authOptions: NextAuthOptions = {
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret: process.env.NEXTAUTH_SECRET,
  

  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: 'openid email profile'
        }
      },
    }),
    Credentials({
      id: "email-otp",
      name: "Email OTP",
      credentials: {
        email: { label: "Email", type: "email" },
        otp: { label: "OTP", type: "text" },
      },
      authorize: async (credentials) => {
        try {
          const response: any = await graphqlClient.request(
            AUTHENTICATE_OTP_MUTATION,
            {
              email: credentials!.email,
              otp: credentials!.otp,
            }
          );

          if (response.userEmailAuth.success) {
            const user = response.userEmailAuth.user;
            console.log(user);
            return {

              id: user.id,
              email: user.email,
              personalInfo: user.personalInfo,
              skinCare: user.skinCare,
              fragrance: user.fragrance,
              makeup: user.makeup,
              hairCare: user.hairCare,
              productPreferences: user.productPreferences,
              accessToken: response.userEmailAuth.authData.accessToken,
              refreshToken: response.userEmailAuth.authData.refreshToken,
            };
          } else {
            throw new Error("Invalid OTP");
          }
        } catch (error) {
          throw new Error("Authentication failed");
        }
      },
    }),
  ],

  callbacks: {
    // async redirect({ url, baseUrl }) {
    //   console.log("Redirect URL:", url);
    //   console.log("Base URL:", baseUrl);
      
    //   const urlObj = new URL(url, baseUrl);
    //   const parentUrl = urlObj.searchParams.get('parentUrl');
      
    //   if (parentUrl) {
    //     console.log("Parent URL found:", parentUrl);
    //     // Validate the parentUrl to ensure it's safe to redirect to
    //     if (parentUrl.startsWith('http://') || parentUrl.startsWith('https://')) {
    //       // Append any necessary parameters or tokens to the parentUrl
    //       const redirectUrl = new URL(parentUrl);
    //       redirectUrl.searchParams.append('auth', 'success');
    //       console.log("Redirecting to:", redirectUrl.toString());
    //       return redirectUrl.toString();
    //     }
    //     return parentUrl ? parentUrl : baseUrl
    //   }
      
    //   console.log("Redirecting to default baseUrl");
    //   return parentUrl ? parentUrl : baseUrl
    // },
    async jwt({ token, user, account }) {
      console.log("JWT Callback Triggered");
      
      if (account) {
          console.log("Account Object:", account);
          if (account.provider === "google") {
              token.accessToken = account.access_token!;
              token.idToken = account.id_token!;
              console.log("Google Access Token and ID Token set");
          }
      } else {
          console.log("No account object found");
      }
  
      if (user) {
          console.log("User Object:", user);
          token.accessToken = token.accessToken || user.accessToken;
          token.refreshToken = user.refreshToken;
  
          // Utility function to check if none of the values in an object are null
          const areAllFieldsNonNull = <T>(obj?: T): obj is T => {
              return obj ? Object.values(obj).every((value) => value !== null) : false;
          };
  
          // // Set fields only if none of their values are null
          const filteredUser = {
              id: user.id,
              email: user.email,
              personalInfo: areAllFieldsNonNull(user.personalInfo) ? user.personalInfo : undefined,
              skinCare: areAllFieldsNonNull(user.skinCare) ? user.skinCare : undefined,
              fragrance: areAllFieldsNonNull(user.fragrance) ? user.fragrance : undefined,
              makeup: areAllFieldsNonNull(user.makeup) ? user.makeup : undefined,
              hairCare: areAllFieldsNonNull(user.hairCare) ? user.hairCare : undefined,
              productPreferences: areAllFieldsNonNull(user.productPreferences) ? user.productPreferences : undefined,
          };
  
          // console.log("Filtered User Object:", filteredUser);
          token.user = filteredUser;
          console.log('JWT token size:', getObjectSize(token), 'bytes');
      }
  console.log(token)
      return token;
  },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;
      session.refreshToken = token.refreshToken;
      session.user = {
        id: token.user.id,
        email: token.user.email,
        personalInfo: token.user.personalInfo,
        skinCare: token.user.skinCare,
        fragrance: token.user.fragrance,
        makeup: token.user.makeup,
        hairCare: token.user.hairCare,
        productPreferences: token.user.productPreferences,
      };
      // console.log("Session", session);
      console.log('Session size:', getObjectSize(session), 'bytes');
      console.log('Session token size:', getObjectSize(token), 'bytes');
      return session;
    },
  },
  pages: {
    signIn: "/widget",
    
  },
  session: {
    strategy: "jwt",
  },
  cookies: {
    csrfToken: {
      name: 'next-auth.csrf-token',
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true
      }
    },
    callbackUrl: {
      name: 'next-auth.callback-url',
      options: {
        sameSite: 'none',
        path: '/',
        secure: true
      }
    },
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'none',
        path: '/',
        secure: true
      }
    }
  },
};
