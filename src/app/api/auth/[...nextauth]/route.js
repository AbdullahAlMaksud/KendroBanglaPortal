import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "text",
          required: true,
          placeholder: "Your email",
        },
        password: {
          label: "Password",
          type: "password",
          required: true,
          placeholder: "Your password",
        },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        if (!credentials) {
          return null;
        }
        if (email) {
          const currentUser = users.find((user) => user.email === email);
          if (currentUser) {
            if ((currentUser.password === password)) {
              return currentUser;
            }
          }
        }

        return true;
      },
    }),
  ],
  pages: [],
});

export { handler as GET, handler as POST };

const users = [
  {
    id: 1,
    username: "Alice",
    email: "a@b.com",
    password: "12345",
  },
  {
    id: 2,
    username: "Bob",
    email: "bob@e.com",
    password: "password",
  },
  {
    id: 3,
    username: "Charlie",
    email: "c@e.com",
    password: "password",
  },
];
