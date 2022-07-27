const secrets = require("./secrets");
var axios = require("axios");
var FormData = require("form-data");

const https = require("https");

module.exports.getToken = async () => {
    const data = new FormData();
    data.append("grant_type", "client_credentials");
    data.append("client_id", secrets.CLIENT_ID);
    data.append("client_secret", secrets.CLIENT_SECRET);

    const config = {
        method: "post",
        url: "https://open.plantbook.io/api/v1/token/",
        headers: {
            ...data.getHeaders(),
        },
        data: data,
    };

    const response = await axios(config);
    return response.data.access_token;
};

module.exports.searchPlant = async (token, searchedPlant) => {
    var data = new FormData();

    var config = {
        method: "get",
        url: `https://open.plantbook.io/api/v1/plant/search?alias=${searchedPlant}`,
        headers: {
            ...data.getHeaders(),
            Authorization: "Bearer " + token,
        },
        data: data,
    };

    const response = await axios(config);

    return response.data.results;
};


// 3. GET  Plant Details by Pid

   

module.exports.plantDetails = async (token, searchedPlant) => {
    var config = {
        method: "get",
        url: `https://open.plantbook.io/api/v1/plant/detail/${searchedPlant}/`,
        headers: {
            Authorization: "Bearer " + token,
        },
    };

    const response = await axios(config);

    return response.data;
};
