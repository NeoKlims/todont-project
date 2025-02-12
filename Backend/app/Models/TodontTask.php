<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TodontTask extends Model
{
    use HasFactory;

    protected $table = 'todont-tasks';

    protected $fillable = ['title','description','completed','streak','list_id'];

    public function todontlist()
    {
        return $this->belongsTo(Todontlist::class);
    }
    protected $casts = [
        'streak_reseted' => 'date',
    ];
}
