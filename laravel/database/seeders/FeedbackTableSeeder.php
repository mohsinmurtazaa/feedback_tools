<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Feedback;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FeedbackTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run():void
    {
        $categories = Category::all();
        $users = User::all();

        for ($i = 0; $i < 10; $i++) {
            Feedback::create([
                'title' => 'Feedback Title ' . ($i + 1),
                'description' => 'Description of Feedback ' . ($i + 1),
                'category_id' => $categories->random()->id,
                'user_id' => $users->random()->id,
            ]);
        }
    }
}
