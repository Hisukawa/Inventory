import "../css/app.css";
import "./bootstrap";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";

import React from "react";
import ReactDOM from "react-dom/client";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: "#4B5563",
    },
});

const el = document.getElementById("app");
const item = JSON.parse(el.dataset.item);

function InventoryItem({ item }) {
    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold">{item.name}</h1>
            <p>{item.description}</p>
        </div>
    );
}

ReactDOM.createRoot(el).render(<InventoryItem item={item} />);
