# 🛒 E-Commerce MVP Mobile-First (Simulador de Catálogo Reactivo)

Este proyecto representa un **Mínimo Producto Viable (MVP)** enfocado en la simulación de una experiencia de compra unificada para entornos móviles. Ha sido estructurado bajo estándares académicos con un perfil técnico-estratégico de Comercio Electrónico, demostrando la viabilidad técnica de una plataforma y el análisis del embudo de conversión (conversion funnel).

---

## 📊 Propuesta de Negocio y Enfoque E-Commerce

El desarrollo mitiga fricciones habituales en canales web convencionales mediante la implementación de las siguientes estrategias digitales:
* **Mobile-First Design:** Interfaz adaptada rigurosamente a estructuras de smartphones (max-width: 450px) emulando una Web App nativa.
* **Real-Time Cataloging:** Integración directa con base de datos NoSQL que actualiza los precios y productos sin recargar la página, evitando quiebres de stock lógicos.
* **Social Commerce Toolkit:** Sistema de interacciones cualitativas ("Likes") para identificar tendencias internas y automatizar la sección de "Lo más buscado" basándose en algoritmos de preferencia del consumidor.
* **Persistencia Local (Zero Friction):** Uso de `LocalStorage` para el recupero del carrito abandonado, incrementando la métrica de conversión y retención del carrito.

---

## 🛠️ Arquitectura Tecnológica

El ecosistema de la aplicación se diseñó de forma limpia y escalable utilizando tecnologías nativas para optimizar el rendimiento de carga (LCP - Largest Contentful Paint):

* **Frontend Estructural:** HTML5 Semántico y CSS3 con layouts basados en CSS Grid y Flexbox.
* **Lógica de Negocio:** JavaScript (Vanilla JS) enfocado en la manipulación eficiente del DOM de manera asíncrona.
* **Capa del Servidor (BaaS):** Google Firebase Firestore (SDK v10 Compat) actuando como base de datos documental en tiempo real.

---

## 🗂️ Estructura del Proyecto

```text
├── index.html          # Interfaz de usuario estructurada en secciones independientes (SPA)
├── style.css           # Capa de diseño estilizada para simulación de dispositivo móvil
├── app.js              # Controlador principal de lógica de negocio y consumo de servicios
├── config.js           # Archivo de credenciales del entorno local (Excluido en .gitignore)
└── README.md           # Documentación ejecutiva del proyecto
