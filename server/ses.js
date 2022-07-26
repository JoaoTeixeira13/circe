const aws = require("aws-sdk");

let secrets;

if (process.env.NODE_ENV === "production") {
    secrets = process.env;
} else {
    secrets = require("./secrets.json");
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "eu-west-1",
});

exports.sendEmail = (message, subject) => {
    return ses
        .sendEmail({
            Source: "Ellen Ripley <bright.parmesan@spicedling.email>",
            Destination: {
                ToAddresses: ["bright.parmesan@spicedling.email"],
            },
            Message: {
                Body: {
                    Text: {
                        Data: message,
                    },
                },
                Subject: {
                    Data: subject,
                },
            },
        })
        .promise()
        .then(() => console.log("it worked!"))
        .catch((err) =>
            console.log("something went wrong while sending the email", err)
        );
};
