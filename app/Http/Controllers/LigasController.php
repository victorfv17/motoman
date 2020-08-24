<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Ligas;
use App\User;
use App\Clasificacion;
class LigasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $ligas = Ligas::get();
       return $ligas;
       /* foreach($ligas as  $key => $value){
           
          if($value['maxParticipantes'] == $value['numParticipantes']){
           
               unset($ligas[$key]);
               return $ligas;
           } 
        }*/

    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //PARA ARRAYS
        /*$ligas = $request->all();

        
        foreach($ligas as $liga){
            Ligas::create($liga);
        }*/

        //INDIVIDUALES
        $liga = new Ligas;
      
        $liga->nombre_liga = $request->nombre_liga;
        $liga->maxParticipantes = $request->maxParticipantes;
        $liga->numParticipantes = $request->numParticipantes;
        $usuario = $request->usuario;
        $liga->save();
        Clasificacion::insert(['puntosGP'=> 0, 'puntosMes'=> 0, 'puntosCategoria' => 0, 'puntosTotales' => 0, 'id_usuario' => $usuario]);
        
        return $liga;
        
    }
   

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Ligas::where('id_liga',$id)->get();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        
        

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
