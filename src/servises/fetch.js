const URL = 'https://pixabay.com/api/';
const API_KEY = '33761900-0017c9dc68bb6d4e3ac4c8f50';

export function getData(query, page) {
  const searchParams = new URLSearchParams({
    q: query,
    key: API_KEY,
    page: page,
    per_page: 12,
  });

  return fetch(`${URL}?${searchParams}`).then(r => r.json());
}
