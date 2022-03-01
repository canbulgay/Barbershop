<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class UserController extends Controller
{
    public function register(Request $request){

        $valid = $request->validate([
            "name" => "required|string|max:150",
            "email" => "required|email|unique:users",
            "password" => "required|string|min:8|confirmed",
        ]);

        $user = User::create([
            "name" => $request->name,
            "email" => $request->email,
            "password" => Hash::make($request->password),
        ]);

        $user->token = $user->createToken("Application Token requestted from: " . $request->header('User-Agent','Vue App'))->plainTextToken;

        return response()->json($user,201);
    }

    public function me(){

        $user = Auth::user();
        return response()->json($user);
    }

    public function login(Request $request){

        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $user->token = $user->createToken("Application Token requested from: " . $request->header('User-Agent', 'Vue App'))->plainTextToken;

        return response()->json($user);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json("OK");
    }
}
