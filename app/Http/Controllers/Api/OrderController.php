<?php

namespace App\Http\Controllers\Api;

use App\Models\Order;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::all();

        return response()->json([
            'status' => 200,
            'orders' => $orders
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'meal_name' => 'required|max:55|string',
            'meal_size' => 'required',
            'meal_quatity' => 'required|integer',
            'meal_price' => 'required',
            'meal_name_order' => 'required|max:55|string',
            'meal_phone' => 'required|string',
            'meal_adresse' => 'required|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 500,
                'errors_message' => $validator->messages()
            ]);
        } else {
            $order = Order::create([
                'meal_name' => $request->meal_name,
                'meal_size' => $request->meal_size,
                'meal_quatity' => $request->meal_quatity,
                'meal_price' => $request->meal_price,
                'meal_name_order' => $request->meal_name_order,
                'meal_phone' => $request->meal_phone,
                'meal_adresse' => $request->meal_adresse,
                'meal_drink' => $request->meal_drink,
            ]);

            return response()->json([
                'status' => 200,
                'message' => $request->meal_name_order . ' Order Created Successfully ^-^'
            ]);
        }
    }

    public function edit($id)
    {
        $order = Order::findOrFail($id);

        if ($order) {
            return response()->json([
                'order' => $order,
                'status' => 200
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Order Not Found ^-^'
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'meal_name' => 'required|max:55|string',
            'meal_size' => 'required',
            'meal_quatity' => 'required|integer',
            'meal_price' => 'required',
            'meal_name_order' => 'required|max:55|string',
            'meal_phone' => 'required|string',
            'meal_adresse' => 'required|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 500,
                'errors_message' => $validator->messages()
            ]);
        } else {
            $order = Order::findOrFail($id);

            if ($order) {
                $order->meal_name = $request->meal_name;
                $order->meal_size = $request->meal_size;
                $order->meal_quatity = $request->meal_quatity;
                $order->meal_price = $request->meal_price;
                $order->meal_name_order = $request->meal_name_order;
                $order->meal_phone = $request->meal_phone;
                $order->meal_adresse = $request->meal_adresse;
                $order->meal_drink = $request->meal_drink;
                $order->meal_status = $request->meal_status;

                $order->save();


                return response()->json([
                    'status' => 200,
                    'message' => $request->meal_name_order . ' Order Updated Successfully ^-^'
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
        $order = Order::findOrFail($id);

        if ($order) {
            $order->delete();

            return response()->json([
                'status' => 200,
                'message' => 'Meal ' . $order->meal_name_order . ' Deleted Successfully ^-^'
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Meal Not Found ^+^'
            ]);
        }
    }

    public function get_facture($id)
    {
        $order = Order::findOrFail($id);

        if ($order) {
            return response()->json([
                'order' => $order,
                'status' => 200
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Order Not Found ^-^'
            ]);
        }
    }

    public function search($key)
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
    }
}
