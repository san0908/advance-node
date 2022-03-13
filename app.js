const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // console.log(req);
  // process.exit()

  let url = req.url;
  let method = req.method;

  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>My Node Page</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="message" placeholder="Type Something Here!"><button type="submit">Click Me</button></body>'
    );
    res.write("</html>");
    // res.end();
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    
    req.on('data', chunk => body.push(chunk));
    
    return req.on('end', () => {
      const message = Buffer.concat(body).toString().split('=')[1];
      fs.writeFile('message.txt', message, err => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.write("<html>");
  res.write("<head><title>My First Node</title></head>");
  res.write("<body><h1>Hello Node.js</h1></body>");
  res.write("</html>");
  res.end();
});

server.listen(3030);
