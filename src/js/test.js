import request from "./request.js";

async function test() {
  const response = await request("api/test", {
    method: "GET",
  });
}

test();
