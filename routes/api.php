<?php

use App\Http\Controllers\Main\QrInventoryController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('getinventory', [QrInventoryController::class, 'getInventory']);
