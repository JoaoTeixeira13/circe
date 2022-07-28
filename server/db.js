const spicedPg = require("spiced-pg");
//below we have information that we need for our db connection
//which db do we talk to?
const database = "circe";

//which user is running our queries in the db?
const username = "postgres";

////whats the user's passwors?
const password = "postgres";

const db = spicedPg(
    process.env.DATABASE_URL ||
        `postgres:${username}:${password}@localhost:5432/${database}`
);

// Logged out experience

module.exports.addUser = (firstName, lastName, email, location, password) => {
    const q = `INSERT INTO users(first, last, email, location, password) VALUES ($1, $2, $3, $4, $5)
    RETURNING id`;
    const param = [firstName, lastName, email, location, password];
    return db.query(q, param);
};

module.exports.emailVerification = (email) => {
    return db.query(
        `SELECT *
    FROM users
    WHERE email = $1`,
        [email]
    );
};

module.exports.saveCode = (email, code) => {
    const q = `INSERT INTO reset_codes(email, code)
     VALUES ($1, $2)
     RETURNING *
    `;
    const param = [email, code];
    return db.query(q, param);
};

module.exports.findCode = (email) => {
    return db.query(
        `SELECT reset_codes.email, reset_codes.code
    FROM reset_codes
    WHERE CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
    AND email = $1
    ORDER BY id DESC   
    LIMIT 1 `,
        [email]
    );
};

module.exports.updatePassword = (password, email) => {
    const q = `UPDATE users
    SET password = $1 
    WHERE email = $2`;

    const param = [password, email];
    return db.query(q, param);
};

// fetching user's profile

module.exports.fetchProfile = (id) => {
    return db.query(
        `SELECT users.id, users.first, users.last, users.location, users.imageUrl, users.bio
    FROM users
    WHERE id = $1
    LIMIT 1`,
        [id]
    );
};

//upload profilePicture

module.exports.uploadProfilePicture = (url, userId) => {
    const q = `UPDATE users
    SET imageUrl = $1 
    WHERE id = $2
    RETURNING imageUrl`;

    const param = [url, userId];
    return db.query(q, param);
};

//get user's wishlist

module.exports.fetchWishlist = (user_id) => {
    return db.query(
        `SELECT *
    FROM wishlist
    WHERE user_id = $1
    `,
        [user_id]
    );
};

//add plants to wishlist

module.exports.addToWishlist = (user_id, pid, display_pid, image_url) => {
    const q = `INSERT INTO wishlist(user_id, pid, display_pid, image_url)
     VALUES ($1, $2, $3, $4)
    `;
    const param = [user_id, pid, display_pid, image_url];
    return db.query(q, param);
};
