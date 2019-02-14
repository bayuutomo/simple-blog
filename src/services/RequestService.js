import axios from 'axios';

export function GetRequest(url) {
    return BaseRequest('GET', url, {});
}

export function PostRequest(url, data = {}) {
    return BaseRequest('POST', url, data);
}

function BaseRequest(method, url, data = {}) {
    
    if(method !== 'GET') {
    	/*
    	var body = { data };
	    return (fetch(url, {
	        method: method,
	        headers: {
	            "Content-Type": "application/json",
	            "Accept": "application/json",
	            "Accept-Charset": "utf-8"
	        },
	        body: JSON.stringify(body)
	    }).then((response) => response.json()).then((response) => {
	        return response;
	    }).catch((error) => {
	        console.log('Error fetching and parsing data', error);
	        window.alert("An error accured : \n" + error);
	    }));
	    */
    	return axios.post(url, {data}).then((response) => {
	        return response;
	    });
    } else {
    	/*
    	return (fetch(url, {
	        method: method,
	        headers: {
	            "Content-Type": "application/json",
	            "Accept": "application/json",
	            "Accept-Charset": "utf-8"
	        }
	    }).then((response) => response.json()).then((response) => {
	        return response;
	    }).catch((error) => {
	        console.log('Error fetching and parsing data', error);
	        window.alert("An error accured : \n" + error);
	    }));
	    */
    	return axios.get(url).then((response) => {
	        return response.data;
	    });
    }
}