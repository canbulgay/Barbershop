<?php

namespace Database\Seeders;

use App\Models\Reservation;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($gun=0; $gun < 7 ; $gun++) { 

            $start = now()->addHours($gun)->startOfDay();
            $daysReservedHours = [];


            for ($i=0; $i < rand(1,5) ; $i++) { 
                $randomHour = rand(10,17);
                if(in_array($randomHour,$daysReservedHours)){
                    $i--;
                }else{

                    $daysReservedHours[] = $randomHour;
                    $reservationAt = $start->copy()->addHours($randomHour);
                    $reservation = Reservation::factory()->create([
                        'reservation_at' => $reservationAt
                    ]);
                }
            }
        }
    }
}
