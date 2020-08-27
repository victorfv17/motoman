<?php

namespace App\Http\Controllers;
use App\Predicciones;
use Illuminate\Http\Request;

class PrediccionesController extends Controller
{
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        return Predicciones::get();
    }
      /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id){
        return Predicciones::where('usuario_id',$id)->select('piloto_id')->orderBy('posicion')->get();
    }
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request){
        $usuario = $request->usuario;
        $prediccion = $request->prediccion;
        $posiciones = array(
            "1"=>$prediccion['pos1'],
            "2"=>$prediccion['pos2'],
            "3"=>$prediccion['pos3'],
            "4"=>$prediccion['pos4'],
            "5"=>$prediccion['pos5'],
            "6"=>$prediccion['pos6']
        );
        $i = 0;
        foreach($posiciones as $key => $val ){
            Predicciones::insert(['usuario_id'=>$usuario['id'],'piloto_id'=>$val,'posicion'=>$key]);
      
        }
     
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $usuario = $request->usuario;
        Predicciones::where('usuario_id',$usuario)->delete();
        $this->store($request);
    }
     /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(){
      Predicciones::delete();
     
    }
}
