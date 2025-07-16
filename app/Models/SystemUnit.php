<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SystemUnit extends Model
{
    use HasFactory;

    protected $fillable = [
        'equipment_name',
        'equipment_path',
        'room_id',
        'type',
        'status',
        'brand',
        'processor',
        'ram',
        'storage',
        'os',
    ];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
