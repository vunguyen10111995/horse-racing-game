import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import "./assets/styles/main.css";

const app = createApp(App);

app.use(store);
app.mount("#app");

// Register Service Worker for offline functionality and PWA features
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register(`${import.meta.env.BASE_URL}service-worker.js`)
      .then((registration) => {
        console.log(
          "✅ Service Worker registered successfully:",
          registration.scope
        );

        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 60000); // Check every minute

        // Handle updates
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          newWorker.addEventListener("statechange", () => {
            if (
              newWorker.state === "installed" &&
              navigator.serviceWorker.controller
            ) {
              // New service worker available, prompt user to reload
              console.log("🔄 New version available! Please refresh the page.");
            }
          });
        });
      })
      .catch((error) => {
        console.error("❌ Service Worker registration failed:", error);
      });
  });
}
