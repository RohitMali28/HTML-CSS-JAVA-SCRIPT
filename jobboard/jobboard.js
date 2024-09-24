import axios from 'axios';

const fetchJobs = async (searchQuery) => {
  const apiKey = 'YOUR_INDEED_API_KEY';
  const url = `https://api.indeed.com/ads/search?q=${searchQuery}&l=Pune&publisher=YOUR_PUBLISHER_ID&format=json&userip=YOUR_IP_ADDRESS&v=3&limit=50`;

  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching job listings:', error);
    return [];
  }
};