<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;



    protected $fillable = [
        'fullname',
        'email',
        'numbers',
        'phone',
        'adresse',
        'table_number',
        'reservation_type',
        'status',
        'created_at'
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
