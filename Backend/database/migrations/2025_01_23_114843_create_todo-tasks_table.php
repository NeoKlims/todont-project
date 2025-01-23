<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTodoTasksTable extends Migration
{
    public function up()
    {
        Schema::create('todo-tasks', function (Blueprint $table) {
            $table->id();
            $table->text('description');
            $table->boolean('completed')->default(false);
            $table->timestamp('deadline')->nullable();
            $table->string('tags')->nullable();
            $table->string('repeat_on')->nullable();
            $table->unsignedBigInteger('list_id');
            $table->foreign('list_id')->references('id')->on('todo-lists')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('todo-tasks');
    }
}

