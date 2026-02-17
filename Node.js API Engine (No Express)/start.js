require("dotenv").config();
const server = require("./server");

server.listen(process.env.PORT, () => {
  console.log(`Server is listening at port ${process.env.PORT}`);
});
