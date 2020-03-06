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
Route::resource('ligas','LigasController');
Route::get('puntuacion/join/{id}', 'PuntuacionController@join');
Route::resource('puntuacion','PuntuacionController');
