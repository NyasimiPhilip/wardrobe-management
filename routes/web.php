<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Remove or modify the root route to prevent it from catching API requests
Route::get('/', function () {
    return view('welcome');
});

// Comment out or remove this line since we're not using these routes
// require __DIR__.'/auth.php';
