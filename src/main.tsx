import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { FilterProvider } from "./contexts/FilterProvider.tsx";
import { ClerkProvider } from "@clerk/react";

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPublishableKey) {
  throw new Error(
    "Missing VITE_CLERK_PUBLISHABLE_KEY. Add your Clerk publishable key to .env.local and restart Vite.",
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <FilterProvider>
        <App />
      </FilterProvider>
    </ClerkProvider>
  </StrictMode>,
);
