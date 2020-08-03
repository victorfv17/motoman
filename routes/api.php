<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
//Route::post('login', 'API\PassportController@login');
//Route::post('register', 'API\PassportController@register');
Route::group(['middleware' => 'auth:api'], function(){
//Route::post('get-details', 'API\PassportController@getDetails');
});

Route::group(['prefix'=>'user'],function(){
	Route::post('/login','AuthController@login');
	Route::get('/getUser','AuthController@getUser');
	Route::put('/update','AuthController@update');
	Route::get('/{liga}','AuthController@getUsersByLiga');
});
Route::get('pilotos/{campo}/{direct}', 'PilotosController@join');
Route::resource('pilotos','PilotosController');
Route::resource('escuderias','EscuderiasController');
Route::resource('mercadoPilotos','MercadoPilotosController');
Route::delete('mercadoPilotos/{liga}','MercadoPilotosController@destroy');
Route::resource('mercadoEscuderias','MercadoEscuderiaController');
Route::delete('mercadoEscuderias/{liga}','MercadoEscuderia@destroy');
Route::resource('ligas','LigasController');
Route::resource('puntos','PuntosController');
Route::resource('clasificacion','ClasificacionController');
Route::get('clasificacion/join/{id}/{campoOrdenacion}', 'ClasificacionController@join');
Route::put('clasificacion/puntos/{id}', 'ClasificacionController@updatePuntos');
Route::resource('pujas','PujasController');
Route::delete('pujas','PujasController@destroy');
Route::resource('equipo', 'EquipoController');
Route::get('equipo/pilotos/{usuario}', 'EquipoController@showPilotos');
Route::get('equipo/escuderias/{usuario}', 'EquipoController@showEscuderias');
