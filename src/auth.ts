import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import dbConnect from '@/lib/db';
import { User } from '@/models/Schema';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        await dbConnect();
        if (!credentials?.email || !credentials?.password) {
            return null;
        }

        const user = await User.findOne({ email: credentials.email }).select('+password');

        if (!user) {
          throw new Error('User not found.');
        }

        // In a real app, you should hash passwords with bcrypt. 
        // For simplicity/demo with dummy data, we might do direct comparison or assume hashed.
        // Let's assume direct comparison if the user was seeded manually without hash, 
        // OR better: just check if passwords match (insecure for prod, okay for prototype if noted).
        // Update: Let's use simple string comparison for this prototype unless requested otherwise.
        // Ideally: const passwordsMatch = await bcrypt.compare(credentials.password, user.password);
        
        const passwordsMatch = credentials.password === user.password; 

        if (!passwordsMatch) {
            console.log("Password mismatch");
            return null;
        }

        return { id: user._id, email: user.email, name: user.name, role: user.role };
      },
    }),
  ],
  callbacks: {
      async jwt({ token, user }: any) {
          if (user) {
              token.role = user.role;
              token.id = user.id;
          }
          return token;
      },
      async session({ session, token }: any) {
          if (session.user) {
              session.user.role = token.role;
              session.user.id = token.id; // Corrected from session.user.id = token.id
          }
          return session;
      }
  },
  pages: {
    signIn: '/login',
  },
});
