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

use App\Http\Controllers\Admin\EquipmentController;

use App\Http\Controllers\Admin\RoomEquipmentController;

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



// ============================================================================
//                                  ROOMS
// ============================================================================

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

Route::get('/{qr_code}', function ($qr_code) {
    $room = \App\Models\Room::where('qr_code', $qr_code)->firstOrFail();
    return Inertia::render('RoomPublicView', ['room' => $room]);
})->where('qr_code', 'isu-ilagan_ict-department_room-[0-9]+');

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




// ============================================================================
//                                  EQUIPMENTS
// ============================================================================

// Form and List
Route::middleware(['auth'])->get('/admin/equipments/create', function () {
    $rooms = \App\Models\Room::select('room_number')->get(); // for dropdown
    return Inertia::render('Admin/EquipmentForm', ['rooms' => $rooms]);
})->name('equipments.create');

Route::middleware(['auth'])->post('/admin/equipments', [\App\Http\Controllers\Admin\EquipmentController::class, 'store'])->name('equipments.store');

Route::middleware(['auth'])->get('/admin/equipments/list', function () {
    $equipments = \App\Models\Equipment::all();
    return Inertia::render('Admin/EquipmentList', ['equipments' => $equipments]);
})->name('equipments.list');

// 🔥 This is the public/QR Code route
Route::get('/equipment/{room}/{department}/{subroom}/{equipment}', function ($room, $department, $subroom, $equipment) {
    $path = "$room/$department/$subroom/$equipment";
    $equipment = \App\Models\Equipment::where('equipment_path', $path)->firstOrFail();

    // 🔧 FIXED: Correct render path for JSX file inside Equipments folder
    return Inertia::render('Equipments/equipment', ['equipment' => $equipment]);
});


Route::middleware(['auth'])->prefix('admin')->group(function () {
    Route::post('/equipment', [EquipmentController::class, 'store'])->name('equipment.store');
});


// ============================================================================
//                                  ROOM EQUIPMENTS
// ============================================================================

Route::get('/admin/rooms/{room}/equipments', [RoomEquipmentController::class, 'index'])
    ->name('rooms.equipments');

// Route::get('/admin/rooms/{room}/equipments', [RoomEquipmentController::class, 'index']);

Route::get('/equipment/{campus}/{department}/{room}/{equipment}', [EquipmentController::class, 'showByPath'])
    ->name('equipment.view');





require __DIR__.'/auth.php';
