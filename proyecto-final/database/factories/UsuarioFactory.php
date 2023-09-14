<?php

namespace Database\Factories;

use App\Models\Persona;
use App\Models\Rol;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Usuario>
 */
class UsuarioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'persona_id'=> Persona::inRandomOrder()->first()->id,
            'usuario' => fake()->unique()->word,
            'contrasena' => fake()->word(),
            'estado' => fake()->boolean(),
            'usuario_creacion' => 0,
            'usuario_modificacion' => 0,
            'rol_id'=> Rol::inRandomOrder()->first()->id,
        ];
    }
}
