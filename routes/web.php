<?php

use App\Http\Controllers\Main\EquipmentsController;
use App\Http\Controllers\Main\QrInventoryController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\RoomController;
use App\Http\Controllers\Admin\EquipmentController;
use App\Http\Controllers\Admin\RoomEquipmentController;
use App\Http\Controllers\Admin\SystemUnitController;
use App\Http\Controllers\Admin\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Room;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard');

// ======================
// Auth routes
// ======================
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// ======================
// QR Inventory Routes
// ======================
Route::get('/qrinventory', [QrInventoryController::class, 'getQrInventory']);
Route::get('/room', [EquipmentsController::class, 'getQrEquipment']);

Route::middleware(['auth'])->group(function () {
    Route::get('/qrinventory/{uuid}', [QrInventoryController::class, 'showInventory']);
    Route::get('/room/{uuid}', [EquipmentsController::class, 'showEquipment']);
});

// ======================
// ROOMS
// ======================
Route::middleware(['auth', 'permission:manage_rooms'])->get('/admin/rooms/create', fn () =>
    Inertia::render('Admin/RoomForm'))->name('rooms.create');

Route::middleware(['auth', 'permission:manage_rooms'])->prefix('admin')->group(function () {
    Route::post('/rooms', [RoomController::class, 'store'])->name('rooms.store');
    Route::delete('/rooms/{id}', [RoomController::class, 'destroy'])->name('rooms.destroy');
});

Route::middleware(['auth', 'permission:manage_rooms'])->get('/admin/rooms/list', function () {
    $rooms = Room::orderBy('created_at', 'desc')->get();
    return Inertia::render('Admin/RoomList', ['rooms' => $rooms]);
})->name('rooms.list');

// Optional: QR-accessed public room view
Route::get('/{qr_code}', function ($qr_code) {
    $room = \App\Models\Room::where('qr_code', $qr_code)->firstOrFail();
    return Inertia::render('RoomPublicView', ['room' => $room]);
})->where('qr_code', 'isu-ilagan_ict-department_room-[0-9]+');

// ======================
// EQUIPMENTS
// ======================
Route::middleware(['auth', 'permission:manage_equipment'])->get('/admin/equipments/create', function () {
    $rooms = \App\Models\Room::select('room_number')->get();
    return Inertia::render('Admin/EquipmentForm', ['rooms' => $rooms]);
})->name('equipments.create');

Route::middleware(['auth', 'permission:manage_equipment'])->post('/admin/equipments', [EquipmentController::class, 'store'])->name('equipments.store');

Route::middleware(['auth', 'permission:manage_equipment'])->get('/admin/equipments/list', function () {
    $equipments = \App\Models\Equipment::all();
    return Inertia::render('Admin/EquipmentList', ['equipments' => $equipments]);
})->name('equipments.list');

Route::middleware(['auth', 'permission:manage_equipment'])->get('/admin/equipments/{id}/edit', [EquipmentController::class, 'edit'])->name('equipments.edit');
Route::middleware(['auth', 'permission:manage_equipment'])->put('/admin/equipments/{id}', [EquipmentController::class, 'update'])->name('equipments.update');

Route::middleware(['auth', 'permission:manage_equipment'])->get('/admin/rooms/{room}/equipments', [RoomEquipmentController::class, 'index'])->name('rooms.equipments');

Route::middleware(['auth', 'permission:manage_equipment'])->get('/equipment/{campus}/{department}/{room}/{equipment}', [EquipmentController::class, 'showByPath'])
    ->where([
        'campus' => '[a-zA-Z0-9\-]+',
        'department' => '[a-zA-Z0-9\-]+',
        'room' => '[a-zA-Z0-9\-]+',
        'equipment' => '[a-zA-Z0-9\-]+',
    ])
    ->name('equipment.view');

Route::middleware(['auth'])->get('/system-unit/{campus}/{department}/{room}/{equipment}', [SystemUnitController::class, 'showByPath'])
->where([
    'campus' => '[a-zA-Z0-9\-]+',
    'department' => '[a-zA-Z0-9\-]+',
    'room' => '[a-zA-Z0-9\-]+',
    'equipment' => '[a-zA-Z0-9\-]+',
])
->name('system-unit.view');



// ======================
// SYSTEM UNITS
// ======================
Route::middleware(['auth', 'permission:manage_equipment'])->post('/admin/system-units', [SystemUnitController::class, 'store'])->name('system-units.store');

// ======================
// USERS CRUD
// ======================
Route::middleware(['auth', 'permission:manage_users'])->prefix('admin')->group(function () {
    Route::get('/users', [UserController::class, 'index'])->name('users.list');
    Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::get('/users/{id}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::put('/users/{id}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{id}', [UserController::class, 'destroy'])->name('users.destroy');
});

require __DIR__.'/auth.php';
