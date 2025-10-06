// In backend/server.js

const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors()); // Allow your frontend to make requests
app.use(express.json()); // Allow server to read JSON data

// IMPORTANT: You will get these from your Supabase project
// You will set these up as "Environment Variables" on your hosting provider
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

// --- API ROUTES ---

// Example: Get all movies from the 'movies' table
app.get('/api/movies', async (req, res) => {
    const { data, error } = await supabase.from('movies').select('*');
    if (error) {
        return res.status(400).json({ error: error.message });
    }
    res.status(200).json(data);
});

// We would add more routes here for watch_log, adding movies, etc.

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});