<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TodontListsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('todont-lists')->insert([
            [
                'title' => 'Bad Habits',
                'user_id' => 1, // Asegúrate de que el ID del usuario exista
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

