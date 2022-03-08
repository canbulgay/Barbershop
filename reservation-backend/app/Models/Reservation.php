<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'email',
        'phone',
        'reservation_at'
    ];

    protected $casts = [
        'reservation_at' => 'datetime',
    ];

    public $appends = [
        'is_coming',
    ];


    public function user(){
        return $this->belongsTo(User::class);
    }

    public function getIsPastAttribute()
    {
        return $this->reservation_at->isPast();
    }

    public function getIsComingAttribute(){

        $userClosestReservation = $this->user->reservations()
        ->where('reservation_at','>=',now())
        ->orderBy('reservation_at','asc')
        ->first();

        if(!$userClosestReservation) return false;
        return $this->id === $userClosestReservation->id;
    }
}
