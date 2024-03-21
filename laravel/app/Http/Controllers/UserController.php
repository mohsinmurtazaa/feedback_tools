<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function search(Request $request)
    {
        $searchTerm = str_replace('@', '', $request->query('search'));

        // Perform search query
        $users = User::where('name', 'like', '%' . $searchTerm . '%')->get();

        return response()->json([
            'success' => true,
            'message' => 'Users fetched successfully',
            'data' => $users
        ]);
    }
}
