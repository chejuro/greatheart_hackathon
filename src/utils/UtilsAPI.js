import { API_BASE_URL, ACCESS_TOKEN, USER_ID } from './../constants';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
    .then(response => 
        response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        })
    );
};

export function getRequests() {
    return request({
        url: "requests/ward?status=1",
        method : 'GET'
    });
}

export function getKanbanTableData() {
    return request({
        url: "requests/ward",
        method : 'GET'
    });
}

export function changeRequestStatus(modifiedData) {
    console.log(JSON.stringify(modifiedData))
    return request({
        url: "requests/ward/change_status",
        method: 'POST',
        body: JSON.stringify(modifiedData)
    });
}

export function addCard(modifiedData) {
    console.log(JSON.stringify(modifiedData))
    return request({
        url: "/requests/ward/c>reate",
        method: 'POST',
        body: JSON.stringify(modifiedData)
    });
}
