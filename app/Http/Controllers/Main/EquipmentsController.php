<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Models\Equipments;
use Illuminate\Http\Request;
use Inertia\Inertia;

// use function Pest\Laravel\json;

class EquipmentsController extends Controller
{
    public function getQrEquipment(){
        return Inertia::render("QrInventory/QrCodeEquipments");
    }

    // public function getQrEquipment(){
    //     // Fetch all equipment records from the database
    //     $equipment_inventory = Equipments::all();

    //     // Pass the data to the view
    //     return Inertia::render("QrInventory/QrCodeEquipments", ['equipment_inventory' => $equipment_inventory]);
    // }


    public function getEquipment(){
        $equipment_inventory = Equipments::all();
        return response()->json($equipment_inventory);
    }

    public function showEquipment($uuid)
    {
        // $equipment = Equipments::where('unique_id', $uuid)->firstOrFail();

        $equipment = Equipments::all();

        return Inertia::render("QrInventory/ShowQrCodeEquipments", ['equipment' => $equipment]);

    }
}
