# 🤖 Chatbot con OpenAI
Aplicación web desarrollada con **React + Vite** que implementa un **chatbot potenciado por la API de OpenAI (ChatGPT)**.  
El sistema permite mantener conversaciones en tiempo real con la IA, registrando cada interacción en **Firebase Firestore** para análisis y seguimiento.  

Este proyecto está orientado a **aprendizaje y portafolio profesional**, demostrando habilidades en:
- Integración de APIs de Inteligencia Artificial.  
- Gestión de datos en la nube con Firebase.  
- Construcción de interfaces modernas y responsivas con React.  

## 🚀 Tecnologías utilizadas
- ⚛️ **React + Vite** → Framework moderno y veloz para el frontend.  
- 🧠 **OpenAI API (ChatGPT)** → Motor de IA para generación de texto.  
- 🔥 **Firebase Firestore** → Base de datos NoSQL en tiempo real.  
- 🎨 **TailwindCSS** → Estilos rápidos, modernos y responsive.  
- 🌐 **Node.js** → Entorno de ejecución para dependencias y herramientas.  
- 🔄 **n8n** → Automatización de procesos y análisis de conversaciones.  

------
 
## ⚙️ Instalación y configuración
#### 1. Clonar el repositorio
```bash
git clone https://github.com/juanjosbg/chatbot-openai.git
cd chatbot-openai
```
#### 2. Instalar dependencias
```bash
npm install
```
#### 3. Configurar Firebase
- Crear un proyecto en Firebase Console
- Habilitar Firestore Database y Authentication
- Crear un archivo .env en la raíz con tus credenciales

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_OPENAI_API_KEY=your_openai_api_key
```

#### 4. Ejecutar la aplicación
```bash
npm run dev
```

## 💡 Funcionalidades principales
- ✅ Chat en tiempo real con IA de OpenAI.
- ✅ Almacenamiento de conversaciones en Firebase Firestore.
- ✅ Interfaz moderna y responsive con TailwindCSS.
- ✅ Integración opcional con n8n para automatización de reportes y análisis.

## 🛠️ Mejoras futuras
- Autenticación de usuarios con Firebase Auth.
- Exportación de conversaciones a PDF o Excel.
- Dashboard de métricas con estadísticas de uso.
- Integración de entrada de voz con Whisper API.
- Traducción automática de conversaciones a múltiples idiomas.


## 🗂️ Modelo de datos
Cada chat contiene una subcolección de mensajes:

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


------

#### 👨‍💻 Autor
Desarrollado por Juan Jose Borrero Gutierrez
🚀 Apasionado por el desarrollo web, IA, aplicaciones en la nube.