@extends('layouts.app')

@section('content')
<div class="max-w-xl mx-auto bg-white p-6 rounded shadow">
    <h2 class="text-2xl font-bold mb-4">Add Room</h2>
    @if(session('success'))
        <div class="bg-green-200 p-2 rounded">{{ session('success') }}</div>
    @endif
    <form method="POST" action="{{ route('rooms.store') }}">
        @csrf
        <label class="block font-medium mb-1">Room Number</label>
        <input type="text" name="room_number" class="border p-2 w-full mb-4" required placeholder="e.g. 101">
        <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Add Room</button>
    </form>
</div>
@endsection
