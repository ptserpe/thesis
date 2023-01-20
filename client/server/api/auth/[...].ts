import { NuxtAuthHandler } from "#auth"
import KeycloakProvider from 'next-auth/providers/keycloak'
const config = useRuntimeConfig()

export default NuxtAuthHandler({
  secret: process.env.NUXT_SECRET,
  providers: [
    // @ts-expect-error You need to use .default here for it to work during SSR. May be fixed via Vite at some point
    KeycloakProvider.default({
      clientId: process.env.KC_CLIENTID,
      clientSecret: process.env.KC_CLIENTSECRET,
      issuer: process.env.KC_ISSUER,
    })
  ],
  callbacks: {
    // Callback when the JWT is created / updated, see https://next-auth.js.org/configuration/callbacks#jwt-callback
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      return token
    },
    // Callback whenever session is checked, see https://next-auth.js.org/configuration/callbacks#session-callback
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.user.id = token.sub
      return session
    }
  },
})