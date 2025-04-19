<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Inventory extends Model
{
    // Allow mass assignment for these fields, including unique_id
    protected $fillable = [
        'unique_id',  // Use unique_id as your column name
        'name',
        'description',
        'category',
        'quantity',
        'status'
    ];

    // Automatically set unique_id on creating a new record
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->unique_id = Str::uuid(); // Automatically generate unique_id using UUID
        });
    }
}
