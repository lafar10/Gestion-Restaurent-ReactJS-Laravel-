<?php

namespace App\Http\Controllers\Api;

use Carbon\Carbon;
use App\Models\User;
use App\Models\Order;
use App\Models\Reservation;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public function order_count()
    {
        $orders = Order::where('meal_status', 'Off')
            ->whereDate('created_at', Carbon::today())->count();

        if ($orders) {
            return response()->json([
                'status' => 200,
                'orders' => $orders
            ]);
        }
    }

    public function order_off()
    {
        $orders = Order::where('meal_status', 'Off')
            ->whereDate('created_at', Carbon::today())->get();

        if ($orders) {
            return response()->json([
                'status' => 200,
                'orders' => $orders
            ]);
        }
    }

    public function order_earn()
    {
        $sums = Order::where('meal_status', 'On')
            ->whereDate('created_at', Carbon::today())->sum('meal_price');

        if ($sums) {
            return response()->json([
                'status' => 200,
                'sums' => $sums
            ]);
        }
    }

    public function reservation_count()
    {
        $reservation = Reservation::where('status', 'Off')
            ->whereDate('created_at', Carbon::today())->count();

        if ($reservation) {
            return response()->json([
                'status' => 200,
                'reservation' => $reservation
            ]);
        }
    }

    public function reservation_off()
    {
        $reservation = Reservation::where('status', 'Off')
            ->whereDate('created_at', Carbon::today())->get();

        if ($reservation) {
            return response()->json([
                'status' => 200,
                'reservation' => $reservation
            ]);
        }
    }

    public function all_noti()
    {
        $a = Reservation::where('status', 'Off')
            ->whereDate('created_at', Carbon::today())->count();
        $b = Order::where('meal_status', 'Off')
            ->whereDate('created_at', Carbon::today())->count();

        $c = $a + $b;

        return response()->json([
            'status' => 200,
            'noti' => $c
        ]);
    }
}
