<?php
// app/Http/Controllers/Admin/UserController.php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth; // ✅ Use Auth facade

class UserController extends Controller
{
    public function index()
    {
        $authUserId = Auth::id();

        $users = User::all()->sortBy(function ($user) use ($authUserId) {
            return $user->id === $authUserId ? 0 : ($user->role === 'admin' ? 1 : 2);
        });

        return inertia('Admin/UserList', [
            'users' => $users->values(), // reset array keys for React
            'authUserId' => $authUserId,
        ]);
    }

    public function create()
    {
        return inertia('Admin/UserForm');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6|confirmed',
            'role' => 'required|in:admin,faculty,technician,guest',
        ]);

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => $request->role,
        ]);

        return redirect()->route('users.list')->with('success', 'User created successfully!');
    }

    public function edit($id)
    {
        $user = User::findOrFail($id);

        return inertia('Admin/EditUserForm', [
            'user' => $user
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|string|min:6|confirmed',
            'role' => 'required|in:admin,faculty,technician,guest',
        ]);

        $user->name = $request->name;
        $user->email = $request->email;
        $user->role = $request->role;

        if ($request->password) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return redirect()->route('users.list')->with('success', 'User updated successfully!');
    }

    public function destroy($id)
    {
        $authUser = Auth::user(); // ✅ Fixed here

        $user = User::findOrFail($id);

        if ($authUser->id === $user->id) {
            return redirect()->back()->with('error', 'You cannot delete your own account.');
        }

        $user->delete();

        return redirect()->route('users.list')->with('success', 'User deleted successfully!');
    }
}
