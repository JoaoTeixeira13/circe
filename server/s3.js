const aws = require("aws-sdk");
const fs = require("fs");

let secrets;
if (process.env.NODE_ENV === "production") {
    secrets = process.env;
} else {
    //this means we're running locally
    secrets = require("./secrets.json");
}

//below creates an instance of an AWS user -> object that gives us methods
//to communicate and interact with our s3 cloud storage that amazon calls bucket!

const s3 = new aws.S3({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
});

module.exports.upload = (req, res, next) => {
    if (!req.file) {
        console.log("no file on request body");
        return res.sendStatus(500);
    }

    const { filename, mimetype, size, path } = req.file;

    const promise = s3
        .putObject({
            Bucket: "spicedling", // <-- if we are using own credentials this needs to be updated to our bucket name
            ACL: "public-read",
            Key: filename,
            Body: fs.createReadStream(path),
            ContentType: mimetype,
            ContentLength: size,
        })
        .promise();

    promise
        .then(() => {
            console.log("successfully uploaded to the cloud");
            next();
            fs.unlink(path, () => {
                console.log("image vanished");
            });
        })
        .catch((err) => {
            console.log("something went wrong with the cloud upload", err);
            return res.sendStatus(500);
        });
};
