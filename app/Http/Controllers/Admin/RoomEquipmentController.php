<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoomEquipmentController extends Controller
{
    public function index($roomId)
    {
        $room = Room::with('equipments')->findOrFail($roomId);

        return Inertia::render('Equipments/RoomEquipmentList', [
            'room' => $room,
            'equipments' => $room->equipments,
        ]);
    }
}
