<?php

use App\Http\Controllers\Main\QrInventoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route for getting the currently authenticated user
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Route to get all inventory items (for use in the QR code creation page)
Route::get('getinventory', [QrInventoryController::class, 'getInventory']);

// Route to get a specific item by unique ID, protected by authentication
Route::middleware('auth:sanctum')->get('/getinventory/{id}', [QrInventoryController::class, 'showItemById']);
