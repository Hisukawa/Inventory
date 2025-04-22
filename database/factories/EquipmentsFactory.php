<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Inventory>
 */
class EquipmentsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'equipment_name' => $this->faker->randomElement([
                'Desktop Computer', 'Office Chair', 'Whiteboard', 'Printer', 'Router'
            ]),
            'serial_number' => $this->faker->optional()->bothify('SN-###-???'), // Optional in case of non-electronics
            'category' => $this->faker->randomElement([
                'Furniture', 'Electronics', 'Peripherals', 'Networking'
            ]),
            'status' => $this->faker->randomElement([
                'Available', 'Functional', 'Defective', 'Under Maintenance'
            ]),
            'room_location' => $this->faker->randomElement([
                'Room 102', 'Room 103', 'Room 201', 'Room 202', 'Room 203', 'Room 204'
            ]),
            'manufacturer' => $this->faker->randomElement([
                'HP', 'Dell', 'Asus', 'Epson', 'Generic', 'Logitech', 'N-Vision'
            ]),
        ];
    }
}
