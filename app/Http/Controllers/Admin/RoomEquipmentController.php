<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Room;
use App\Models\SystemUnit;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoomEquipmentController extends Controller
{
    public function index($roomId)
    {
        $room = Room::findOrFail($roomId);

        // Traditional equipments
        $equipments = $room->equipments->map(function ($item) {
            return [
                'id' => $item->id,
                'equipment_name' => $item->equipment_name,
                'type' => $item->type ?? 'N/A',
                'status' => $item->status ?? 'Unknown',
                'equipment_path' => $item->equipment_path,
                'room' => ['room_name' => $item->room->room_name ?? null],
            ];
        });

        // System units — now properly structured for frontend
        $system_units = SystemUnit::where('room_id', $roomId)->get()->map(function ($item) use ($room) {
            return [
                'id' => $item->id,
                'equipment_name' => $item->equipment_name,
                'type' => 'System Unit',
                'status' => $item->status ?? 'Unknown',
                'equipment_path' => $item->equipment_path,
                'room' => ['room_name' => $room->room_name ?? null],
            ];
        });

        return Inertia::render('Equipments/RoomEquipmentList', [
            'room' => $room,
            'equipments' => $equipments,
            'system_units' => $system_units,
        ]);
    }
}
