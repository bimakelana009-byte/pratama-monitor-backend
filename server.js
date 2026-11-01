const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let servers = [];

app.get("/", (req, res) => {
  res.json({
    name: "PRATAMA MONITOR",
    status: "Backend aktif"
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "PRATAMA MONITOR API berjalan",
    timestamp: new Date().toISOString()
  });
});

app.get("/api/servers", (req, res) => {
  res.json(servers);
});

app.post("/api/servers", (req, res) => {
  const { name, address } = req.body;

  if (!name || !address) {
    return res.status(400).json({
      success: false,
      message: "Nama dan alamat server wajib diisi"
    });
  }

  const server = {
    id: Date.now().toString(),
    name,
    address,
    status: "UNKNOWN",
    createdAt: new Date().toISOString()
  };

  servers.push(server);

  res.status(201).json({
    success: true,
    server
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`PRATAMA MONITOR berjalan di port ${PORT}`);
});
