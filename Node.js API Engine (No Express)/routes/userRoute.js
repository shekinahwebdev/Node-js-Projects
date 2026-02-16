let users = [
  { id: 1, email: "pat@gmail.com" },
  { id: 2, email: "shek@gmail.com" },
  { id: 3, email: "shilo@gmail.com" },
];

// GET ALL USERS
const getAllUsers = (req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(users));
  return;
};

// GET A USER BY ID
const getNewUser = (req, res, id) => {
  const user = users.find((u) => u.id === parseInt(id));

  if (!user) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "User cannot be found" }));
    return;
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(user));
};

// POST / CREATE A NEW USER

const postNewUser = async (req, res) => {
  const { email } = JSON.parse(body);

  if (!email) {
    throw new Error("Email is required");
  }
  const newUser = { id: users.length + 1, email: email };
  users.push(newUser);

  res.writeHead(201, { "Content-Type": "application/json" });
  res.end(JSON.stringify(newUser));
  return;
};

module.exports = { getAllUsers, getNewUser, postNewUser };
