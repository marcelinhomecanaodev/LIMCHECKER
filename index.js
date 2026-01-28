const express = require('express');
const app = express();
const port = process.env.PORT || 1000;

const SUPABASE_URL = "https://fhnxfmifebqwpwjzuiqa.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZobnhmbWlmZWJxd3B3anp1aXFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0NzAzNjIsImV4cCI6MjA4NTA0NjM2Mn0.bRTJpL4rFPs0viuplRpOeLELVMSUTDVK7-tCuUdKxeg";

app.get('/check/:nome_carrinho', async (req, res) => {
    const { nome_carrinho } = req.params;
    const full_url = `${SUPABASE_URL}/rest/v1/carrinhos?nome=eq.${nome_carrinho}&select=status`;

    try {
        const response = await fetch(full_url, {
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`
            }
        });
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Erro na requisicao ao Supabase' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});