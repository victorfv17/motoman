<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Pilotos;
use App\Escuderias;

header('Access-Control-Allow-Origin: *');
class PilotosController extends Controller
{
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(){
        return Pilotos::get();
    }
    public function join($campo,$direct)
    {   
        return Pilotos::join('escuderias', 'escuderias.id','=','pilotos.id_escuderia')->select( 'pilotos.id as id','pilotos.nombre as nombre','pilotos.puntos','escuderias.nombre as escuderia', 'pais')->orderBy($campo, $direct )->get();
        
       // return Pilotos::with('escuderias')->select( 'nombre','puntos','id_escuderia as id')->orderBy(Escuderias::'nombre', $direct )->get();
        /*$todos =  Escuderias::get();
        foreach($todos as $esc){
            echo 
        }*/
       //return Pilotos::where('id_escuderia', $esc['id'])->get();

        
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
		$todos = $request->all();

		
		foreach($todos as $pil){
            Pilotos::create($pil);
        }
     
        //for($i = 0 ; $i< count($todos);$i++){
                               /*for($j = 0; $j < count($todos[$i])-1; $j++){
                               //var_dump($todos[$j]['nombre'],$todos[$j]['pais']);

                               //var_dump($piloto->nombre);
                                $pilotos[$i]->nombre = $todos[$j]['nombre'];
                                 $pilotos[$i]->pais = $todos[$j]['pais'];
                                
                                 $pilotos[$i]->numero = $todos[$j]['numero'];
                                
                               } */
                             
                              //no funciona lo del id, si que lo cambia pero no envia dos registros, comprobar arrray
            /*$ultimo =  Pilotos::latest('id')->first();
            if($ultimo){
                 $id =  $ultimo['id'];
       
                 $piloto->id  = $id + $i + 1;
              
            }*/

        
          /*$piloto->nombre =  $todos[$i]['nombre'];
           $piloto->pais =  $todos[$i]['pais'];
            $piloto->numero =  $todos[$i]['numero'];
            $piloto->created_at = '2019-01-01';
            $piloto->updated_at ='2019-01-01';*/
          // echo $piloto;
       // $piloto->save();

		
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return Pilotos::where('id',$id)->get();
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
        //
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
