export async function PATCH(request, { params }) {
  const body = await request.json();
  console.log(body);

  const index = users.findIndex((u) => u.id === parseInt(params.id));

  users[index] = {
    username: body.username,
  };

  return Response.json({
    message: "User Update",
    users,
  });
}

export async function DELETE(request, { params }) {
  const newUsers = users.filter((u) => u.id === parseInt(params.id));
  return Response.json({
    message: "User Delete",

    newUsers,
  });
}
const users = [
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
