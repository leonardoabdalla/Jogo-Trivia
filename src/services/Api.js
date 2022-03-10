export async function fetchToken() {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const token = await response.json();
  return token;
}

export async function fetchQuestions(numQuestions, token) {
  const response = await fetch(`https://opentdb.com/api.php?amount=${numQuestions}&token=${token}`);
  const questions = await response.json();
  return questions;
}
