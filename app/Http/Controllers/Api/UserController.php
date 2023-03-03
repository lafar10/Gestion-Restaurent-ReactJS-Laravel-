<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index()
    {
        $users = User::orderBy('id', 'desc')->get();

        if ($users) {
            return response()->json([
                'users' => $users,
                'status' => 200
            ]);
        } else {
            return response()->json([
                'message' => 'No Users Found ^-^',
                'status' => 404
            ]);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [

            'name' => 'required|string|max:55',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8',
            'phone' => 'required|integer',
            'adresse' => 'required|string',

        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 500,
                'message_errors' => $validator->messages()
            ]);
        } else {
            $user = User::create([

                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'phone' => $request->phone,
                'adresse' => $request->adresse,
                'gender' => $request->gender,
                'type' => $request->type
            ]);

            return response()->json([

                'status' => 200,
                'message' => 'User ' . $request->name . ' Created Successfully ^+^'

            ]);
        }
    }

    public function edit($id)
    {
        $user = User::findOrFail($id);

        if ($user) {
            return response()->json([
                'status' => 200,
                'user' => $user
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'This User Not Found ^+^'
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:55',
            'phone' => 'required|integer',
            'adresse' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 500,
                'message_errors' => $validator->messages()
            ]);
        } else {
            $user = User::findOrFail($id);

            if ($user) {
                $user->name = $request->name;
                $user->email = $request->email;
                $user->phone = $request->phone;
                $user->adresse = $request->adresse;
                $user->password = bcrypt($request->password);
                $user->type = $request->type;
                $user->gender = $request->gender;
                $user->save();

                return response()->json([
                    'status' => 200,
                    'message' => 'User ' . $request->name . ' Updated Successfully ^-^'
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'User Not Found ^+^'
                ]);
            }
        }
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);

        if ($user) {
            $user->delete();

            return response()->json([
                'status' => 200,
                'message' => 'User ' . $user->name . ' Deleted Successfully ^-^'
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'User Not Found ^+^'
            ]);
        }
    }

    public function search($key)
    {
        $user = User::where('name', 'Like', "%$key%")
            ->orWhere('email', 'Like', "%$key%")
            ->orWhere('phone', 'Like', "%$key%")
            ->orWhere('created_at', 'Like', "%$key%")
            ->orWhere('type', 'Like', "%$key%")
            ->orWhere('gender', 'Like', "%$key%")
            ->get();

        if ($user) {
            return response()->json([
                'status' => 200,
                'user' => $user
            ]);
        } else {
            return response()->json([
                'status' => 500,
                'message' => 'User Not Found'
            ]);
        }
    }
}
