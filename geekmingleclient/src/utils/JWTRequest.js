// Function to make an authenticated API request with a JWT token

export const jwtRequest = async (endpoint, method = 'GET', data = null, logOutFunction) => {

    const token = localStorage.getItem('jwtToken');

    if (!token) {
        throw new Error('User is not authenticated.');
    }

    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };

    const requestOptions = {
        method,
        headers,
        body: data ? JSON.stringify(data) : null,
    };

    try {
        const response = await fetch(`${process.env.REACT_APP_SERVER_URL}${endpoint}`, requestOptions);

        console.log(response);

        if (!response.ok) {
            // logOutFunction();
        }

        return await response.json();
    } catch (error) {
        // logOutFunction();
        throw error;
    }
};
