<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\PromotionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/* Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
}); */

/* -------- Users Auth ------------ */

Route::post('/user-register', [AuthController::class, 'register']);
Route::post('/user-login', [AuthController::class, 'login']);

Route::group(['middleware' => ['auth:sanctum', 'checkingAuth']], function () {

    Route::get('checking-authentication', function () {

        return response()->json([
            'status' => 200,
            'message' => 'You Are In ^-^',
        ]);
    });


    /* -------- Dashboard Routes --------- */

    Route::get('/reservations-count', [DashboardController::class, 'reservation_count']);
    Route::get('/orders-count', [DashboardController::class, 'order_count']);
    Route::get('/orders-earns', [DashboardController::class, 'order_earn']);
    Route::get('/all-notification', [DashboardController::class, 'all_noti']);
    Route::get('/order-off', [DashboardController::class, 'order_off']);
    Route::get('/reservation-off', [DashboardController::class, 'reservation_off']);

    /* -------- Reservations Routes --------- */

    Route::get('/reservations', [ReservationController::class, 'index']);
    Route::post('/reservation-store', [ReservationController::class, 'store']);
    Route::get('/reservation-edit/{id}', [ReservationController::class, 'edit']);
    Route::put('/reservation-update/{id}', [ReservationController::class, 'update']);
    Route::delete('/reservation-delete/{id}', [ReservationController::class, 'destroy']);
    Route::get('/search-reservation/{key}', [ReservationController::class, 'search']);

    /* -------- Orders Routes --------- */

    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/order-store', [OrderController::class, 'store']);
    Route::get('/order-edit/{id}', [OrderController::class, 'edit']);
    Route::put('/order-update/{id}', [OrderController::class, 'update']);
    Route::delete('/order-delete/{id}', [OrderController::class, 'destroy']);
    Route::get('/search-order/{key}', [OrderController::class, 'search']);
    Route::get('/order-facture/{id}', [OrderController::class, 'get_facture']);


    /* -------- Users Routes --------- */

    Route::get('/users', [UserController::class, 'index']);
    Route::post('/user-store', [UserController::class, 'store']);
    Route::get('/user-edit/{id}', [UserController::class, 'edit']);
    Route::put('/user-update/{id}', [UserController::class, 'update']);
    Route::delete('/user-delete/{id}', [UserController::class, 'destroy']);
    Route::get('/search-user/{key}', [UserController::class, 'search']);
});



Route::group(['middleware' => ['auth:sanctum']], function () {

    /* -------- Users Profile Routes --------- */

    Route::get('/user-profile-data', [ProfileController::class, 'get_profile_user']);
    Route::get('/user-profile-edit/{id}', [ProfileController::class, 'get_profile']);
    Route::put('/user-profile-update/{id}', [ProfileController::class, 'update_profile']);
    Route::put('/user-change-password', [ProfileController::class, 'change_password']);

    /* -------------- Promotion Carte ------------- */

    Route::get('/get_promotion_carte', [PromotionController::class, 'get_promotion']);

    /* -------------- Reservation Facture ------------- */

    Route::get('/reservation-facture', [ReservationController::class, 'get_reser_pdf']);

    /* ------------- LogOut ------------------ */

    Route::post('/user-logout', [AuthController::class, 'logout']);
});




Route::post('/reservation-save', [ReservationController::class, 'store']);
Route::post('/order-store', [OrderController::class, 'store']);
