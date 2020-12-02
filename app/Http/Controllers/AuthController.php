<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Ligas;
use App\Clasificacion;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
/**
 * Controlador de autenticacion
 */
class AuthController extends Controller
{
    /**
	 * Metodo para registrar un usuario
	 */
   public function register(Request $request)
   {
	   
       $validator = Validator::make($request->all(), [
           'name' => 'required',
           'email' => 'required|email',
           'password' => 'required',
           'c_password' => 'required|same:password',
       ]);
       if ($validator->fails()) {
           return response()->json(['error'=>$validator->errors()], 401);            
       }
       $input = $request->all();
       $input['password'] = bcrypt($input['password']);
       $user = User::create($input);
       $success['token'] =  $user->createToken('MyApp')->accessToken;
       $success['name'] =  $user->name;
       return response()->json(['success'=>$success]);
   }
   /**
	* Obtiene un usuario
    */
    public function getUser()
   {
       $user = Auth::user();
	 
       return response()->json(['success' => $user]);
   }
   /**
	* Obtiene los usuarios de una liga
    */
   public function getUsersByLiga($liga)
   {
       
	 return User::where('liga_id',$liga)->get();
       
   }
   /**
	* Comprueba si el login es correcto
    */
	public function login(Request $request){
		
		$request-> validate([
			'email'=>'required|string|email',
			'password'=>'required|string',
			
		]);
		
		$credential = request(['email', 'password']);
		if(!Auth::attempt($credential)){
			return response()->json(['message'=>'Unauthorized'],401);
		}else{
		
			$user = $request->user();
			
			$tokenResult = $user->createToken('Personal Access Token');
			return response()->json([
			'access_token'=> $tokenResult,
			'usuario'=>$user
			
		]);
		}

	}
	/**
	 * Crea un usuario
	 */
	public function create(array $data){
		return User::create([
			'name' => $data['name'],
			'email' => $data['email'],
			'password' => Hash::make($data['password']),
			'api_token' => Str::random(60),
		]);
		

	}
	/**
	 * Actualiza la informacion de un usuario
	 */
	public function update(Request $request){
		User::where('id',$request['id'])
		->update(['liga_id'=> $request['liga_id']]);
	
		$liga = Ligas::where('id_liga', $request['liga_id'])->update(['numParticipantes'=> $request['numParticipantes']]);
		Clasificacion::insert(['puntosGP'=> 0, 'puntosMes'=> 0, 'puntosCategoria' => 0, 'puntosTotales' => 0, 'id_usuario' => $request['id']]);
		return User::where('id',$request['id'])->first();
	
	}
	/**
	 * Obtiene un usuario
	 */
	public function loadUser($id){
		return User::where('id',$id)->first();
	}
}
