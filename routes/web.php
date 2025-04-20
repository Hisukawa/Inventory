<?php

// use App\Http\Controllers\InventoryController;
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

// Route::get('/inventory/{unique_id}', [InventoryController::class, 'show'])->name('inventory.show');
// Route::post('/inventory', [InventoryController::class, 'store']);
// Route::get('/inventory/{unique_id}', InventoryController::class, 'show');
// Route::get('/inventory/{uuid}', [InventoryController::class, 'show']);

// Route::get('/inventory', [InventoryController::class, 'index'])->name('inventory.index');
// Route::get('/inventory/{uuid}', [InventoryController::class, 'show'])->name('inventory.show'); //user
// Route::get('/admin/inventories', [InventoryController::class, 'adminIndex'])->name('inventory.admin'); //admin

// Route::get('/qrinventory', [QrInventoryController::class, 'getQrInventory']);
// Route::get('/qrinventory/{uuid}', [QrInventoryController::class, 'showInventory']); //user


// Public route - for QR inventory index page (if needed to be public)
Route::get('/qrinventory', [QrInventoryController::class, 'getQrInventory']);

// Secure the individual QR page with login
Route::middleware(['auth'])->group(function () {
    Route::get('/qrinventory/{uuid}', [QrInventoryController::class, 'showInventory']);
});



require __DIR__.'/auth.php';
