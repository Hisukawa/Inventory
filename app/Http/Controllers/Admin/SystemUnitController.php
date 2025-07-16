<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SystemUnit;
use App\Models\Room;
use Inertia\Inertia;

class SystemUnitController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'equipment_name' => 'required|string|max:255',
            'room_id' => 'required|exists:rooms,id',
            'type' => 'nullable|string',
            'status' => 'nullable|string',
            'brand' => 'nullable|string',
            'processor' => 'nullable|string',
            'ram' => 'nullable|string',
            'storage' => 'nullable|string',
            'os' => 'nullable|string',
        ]);

        $room = Room::findOrFail($validated['room_id']);

        // Format equipment name
        $trimmedName = trim($validated['equipment_name']);
        $formattedName = strtolower($trimmedName);
        $formattedEquipmentName = strtoupper($trimmedName);

        // 🔐 Check for duplicate name (case-insensitive)
        $duplicate = SystemUnit::where('room_id', $validated['room_id'])
            ->whereRaw('UPPER(equipment_name) = ?', [$formattedEquipmentName])
            ->exists();

        if ($duplicate) {
            return redirect()->back()->withErrors([
                'equipment_name' => 'This equipment name already exists in the selected room.',
            ]);
        }

        // Format QR path
        $roomPath = str_replace('_', '/', $room->qr_code);
        $basePath = $roomPath . '/' . $formattedName;
        $fullPath = $basePath;
        $counter = 1;

        // Ensure unique equipment_path
        while (SystemUnit::where('equipment_path', $fullPath)->exists()) {
            $fullPath = $basePath . '-' . $counter;
            $counter++;
        }

        // Create record
        $systemUnit = SystemUnit::create([
            'equipment_name' => $formattedEquipmentName,
            'room_id' => $room->id,
            'equipment_path' => $fullPath,
            'type' => $validated['type'] ?? null,
            'status' => $validated['status'] ?? null,
            'brand' => $validated['brand'] ?? null,
            'processor' => $validated['processor'] ?? null,
            'ram' => $validated['ram'] ?? null,
            'storage' => $validated['storage'] ?? null,
            'os' => $validated['os'] ?? null,
        ]);

        // ✅ Flash to session for Inertia and redirect back
        return redirect()->back()->with([
            'equipment_path' => $systemUnit->equipment_path,
            'success' => 'System Unit added successfully!',
        ]);
    }

    public function showByPath($campus, $department, $room, $equipment)
    {
        $path = "$campus/$department/$room/$equipment";

        $systemUnit = SystemUnit::with('room')
            ->where('equipment_path', $path)
            ->firstOrFail();

        return Inertia::render('Equipments/ViewSystemUnit', [
            'system_unit' => $systemUnit,
        ]);
    }
}
