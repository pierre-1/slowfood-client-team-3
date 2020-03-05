import axios from 'axios';

const getData = async () => {
    let headers = await sessionStorage.getItem('credentials');
    headers = JSON.parse(headers);
    headers = {
        ...headers,
        'Content-type': 'application/json',
        Accept: 'application/json'
    };
    const response = await axios.get('/product', {
        headers: headers
    });

    return response;
};

export { getData }