const chatWithBot = async (req, res) => {
    const userInput = req.body.message;
  
    if (!userInput) {
      return res.status(400).json({ error: 'No message provided in request body' });
    }
  
    try {
      const response = await fetch(
        'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer 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`, // Make sure it's loaded
          },
          body: JSON.stringify({ inputs: userInput }),
        }
      );
  
      const text = await response.text(); // 👈 Instead of .json() — log the raw text
      console.log('Raw response from Hugging Face:', text);
  
      let data;
      try {
        data = JSON.parse(text);
      } catch (parseError) {
        console.error('Failed to parse JSON from Hugging Face:', parseError);
        return res.status(500).json({ error: 'Invalid JSON response from Hugging Face' });
      }
  
      if (data.error) {
        console.error('Hugging Face API Error:', data.error);
        return res.status(500).json({ error: data.error });
      }
  
      const botReply =
        (Array.isArray(data) && data[0]?.generated_text) ||
        data.generated_text ||
        'No generated_text in response';
  
      res.json({ reply: botReply });
    } catch (error) {
      console.error('Unexpected error calling Hugging Face API:', error);
      res.status(500).json({ error: 'Internal Server Error when calling chatbot' });
    }
  };
  
  module.exports = { chatWithBot };
  