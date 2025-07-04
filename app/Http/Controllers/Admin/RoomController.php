<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Room;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $rooms = Room::latest()->get();
        return view('admin.rooms.index', compact('rooms'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.rooms.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'room_number' => 'required|string|max:255',
        ]);

        $formatted = strtoupper(trim($request->room_number)); // e.g. 103
        $roomName = "ROOM-$formatted"; // This will be displayed in UI
        $qrCodePath = strtolower("isu-ilagan/ict-department/room-$formatted"); // Clean URL-friendly QR content

        // 🛑 Check if room number already exists
        if (\App\Models\Room::where('room_number', $formatted)->exists()) {
            return back()->withErrors([
                'room_number' => 'This room number already exists.',
            ]);
        }

        $room = \App\Models\Room::create([
            'room_number' => $formatted,
            'room_name' => $roomName,      // ✅ Displayed name e.g., ROOM-103
            'qr_code' => $qrCodePath,      // ✅ For QR scanning: isu-ilagan/ict-department/room-103
        ]);

        return redirect()->route('rooms.list')->with('success', 'Room added successfully.');
    }



    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        // (Optional) For viewing a single room
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // (To be implemented later)
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // (To be implemented later)
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $room = Room::findOrFail($id);
        $room->delete();

        return redirect()->route('rooms.list')->with('success', 'Room deleted successfully!');
    }
}
