<?php

namespace Database\Factories;

use App\Models\Usuario;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Persona>
 */
class PersonaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'primer_nombre' => fake()->firstName(),
            'segundo_nombre' => fake()->firstName(),
            'primer_apellido' => fake()->lastName(),
            'segundo_apellido' => fake()->lastName(),
            'estado' => fake()->boolean(),
            //'usuario_creacion' => Usuario::inRandomOrder()->first()->id,
            //'usuario_modificacion' => Usuario::inRandomOrder()->first()->id,
            'usuario_creacion' => 0,
            'usuario_modificacion' => 0
        ];
    }
}
