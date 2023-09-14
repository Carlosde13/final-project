<?php

namespace App\Http\Controllers;

use App\Models\Rol;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class RolController extends Controller
{
    public function index()
    {
        $roles = Rol::all();
        $listaFiltrada = array();

        foreach ($roles as $r) {

            if ($r->estado == true) {
                $listaFiltrada[] = $r;
            }
        }
        return $listaFiltrada;
    }
    public function create(Request $post)
    {

        $validator = validator($post->all(), [
            'nombre' => 'required',
            'usuario_creacion' => 'required',

        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $nuevoRol = new Rol();
            $nuevoRol->nombre = $post->nombre;
            $nuevoRol->estado = true;
            $nuevoRol->usuario_creacion = $post->usuario_creacion;
            $nuevoRol->usuario_modificacion = null;

            $nuevoRol->save();

            return "El registro se creo correctamente";
        } catch (QueryException $e) {
            return "Bad Request";
        }
    }

    public function show($id)
    {
        try {
            $rol = Rol::where('id', $id)->get();

            return $rol;
        } catch (QueryException $e) {
            return "Bad Request";
        } catch (ModelNotFoundException $e){
            return response()->json(['error'=> "El Rol $id no existe"]);
        }
    }
    public function update(Request $body, $id)
    {
        $validator = validator($body->all(), [
            'nombre' => 'required',
            'usuario_modificacion' => 'required',

        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $rol = Rol::findOrFail($id);

            if (isset($rol)) {
                $rol->nombre = $body->nombre;
                $rol->usuario_modificacion = $body->usuario_modificacion;

                $rol->save();
                return "El registro $id se actualizo correctamente";
            } else {
                return "Bad Request";
            }
        } catch (QueryException $e) {
            return "Bad Request";
        } catch (ModelNotFoundException $e){
            return response()->json(['error'=> "El Rol $id no existe"]);
        }
    }
    public function destroy($id)
    {
        try {
            $rol = Rol::find($id);

            if (isset($rol)) {
                $rol->estado = false;
                $rol->save();
                return "El registro se elimino correctamente";
            } else {
                return "El registro no existe";
            }
        } catch (QueryException $e) {
            return "Bad request";
        }
    }
}
