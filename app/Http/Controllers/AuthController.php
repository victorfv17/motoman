<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
class AuthController extends Controller
{
    //
	/*public function login(Request $request){
       if(Auth::attempt(['email' => $request('email'), 'password' => $request('password')])){
           $user = Auth::user();
           $success['token'] =  $user->createToken('MyApp')->accessToken;
           return response()->json(['success' => $success], $this->successStatus);
       }
       else{
           return response()->json(['error'=>'Unauthorised'], 401);
       }
   }*/
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
       return response()->json(['success'=>$success], $this->successStatus);
   }
    public function getUser()
   {
       $user = Auth::user();
	 
       return response()->json(['success' => $user]);
   }
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
		/*
		$user = $request->user();
		$tokenResult = $user->createToken('Personal Access Token');
		$token = $tokenResult->token;
		
		$token->save();
		return response()->json([
			'access_token'=> $tokenResult->accessToken,
			'token_type'=>'Bearer',
			'expires_at'=>Carbon::parse($tokenResult->token->expires_at)
			->toDateTimeString(),
		]);*/
	}
	
	public function create(array $data){
		return User::create([
			'name' => $data['name'],
			'email' => $data['email'],
			'password' => Hash::make($data['password']),
			'api_token' => Str::random(60),
		]);
	}
}
