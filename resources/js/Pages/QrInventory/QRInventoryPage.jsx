import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const QRInventoryPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/qrinventory-login", {
                state: { from: `/qrinventory/${id}` },
            });
            return;
        }

        axios
            .get(`/api/items/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => setItem(res.data))
            .catch((err) => console.error("Failed to fetch item:", err))
            .finally(() => setLoading(false));
    }, [id, navigate]);

    if (loading) return <p className="p-4">Loading...</p>;
    if (!item) return <p className="p-4">Item not found.</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">{item.name}</h1>
            <p>
                <strong>Description:</strong> {item.description}
            </p>
            <p>
                <strong>Status:</strong> {item.status}
            </p>
            <p>
                <strong>Category:</strong> {item.category}
            </p>
            <p>
                <strong>Quantity:</strong> {item.quantity}
            </p>
        </div>
    );
};

export default QRInventoryPage;
