<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Personaliza el enlace de recuperación
    ResetPassword::createUrlUsing(function ($user, string $token) {
        return env('RESET_PASSWORD_REDIRECT_URL') . "?token=$token&email=" . urlencode($user->email);
    });
    }
}
