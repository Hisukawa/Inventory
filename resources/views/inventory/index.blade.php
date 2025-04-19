<!-- resources/views/inventory/show.blade.php -->
@extends('app')

@section('title', 'Inventory Item')

@section('content')
<div class="container mx-auto py-4">
    <div class="bg-white shadow-md rounded-lg p-6 text-center">
        @foreach ($items as $item)
            <div style="margin-bottom: 20px;">
                <strong style="font-size: 50px; display: flex; justify-content: center;">{{ $item->name }}</strong><br>
                <div style="display: flex; justify-content: center;">
                    {!! QrCode::size(500)->generate(url('/inventory/' . $item->unique_id)) !!}
                </div>
            </div>
        @endforeach
    </div>
</div>
@endsection
