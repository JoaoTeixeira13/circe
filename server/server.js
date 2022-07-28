const express = require("express");
const app = express();
const server = require("http").Server(app);
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
const { getToken, searchPlant, plantDetails } = require("./plantApi");
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});

app.use(compression());
app.use(express.json());
app.use(
    cookieSession({
        secret: COOKIE_SECRET,
        maxAge: 1000 * 60 * 60 * 24 * 14,
        sameSite: true,
    })
);

const cookieSessionMiddleware = cookieSession({
    secret: COOKIE_SECRET,
    maxAge: 1000 * 60 * 60 * 24 * 14,
    sameSite: true,
});

io.use((socket, next) => {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "client", "public")));

//fetch.start

app.get("/user/id.json", (req, res) => {
    res.json({
        userId: req.session.userId,
    });
});

app.post("/registration", async (req, res) => {
    if (
        req.body.input.first &&
        req.body.input.last &&
        req.body.input.email &&
        req.body.input.password &&
        req.body.input.location
    ) {
        try {
            const hashedPassword = await bcrypt.hash(req.body.input.password);

            const result = await db.addUser(
                req.body.input.first.replace(/\s\s+/g, " ").trim(),
                req.body.input.last.replace(/\s\s+/g, " ").trim(),
                req.body.input.email.trim(),
                req.body.input.location.replace(/\s\s+/g, " ").trim(),
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

app.post("/login", async (req, res) => {
    if (req.body.input.email && req.body.input.password) {
        try {
            const result = await db.emailVerification(req.body.input.email);

            const hashComparison = await bcrypt.compare(
                req.body.input.password,
                result.rows[0].password
            );

            if (hashComparison) {
                req.session.userId = result.rows[0].id;
                res.json({ success: true });
            } else {
                res.json({
                    success: false,
                    error: true,
                });
            }
        } catch (err) {
            console.log("error in db ", err);
            res.json({
                success: false,
                error: true,
            });
        }
    } else {
        res.json({
            success: false,
            error: true,
        });
    }
});

//password reset

app.post("/password/reset/start", async (req, res) => {
    const result = await db.emailVerification(req.body.input.email);

    if (!result.rows.length) {
        res.json({
            success: false,
            error: true,
        });
    } else {
        try {
            const secretCode = cryptoRandomString({
                length: 6,
            });

            await db.saveCode(req.body.input.email, secretCode);

            await sendEmail(secretCode, "Password Reset");

            res.json({ success: true });
        } catch (err) {
            console.log("error in db. verifying user's email in ", err);
            res.json({
                success: false,
                error: true,
            });
        }
    }
});

app.post("/password/reset/verify", async (req, res) => {
    if (req.body.input.code && req.body.input.password) {
        try {
            const results = await db.findCode(req.body.input.email);

            if (req.body.input.code === results.rows[0].code) {
                const hashedPassword = await bcrypt.hash(
                    req.body.input.password
                );
                await db.updatePassword(hashedPassword, req.body.input.email);
                res.json({ success: true });
            } else {
                res.json({
                    success: false,
                    error: true,
                });
            }
        } catch (err) {
            console.log("error in db. resetting user's email ", err);
            res.json({
                success: false,
                error: true,
            });
        }
    } else {
        res.json({
            success: false,
            error: true,
        });
    }
});

//fetch profile data

app.get("/api/user", async (req, res) => {
    
    try {
        const result = await db.fetchProfile(req.session.userId);
        const user = result.rows[0];
        res.json({
            success: true,
            user,
        });
    } catch (err) {
        console.log("error in db. fetching user's profile ", err);
        res.json({
            success: false,
            error: true,
        });
    }
});

//plant search: plant list

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

//plant search: return one specific plant

app.post("/api/singularPlant", async (req, res) => {
    try {
        const token = await getToken();
        const singularPlant = await plantDetails(
            token,
            req.body.fetchPlant.toLowerCase()
        );
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

app.get("/logout", (req, res) => {
    req.session = null;
    res.json({ success: true });
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});
