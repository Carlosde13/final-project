<?php

namespace App\Http\Controllers;

use App\Models\Persona;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class PersonaController extends Controller
{
    public function index()
    {
        $personas = Persona::all();
        $listaFiltrada = array();

        foreach ($personas as $p) {

            if ($p->estado == true) {
                $listaFiltrada[] = $p;
            }
        }
        return $listaFiltrada;
    }

    public function create(Request $post)
    {

        $validator = validator($post->all(), [
            'primer_nombre' => 'required',
            'segundo_nombre' => 'required',
            'primer_apellido' => 'required',
            'segundo_apellido' => 'required',
            'usuario_creacion' => 'required',

        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $persona = new Persona();
            $persona->primer_nombre = $post->primer_nombre;
            $persona->segundo_nombre = $post->segundo_nombre;
            $persona->primer_apellido = $post->primer_apellido;
            $persona->segundo_apellido = $post->segundo_apellido;
            $persona->estado = true;
            $persona->usuario_creacion = $post->usuario_creacion;

            $persona->usuario_modificacion = null;

            $persona->save();

            return "El registro se creo correctamente";
        } catch (QueryException $e) {
            return "Bad Request";
        }
    }

    public function show($id)
    {
        try {
            $persona = Persona::where('id', $id)->get();

            return $persona;
        } catch (QueryException $e) {
            return "Bad Request";
        } catch (ModelNotFoundException $e){
            return response()->json(['error'=> "La Persona $id no existe"]);
        }
    }

    public function update(Request $body, $id)
    {
        $validator = validator($body->all(), [
            'primer_nombre' => 'required',
            'segundo_nombre' => 'required',
            'primer_apellido' => 'required',
            'segundo_apellido' => 'required',
            'usuario_modificacion' => 'required',

        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $persona = Persona::findOrFail($id);

            if (isset($persona)) {
                $persona->primer_nombre = $body->primer_nombre;
                $persona->segundo_nombre = $body->segundo_nombre;
                $persona->primer_apellido = $body->primer_apellido;
                $persona->segundo_apellido = $body->segundo_apellido;
                $persona->usuario_modificacion = $body->usuario_modificacion;

                $persona->save();
                return "El registro $id se actualizo correctamente";
            } else {
                return "Bad Request";
            }
        } catch (QueryException $e) {
            return "Bad Request";
        } catch (ModelNotFoundException $e){
            return response()->json(['error'=> "La Persona $id no existe"]);
        }
    }
    public function destroy($id)
    {
        try {
            $persona = Persona::find($id);

            if (isset($persona)) {
                $persona->estado = false;
                $persona->save();
                return "El registro se elimino correctamente";
            } else {
                return "El registro no existe";
            }
        } catch (QueryException $e) {
            return "Bad request";
        }
    }
}
