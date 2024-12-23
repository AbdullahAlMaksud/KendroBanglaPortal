export async function GET() {
  return Response.json(user, {
    headers: {
      "Set-Cookie": "theme=dark",
    },
  });
}

export async function POST(request) {
  const newUser = await request.json();
  user.push({
    id: user.length + 1,
    username: newUser.username,
  });
  return Response.json({
    messege: "User NEw",
    user,
  });
}

const user = [
  {
    id: 1,
    username: "user01",
  },
  {
    id: 2,
    username: "user02",
  },
  {
    id: 3,
    username: "user03",
  },
];
