Crea este archivo (opcional pero muy útil para Render y GitHub):

# 🚗 Acceso Vehicular - Backend (ESP32 + MongoDB + Render)

Este backend recibe las patentes detectadas por un **ESP32-CAM** con Plate Recognizer y las guarda en **MongoDB Atlas**.

---

## 🌐 Endpoints

- `POST /patente` → Recibe `{ plate, score }` y guarda en MongoDB.
- `GET /patentes` → Devuelve las últimas 50 lecturas.

---

## ⚙️ Deploy en Render

1. Creá una cuenta gratuita en [https://render.com](https://render.com)
2. Clic en **New + → Web Service**
3. Elegí tu repositorio de GitHub con este proyecto
4. En **Build Command**:  
5. En **Start Command**:
6. En **Environment Variables**, agregá:
- `MONGO_URI` (opcional, si querés mover la URL de conexión fuera del código)
7. Clic en **Deploy**

Render te va a dar una URL pública tipo:  
👉 `https://acceso-vehicular.onrender.com`

---

## 🔗 Conexión desde el ESP32

En el ESP32, cambiá esta línea:

```cpp
String backendUrl = "https://acceso-vehicular.onrender.com/patente";


El resto del código queda igual: enviará cada patente detectada directamente a tu backend online, y quedará guardada en MongoDB.

🧠 Base de Datos (MongoDB Atlas)

Base: acceso_vehicular

Colección: lecturas

Estructura de documento:

{
  "plate": "AB874EM",
  "score": 0.93,
  "timestamp": "2025-11-03T19:00:00Z"
}


Para ver las patentes guardadas:
👉 https://acceso-vehicular.onrender.com/patentes


---

## 🚀 4️⃣ Conectar con tu ESP32-CAM

En tu código actual del ESP32:
```cpp
String backendUrl = "http://192.168.0.24:3000/patente";


Cámbialo por tu URL pública (una vez que Render termine de deployar):

String backendUrl = "https://acceso-vehicular.onrender.com/patente";


Luego subilo, y solo cambiá el SSID y la contraseña del Wi-Fi cuando estés en la universidad.
El ESP32-CAM va a mandar automáticamente cada patente a la nube 🌩️ y la vas a poder ver desde cualquier lugar.