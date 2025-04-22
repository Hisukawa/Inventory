<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Equipments extends Model
{
    use HasFactory;

    // Allow mass assignment for these fields, including unique_id
    protected $fillable = [
        'unique_id',
        'equipment_name',
        'serial_number',
        'category',
        'status',
        'room_location',
        'manufacturer'
    ];

    // Automatically set unique_id on creating a new record
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($equipment_model) {
            $equipment_model->unique_id = Str::uuid(); // Automatically generate unique_id using UUID
        });
    }
}
