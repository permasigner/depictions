import fastify from "fastify";
import POV from "point-of-view";
import { Liquid } from "liquidjs";
import path from "path";

const app = fastify({ logger: true });
const __dirname = path.resolve(path.dirname(""));

const engine = new Liquid({
    root: path.join(__dirname, "views"),
    extname: ".liquid",
});

app.register(POV, {
    engine: {
        liquid: engine,
    },
});
  
app.get('/', (req, res) => {
    res.send("Hello, world!");
});

app.get('/depiction', (req, res) => {
    res.view("./depiction.liquid", { 
        name: req.query["name"],
    });
});
  
app.listen({ port: 3000 }, function (err, address) {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})
  