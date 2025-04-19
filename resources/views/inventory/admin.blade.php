@extends('app')

@section('content')
    <h1>Inventory List with QR Codes</h1>

    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>QR Code</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($items as $item)
                <tr>
                    <td>{{ $item->name }}</td>
                    <td>
                        {!! QrCode::size(100)->generate(url('/inventory/' . $item->unique_id)) !!}
                    </td>
                </tr>
            @endforeach
        </tbody>
    </table>
@endsection
