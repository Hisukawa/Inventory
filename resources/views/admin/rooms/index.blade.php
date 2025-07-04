@extends('layouts.app')

@section('content')
<div class="max-w-3xl mx-auto bg-white p-6 rounded shadow">
    <h2 class="text-2xl font-bold mb-4">Rooms List</h2>
    <a href="{{ route('rooms.create') }}" class="bg-green-600 text-white px-3 py-1 rounded mb-4 inline-block">+ Add Room</a>
    <table class="w-full table-auto border">
        <thead>
            <tr>
                <th>ID</th>
                <th>Room Name</th>
                <th>QR Code Text</th>
            </tr>
        </thead>
        <tbody>
            @foreach($rooms as $room)
                <tr class="border-t">
                    <td>{{ $room->id }}</td>
                    <td>{{ $room->room_name }}</td>
                    <td>{{ $room->qr_code }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</div>
@endsection
