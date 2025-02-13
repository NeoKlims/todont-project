<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TodoTasksTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('todo-tasks')->insert([
            [
                'title' => 'Work',
                'description' => 'Finish report',
                'completed' => false,
                'deadline' => now()->addDays(1),
                'tags' => 'work,report',
                'repeat_on' => 'none',
                'list_id' => 1, // Asegúrate de que el ID de la lista exista
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Housekeeping',
                'description' => 'Clean the house',
                'completed' => true,
                'deadline' => now()->addDays(2),
                'tags' => 'home,cleaning',
                'repeat_on' => 'weekly',
                'list_id' => 2, // Asegúrate de que el ID de la lista exista
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

