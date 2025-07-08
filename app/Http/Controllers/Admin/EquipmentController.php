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

            $equipmentName = strtolower(trim($request->equipment_name)); // e.g. pc-01

            // ✅ FIX: Ensure qr_code uses slashes not underscores
            $roomPath = str_replace('_', '/', $room->qr_code); // convert _ to /
            $fullPath = $roomPath . '/' . $equipmentName;

            Equipment::create([
                'equipment_name' => strtoupper(trim($request->equipment_name)),
                'room_id' => $room->id,
                'equipment_path' => $fullPath,
                'specifications' => [
                    'brand' => $request->brand,
                    'processor' => $request->processor,
                    'ram' => $request->ram,
                    'storage' => $request->storage,
                    'os' => $request->os,
                ],
            ]);

            return redirect()->back()->with('success', 'Equipment added successfully!');
        } catch (QueryException $e) {
            if ($e->errorInfo[1] === 1062) {
                return redirect()->back()->withErrors([
                    'equipment_name' => 'This equipment already exists in that room.'
                ]);
            }

            throw $e;
        }
    }

    public function edit($id)
    {
        $equipment = Equipment::with('room')->findOrFail($id);

        return inertia('Equipments/EditEquipmentForm', [
            'equipment' => [
                'id' => $equipment->id,
                'equipment_name' => $equipment->equipment_name,
                'room' => $equipment->room,
                'room_id' => $equipment->room_id,
                'equipment_path' => $equipment->equipment_path,
                'specifications' => $equipment->specifications ?? [],
            ],
            'rooms' => Room::all()
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'equipment_name' => 'required|string|max:255',
            'room_id' => 'required|exists:rooms,id',
        ]);

        $equipment = Equipment::findOrFail($id);
        $room = Room::findOrFail($request->room_id);

        $formattedName = strtolower(trim($request->equipment_name));

        // ✅ FIX: Replace _ with / from the room's stored qr_code
        $newPath = str_replace('_', '/', $room->qr_code) . '/' . $formattedName;

        $equipment->update([
            'equipment_name' => strtoupper(trim($request->equipment_name)),
            'room_id' => $room->id,
            'equipment_path' => $newPath,
            'specifications' => [
                'brand' => $request->brand,
                'processor' => $request->processor,
                'ram' => $request->ram,
                'storage' => $request->storage,
                'os' => $request->os,
            ],
        ]);

        return redirect()->route('equipments.list')->with('success', 'Equipment updated successfully!');
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

        return inertia('Equipments/Equipment', [
            'equipment' => [
                'equipment_name' => $equipment->equipment_name,
                'equipment_path' => $equipment->equipment_path,
                'qr_code' => $equipment->equipment_path,
                'room' => $equipment->room,
                'brand' => $equipment->specifications['brand'] ?? null,
                'processor' => $equipment->specifications['processor'] ?? null,
                'ram' => $equipment->specifications['ram'] ?? null,
                'storage' => $equipment->specifications['storage'] ?? null,
                'os' => $equipment->specifications['os'] ?? null,
            ],
        ]);
    }
}
