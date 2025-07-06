<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Equipment;
use App\Models\Room;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;

class EquipmentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'equipment_name' => 'required|string|max:255',
            'room_id' => 'required|exists:rooms,id',
        ]);

        try {
            $room = Room::findOrFail($request->room_id);

            $equipmentName = strtolower(trim($request->equipment_name)); // pc-01
            $roomPath = $room->qr_code; // e.g. isu-ilagan/ict-department/room-103
            $fullPath = $roomPath . '/' . $equipmentName; // final path

            Equipment::create([
                'equipment_name' => strtoupper(trim($request->equipment_name)), // stored capitalized
                'room_id' => $room->id,
                'equipment_path' => $fullPath,
            ]);

            return redirect()->back()->with('success', 'Equipment added successfully!');
        } catch (QueryException $e) {
            if ($e->errorInfo[1] === 1062) {
                // Duplicate entry error
                return redirect()->back()->withErrors([
                    'equipment_name' => 'This equipment already exists in that room.'
                ]);
            }

            throw $e; // Let Laravel handle other database errors
        }
    }

    public function listByRoom($roomId)
    {
        $room = Room::with('equipments')->findOrFail($roomId);

        return inertia('Admin/RoomEquipments', [
            'room' => $room,
            'equipments' => $room->equipments,
        ]);
    }

    public function showByPath($campus, $department, $room, $equipment)
    {
        $fullPath = "$campus/$department/$room/$equipment";

        $equipment = Equipment::with('room')->where('equipment_path', $fullPath)->firstOrFail();

        return inertia('Equipments/equipment', [
            'equipment' => [
                'equipment_name' => $equipment->equipment_name,
                'equipment_path' => $equipment->equipment_path,
                'qr_code' => $equipment->equipment_path, // ✅ required by frontend
                'room' => $equipment->room,
            ],
        ]);
    }
}
