<?php

namespace Database\Seeders;


use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\UsersTableSeeder;
use Database\Seeders\TodoListsTableSeeder;
use Database\Seeders\TodoTasksTableSeeder;
use Database\Seeders\TodontListsTableSeeder;
use Database\Seeders\TodontTasksTableSeeder;



class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        /*User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);*/

        $this->call([
            UsersTableSeeder::class,
            TodoListsTableSeeder::class,
            TodoTasksTableSeeder::class,
            TodontListsTableSeeder::class,
            TodontTasksTableSeeder::class,
        ]);
    }
}
