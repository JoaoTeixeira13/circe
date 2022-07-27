const secrets = require("./secrets");
var axios = require("axios");
var FormData = require("form-data");

const https = require("https");

//example request POST 1. Get token Client Creds

// module.exports.getToken = () => {
//     const request = require("request");
//     const options = {
//         method: "POST",
//         url: "https://open.plantbook.io/api/v1/token/",
//         headers: {},
//         formData: {
//             grant_type: "client_credentials",
//             client_id: `${secrets.CLIENT_ID}`,
//             client_secret: `${secrets.CLIENT_SECRET}`,
//         },
//     };
//     request(options, function (error, response) {
//         if (error) throw new Error(error);
//         const parsedBody = JSON.parse(response.body);
//         const token = parsedBody.access_token;
//         console.log("token is ", token);
//         return token;
//     });
// };
// console.log("results from calling function", module.exports.getToken());
// example 2 seach plant GET request

module.exports.getTokenAxios = async () => {
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

module.exports.searchPlantAxios = async (token, searchedPlant) => {
    var data = new FormData();
    // searchedPlant = searchedPlant.replace(/\s+/g, "%20").trim();

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
    // console.log("plant list data is ", response);
    // console.log("data results are", response.data.results);
    return response.data.results;
};

module.exports.searchPlant = (token, searchedPlant) => {
    const request = require("request");
    const options = {
        method: "GET",
        // url: `https://open.plantbook.io/api/v1/plant/search?alias=${searchedPlant}&limit=10&offset=20`,
        url: `https://open.plantbook.io/api/v1/plant/search?alias=acer&limit=10&offset=20`,

        headers: {
            Authorization: "Bearer " + token,
        },
        formData: {},
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        const parsedBody = JSON.parse(response.body);
        const plantSearch = parsedBody.results;
        console.log("parsed plant results are", plantSearch);
        return plantSearch;
    });
};

// module.exports.searchPlant();

// 3. GET  Plant Details by Pid

module.exports.plantDetails = (token, specificPlant) => {
    const request = require("request");
    const options = {
        method: "GET",
        url: `https://open.plantbook.io/api/v1/plant/detail/${specificPlant}/`,
        // url: `https://open.plantbook.io/api/v1/plant/detail/acer palmatum/`,

        headers: {
            Authorization: "Bearer " + token,
        },
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        const plant = JSON.parse(response.body);
        console.log("parsed plant detailed plants results are", plant);
        return plant;
    });
};

// module.exports.plantDetails();
