<?php

use App\Http\Controllers\Main\EquipmentsController;
use App\Http\Controllers\Main\QrInventoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\Room; // <- make sure this is added

// Route for getting the currently authenticated user
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Route to get all inventory items (for use in the QR code creation page)
Route::get('getinventory', [QrInventoryController::class, 'getInventory']);

// Route to get a specific item by unique ID, protected by authentication
Route::middleware('auth:sanctum')->get('/getinventory/{id}', [QrInventoryController::class, 'showItemById']);

// Route to get all equipments items (for use in the QR code creation page)
Route::get('getequipment', [EquipmentsController::class, 'getEquipment']);

// Route to get a specific item by unique ID, protected by authentication
Route::middleware('auth:sanctum')->get('/getequipment/{id}', [EquipmentsController::class, 'showItemById']);

// ✅ ✅ ✅ Add this route so your EquipmentForm.jsx can fetch rooms
Route::get('/rooms', function () {
    return response()->json(
        Room::select('id', 'room_number', 'room_name', 'qr_code')->orderBy('room_number')->get()
    );
});
