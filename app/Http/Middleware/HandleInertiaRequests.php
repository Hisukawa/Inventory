<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            // ✅ This makes `usePage().props.auth.user` available in all Inertia components
            'auth' => [
                'user' => fn () => $request->user(),
            ],
        ]);
    }
}

