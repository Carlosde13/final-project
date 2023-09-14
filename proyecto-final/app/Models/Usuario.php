<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Usuario extends Model
{
    use HasFactory;

    protected $table = 'usuarios';

    public function rol() :BelongsTo
    {
        return $this->belongsTo(Rol::class, 'rol_id');
    }
    public function persona() :BelongsTo
    {
        return $this->belongsTo(Persona::class, 'persona_id');
    }
}
