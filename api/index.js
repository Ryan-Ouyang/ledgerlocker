const express = require("express");
const cors = require("cors");
const app = express();

var server = require("http").createServer(app);
var io = require("socket.io")(server);

app.use(cors());
app.use(express.json());

io.on("connection", function(socket) {
  console.log("LOCK CONNECTED");
});

app.post("/api/unlock/", function(req, res) {
  io.sockets.emit("open sesame", req);
});

app.post("/api/lock/", function(req, res) {
  io.sockets.emit("lock", req);
});

app.post("/api/changeID", function(req, res) {
  io.sockets.emit("change", req);
});

app.get("/api/listings", function(req, res) {
  const listings = [
    {
      name: "Walk 12 minutes to bus 194 & 196 in Forest Park, GA",
      key: 1,
      address: "Forest Park, GA",
      rent: "50 DAI/day",
      stake: 2,
      description:
        "123 Broadway, Denver near ABC Mall. Walking score 95, with everything you can want within 5 minutes walking distance. House was just renovated and has hardwood floors, new kitchen appliances, and renovated bathrooms. A great place to call it your home!",
  
      images: [
        "https://www.padsplit.com/img/rooms/room_866_0_1578610474.769763.jpg",
        "https://www.padsplit.com/img/rooms/room_866_1_1578610474.769763.jpg",
        "https://www.padsplit.com/img/psproperty/psproperty_158_4_1578610474.769763.jpg",
        "https://www.padsplit.com/img/psproperty/psproperty_158_3_1578610474.769763.jpg",
        "https://www.padsplit.com/img/psproperty/psproperty_158_2_1578610474.769763.jpg",
        "https://www.padsplit.com/img/psproperty/psproperty_158_1_1578610474.769763.jpg",
        "https://www.padsplit.com/img/psproperty/psproperty_158_0_1578610474.769763.jpg"
      ]
    },
    {
      name: "Walk 12 minutes to bus 194 & 196 in Forest Park, GA",
      key: 2,
      address: "Forest Park, GA",
      rent: "50 DAI/day",
      stake: 2,
      description:
        "123 Broadway, Denver near ABC Mall. Walking score 95, with everything you can want within 5 minutes walking distance. House was just renovated and has hardwood floors, new kitchen appliances, and renovated bathrooms. A great place to call it your home!",
  
      images: [
        "https://www.padsplit.com/img/rooms/room_866_0_1578610474.769763.jpg",
        "https://www.padsplit.com/img/rooms/room_866_1_1578610474.769763.jpg",
        "https://www.padsplit.com/img/psproperty/psproperty_158_4_1578610474.769763.jpg",
        "https://www.padsplit.com/img/psproperty/psproperty_158_3_1578610474.769763.jpg",
        "https://www.padsplit.com/img/psproperty/psproperty_158_2_1578610474.769763.jpg",
        "https://www.padsplit.com/img/psproperty/psproperty_158_1_1578610474.769763.jpg",
        "https://www.padsplit.com/img/psproperty/psproperty_158_0_1578610474.769763.jpg"
      ]
    }
  ];

  res.send(listings);
});

server.listen(3001, () => console.log("API listening on port 3001"));
