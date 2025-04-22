<?php

// use App\Http\Controllers\InventoryController;

use App\Http\Controllers\Main\EquipmentsController;
use App\Http\Controllers\Main\QrInventoryController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Public route - for QR inventory index page (if needed to be public)
Route::get('/qrinventory', [QrInventoryController::class, 'getQrInventory']);

// Public route - for QR inventory index page (if needed to be public)
Route::get('/equipments', [EquipmentsController::class, 'getQrEquipment']);

// Secure the individual QR page with login
Route::middleware(['auth'])->group(function () {
    Route::get('/qrinventory/{uuid}', [QrInventoryController::class, 'showInventory']);

    Route::get('/equipments/{uuid}', [EquipmentsController::class, 'showEquipment']);
});


require __DIR__.'/auth.php';
