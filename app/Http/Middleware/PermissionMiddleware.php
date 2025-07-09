<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Helpers\PermissionHelper;
use Inertia\Inertia;

class PermissionMiddleware
{
    public function handle(Request $request, Closure $next, ...$permissions)
    {
        $user = $request->user();

        if (!$user) {
            return $this->unauthorizedResponse($request, 'Unauthorized access.');
        }

        $userPermissions = PermissionHelper::getPermissionsForRole($user->role);

        foreach ($permissions as $permission) {
            if (!in_array($permission, $userPermissions)) {
                return $this->unauthorizedResponse($request, 'Missing required permission.');
            }
        }

        return $next($request);
    }

    protected function unauthorizedResponse(Request $request, $message)
    {
        if ($request->header('X-Inertia')) {
            return Inertia::render('Errors/403', [
                'errorMessage' => $message,
            ])->toResponse($request)->setStatusCode(403);
        }

        abort(403, $message);
    }
}
