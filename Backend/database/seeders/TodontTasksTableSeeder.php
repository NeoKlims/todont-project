<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TodontTasksTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('todont-tasks')->insert([
            [
                'title' => 'Stop being lazy',
                'description' => 'Stop procrastinating',
                'completed' => false,
                'streak' => 3,
                'list_id' => 1, // Asegúrate de que el ID de la lista exista
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

