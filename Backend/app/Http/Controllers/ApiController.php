<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todolist;
use App\Models\Todontlist;
use App\Models\TodoTask;
use App\Models\TodontTask;

class ApiController extends Controller
{
    // CRUD for Todolists
    public function getTodolists() {
        return Todolist::all();
    }

    public function getTodolist($id) {
        return Todolist::findOrFail($id);
    }

    public function createTodolist(Request $request) {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'user_id' => 'required|exists:users,id' 
        ]);
    
        $todolist = new Todolist;
        $todolist->title = $request->title;
        $todolist->user_id = $request->user_id;
        $todolist->save();
    }
    

    public function updateTodolist(Request $request, $id) {
        $todolist = Todolist::findOrFail($id);
        $todolist->update($request->all());
        return $todolist;
    }

    public function deleteTodolist($id) {
        $todolist = Todolist::findOrFail($id);
        $todolist->delete();
        return response(null, 204);
    }

    // CRUD for Todontlists
    public function getTodontlists() {
        return Todontlist::all();
    }

    public function getTodontlist($id) {
        return Todontlist::findOrFail($id);
    }

    public function createTodontlist(Request $request) {
        $validated = $request->validate([
            'title' => 'required|string|max:255', 
            'user_id' => 'required|exists:users,id' 
        ]);
        
        $todontlist = new Todontlist;
        $todontlist->title = $request->title;
        $todontlist->user_id = $request->user_id;
        $todontlist->save();
    }

    public function updateTodontlist(Request $request, $id) {
        $todontlist = Todontlist::findOrFail($id);
        $todontlist->update($request->all());
        return $todontlist;
    }

    public function deleteTodontlist($id) {
        $todontlist = Todontlist::findOrFail($id);
        $todontlist->delete();
        return response(null, 204);
    }

    // CRUD for TodoTasks
    public function getTodoTasks() {
        return TodoTask::all();
    }

    public function getSortedTodoTasks() {
        return TodoTask::orderBy('deadline', 'asc')->get();
    }
    
    public function getTodoTask($id) {
        return TodoTask::findOrFail($id);
    }

    public function createTodoTask(Request $request) {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'list_id' => 'required|exists:todo-lists,id',
        ]);
        $todotask = new TodoTask;
        $todotask->title = $request->title;
        $todotask->description = $request->description;
        $todotask->completed = $request->completed;
        $todotask->deadline = $request->deadline;
        $todotask->tags = $request->tags;
        $todotask->repeat_on = $request->repeat_on;
        $todotask->list_id = $request->list_id;
        $todotask->save();
    }

    public function updateTodoTask(Request $request, $id) {
        $task = TodoTask::findOrFail($id);
        $task->update($request->all());
        return $task;
    }

    public function deleteTodoTask($id) {
        $task = TodoTask::findOrFail($id);
        $task->delete();
        return response(null, 204);
    }

    // CRUD for TodontTasks
    public function getTodontTasks() {
        return TodontTask::all();
    }

    public function getTodontTask($id) {
        return TodontTask::findOrFail($id);
    }

    public function createTodontTask(Request $request) {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'list_id' => 'required|exists:todont-lists,id',
        ]);
        $todonttask = new TodontTask;
        $todonttask->title = $request->title;
        $todonttask->description = $request->description;
        $todonttask->completed = $request->completed;
        $todonttask->streak = $request->streak;
        $todonttask->list_id = $request->list_id;
        $todonttask->save();
        
    }

    public function updateTodontTask(Request $request, $id) {
        $task = TodontTask::findOrFail($id);
        $task->update($request->all());
        return $task;
    }

    public function deleteTodontTask($id) {
        $task = TodontTask::findOrFail($id);
        $task->delete();
        return response(null, 204);
    }
}
