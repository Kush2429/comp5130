export async function fetchData() {
  const res = await fetch('http://localhost:3000/dashboard', {
    cache: 'no-cache',
  });

  return res.json();
}
