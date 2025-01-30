<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TodoListsTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('todo-lists')->insert([
            [
                'title' => 'Daily Tasks',
                'user_id' => 1, // Asegúrate de que el ID del usuario exista
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'title' => 'Work Projects',
                'user_id' => 1, // Asegúrate de que el ID del usuario exista
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}

