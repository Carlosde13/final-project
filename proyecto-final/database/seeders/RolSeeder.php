<?php

namespace Database\Seeders;

use App\Models\Rol;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Rol::create(['nombre' => 'Administrador', 'usuario_creacion' => 0 , 'estado' => true]);
        Rol::create(['nombre' => 'Usuario', 'usuario_creacion' => 0, 'estado' => true]);
    }
}
