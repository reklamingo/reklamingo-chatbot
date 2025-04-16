import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { prompt } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "Kullanıcının belirttiği sektöre uygun yaratıcı bir iş fikri ve reklamingo.com.tr'de sunulabilecek hizmet önerileri oluştur."
        },
        {
          role: "user",
          content: `Sektör: ${prompt}`
        }
      ]
    });

    const result = completion.choices[0].message.content;
    res.status(200).json({ response: result });
  } catch (err) {
    res.status(500).json({ error: "Bir hata oluştu.", details: err.message });
  }
}
