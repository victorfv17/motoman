<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Ligas;

use Illuminate\Support\Facades\Crypt;
use App\Clasificacion;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Encryption\Encrypter;
use Defuse\Crypto\Crypto;
use Defuse\Crypto\Key;
class AuthController extends Controller
{

    
   public function register(Request $request)
   {
	
	// $algorithm = "AES";
	// $key = 'abc123..';
	// $data = 'U2FsdGVkX18cHm/TQTni5pjU6W5howGsqwUs2yHHIVk=';
	// $mode = "cbc";
	
	 $newClear = Crypto::decrypt('U2FsdGVkX18Z9k4tzy4avl0HZC3GiLDgzgnPg7Cd+ZY=', base64:1+p72z3YfNFgFeU7zhpGcgvqqG3lg9Ynb1FExOAAHNM=);
	//$newClear =decrypt('U2FsdGVkX1+9xhQUtotuOJQdyS4+3Fbx7I06O9FxSUU=');
		//$newClear = $this->fnDecrypt('abc123..abc123..', 'cifrar');
		echo $newClear;
    //    $validator = Validator::make($request->all(), [
    //        'name' => 'required',
    //        'email' => 'required|email',
          
    //    ]);
    //    if ($validator->fails()) {
    //        return response()->json(['error'=>$validator->errors()], 401);            
    //    }
    //    $input = $request->all();
    //    $input['password'] = bcrypt($input['password']);
    //    $user = User::create($input);
    //    $success['token'] =  $user->createToken('MyApp')->accessToken;
    //    $success['name'] =  $user->name;
    //    return response()->json(['success'=>$success]);
   }
//    function decrypt($ivHashCiphertext, $password) {
// 		$method = "AES-256-CBC";
// 		$iv = substr($ivHashCiphertext, 0, 16);
// 		$hash = substr($ivHashCiphertext, 16, 32);
// 		$ciphertext = substr($ivHashCiphertext, 48);
// 		$key = hash('sha256', $password, true);

// 		//if (!hash_equals(hash_hmac('sha256', $ciphertext . $iv, $key, true), $hash)) return null;

// 		return openssl_decrypt($ciphertext, $method, $key, OPENSSL_RAW_DATA, $iv);
// 	}
	// function fnDecrypt($sValue, $sSecretKey) {
	// 	global $iv;
	// 	return rtrim(mcrypt_decrypt(MCRYPT_RIJNDAEL_256, $sSecretKey, base64_decode($sValue), MCRYPT_MODE_CBC, $iv), "\0\3");
	// }
    public function getUser()
   {
       $user = Auth::user();
	 
       return response()->json(['success' => $user]);
   }
   public function getUsersByLiga($liga)
   {
       
	 return User::where('liga_id',$liga)->get();
       
   }
	public function login(Request $request){
		
		$newClear = $this->decrypt('abc123..abc123..', 'cifrar');
		$request-> validate([
			'email'=>'required|string|email',
			//'password'=>'required|string',
			'password'=>$newClear,
			
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
	
	public function create(array $data){
		return User::create([
			'name' => $data['name'],
			'email' => $data['email'],
			'password' => Hash::make($data['password']),
			'api_token' => Str::random(60),
		]);
		

	}
	public function update(Request $request){
		User::where('id',$request['id'])
		->update(['liga_id'=> $request['liga_id']]);
	
		$liga = Ligas::where('id_liga', $request['liga_id'])->update(['numParticipantes'=> $request['numParticipantes']]);
		Clasificacion::insert(['puntosGP'=> 0, 'puntosMes'=> 0, 'puntosCategoria' => 0, 'puntosTotales' => 0, 'id_usuario' => $request['id']]);
		return User::where('id',$request['id'])->first();
	
	}

	public function loadUser($id){
		return User::where('id',$id)->first();
	}
}
