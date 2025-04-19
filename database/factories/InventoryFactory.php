<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Inventory>
 */
class InventoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->randomElement(['Projector', 'Laptop', 'Mouse', 'Keyboard', 'Monitor']),
            'description' => $this->faker->sentence(6),
            'category' => $this->faker->randomElement(['Multimedia', 'Computing', 'Networking']),
            'quantity' => $this->faker->numberBetween(1, 10),
            'status' => $this->faker->randomElement(['available', 'in use', 'damaged']),
        ];
    }
}
