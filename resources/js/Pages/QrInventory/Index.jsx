import React, { useEffect, useState } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import useAppUrl from "@/hooks/useAppUrl";

const Index = () => {
    const CONFIG_URL = useAppUrl();

    const [inventory, setInventory] = useState([]);

    const fetchInventory = async () => {
        try {
            const response = await axios.get(`${CONFIG_URL}/api/getinventory`);
            setInventory(response.data);
        } catch (error) {
            console.error("Error fetching inventory:", error);
        }
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Inventory Items</h1>
            <table className="table-auto w-full border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-4 py-2 border">ID</th>
                        <th className="px-4 py-2 border">Name</th>
                        {/* <th className="px-4 py-2 border">Description</th>
                        <th className="px-4 py-2 border">Category</th>
                        <th className="px-4 py-2 border">Quantity</th>
                        <th className="px-4 py-2 border">Status</th> */}
                    </tr>
                </thead>
                <tbody>
                    {inventory.map((item) => (
                        <tr key={item.unique_id}>
                            <td className="px-4 py-2 border justify-center">
                                <QRCodeCanvas
                                    value={`${CONFIG_URL}/qrinventory/${item.unique_id}`}
                                    size={200}
                                    bgColor="#ffffff"
                                    fgColor="#000000"
                                    level="H"
                                    includeMargin={true}
                                />
                            </td>
                            <td className="px-4 py-2 border">{item.name}</td>
                            {/* <td className="px-4 py-2 border">
                                {item.description}
                            </td>
                            <td className="px-4 py-2 border">
                                {item.category}
                            </td>
                            <td className="px-4 py-2 border">
                                {item.quantity}
                            </td>
                            <td className="px-4 py-2 border">{item.status}</td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Index;
