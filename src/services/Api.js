export async function fetchToken() {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const token = await response.json();
  return token;
}

export async function fetchQuestions(token) {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const questions = await response.json();
  return questions;
}

export const getCategories = async () => {
  const response = await fetch('https://opentdb.com/api_category.php');
  const category = await response.json();
  return category;
};
