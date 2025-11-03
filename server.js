const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 👉 Usa variable de entorno (Render) o cae a un string si probás local
const uri = process.env.MONGO_URI || "mongodb+srv://accesovehicular-ia:esp32-juansuki@acceso-vehicular-ia.a7kuqfd.mongodb.net/?retryWrites=true&w=majority&appName=Acceso-Vehicular-IA";
const client = new MongoClient(uri);

async function startServer() {
  try {
    await client.connect();
    const db = client.db("acceso_vehicular");
    const patentes = db.collection("lecturas");

    console.log("✅ Conectado a MongoDB Atlas");

    // Salud
    app.get("/health", (_req, res) => res.json({ ok: true }));

    // Guarda una lectura
    app.post("/patente", async (req, res) => {
      try {
        const { plate, score } = req.body;
        if (!plate) return res.status(400).send({ error: "Falta patente" });

        const data = {
          plate,
          score: typeof score === "number" ? score : 0,
          timestamp: new Date()
        };

        await patentes.insertOne(data);
        console.log("📦 Guardado:", data);
        res.status(201).send({ ok: true });
      } catch (err) {
        console.error("❌ Error al guardar:", err);
        res.status(500).send({ error: err.message });
      }
    });

    // Lista las últimas 50
    app.get("/patentes", async (_req, res) => {
      const docs = await patentes.find().sort({ timestamp: -1 }).limit(50).toArray();
      res.send(docs);
    });

    // Página raíz
app.get("/", (req, res) => {
  res.send(`
    <h1>🚗 Acceso Vehicular API</h1>
    <p>Servidor funcionando correctamente.</p>
    <ul>
      <li>✅ <a href="/health">/health</a> — Verificar estado del servidor</li>
      <li>📋 <a href="/patentes">/patentes</a> — Ver últimas patentes guardadas</li>
      <li>📩 POST /patente — Endpoint para recibir patentes desde ESP32</li>
    </ul>
  `);
});

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`🚀 API en puerto ${PORT}`));
  } catch (err) {
    console.error("❌ Error conectando a MongoDB:", err);
    process.exit(1);
  }
}

startServer();
