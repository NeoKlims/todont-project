<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTodontTasksTable extends Migration
{
    public function up()
    {
        Schema::create('todont-tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description');
            $table->boolean('completed')->default(false);
            $table->integer('streak')->default(0);
            $table->unsignedBigInteger('list_id');
            $table->foreign('list_id')->references('id')->on('todont-lists')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('todont-tasks');
    }
}

