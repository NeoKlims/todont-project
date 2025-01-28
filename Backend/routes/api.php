<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\Auth\RegisteredUserController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('guest')->group(function () {
    Route::get('register', [RegisteredUserController::class, 'create'])
        ->name('register');

    Route::post('register', [RegisteredUserController::class, 'store']);
});

Route::get('/todolists', [ApiController::class, 'getTodolists']);
Route::get('/todolists/{id}', [ApiController::class, 'getTodolist']);
Route::post('/todolists', [ApiController::class, 'createTodolist']);
Route::put('/todolists/{id}', [ApiController::class, 'updateTodolist']);
Route::delete('/todolists/{id}', [ApiController::class, 'deleteTodolist']);

Route::get('/todontlists', [ApiController::class, 'getTodontlists']);
Route::get('/todontlists/{id}', [ApiController::class, 'getTodontlist']);
Route::post('/todontlists', [ApiController::class, 'createTodontlist']);
Route::put('/todontlists/{id}', [ApiController::class, 'updateTodontlist']);
Route::delete('/todontlists/{id}', [ApiController::class, 'deleteTodontlist']);

Route::get('/todotasks', [ApiController::class, 'getTodoTasks']);
Route::get('/sortedtodotasks', [ApiController::class, 'getSortedTodoTasks']);
Route::get('/todotasks/{id}', [ApiController::class, 'getTodoTask']);
Route::post('/todotasks', [ApiController::class, 'createTodoTask']);
Route::put('/todotasks/{id}', [ApiController::class, 'updateTodoTask']);
Route::delete('/todotasks/{id}', [ApiController::class, 'deleteTodoTask']);

Route::get('/todonttasks', [ApiController::class, 'getTodontTasks']);
Route::get('/todonttasks/{id}', [ApiController::class, 'getTodontTask']);
Route::post('/todonttasks', [ApiController::class, 'createTodontTask']);
Route::put('/todonttasks/{id}', [ApiController::class, 'updateTodontTask']);
Route::delete('/todonttasks/{id}', [ApiController::class, 'deleteTodontTask']);
