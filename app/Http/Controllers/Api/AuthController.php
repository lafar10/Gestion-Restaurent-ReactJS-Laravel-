<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:55',
            'email' => 'required|string|unique:users,email|max:255',
            'password' => 'required|string|min:8',
            'con_password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 500,
                'message_errors' => $validator->messages()
            ]);
        } else {

            if ($request->password != $request->con_password) {
                return response()->json([
                    'status' => 401,
                    'message_con' => 'Password Did Not Match ^*^'
                ]);
            } else {
                $user = User::create([
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => bcrypt($request->password),
                ]);

                $token = $user->createToken($user->email . '_Token')->plainTextToken;

                $role = $user->type;

                return response()->json([
                    'status' => 200,
                    'token' => $token,
                    'user' => $user,
                    'role_as' => $role,
                    'message' => 'User ' . $request->name . ' Created Successfully ^-^'
                ]);
            }
        }
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [

            'email' => 'required|string',
            'password' => 'required|string'

        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 500,
                'message_errors' => $validator->messages()
            ]);
        } else {
            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json([
                    'status' => 405,
                    'message' => 'Invalid Credentials'
                ]);
            } else {
                $token = $user->createToken('Token')->plainTextToken;
                $role = $user->type;

                return response()->json([
                    'status' => 200,
                    'token' => $token,
                    'user' => $user,
                    'role_as' => $role,
                    'message' => 'Cool Your In ^-^'
                ]);
            }
        }
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Logout Successfully ^-^'
        ]);
    }
}
