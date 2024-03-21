<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Feedback;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class FeedbackController extends Controller
{

    public function index(Request $request)
    {
        $feedbackItems = Feedback::with(['category', 'user'])->latest()
            ->paginate($request->get('per_page', 10));

        return response()->json($feedbackItems);
    }

    public function store(Request $request)
    {
            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'description' => 'required|string|max:1000',
                'categoryId' => 'required|exists:categories,id', 
            ]);
            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }
            try {

            $userId = Auth::id();

            $feedback = new Feedback();
            $feedback->title = $request->input('title');
            $feedback->description = $request->input('description');
            $feedback->category_id = $request->input('categoryId');
            $feedback->user_id = $userId; 
            $feedback->save();

            return response()->json(['message' => 'Feedback saved successfully'], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Failed to save feedback'], 500);
        }
    }
}
