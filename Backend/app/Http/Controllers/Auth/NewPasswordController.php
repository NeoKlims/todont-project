<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Validation\ValidationException;

class NewPasswordController extends Controller
{
    /**
     * Display the password reset view.
     */
    public function create(Request $request)
    {
        return view('auth.reset-password', ['request' => $request]);
    }

    /**
     * Handle an incoming new password request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request)
    {
        // Validar los datos
        $validated = $request->validate([
            'email' => 'required|email',
            'token' => 'required|string',
            'password' => 'required|min:8|confirmed',
        ]);

        // Intentar restablecer la contraseña con el token
        $status = Password::broker()->reset(
            $validated, // Los datos validados
            function ($user, $password) use ($validated) {
                // Se actualiza la contraseña
                $user->password = Hash::make($validated['password']);
                $user->save();
                
                // Disparar evento de restablecimiento de contraseña (opcional)
                event(new PasswordReset($user));
            }
        );

        // Verificar el resultado de la operación
        if ($status == Password::PASSWORD_RESET) {
            return response()->json(['message' => 'Password updated successfully.'], 200);
        }

        // En caso de error (por ejemplo, token inválido)
        throw ValidationException::withMessages(['token' => 'Invalid or expired reset token.']);
    }
}
