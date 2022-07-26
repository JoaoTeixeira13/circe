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

//bio component

module.exports.updateBio = (bio, userId) => {
    const q = `UPDATE users
    SET bio = $1 
    WHERE id = $2
    RETURNING bio`;

    const param = [bio, userId];
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
     RETURNING *
    `;
    const param = [user_id, pid, display_pid, image_url];
    return db.query(q, param);
};

module.exports.removeFromWishlist = (user, plant) => {
    return db.query(
        `DELETE FROM wishlist
      WHERE (user_id = $1 AND pid = $2)
      RETURNING id`,
        [user, plant]
    );
};

//trade list

module.exports.fetchTradelist = (user_id) => {
    return db.query(
        `SELECT *
    FROM to_trade
    WHERE user_id = $1
    `,
        [user_id]
    );
};

module.exports.addToTradeList = (
    user_id,
    pid,
    display_pid,
    description,
    image_url
) => {
    const q = `INSERT INTO to_trade(user_id, pid, display_pid, description, image_url)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *
    `;
    const param = [user_id, pid, display_pid, description, image_url];
    return db.query(q, param);
};

module.exports.removeFromTradeList = (user, plant) => {
    return db.query(
        `DELETE FROM to_trade
      WHERE (user_id = $1 AND pid = $2)
      RETURNING id`,
        [user, plant]
    );
};

//matches

module.exports.getMatches = (loggedUser) => {
    return db.query(
        `SELECT to_trade.id, to_trade.user_id, to_trade.pid, to_trade.display_pid, to_trade.description, to_trade.image_url, users.first, users.imageUrl AS user_pic
    FROM to_trade
    JOIN users
    ON (to_trade.user_id = users.id)
    JOIN wishlist
    ON (to_trade.pid = wishlist.pid AND wishlist.user_id = $1)
    
    
     `,
        [loggedUser]
    );
};

module.exports.getThirdMatches = (tradingPartners, loggedUser) => {
    return db.query(
        `SELECT wishlist.id, wishlist.user_id as other_user_id, wishlist.pid, wishlist.display_pid
    FROM wishlist
    JOIN to_trade
    ON (to_trade.pid = wishlist.pid)
    WHERE wishlist.user_id = ANY($1) AND to_trade.user_id = $2

     `,
        [tradingPartners, loggedUser]
    );
};

//latest plants

module.exports.newestPlants = (userId) => {
    return db.query(
        `SELECT to_trade.description, to_trade.display_pid, to_trade.id, to_trade.image_url, to_trade.pid, to_trade.user_id,
        users.first AS user, users.location, users.imageUrl AS user_pic
    FROM to_trade
    JOIN users
    ON (to_trade.user_id = users.id)
    WHERE  user_id != $1
    ORDER BY id DESC   
    LIMIT 6 `,
        [userId]
    );
};

module.exports.matchingPlants = (val, userId) => {
    return db.query(
        `SELECT to_trade.description, to_trade.display_pid, to_trade.id, to_trade.image_url, to_trade.pid, to_trade.user_id,
        users.first AS user, users.location
    FROM to_trade
    JOIN users
    ON (to_trade.user_id = users.id)
     WHERE to_trade.pid ILIKE $1
     AND to_trade.user_id != $2;`,
        [val + "%", userId]
    );
};

//latest users

module.exports.newestUsers = (userId) => {
    return db.query(
        `SELECT id, first, last, location, imageUrl
    FROM users
    WHERE id != $1
    ORDER BY id DESC   
    LIMIT 6 `,
        [userId]
    );
};

module.exports.matchingUsers = (val, userId) => {
    return db.query(
        `SELECT id, first, last, location, imageUrl
     FROM users
     WHERE (first ILIKE $1 AND id != $2) OR (last ILIKE $1
     AND id != $2);`,
        [val + "%", userId]
    );
};

// following

module.exports.followRelation = (loggedUser, viewedUser) => {
    const q = `SELECT * FROM followers
     WHERE (leader_id = $1 AND follower_id = $2)
     OR (leader_id = $2 AND follower_id = $1)`;

    const param = [loggedUser, viewedUser];
    return db.query(q, param);
};

module.exports.followBack = (loggedUser, viewedUser) => {
    const q = `SELECT * FROM followers
     WHERE leader_id = $2 AND follower_id = $1 `;

    const param = [loggedUser, viewedUser];
    return db.query(q, param);
};

module.exports.followUser = (follower, leader) => {
    const q = `INSERT INTO followers (follower_id, leader_id)
     VALUES ($1, $2)
    `;
    const param = [follower, leader];
    return db.query(q, param);
};

module.exports.unfollowUser = (follower, leader) => {
    const q = `DELETE FROM followers
     WHERE follower_id = $1 AND leader_id = $2
     RETURNING leader_id
    `;
    const param = [follower, leader];
    return db.query(q, param);
};

// get followers / following

module.exports.fetchFollowers = (userId) => {
    return db.query(
        `SELECT followers.id, followers.follower_id, users.first, users.imageUrl
    FROM followers
    JOIN users
    ON (followers.follower_id = users.id)
    WHERE  followers.leader_id = $1
     `,
        [userId]
    );
};

module.exports.fetchFollowing = (userId) => {
    return db.query(
        `SELECT followers.id, followers.leader_id, users.first, users.imageUrl
    FROM followers
    JOIN users
    ON (followers.leader_id = users.id)
    WHERE  followers.follower_id = $1
     `,
        [userId]
    );
};

module.exports.fetchNewFollow = (userId, leader) => {
    return db.query(
        `SELECT followers.id, followers.leader_id, users.first, users.imageUrl
    FROM followers
    JOIN users
    ON (followers.leader_id = users.id)
    WHERE  followers.follower_id = $1 AND followers.leader_id = $2
     `,
        [userId, leader]
    );
};

// garden component

module.exports.fetchMyGarden = (userId) => {
    return db.query(
        `SELECT id, pid, image_url, description
    FROM gardens
    WHERE  user_id = $1
     `,
        [userId]
    );
};

// add plant to myGarden

module.exports.addToMyGarden = (user_id, pid, description, image_url) => {
    const q = `INSERT INTO gardens(user_id, pid, description, image_url)
     VALUES ($1, $2, $3, $4)
     RETURNING id, pid, image_url, description
    `;
    const param = [user_id, pid, description, image_url];
    return db.query(q, param);
};

// gardens: fetch feed (users user follows)

module.exports.fetchGardens = (userId) => {
    return db.query(
        `SELECT gardens.id, gardens.user_id, gardens.pid, gardens.image_url, gardens.description,
        users.first, users.last, users.imageUrl AS user_pic, (
            SELECT gardens.id FROM gardens
            JOIN users ON gardens.user_id = users.id
            JOIN followers ON (followers.leader_id = users.id)
            WHERE followers.follower_id = $1
            ORDER BY id ASC
            LIMIT 1
        ) AS "lowestId"
        FROM gardens
        JOIN users ON gardens.user_id = users.id
        JOIN followers ON (followers.leader_id = users.id)
        WHERE followers.follower_id = $1
        ORDER BY id DESC
        LIMIT 6
     `,
        [userId]
    );
};

module.exports.fetchMoreImages = (userId, smallestId) => {
    return db.query(
        `SELECT gardens.id, gardens.user_id, gardens.pid, gardens.image_url, gardens.description,
        users.first, users.last, users.imageUrl AS user_pic, (
            SELECT gardens.id FROM gardens
            JOIN users ON gardens.user_id = users.id
            JOIN followers ON (followers.leader_id = users.id)
            WHERE followers.follower_id = $1
            ORDER BY id ASC
            LIMIT 1
        ) AS "lowestId"
        FROM gardens
        JOIN users ON gardens.user_id = users.id
        JOIN followers ON (followers.leader_id = users.id)
        WHERE followers.follower_id = $1 AND gardens.id < $2
        ORDER BY id DESC
        LIMIT 3
     `,
        [userId, smallestId]
    );
};
