async function sendPrompt() {
  const input = document.getElementById('userInput').value;
  const responseField = document.getElementById('response');
  responseField.textContent = "Yükleniyor...";

  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt: input })
  });

  const data = await res.json();
  responseField.textContent = data.result || "Bir hata oluştu.";
}
