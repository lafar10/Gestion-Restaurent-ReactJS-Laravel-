<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';
    protected $fillable = [
        'meal_name',
        'meal_size',
        'meal_quatity',
        'meal_price',
        'meal_name_order',
        'meal_phone',
        'meal_adresse',
        'meal_drink',
        'meal_status',
        'created_at'
    ];
}
