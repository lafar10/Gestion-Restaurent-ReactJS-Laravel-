<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Personal_Access_Tokens extends Model
{
    use HasFactory;

    protected $table = 'personal_access_tokens';
    protected $fillable = [
        'tokenable_type',
        'tokenable_id',
        'name',
        'token',
        'abilities',
        'last_used_at',
        'created_at',

    ];

    public function tokenes_users()
    {
        return $this->hasOne('App\User', 'id', 'tokenable_id');
    }
}
