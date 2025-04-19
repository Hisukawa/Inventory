import React from "react";

const Show = ({ item }) => {
    return (
        <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h1 className="text-2xl font-bold">Inventory Details</h1>
            <div>
                <p>
                    <strong>ID:</strong> {item.id}
                </p>
                <p>
                    <strong>Name:</strong> {item.name}
                </p>
                <p>
                    <strong>Description:</strong> {item.description}
                </p>
                <p>
                    <strong>Category:</strong> {item.category}
                </p>
                <p>
                    <strong>Quantity:</strong> {item.quantity}
                </p>
                <p>
                    <strong>Status:</strong> {item.status}
                </p>
                <p>
                    <strong>Unique ID:</strong> {item.unique_id}
                </p>
                <p>
                    <strong>Created At:</strong>{" "}
                    {new Date(item.created_at).toLocaleString()}
                </p>
                <p>
                    <strong>Updated At:</strong>{" "}
                    {new Date(item.updated_at).toLocaleString()}
                </p>
            </div>
        </div>
    );
};

export default Show;
