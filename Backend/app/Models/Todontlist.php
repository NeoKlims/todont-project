<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todontlist extends Model
{


    use HasFactory;

    protected $table = 'todont-lists';

    protected $fillable = ['title', 'user_id'];

    public function tasks()
    {
        return $this->hasMany(TodontTask::class);
    }
}
