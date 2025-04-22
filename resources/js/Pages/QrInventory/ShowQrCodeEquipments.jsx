import React from "react";

const ShowQrCodeEquipments = () => {
    return (
        <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-4">
            <h1 className="text-2xl font-bold">Equipment Details</h1>
            <div className="space-y-1">
                <p>
                    <strong>Unique ID:</strong> {equipment.unique_id}
                </p>
                <p>
                    <strong>Equipment Name:</strong> {equipment.equipment_name}
                </p>
                <p>
                    <strong>Serial Number:</strong>{" "}
                    {equipment.serial_number || "N/A"}
                </p>
                <p>
                    <strong>Category:</strong> {equipment.category || "N/A"}
                </p>
                <p>
                    <strong>Status:</strong> {equipment.status}
                </p>
                <p>
                    <strong>Room Location:</strong>{" "}
                    {equipment.room_location || "N/A"}
                </p>
                <p>
                    <strong>Manufacturer:</strong>{" "}
                    {equipment.manufacturer || "N/A"}
                </p>
                <p>
                    <strong>Created At:</strong>{" "}
                    {new Date(equipment.created_at).toLocaleString()}
                </p>
                <p>
                    <strong>Updated At:</strong>{" "}
                    {new Date(equipment.updated_at).toLocaleString()}
                </p>
            </div>
        </div>
    );
};

export default ShowQrCodeEquipments;
