<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Room extends Model
{
    protected $fillable = ['room_number', 'room_name', 'qr_code'];

    // ✅ Add this method
    public function equipments()
    {
        return $this->hasMany(\App\Models\Equipment::class);
    }
}
