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

        const wishlistQuery = await db.fetchWishlist(req.session.userId);
        const wishlist = wishlistQuery.rows;

        const plantsToTradeQuery = await db.fetchTradelist(req.session.userId);
        const plantsToTrade = plantsToTradeQuery.rows;

        res.json({
            success: true,
            user,
            wishlist,
            plantsToTrade,
        });
    } catch (err) {
        console.log("error in db. fetching user's profile ", err);
        res.json({
            success: false,
            error: true,
        });
    }
});

//other users
app.get("/api/user/:id", async (req, res) => {
    if (!isNaN(req.params.id)) {
        if (req.session.userId == req.params.id) {
            res.json({
                ownProfile: true,
            });
        } else {
            try {
                const results = await db.fetchProfile(req.params.id);
                const profile = results.rows[0];

                const wishlistQuery = await db.fetchWishlist(req.params.id);
                const userWishlist = wishlistQuery.rows;

                const plantsQuery = await db.fetchTradelist(req.params.id);
                const userPlants = plantsQuery.rows;
                if (!profile) {
                    res.json({
                        noMatch: true,
                    });
                } else {
                    res.json({
                        success: true,
                        profile,
                        userWishlist,
                        userPlants,
                    });
                }
            } catch (error) {
                console.log("error in fetching user's profile ", err);
                res.json({
                    success: false,
                    error: true,
                });
            }
        }
    } else {
        res.json({
            ownProfile: true,
        });
    }
});

//profile picture upload

const storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, path.join(__dirname, "uploads"));
    },
    filename(req, file, callback) {
        uidSafe(24).then((randomString) => {
            //keep the original file extention

            // use extname method to be found on the core path library
            callback(null, `${randomString}${path.extname(file.originalname)}`);
        });
    },
});
const uploader = multer({
    storage,
    limits: {
        fileSize: 2097152,
    },
});

app.post(
    "/uploadProfilePic",
    uploader.single("image"),
    s3.upload,
    async (req, res) => {
        const url = "https://s3.amazonaws.com/spicedling/" + req.file.filename;

        if (url) {
            try {
                const result = await db.uploadProfilePicture(
                    url,
                    req.session.userId
                );

                res.json({
                    sucess: true,
                    payload: result.rows[0],
                });
            } catch (err) {
                console.log("error in db. fetching user's profile ", err);
                res.json({
                    success: false,
                    error: true,
                });
            }
        } else {
            console.log("invalid url");
        }
    }
);
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

// handle wishlist

const buttonValues = {
    add: "Add to Wishlist",
    remove: "Remove from Wishlist",
};

app.post("/api/handleWishlist", async (req, res) => {
    if (req.body[0].button == buttonValues.add) {
        try {
            const result = await db.addToWishlist(
                req.session.userId,
                req.body[1].plant.pid,
                req.body[1].plant.display_pid,
                req.body[1].plant.image_url
            );
            const plant = result.rows[0];
            res.json({
                success: true,
                buttonText: buttonValues.remove,
                plant,
            });
        } catch (err) {
            console.log("error in db inserting into wishlist ", err);
            res.json({
                success: false,
                error: true,
            });
        }
    } else if (req.body[0].button == buttonValues.remove) {
        try {
            const result = await db.removeFromWishlist(
                req.session.userId,
                req.body[1].plant.pid
            );
            const plant = result.rows[0];

            res.json({ success: true, buttonText: buttonValues.add, plant });
        } catch (err) {
            console.log("error in db removing from wishlist ", err);
            res.json({
                success: false,
                error: true,
            });
        }
    }
});

app.post("/api/deleteFromWishlist", async (req, res) => {
    try {
        const result = await db.removeFromWishlist(
            req.session.userId,
            req.body.plant
        );
        const plant = result.rows[0];

        res.json({ success: true, plant });
    } catch (err) {
        console.log("error in db removing from wishlist ", err);
        res.json({
            success: false,
            error: true,
        });
    }
});

// upload plants to trade

app.post(
    "/uploadPlant",
    uploader.single("image"),
    s3.upload,
    async (req, res) => {
        const url = "https://s3.amazonaws.com/spicedling/" + req.file.filename;
        const pid = req.body.plant.toLowerCase();

        if (url) {
            try {
                const result = await db.addToTradeList(
                    req.session.userId,
                    pid,
                    req.body.plant,
                    req.body.description,
                    url
                );

                res.json({
                    sucess: true,
                    plant: result.rows[0],
                });
            } catch (err) {
                console.log("error in db. fetching user's profile ", err);
                res.json({
                    success: false,
                    error: true,
                });
            }
        } else {
            console.log("invalid url");
        }
    }
);

//delete from trade list

app.post("/api/deleteFromTradeList", async (req, res) => {
    try {
        const result = await db.removeFromTradeList(
            req.session.userId,
            req.body.plant
        );
        const plant = result.rows[0];

        res.json({ success: true, plant });
    } catch (err) {
        console.log("error in db removing from wishlist ", err);
        res.json({
            success: false,
            error: true,
        });
    }
});

//fetch matches

app.get("/api/fetchMatches", async (req, res) => {
    try {
        let fullMatches = [];
        const result = await db.getMatches(req.session.userId);

        const matches = result.rows;

        if (matches.length) {
            const idMatches = matches.map((each) => {
                return each.user_id;
            });
            let uniq = [...new Set(idMatches)];
            const thirdResult = await db.getThirdMatches(
                uniq,
                req.session.userId
            );
            fullMatches = thirdResult.rows;
        }

        res.json({
            sucess: true,
            matches,
            fullMatches,
        });
    } catch (err) {
        console.log("error in db fetching matches ", err);
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
