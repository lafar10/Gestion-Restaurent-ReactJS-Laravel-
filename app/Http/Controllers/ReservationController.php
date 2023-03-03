<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ReservationController extends Controller
{
    public function index()
    {
        $reservations = Reservation::all();
        return response()->json([
            'reservations' => $reservations,
            'status' => 200
        ]);
        if ($reservations) {
        } else {
            return response()->json([
                'message' => 'No Reservations Found ^-^',
                'status' => 404
            ]);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fullname' => 'required|string|max:55',
            'phone' => 'required|integer',
            'numbers' => 'required|integer',
            'reservation_type' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([

                'status' => 500,
                'validation_errors' => $validator->messages(),

            ]);
        } else {

            $reservation = Reservation::create([

                'fullname' => $request->fullname,
                'phone' => $request->phone,
                'email' => $request->email,
                'adresse' => $request->adresse,
                'numbers' => $request->numbers,
                'reservation_type' => $request->reservation_type,

            ]);

            return response()->json([

                'status' => 200,
                'message' => 'Reservation At Name ' . $request->fullname . ' Created Successfully ^+^'

            ]);
        }
    }

    public function edit($id)
    {
        $reservation = Reservation::findOrFail($id);

        if ($reservation) {
            return response()->json([
                'reservations' => $reservation,
                'status' => 200
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Reservation Not Found ^-^'
            ]);
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'fullname' => 'required|string|max:55',
            'phone' => 'required|integer',
            'numbers' => 'required|integer',
            'table_number' => 'required|integer',
            'reservation_type' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([

                'status' => 500,
                'validation_errors' => $validator->messages(),

            ]);
        } else {

            $reservation = Reservation::findOrFail($id);

            if (!$reservation) {
                return response()->json([
                    'status' => 404,
                    'message' => 'Reservation Not Found ^-^'
                ]);
            } else {

                $reservation->fullname = $request->fullname;
                $reservation->phone = $request->phone;
                $reservation->numbers = $request->numbers;
                $reservation->email = $request->email;
                $reservation->adresse = $request->adresse;
                $reservation->table_number = $request->table_number;
                $reservation->reservation_type = $request->reservation_type;
                $reservation->status = $request->status;
                $reservation->save();

                return response()->json([
                    'status' => 200,
                    'message' => 'Reservation Updated Successfully ^+^'
                ]);
            }
        }
    }

    public function destroy($id)
    {
        $reservation = Reservation::findOrFail($id);

        if (!$reservation) {
            return response()->json([
                'status' => 404,
                'message' => 'Reservation Not Found ^-^'
            ]);
        } else {
            $reservation->delete();

            return response()->json([
                'status' => 200,
                'message' => 'Reservation Deleted Successfully ^+^'
            ]);
        }
    }

    public function search($key)
    {
        $reservation = Reservation::where('fullname', 'Like', "%$key%")
            ->orWhere('email', 'Like', "%$key%")
            ->orWhere('phone', 'Like', "%$key%")
            ->orWhere('table_number', 'Like', "%$key%")
            ->orWhere('reservation_type', 'Like', "%$key%")
            ->orWhere('status', 'Like', "%$key%")
            ->orWhere('created_at', 'Like', "%$key%")
            ->get();

        if ($reservation) {
            return response()->json([
                'status' => 200,
                'reservation' => $reservation
            ]);
        } else {
            return response()->json([
                'status' => 500,
                'message' => 'Reservation Not Found'
            ]);
        }
    }

    public function get_reser_pdf($id)
    {
        $reservation = Reservation::find($id);

        if ($reservation) {
            return response()->json([
                'status' => 200,
                'reservation' => $reservation
            ]);
        } else {
            return response()->json([
                'status' => 404,
                'message' => 'Reservation Not Found !'
            ]);
        }
    }
}
