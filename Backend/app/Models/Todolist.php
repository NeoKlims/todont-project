<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todolist extends Model
{

    
    use HasFactory;

    protected $table = 'todo-lists';

    protected $fillable = ['title', 'user_id'];

    public function tasks()
    {
        return $this->hasMany(TodoTask::class);
    }
}
