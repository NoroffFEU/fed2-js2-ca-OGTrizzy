import { API_KEY } from "../constants";
export async function createPost({ title, body, tags, media }) {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        throw new Error('user is not authenticated');
    }

    console.log('Bearer Token:', token);
    console.log('API Key:', API_KEY);


    const response = await fetch ('https://v2.api.noroff.dev/social/posts', {
        method:  'POST',
        headers: {
            'Content-Type':  'application/json',
            'Authorization': `Bearer ${token}`,
            'X-Api-Key':  API_KEY
        },
        body: JSON.stringify({title, body, tags, media})
    });

    console.log('response:', response);

    if (!response.ok){
        const errorData = await response.json(); 
        throw new Error(errorData.errors[0].message || 'Failed to create post');
    }
    
    const data = await response.json();
    return data;
}