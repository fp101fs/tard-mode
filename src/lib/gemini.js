export const breakDownTask = async (task, apiKey) => {
  if (!apiKey) throw new Error("API Key is missing");
  if (!task) throw new Error("Task is missing");

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ 
        parts: [{ 
          text: `Break down the following task into simple, small, actionable steps. 
                 Return ONLY the list of steps separated by newlines. 
                 Do not include numbers, bullet points, or any introductory text.
                 
                 Task: "${task}"` 
        }] 
      }]
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || "Failed to fetch from Gemini API");
  }

  const data = await response.json();
  const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawText) return [];

  // Split by newline characters
  return rawText.split(/\n+/)
    .map(t => t.trim())
    .filter(t => t !== '' && !t.match(/^\d+\./) && !t.startsWith('-'));
};