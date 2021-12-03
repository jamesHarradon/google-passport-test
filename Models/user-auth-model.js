const pool = require('../db');
const db = require('../db');
const { DateTime } = require('luxon');
const createError = require('http-errors');

class UserModel {
    
    getDate() {
        //creates timestamp with date and time with timezone (z is utc);
        return DateTime.now().toISO();
    }

    async createUser(data) {
        try {
            const user = await db.query('INSERT INTO users (google_id, first_name, last_name, display_name, img_url, date_created) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [data.id, data.name.givenName, data.name.familyName, data.displayName, data.photos[0].value, this.getDate()]);
            if(user.rows?.length) {
                return user.rows[0];
            };
            return null;
        } catch (err) {
            throw createError(500, err)
        }
    }

    async findOneById(id) {
        try {
            const user = await db.query('SELECT * FROM users WHERE google_id = $1', [id]);
            if(user.rows?.length) {
                return user.rows[0];
            };
            return null;
        } catch (err) {
            throw createError(500, err);
        }
    }
}

module.exports = UserModel;