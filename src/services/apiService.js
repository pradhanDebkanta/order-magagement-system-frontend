import service from "./interseptor";

const ApiService = {};

ApiService.get = (url, headers, params) => {
    return service({
        url,
        method: "get",
        headers,
        params,
    });
};

ApiService.post = (url, headers, data) => {
    return service({
        url,
        method: "post",
        headers,
        data: data,
    });
};

ApiService.patch = function (url, headers, data, params) {
    return service({
        url,
        method: "patch",
        headers,
        data: data,
        params: params
    });
};

ApiService.put = function (url, headers, data) {
    return service({
        url,
        method: "put",
        headers,
        data: data,
    });
};
ApiService.delete = function (url, headers) {
    return service({
        url,
        method: "delete",
        headers,
    });
};

export default ApiService;
