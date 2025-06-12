const http = require("http");

const server = http.createServer((req, res) => {
  console.log("ROUTE: ", req.url, "MEHTOD: ", req.method);

  if (req.url === "/" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Welcome Home</h1>");
  }

  if (req.url === "/" && req.method === "POST") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify({ message: "Welcome Home POST" }));
  }


  
//   res.writeHead(200, { "Content-Type": "application/json" });
//   res.write(JSON.stringify({ message: "Hello World OUTSIDE" }));

  return res.end();
});

server.listen(3002, () => {
  console.log("Server is running on port 3002");
});