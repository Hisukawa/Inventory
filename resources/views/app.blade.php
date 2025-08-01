{{-- <!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">

    <!-- Styles (Tailwind or Bootstrap if used) -->
    @vite('resources/css/app.css')
</head>
<body class="font-sans antialiased bg-gray-100 text-gray-900">
    <div class="min-h-screen py-8">
        <div class="max-w-4xl mx-auto px-4">
            @yield('content')
        </div>
    </div>
</body>
</html> --}}



<!DOCTYPE html>
{{-- <html class="scroll-smooth" lang="{{ strreplace('', '-', app()->getLocale()) }}"> --}}
<html class="scroll-smooth" lang="{{ str_replace('_', '-', app()->getLocale()) }}">


<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <!-- Set the favicon -->
    {{-- <link rel="icon" href="{{ asset('img/menu.png') }}" /> --}}

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap" rel="stylesheet">

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased">
    @inertia
</body>

</html>


{{-- DON'T CHANGE ANY OF THE CODE --}}
