<!-- NOT USABLE -->


<?php

// namespace App\Http\Controllers;

// use Illuminate\Http\Request;
// use App\Models\Inventory;
// use Illuminate\Support\Str;
// use SimpleSoftwareIO\QrCode\Facades\QrCode;  // Add the QR Code package

// class InventoryController extends Controller
// {
//     public function store(Request $request)
//     {
//         $request->validate([
//             'name' => 'required',
//             'description' => 'nullable',
//             'quantity' => 'required|integer',
//             'status' => 'nullable',
//         ]);

//         $inventory = new Inventory();
//         $inventory->unique_id = Str::uuid(); // Use capital 'S' in 'Str'
//         $inventory->name = $request->name;
//         $inventory->description = $request->description;
//         $inventory->quantity = $request->quantity;
//         $inventory->status = $request->status ?? 'available';
//         $inventory->save();

//         return response()->json($inventory);
//     }

//     public function show($uuid)
//     {
//         $item = Inventory::where('unique_id', $uuid)->firstOrFail();

//         // Generate QR code for this item
//         // $qrCode = QrCode::size(250)->generate(url("/inventory/{$item->unique_id}"));
//         $qrCode = QrCode::size(250)->generate(url("/inventory/{$item->unique_id}"));

//         return view('inventory.show', [
//             'item' => $item,
//             'qrCode' => $qrCode,
//         ]);
//     }

//     public function index()
//     {
//         $items = Inventory::all();
//         return view('inventory.index', compact('items'));
//     }

//     public function adminIndex()
//     {
//         $items = Inventory::all();
//         return view('inventory.admin', compact('items'));
//     }
// }
