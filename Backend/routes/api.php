<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\PasswordController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('guest')->group(function () {
    Route::post('register', [RegisteredUserController::class, 'store']);
    Route::post('login', [AuthenticatedSessionController::class, 'store']);
    Route::post('forgot-password', [PasswordResetLinkController::class, 'store']);
    Route::post('reset-password', [NewPasswordController::class, 'store']);
});
Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthenticatedSessionController::class, 'destroy']);
    Route::put('password', [PasswordController::class, 'update']);
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
Route::put('/todonttasks/{id}/reset-streak', [ApiController::class, 'resetStreak']);
Route::delete('/todonttasks/{id}', [ApiController::class, 'deleteTodontTask']);
