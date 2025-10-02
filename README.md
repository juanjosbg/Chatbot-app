# 🤖 Chatbot con OpenAI
Este proyecto es una aplicación web desarrollada en React + Vite que implementa un chatbot potenciado por la API de OpenAI (ChatGPT).
El sistema permite mantener conversaciones en tiempo real con la IA, registrando cada interacción en Firebase Firestore para análisis y seguimiento.

Se trata de un proyecto orientado a aprendizaje y portafolio profesional, demostrando habilidades en integración de APIs de IA, gestión de datos en la nube y construcción de interfaces modernas con React.


## 🚀 Tecnologías utilizadas
- React + Vite → Framework moderno y rápido para el frontend.
- OpenAI API (ChatGPT) → Inteligencia artificial para la generación de texto.
- Firebase Firestore → Base de datos NoSQL en tiempo real para almacenar conversaciones.
- TailwindCSS → Librería de estilos para diseño limpio y responsive.
- Node.js → Entorno de ejecución para dependencias y herramientas.
- n8n → Automatización de procesos y análisis de conversaciones.

------
 
## ⚙️ Instalación y configuración
#### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/juanjosbg/chatbot-openai.git
cd chatbot-openai
```
#### 2️⃣ Instalar dependencias
```bash
npm install
```
## 💡 Funcionalidades principales
- Chat en tiempo real con IA de OpenAI.
- Almacenamiento de conversaciones en Firebase Firestore.
- Interfaz moderna y responsive con TailwindCSS.
- Integración opcional con n8n para automatización de reportes y análisis.

## 🛠️ Mejoras futuras
- Autenticación de usuarios con Firebase Auth.
- Exportación de conversaciones a PDF o Excel.
- Dashboard de métricas con estadísticas de uso.
- Integración de entrada de voz con Whisper API.
- Traducción automática de conversaciones a múltiples idiomas.


#### modelo de datos
Cada chat tendrá una subcolección messages:

chats (collection)
  └── chatId (document)
       ├── title: string
       ├── userId: string
       ├── createdAt: timestamp
       └── messages (subcollection)
            └── messageId (document)
                 ├── role: "user" | "assistant"
                 ├── content: string
                 ├── images: string[]
                 ├── createdAt: timestamp