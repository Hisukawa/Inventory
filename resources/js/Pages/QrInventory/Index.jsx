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
            <table className="border-collapse border border-black bg-[#ffff99] w-full text-center mb-4">
                <thead>
                    <tr>
                        {/* <th className="py-2 text-xl text-black  font-bold border-b border-black">
                            Name
                        </th> */}
                        {/* <th className="py-2 text-xl text-black  font-bold border-b border-black">
                            QR Code
                        </th> */}
                        {/* <th className="px-4 py-2 border">Description</th>
                        <th className="px-4 py-2 border">Category</th>
                        <th className="px-4 py-2 border">Quantity</th>
                        <th className="px-4 py-2 border">Status</th> */}
                    </tr>
                </thead>
                <tbody>
                    {inventory.map((item) => (
                        <tr
                            key={item.unique_id}
                            className="border-b border-black last:border-b-0"
                        >
                            <td className="text-xl font-bold py-2 flex justify-center">
                                {item.name}
                            </td>
                            <td className="py-2 pb-5 flex justify-center">
                                <QRCodeCanvas
                                    value={`${CONFIG_URL}/qrinventory/${item.unique_id}`}
                                    size={300}
                                    bgColor="#ffffff"
                                    fgColor="#000000"
                                    level="H"
                                    includeMargin={true}
                                />
                            </td>
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
