const API = {

    // Local http://localhost:8000/api
    // Dev   https://dev.shoppingcart.services/api
    // Prod  https://api.shoppingcart.services/api
    _REQUEST_URL : process.env.NODE_ENV === "production" ? "https://api.shoppingcart.services/api" : "http://localhost:8000/api",
    _UUID: null,

   async shopRequest (url, params, fetchShopInfo) {

        const requestURL = !fetchShopInfo ?  new URL(`${this._REQUEST_URL}/shop/${this._UUID}/${url}`)
            : `${this._REQUEST_URL}/shop/${this._UUID}`

       if(params?.getParams) {
           requestURL.search = new URLSearchParams(params.getParams).toString();
       }

       const builtUrl = !fetchShopInfo ? requestURL.toString() : requestURL;

        const responseJSON = await fetch(builtUrl, {
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
    },
    async request (url, params) {
        const responseJSON = await fetch(`${this._REQUEST_URL}/${url}`, {
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
    },
    async shopEvent (params) {
        const requestURL = new URL(`${this._REQUEST_URL}/shop/${this._UUID}/event`);
        const responseJSON = await fetch(requestURL.toString(), {
            method: "POST",
            body: JSON.stringify(params),
            mode : "cors",
            headers: {
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
