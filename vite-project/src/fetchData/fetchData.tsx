type Character = {
  [key: string]: string | string[];
};

type ApiResponse = {
  results: Character[];
  count: number;
};

async function fetchData(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error while fetching data:', error);
    return null;
  }
}

export default fetchData;
