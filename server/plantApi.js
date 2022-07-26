const secrets = require("./secrets");

const https = require("https");

//example request POST 1. Get token Client Creds

module.exports.getToken = () => {
    // const formdata = new FormData();
    // formdata.append("grant_type", "client_credentials");
    // formdata.append("client_id", `${secrets.CLIENT_ID}`);
    // formdata.append("client_secret", `${secrets.CLIENT_SECRET}`);

    // const requestOptions = {
    //     method: "POST",
    //     body: formdata,
    //     redirect: "follow",
    // };

    // fetch("https://open.plantbook.io/api/v1/token/", requestOptions)
    //     .then((response) => response.text())
    //     .then((result) => console.log(result))
    //     .catch((error) => console.log("error", error));
    var request = require("request");
    var options = {
        method: "POST",
        url: "https://open.plantbook.io/api/v1/token/",
        headers: {},
        formData: {
            grant_type: "client_credentials",
            client_id: `${secrets.CLIENT_ID}`,
            client_secret: `${secrets.CLIENT_SECRET}`,
        },
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });
};
module.exports.getToken();
// example 2 seach plant GET request

module.exports.searchPlant = () => {
    var request = require("request");
    var options = {
        method: "GET",
        url: "https://open.plantbook.io/api/v1/plant/search?alias=acer&limit=10&offset=20",
        headers: {
            Authorization: "Bearer nmOpI4kd7jva9PlvpSL7jCpSF9JVSi",
        },
        formData: {},
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });
};

module.exports.searchPlant();

// 3. GET  Plant Details by Pid

module.exports.plantDetails = () => {
    var request = require("request");
    var options = {
        method: "GET",
        url: "https://open.plantbook.io/api/v1/plant/detail/acer pseudoplatanus/",
        headers: {
            Authorization: "Bearer nmOpI4kd7jva9PlvpSL7jCpSF9JVSi",
        },
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });
};

module.exports.plantDetails();

