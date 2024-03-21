<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(): JsonResponse
{
    try {
        $categories = Category::all();
        return response()->json(['categories' => $categories], 200);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Failed to fetch categories', 'error' => $e->getMessage()], 500);
    }
}
}
