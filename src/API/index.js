const API = {

    _REQUEST_URL : "http://localhost:8000/api",
    _UUID: null,

   async request (url, params) {
        const responseJSON = await fetch(`${this._REQUEST_URL}/shop/${this._UUID}/${url}`, {
            ...params,
            mode : "cors",
            headers: {
                ...params?.headers,
                "Content-Type": 'application/json',
                "Access-Control-Allow-Origin": '*',
                "Accept": 'application/json'
            }
        });
        const response = await responseJSON.json();
        return response.data;
    }
}

export default API;
