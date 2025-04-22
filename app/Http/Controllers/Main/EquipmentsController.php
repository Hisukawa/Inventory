<?php

namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use App\Models\Equipments;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EquipmentsController extends Controller
{
    public function getQrEquipment(){
        return Inertia::render("QrInventory/QrCodeEquipments");
    }

    public function getEquipment(){
        $equipment_inventory = Equipments::all();
        return response()->json($equipment_inventory);
    }

    public function showEquipment($uuid)
    {
        $equipment = Equipments::where('unique_id', $uuid)->firstOrFail();

        return Inertia::render("QrInventory/ShowQrCodeEquipments", ['equipment' => $equipment]);

    }
}
