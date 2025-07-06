<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Room; // ✅ make sure to import Room

class Equipment extends Model
{
    protected $fillable = ['equipment_name', 'room_id', 'equipment_path'];

    // ✅ Add this relationship to Room
    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
