<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class PromotionController extends Controller
{
    public function get_promotion()
    {
        $promo = User::find(Auth::id());

        if ($promo) {
            return response()->json([
                'status' => 200,
                'promo' => $promo
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'User Not Found 404 !'
            ]);
        }
    }



    /* public function search($key)
    {
        $order = Order::where('meal_name', 'Like', "%$key%")
            ->orWhere('meal_name_order', 'Like', "%$key%")
            ->orWhere('meal_phone', 'Like', "%$key%")
            ->orWhere('created_at', 'Like', "%$key%")
            ->get();

        if ($order) {
            return response()->json([
                'status' => 200,
                'order' => $order
            ]);
        } else {
            return response()->json([
                'status' => 500,
                'message' => 'Order Not Found'
            ]);
        }
    } */
}
