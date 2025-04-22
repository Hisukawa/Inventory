<?php

namespace Database\Seeders;

use App\Models\Equipments;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EquipmentsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Equipments::factory()->count(10)->create();
    }
}
