<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('equipments', function (Blueprint $table) {
            $table->id();  // Auto-incrementing ID
            $table->uuid('unique_id')->unique();  // Unique UUID for equipment
            $table->string('equipment_name');  // Name of the equipment
            $table->string('serial_number')->nullable();  // Optional serial number for equipment
            $table->string('category')->nullable();  // Category of the equipment (e.g., Multimedia, Computing)
            $table->enum('status', ['Available', 'Functional', 'Defective', 'Under Maintenance'])->default('Available');  // Equipment status
            $table->string('room_location')->nullable();  // Location of the equipment (e.g., Room number)
            $table->string('manufacturer')->nullable();  // Manufacturer of the equipment
            $table->timestamps();  // Created and updated timestamps
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipments');
    }
};
