<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Models\Inventory;
use Illuminate\Http\Request;
use Inertia\Inertia;

use function Pest\Laravel\json;

class QrInventoryController extends Controller
{
    public function getQrInventory(){
        return Inertia::render("QrInventory/Index");
    }

    public function getInventory(){
        $inventory = Inventory::all();
        return response()->json($inventory);
    }

    public function showInventory($uuid)
    {
        $item = Inventory::where('unique_id', $uuid)->firstOrFail();

        return Inertia::render("QrInventory/Show", ['item' => $item]);

    }
}
