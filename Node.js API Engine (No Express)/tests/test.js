const test = require("node:test");
const assert = require("node:assert/strict");
const http = require("node:http");
const server = require("../server");
require("dotenv").config({
  path: require("path").resolve(__dirname, "config/.env"),
});

let baseUrl;

test.before(async () => {
  await new Promise((resolve) => {
    server.listen(`${process.env.PORT}`, () => {
      baseUrl = `http://localhost:${process.env.PORT}`;
      resolve();
    });
  });
});

test.after(() => {
  server.close();
});

const makeRequest = (path, method, body = null) => {
  return new Promise((resolve, reject) => {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const request = http.request(`${baseUrl}${path}`, options, (response) => {
      let data = "";

      response.on("data", (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        resolve({
          statusCode: response.statusCode,
          body: data,
        });
      });
    });

    request.on("error", reject);

    if (body) {
      request.write(JSON.stringify(body));
    }

    request.end();
  });
};

test("GET /users returns all users", async () => {
  const response = await makeRequest("/users", "GET");
  assert.strictEqual(response.statusCode, 200);
});

test("GET /users/:id return a particular user", async () => {
  const response = await makeRequest("/users/1", "GET");
  assert.strictEqual(response.statusCode, 200);
});

test("GET /user not found should return 404", async () => {
  const response = await makeRequest("/users/999", "GET");
  assert.strictEqual(response.statusCode, 404);
});

test("POST /users should return 201 and a message", async () => {
  const response = await makeRequest(
    "/users",
    "POST",
    JSON.stringify({
      email: "pat@gmail.com",
    }),
  );
  assert.strictEqual(response.statusCode, 201);
  assert.deepStrictEqual(JSON.parse(response.body), {
    id: 1,
    email: "pat@gmail.com",
  });
});
