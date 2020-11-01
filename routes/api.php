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
});
Route::get('pilotos/{campo}/{direct}', 'PilotosController@join');
Route::resource('pilotos','PilotosController');
Route::get('escuderias/{campo}/{direct}', 'EscuderiasController@indexSort');
Route::resource('escuderias','EscuderiasController');
Route::resource('mercadoPilotos','MercadoPilotosController');
Route::delete('mercadoPilotos/{liga}','MercadoPilotosController@destroy');
Route::resource('mercadoEscuderias','MercadoEscuderiaController');
Route::delete('mercadoEscuderias/{liga}','MercadoEscuderiaController@destroy');
Route::resource('ligas','LigasController');
Route::resource('puntos','PuntosController');
Route::get('puntos/actualizar/usuarios', 'PuntosController@updatePuntos');
Route::resource('clasificacion','ClasificacionController');
Route::get('clasificacion/join/{id}/{campoOrdenacion}', 'ClasificacionController@join');
//Route::get('clasificacion/puntos/update', 'ClasificacionController@updatePuntos');
Route::resource('pujas','PujasController');
Route::delete('pujas','PujasController@destroy');
Route::resource('equipo', 'EquipoController');
Route::get('equipo/detalle/alineacion/{id}', 'EquipoController@getAlineacion');
Route::get('equipo/pilotos/{usuario}', 'EquipoController@showPilotos');
Route::get('equipo/escuderias/{usuario}', 'EquipoController@showEscuderias');
Route::get('equipo/ventas/todas', 'EquipoController@showVentas');
Route::resource('predicciones','PrediccionesController');
Route::delete('predicciones/delete','PrediccionesController@destroy');
Route::put('predicciones','PrediccionesController@update');