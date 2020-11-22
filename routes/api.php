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
	Route::post('/create','AuthController@register');
	Route::get('/saldo/{id}','AuthController@loadUser');
});
Route::get('pilotos/{campo}/{direct}', 'PilotosController@join');
Route::post('pilotos/todos', 'PilotosController@storeall');
Route::resource('pilotos','PilotosController');
Route::get('escuderias/{campo}/{direct}', 'EscuderiasController@indexSort');
Route::post('escuderias/todos', 'EscuderiasController@storeAll');
Route::resource('escuderias','EscuderiasController');
Route::resource('mercadoPilotos','MercadoPilotosController');
Route::get('mercadoPilotos/{liga}/{usuario}','MercadoPilotosController@show');
Route::delete('mercadoPilotos/{liga}','MercadoPilotosController@destroy');
Route::resource('mercadoEscuderias','MercadoEscuderiaController');
Route::get('mercadoEscuderias/{liga}/{usuario}','MercadoEscuderiAController@show');
Route::delete('mercadoEscuderias/{liga}','MercadoEscuderiaController@destroy');
Route::resource('ligas','LigasController');
Route::resource('puntos','PuntosController');
Route::get('puntos/actualizar/usuarios', 'PuntosController@updatePuntos');
Route::get('puntos/pilotos/{campo}/{direct}', 'PuntosController@getPuntuacionesPilotos');
Route::get('puntos/escuderias/{campo}/{direct}', 'PuntosController@getPuntuacionesEscuderias');
Route::delete('puntos/guardados/borrar/todos/ligas', 'PuntosController@destroyPuntos');
Route::resource('clasificacion','ClasificacionController');
Route::get('clasificacion/join/{id}/{campoOrdenacion}/{direct}', 'ClasificacionController@join');
//Route::get('clasificacion/puntos/update', 'ClasificacionController@updatePuntos');
Route::resource('pujas','PujasController');
Route::get('pujas/compras/{idLiga}','PujasController@index');
Route::delete('pujas/borrar/todas','PujasController@destroyPujas');
Route::resource('equipo', 'EquipoController');
Route::get('equipo/detalle/alineacion/{id}', 'EquipoController@getAlineacion');
Route::get('equipo/pilotos/{usuario}', 'EquipoController@showPilotos');
Route::get('equipo/escuderias/{usuario}', 'EquipoController@showEscuderias');
Route::get('equipo/ventas/{idLiga}', 'EquipoController@showVentas');
Route::resource('predicciones','PrediccionesController');
Route::delete('predicciones/delete','PrediccionesController@destroy');
Route::put('predicciones','PrediccionesController@update');