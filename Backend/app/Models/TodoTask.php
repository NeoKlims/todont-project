<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TodoTask extends Model
{
    use HasFactory;

    protected $table = 'todo-tasks';

    protected $fillable = ['title','description','deadline','tags','repeat_on','completed','list_id'];

    public function todolist()
    {
        return $this->belongsTo(Todolist::class);
    }
}
