<!-- resources/views/inventory/show.blade.php -->
@extends('app')

@section('title', 'Inventory Item')

@section('content')
<div class="container mx-auto py-4">
    <div class="bg-white shadow-md rounded-lg p-6">
        <h2 class="text-2xl font-bold mb-4">{{ $item->name }}</h2>

        <p class="mb-2"><strong>Name:</strong> {{ $item->name}}</p>
        <p class="mb-2"><strong>Description:</strong> {{ $item->description ?? 'N/A' }}</p>
        <p class="mb-2"><strong>Category:</strong> {{ $item->category }}</p>
        <p class="mb-2"><strong>Status:</strong>
            <span class="{{ $item->status === 'available' ? 'text-green-600' : 'text-red-600' }}">
                {{ ucfirst($item->status) }}
            </span>
        </p>
        <p class="mb-2"><strong>Created Aat:</strong> {{ $item->created_at }}</p>


        {{-- <div class="mt-6">
            <h4 class="text-lg font-semibold mb-2">QR Code for this Item:</h4>
            <div class="border p-4 inline-block bg-gray-100 rounded">
                {!! $qrCode !!}
            </div>
        </div> --}}
    </div>
</div>
@endsection
