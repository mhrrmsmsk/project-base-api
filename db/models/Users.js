const mongoose = require("mongoose");
const Enum = require("../../config/Enum");
const CustomError = require("../../lib/Error");
const is = require("is_js");
const bcrypt = require("bcrypt-nodejs");

const schema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    is_active: { type: Boolean, default: true },
    first_name: String,
    last_name: String,
    phone_number: String,
}, {
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

class Users extends mongoose.Model {

    validPassword(password) {
        return bcrypt.compareSync(password, this.password);
    }

    static validateFieldsBeforeAuth(email, passsword) {
        if (typeof passsword !== 'string' || passsword.length < Enum.PASS_LENG || is.not.email(email)) {
            throw new CustomError(Enum.HTTP_CODES.UNAUTHORIZED, "validation error", "email or password is wrong");
        }
        return null;
    }
}

schema.loadClass(Users);
module.exports = mongoose.model("users", schema);