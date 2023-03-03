<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Personal_Access_Tokens;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    public function get_profile($id)
    {
        $user = User::findOrFail($id);

        if ($user) {
            return response()->json([
                'status' => 200,
                'user' => $user,
                'message' => 'User Found'
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'User Not Found ^*^'
            ]);
        }
    }

    public function get_profile_user()
    {
        $user_data = Personal_Access_Tokens::where('tokenable_id', Auth::id())->get();

        foreach ($user_data as $row) {
            $id = $row->tokenable_id;
        }

        $user_profile_data = User::find($id);

        if ($user_profile_data) {
            return response()->json([
                'status' => 200,
                'user_profile_data' => $user_profile_data,
                'message' => 'User Found'
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'User Not Found ^*^'
            ]);
        }
    }

    public function update_profile(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:55',
            'adresse' => 'required|string|max:250',
            'phone' => 'required|integer|min:8',
            'gender' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 500,
                'messages_errors' => $validator->messages()
            ]);
        } else {
            $user = User::findOrFail($id);

            if ($user) {
                $user->name = $request->name;
                $user->phone = $request->phone;
                $user->adresse = $request->adresse;
                $user->gender = $request->gender;
                $user->save();

                return response()->json([
                    'status' => 200,
                    'message' => 'User ' . $request->name . ' Profile Updated Successfully ^+^'
                ]);
            } else {
                return response()->json([
                    'status' => 404,
                    'message' => 'User Not Found ^*^'
                ]);
            }
        }
    }

    public function change_password(Request $request)
    {
        $validator = Validator::make($request->all(), [

            'cpassword' => 'required|string|min:8',
            'password' => 'required|string|min:8',

        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 500,
                'message_error' => $validator->messages()
            ]);
        } else {
            $currentPassword = Hash::check($request->cpassword, auth()->user()->password);

            if ($currentPassword) {
                User::findOrFail(auth()->user()->id)->update([

                    'password' => Hash::make($request->password)

                ]);

                return response()->json([
                    'status' => 200,
                    'message' => 'Password Change Successfully ^-^'
                ]);
            } else {
                return response()->json([
                    'status' => 501,
                    'message_err' => 'Current Password Does Not Match With Old Password'
                ]);
            }
        }
    }
}
