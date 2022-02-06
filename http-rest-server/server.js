const http = require("http");
const fs = require("fs").promises;

const PORT = 8080;

const posts = {};

const server = http.createServer(async (req, res) => {
  try {
    if (req.method === "GET") {
      if (req.url === "/") {
        const data = await fs.readFile("./index.html");
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        return res.end(data);
      } else if (req.url === "/about") {
        const data = await fs.readFile("./about.html");
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        return res.end(data);
      } else if (req.url === "/posts") {
        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
        return res.end(JSON.stringify(posts));
      } else if (req.url.startsWith("/post/")) {
        const key = req.url.split("/")[2];
        const post = posts[key];
        res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
        return res.end(JSON.stringify(post));
      }
      try {
        const data = await fs.readFile(`./${req.url}`);
        return res.end(data);
      } catch (err) {
        console.error(err);
      }
    } else if (req.method === "POST") {
      if (req.url === "/post") {
        let body = "";
        req.on("data", (chunk) => {
          body += chunk;
        });
        return req.on("end", () => {
          const key = Date.now();
          posts[key] = JSON.parse(body);
          res.writeHead(201, { "Content-Type": "text/plain; charset=utf-8" });
          res.end("ok");
        });
      }
    } else if (req.method === "PUT") {
      if (req.url.startsWith("/post/")) {
        const key = req.url.split("/")[2];
        let body = "";
        req.on("data", (chunk) => {
          body += chunk;
        });
        return req.on("end", () => {
          posts[key] = JSON.parse(body);
          res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
          res.end("ok");
        });
      }
    } else if (req.method === "DELETE") {
      if (req.url.startsWith("/post/")) {
        const key = req.url.split("/")[2];
        delete posts[key];
        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        return res.end("ok");
      }
    }
    res.writeHead(404);
    return res.end("Not Found");
  } catch (err) {
    console.error(err);
    res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    return res.end(err.message);
  }
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
