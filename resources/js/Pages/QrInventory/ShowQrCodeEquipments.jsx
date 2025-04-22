import React, { useState } from "react";

const QrCodeEquipments = ({ equipment }) => {
    // Check if there is any equipment data
    if (!equipment || equipment.length === 0) {
        return <div>No equipment data available.</div>;
    }

    // State to manage which equipment's details to show
    const [selectedEquipment, setSelectedEquipment] = useState(null);
    const [clickedEquipment, setClickedEquipment] = useState(null); // State to manage clicked equipment

    // Handle the toggle of the selected equipment details
    const handleShowDetails = (equipments) => {
        // If the equipment is already selected, toggle off the details
        if (selectedEquipment && selectedEquipment.id === equipments.id) {
            setSelectedEquipment(null);
            setClickedEquipment(null); // Reset clicked state when toggling off
        } else {
            setSelectedEquipment(equipments); // Show the details of the selected equipment
            setClickedEquipment(equipments.id); // Mark this equipment as clicked
        }
    };

    // Function to get the status class based on the equipment's status
    const getStatusClass = (status) => {
        switch (status) {
            case "Functional":
            case "Available":
                return "bg-green-500 text-white"; // Green for Functional or Available
            case "Defective":
                return "bg-red-500 text-white"; // Red for Defective
            case "Under Maintenance":
                return "bg-yellow-500 text-black"; // Yellow for Under Maintenance
            default:
                return "bg-gray-300 text-black"; // Default gray for unknown statuses
        }
    };

    // Function to get the button class based on whether it's clicked
    const getButtonClass = (equipments) => {
        return clickedEquipment === equipments.id
            ? "bg-green-600 text-white"
            : "bg-blue-500 text-white hover:bg-blue-800"; // Change color when clicked
    };

    // Function to get the text color based on the status in the details section
    const getStatusTextColor = (status) => {
        switch (status) {
            case "Functional":
            case "Available":
                return "text-green-500"; // Green for Functional or Available
            case "Defective":
                return "text-red-500"; // Red for Defective
            case "Under Maintenance":
                return "text-yellow-500"; // Yellow for Under Maintenance
            default:
                return "text-gray-500"; // Default gray for unknown statuses
        }
    };

    return (
        <div className="flex flex-col p-6 bg-white m-5">
            <div>
                <h1 className="text-2xl bg-neutral-200  p-4 text-center font-bold mb-4 rounded-md shadow-md">
                    Equipment Inventory
                </h1>

                {/* Details section always below the table */}
                {selectedEquipment && (
                    <div className="w-full max-w-md mx-auto mt-4 flex justify-center">
                        <div className="w-full bg-gray-100 p-4 rounded-md shadow-md">
                            <h2 className="text-lg bg-neutral-300 p-2 text-center font-bold mb-4 rounded-md shadow-md">
                                Equipment Details
                            </h2>
                            <div className="space-y-2">
                                <h3 className="text-xl text-center font-bold">
                                    {selectedEquipment.equipment_name}
                                </h3>
                                <p>
                                    <strong>Status:</strong>{" "}
                                    <span
                                        className={`font-bold ${getStatusTextColor(
                                            selectedEquipment.status
                                        )}`}
                                    >
                                        {selectedEquipment.status}
                                    </span>
                                </p>
                                <p>
                                    <strong>Serial Number:</strong>{" "}
                                    {selectedEquipment.serial_number || "N/A"}
                                </p>
                                <p>
                                    <strong>Category:</strong>{" "}
                                    {selectedEquipment.category || "N/A"}
                                </p>
                                <p>
                                    <strong>Room Location:</strong>{" "}
                                    {selectedEquipment.room_location || "N/A"}
                                </p>
                                <p>
                                    <strong>Manufacturer:</strong>{" "}
                                    {selectedEquipment.manufacturer || "N/A"}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Table for equipment data */}
                <table className="min-w-full rounded-lg table-auto text-sm mt-4 border-collapse shadow-md">
                    <thead className="bg-gray-200">
                        <tr className="text-center font-bold ">
                            <th className="px-4 py-2 text-gray-700">
                                Equipment Name
                            </th>
                            <th className="px-4 py-2 text-gray-700">Status</th>
                            <th className="px-4 py-2 text-gray-700">Action</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {/* Loop through the equipment_inventory */}
                        {equipment.map((equipments) => (
                            <React.Fragment key={equipments.id}>
                                <tr className="border-t hover:bg-gray-50">
                                    <td className="border px-4 py-2">
                                        {equipments.equipment_name}
                                    </td>
                                    <td
                                        className={`border px-4 py-2 ${getStatusClass(
                                            equipments.status
                                        )}`}
                                    >
                                        {equipments.status}
                                    </td>
                                    <td className="border px-4 py-2">
                                        <button
                                            className={`px-4 py-2 rounded-md text-xs ${getButtonClass(
                                                equipments
                                            )} hover:opacity-80 transition`}
                                            onClick={() =>
                                                handleShowDetails(equipments)
                                            }
                                        >
                                            Show Details
                                        </button>
                                    </td>
                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default QrCodeEquipments;
