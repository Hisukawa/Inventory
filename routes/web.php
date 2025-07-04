<?php

// use App\Http\Controllers\InventoryController;

use App\Http\Controllers\Main\EquipmentsController;
use App\Http\Controllers\Main\QrInventoryController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Models\Room;
use App\Http\Controllers\Admin\RoomController;

Route::get('/', function () {
    // return Inertia::render('Welcome', [
    //     'canLogin' => Route::has('login'),
    //     'canRegister' => Route::has('register'),
    //     'laravelVersion' => Application::VERSION,
    //     'phpVersion' => PHP_VERSION,
    // ]);
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard');

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Public route - for QR inventory index page (if needed to be public)
Route::get('/qrinventory', [QrInventoryController::class, 'getQrInventory']);

// Public route - for QR inventory index page (if needed to be public)
// Route::get('/equipments', [EquipmentsController::class, 'getQrEquipment']);
Route::get('/room', [EquipmentsController::class, 'getQrEquipment']);

// Secure the individual QR page with login
Route::middleware(['auth'])->group(function () {
    Route::get('/qrinventory/{uuid}', [QrInventoryController::class, 'showInventory']);

    // Route::get('/equipments/{uuid}', [EquipmentsController::class, 'showEquipment']);
    Route::get('/room/{uuid}', [EquipmentsController::class, 'showEquipment']);
});


// Route::middleware(['auth'])->prefix('admin')->group(function () {
//     Route::resource('rooms', RoomController::class);
// });
// Route::middleware(['auth'])->get('/admin/rooms/create', function () {
//     return Inertia::render('Admin/RoomForm');
// });


// Inertia route to render the JSX page
Route::middleware(['auth'])->get('/admin/rooms/create', function () {
    return Inertia::render('Admin/RoomForm');
})->name('rooms.create');

// Route for form POST submission
Route::middleware(['auth'])->prefix('admin')->group(function () {
    Route::post('/rooms', [App\Http\Controllers\Admin\RoomController::class, 'store'])->name('rooms.store');
});

Route::middleware(['auth'])->get('/admin/rooms/list', function () {
    $rooms = Room::orderBy('created_at', 'desc')->get();

    return Inertia::render('Admin/RoomList', [
        'rooms' => $rooms
    ]);
})->name('rooms.list');

// Route::delete('/rooms/{id}', [RoomController::class, 'destroy'])->name('rooms.destroy');

Route::middleware(['auth'])->prefix('admin')->group(function () {
    Route::post('/rooms', [RoomController::class, 'store'])->name('rooms.store');
    Route::delete('/rooms/{id}', [RoomController::class, 'destroy'])->name('rooms.destroy'); // ✅ DELETE Route
});

// Route::get('/rooms/isu-ilagan/ict-department/room-{number}', function ($number) {
//     $roomName = 'ISU-ILAGAN/ICT-DEPARTMENT/ROOM-' . strtoupper($number);
//     $room = \App\Models\Room::where('room_name', $roomName)->firstOrFail();

//     // You can customize this to render an Inertia page or return data
//     return Inertia::render('RoomPublicView', ['room' => $room]);
// });

// Route::get('/isu-ilagan/ict-department/room-{number}', function ($number) {
//     $roomName = 'ISU-ILAGAN/ICT-DEPARTMENT/ROOM-' . strtoupper($number);
//     $room = \App\Models\Room::where('room_name', $roomName)->firstOrFail();

//     return Inertia::render('RoomPublicView', ['room' => $room]);
// });

Route::get('/{qr_code}', function ($qr_code) {
    $room = \App\Models\Room::where('qr_code', $qr_code)->firstOrFail();
    return Inertia::render('RoomPublicView', ['room' => $room]);
})->where('qr_code', 'isu-ilagan/ict-department/room-[0-9]+');


require __DIR__.'/auth.php';
