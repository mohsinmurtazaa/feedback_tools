<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Feedback;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CommentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $feedbacks = Feedback::all();

        foreach ($feedbacks as $feedback) {
            // Generate a random number of comments for each feedback (between 1 and 5)
            $numComments = rand(1, 5);

            for ($i = 0; $i < $numComments; $i++) {
                Comment::create([
                    'user_id' => $users->random()->id,
                    'feedback_id' => $feedback->id,
                    'content' => 'Comment content for Feedback ' . $feedback->id,
                ]);
            }
        }
    }
}
