<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        try {
            $rules = [
                'content' => 'required|max:2000',
                'feedback_id' => 'required|exists:feedback,id',
            ];

            $validator = Validator::make($request->all(), $rules);

            if ($validator->fails()) {
                return response()->json(['errors' => $validator->errors()], 422);
            }

            $comment = new Comment();
            $comment->content = $request->input('content');
            $comment->user_id = $request->user()->id;
            $comment->feedback_id = $request->input('feedback_id');
            $comment->save();

            // Return success response
            return response()->json($comment, 201);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function fetchComments($feedbackId)
    {
        try {
            $comments = Comment::with("user")->where('feedback_id', $feedbackId)->latest()->get();

            return response()->json([
                'success' => true,
                'data' => $comments,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch comments.',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}
