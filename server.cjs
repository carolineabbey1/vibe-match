const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/api/generate-vibe', async (req, res) => {
    const { mood, songs } = req.body;

    try {
        const prompt = `
Write a short playlist vibe description for this mood.

Mood: ${mood}
Songs: ${songs && songs.length ? songs.join(', ') : 'No songs provided'}

Requirements:
- 2 to 3 sentences
- sound natural and fun
- describe the feeling of the playlist
- do not use bullet points
`;

        const response = await fetch('http://localhost:11434/v1/chat/completions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: 'llama3.2:3b',
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ]
            })
        });

        if (!response.ok) {
            return res.status(response.status).json({
                error: `Ollama request failed with status ${response.status}`
            });
        }

        const data = await response.json();
        const text = data.choices?.[0]?.message?.content || 'No description generated.';

        res.json({ text });
    } catch (error) {
        console.error('Error generating vibe description:', error);
        res.status(500).json({ error: 'Could not generate vibe description.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});