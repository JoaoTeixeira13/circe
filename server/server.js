const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const db = require("./db");
const { sendEmail } = require("./ses.js");
const cookieSession = require("cookie-session");
const bcrypt = require("./bcrypt");
const COOKIE_SECRET =
    process.env.COOKIE_SECRET || require("./secrets.json").COOKIE_SECRET;

const cryptoRandomString = require("crypto-random-string");
const multer = require("multer");
const s3 = require("./s3");
const uidSafe = require("uid-safe");
const {
    getToken,
    searchPlant,
    plantDetails,
} = require("./plantApi");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
    cookieSession({
        secret: COOKIE_SECRET,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

//fetch.start

app.get("/user/id.json", (req, res) => {
    res.json({
        userId: req.session.userId,
    });
});

app.post("/registration", async (req, res) => {
    if (
        req.body.first &&
        req.body.last &&
        req.body.email &&
        req.body.password &&
        req.body.location
    ) {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password);

            const result = await db.addUser(
                req.body.first.replace(/\s\s+/g, " ").trim(),
                req.body.last.replace(/\s\s+/g, " ").trim(),
                req.body.location.replace(/\s\s+/g, " ").trim(),
                req.body.email.trim(),
                hashedPassword
            );

            req.session.userId = result.rows[0].id;
            res.json({ success: true });
        } catch (err) {
            console.log("error in db social network ", err);
            res.json({
                success: false,
                error: true,
            });
        }
        
    }
});

//login route

app.post("/login", (req, res) => {
    if (req.body.email && req.body.password) {
        db.emailVerification(req.body.email)

            .then((result) => {
                return bcrypt
                    .compare(req.body.password, result.rows[0].password)
                    .then(function (hashComparison) {
                        if (hashComparison) {
                            req.session.userId = result.rows[0].id;
                            res.json({ success: true });
                        } else {
                            res.json({
                                success: false,
                                error: true,
                            });
                        }
                    })
                    .catch((err) => {
                        console.log("error in db. loging user in ", err);
                        res.json({
                            success: false,
                            error: true,
                        });
                    });
            })
            .catch((err) => {
                console.log("error in db. loging user in ", err);
                res.json({
                    success: false,
                    error: true,
                });
            });
    } else {
        res.json({
            success: false,
            error: true,
        });
    }
});

//password reset

app.post("/password/reset/start", (req, res) => {
    db.emailVerification(req.body.email)
        .then((result) => {
            if (!result.rows.length) {
                res.json({
                    success: false,
                    error: true,
                });
            } else {
                const secretCode = cryptoRandomString({
                    length: 6,
                });

                db.saveCode(req.body.email, secretCode)
                    .then(() => {
                        sendEmail(secretCode, "Password Reset");
                    })
                    .then(res.json({ success: true }))
                    .catch((err) => {
                        console.log(
                            "error in db. verifying user's email in ",
                            err
                        );
                        res.json({
                            success: false,
                            error: true,
                        });
                    });
            }
        })
        .catch((err) => {
            console.log("error in db. verifying user's email in ", err);
            res.json({
                success: false,
                error: true,
            });
        });
});

app.post("/password/reset/verify", (req, res) => {
    if (req.body.code && req.body.password) {
        db.findCode(req.body.email).then((results) => {
            if (req.body.code === results.rows[0].code) {
                bcrypt
                    .hash(req.body.password)
                    .then(function (hash) {
                        const hashedPassword = hash;

                        // db.update Password must be returned in order to be handled in the catch

                        return db
                            .updatePassword(hashedPassword, req.body.email)
                            .then(() => {
                                res.json({ success: true });
                            })
                            .catch((err) => {
                                console.log("error in db social network ", err);
                                res.json({
                                    success: false,
                                    error: true,
                                });
                            });
                    })
                    .catch((err) => {
                        console.log("error in db socialnetwork ", err);
                        res.json({
                            success: false,
                            error: true,
                        });
                    });
            } else {
                res.json({
                    success: false,
                    error: true,
                });
            }
        });
    } else {
        res.json({
            success: false,
            error: true,
        });
    }
});

//plant search

app.post("/api/plantSearch", async (req, res) => {
    try {
        const token = await getToken();
        const plantSearch = await searchPlant(token, req.body.input);
        res.json({
            success: true,
            plantSearch,
        });
    } catch (err) {
        console.log("error in db social network ", err);
        res.json({
            success: false,
            error: true,
        });
    }
});

app.post("/api/singularPlant", async (req, res) => {
    try {
        const token = await getToken();
        const singularPlant = await plantDetails(token, req.body.fetchPlant.toLowerCase());
        res.json({
            success: true,
            singularPlant,
        });
    } catch (err) {
        console.log("error in db social network ", err);
        res.json({
            success: false,
            error: true,
        });
    }
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
