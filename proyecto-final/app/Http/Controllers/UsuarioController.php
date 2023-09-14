<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

class UsuarioController extends Controller
{
    public function index()
    {
        $usuarios = Usuario::where('estado', 1)->get();
        $usuarios->load('persona');
        $usuarios->load('rol');

        return $usuarios;
    }
    public function create(Request $post)
    {

        $validator = validator($post->all(), [
            'persona_id'=> 'required|exists:personas,id',
            'usuario' => 'required',
            'contrasena' => 'required',
            'rol_id'=> 'required|exists:roles,id',
            'usuario_creacion' => 'required',

        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $nuevoUsuario = new Usuario();
            $nuevoUsuario->persona_id = $post->persona_id;
            $nuevoUsuario->usuario = $post->usuario;
            $nuevoUsuario->contrasena = $post->contrasena;
            $nuevoUsuario->rol_id = $post->rol_id;
            $nuevoUsuario->estado = true;
            $nuevoUsuario->usuario_creacion = $post->usuario_creacion;
            $nuevoUsuario->usuario_modificacion = null;

            $nuevoUsuario->save();

            return "El registro se creo correctamente";
        } catch (QueryException $e) {
            return "Bad Request";
        }
    }

    public function show($id)
    {
        try {
            $usuario = Usuario::where('id', $id)->get();

            $usuario->load('persona');
            $usuario->load('rol');

            return $usuario[0];
        } catch (QueryException $e) {
            return "Bad Request";
        } catch (ModelNotFoundException $e){
            return response()->json(['error'=> "El Rol $id no existe"]);
        }
    }

    public function update(Request $body, $id)
    {
        $validator = validator($body->all(), [
            'persona_id'=> 'required|exists:personas,id',
            'usuario' => 'required',
            'contrasena' => 'required',
            'rol_id'=> 'required|exists:roles,id',
            'usuario_modificacion' => 'required',

        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $usuario = Usuario::findOrFail($id);

            if (isset($usuario)) {
                $usuario->persona_id = $body->persona_id;
                $usuario->usuario = $body->usuario;
                $usuario->contrasena = $body->contrasena;
                $usuario->rol_id = $body->rol_id;
                $usuario->usuario_modificacion = $body->usuario_modificacion;

                $usuario->save();
                return "El registro $id se actualizo correctamente";
            } else {
                return "Bad Request";
            }
        } catch (QueryException $e) {
            return "Bad Request";
        } catch (ModelNotFoundException $e){
            return response()->json(['error'=> "El Usuario $id no existe"]);
        }
    }
    public function updateMe(Request $body, $id){
        $validator = validator($body->all(), [
            'usuario' => 'required',
            'contrasena' => 'required',
            'usuario_modificacion' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        try {
            $usuario = Usuario::findOrFail($id);

            if (isset($usuario)) {
                $usuario->usuario = $body->usuario;
                $usuario->contrasena = $body->contrasena;
                $usuario->usuario_modificacion = $body->usuario_modificacion;

                $usuario->save();
                return redirect("http://localhost:5173/perfil/$usuario->id");
            } else {
                return "Bad Request";
            }
        } catch (QueryException $e) {
            return "Bad Request";
        } catch (ModelNotFoundException $e){
            return response()->json(['error'=> "El Usuario $id no existe"]);
        }
    }
    public function destroy($id)
    {
        try {
            $usuario = Usuario::find($id);

            if (isset($usuario)) {
                $usuario->estado = false;
                $usuario->save();
                return "El registro se elimino correctamente";
            } else {
                return "El registro no existe";
            }
        } catch (QueryException $e) {
            return "Bad request";
        }
    }

    public function login(Request $login){
        $us = Usuario::where('usuario', $login->usuario)->get();
        $us->load('persona');
        $us->load('rol');

        if(count($us)==0){
            return redirect('http://localhost:5173/');
        }else if(count($us)==1){
            if($us[0]->contrasena == $login->contrasena){
                $usuario = $us[0];
                $minutes = 30;
                $content = redirect('http://localhost:5173/perfil'); 
                $response = new \Illuminate\Http\Response($content);

                $cookie = Cookie::make('usuario', $usuario, $minutes);

                $response->withCookie($cookie);
                header("Location: http://localhost:5173/perfil/$usuario->id");
                exit;

            }else{
                return redirect('http://localhost:5173/');
            }
        }
    }
}

