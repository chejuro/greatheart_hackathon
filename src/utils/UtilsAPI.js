import { API_BASE_URL, ACCESS_TOKEN, USER_ID } from './../constants';
import inMemoryJWT from './inMemoryJWT'
const request = (options) => {
    let headers;
    if (options.with_auth && inMemoryJWT.getToken != null) {
        headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + inMemoryJWT.getToken(),
        })
    } else {
        headers = new Headers({
            'Content-Type': 'application/json',
        })
    }
    console.log(headers.get('Authorization'));

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);
    
    return fetch(options.url, options)
    .then(response => {
        return response.json().then(json => {
            if(!response.ok) {
                return Promise.reject(json);
            }
            return json;
        });
    }
        
    );
};

const request_without_response = (options) => {
    let headers;
    if (options.with_auth && inMemoryJWT.getToken != null) {
        headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + inMemoryJWT.getToken(),
        })
    } else {
        headers = new Headers({
            'Content-Type': 'application/json',
        })
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    fetch(options.url, options)
};

export function getRequests() {
    return request({
        url: "requests/ward?status=1",
        method : 'GET',
        with_auth : true,
    });
}

export function getKanbanTableData(type, params) {
    let url = ""
    if (params === null){
        url = "requests/kanban?requestTypeId=" + type
    }
    else {
        url = "requests/kanban?requestTypeId=" + type + "&body=" + params
    }
    console.log(url)
    return request({
        url: url,
        method : 'GET',
        with_auth: true,
    });
}

export function changeRequestStatus(modifiedData) {
    console.log(modifiedData)
    return request_without_response({
        url: "requests/change_status",
        method: 'POST',
        body: JSON.stringify(modifiedData),
        with_auth : true,
    });
}

export function addCard(modifiedData) {
    return request({
        url: "requests/ward/create",
        method: 'POST',
        body: JSON.stringify(modifiedData),
        with_auth : true,
    });
}

export function getRequestData(id) {
    return request({
        url: "requests?id=" + id,
        method : 'GET',
        with_auth : true,
    });
}

export async function getRequestTypes() {
    return request({
        url: "requests/types",
        method : 'GET',
        with_auth: true,
    });
}

export function filterByRequestType(requestTypeId) {
    return request({
        url: "requests/kanban?requestTypeId=" + requestTypeId,
        method : 'GET',
        with_auth : true,
    });
}

export function createNewRequest(modifiedData) {
    console.log(JSON.stringify(modifiedData));
    return request({
        url: "requests/create",
        method: 'POST',
        body: JSON.stringify(modifiedData),
        with_auth : true,
    });
}

export function changeRequest(modifiedData) {
    console.log(JSON.stringify(modifiedData));
    return request({
        url: "/requests/change",
        method: 'POST',
        body: JSON.stringify(modifiedData),
        with_auth : true,
    });
}

export function getHandbookTypes() {
    return request({
        url: "entities/mainTypes",
        method: 'GET',
        with_auth:true,
    });
}

export function getEntityType(id) {
    return request({
        url: "entities/mainType?entityTypeId=" + id,
        method: 'GET',
        with_auth:true,
    });
}

export function getEntities(id) {
    return request({
        url: "entities/" + id,
        method: 'GET',
        with_auth:true,
    });
}

export function getEntityInfo(entity_type_id, entity_id, post_id, field_key) {
    return request({
        url: "entities/" + entity_type_id + '/' + entity_id,
        method: 'GET',
        with_auth:true,
    }).then(response => {
        return {
            id: post_id,
            data : response[0].json,
            key : field_key
        }
    })
}

export function getEnums() {
    return request({
        url: "enums/types",
        method: 'GET',
        with_auth:true,
    });
}

export function addEnum(enum_id, modifiedData) {
    console.log(JSON.stringify(modifiedData));
    return request({
        url: "/enums/addEnum?enumTypeId=" + enum_id,
        method: 'POST',
        body: JSON.stringify(modifiedData),
        with_auth : true,
    });
}

export function addEntityType(modifiedData) {
    console.log(JSON.stringify(modifiedData));
    return request({
        url: "/entities/addEntityType",
        method: 'POST',
        body: JSON.stringify(modifiedData),
        with_auth : true,
    });
}

export function signUp(user) {
    return request({
        url: "auth/sign_up",
        method: 'POST',
        body: JSON.stringify(user)
    });
}

export function signIn(user) {
    return request({
        url: "auth/sign_in",
        method: 'POST',
        body: JSON.stringify(user)
    });
}
