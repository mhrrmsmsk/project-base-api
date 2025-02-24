const mongoose = require("mongoose")

const schema = mongoose.Schema({
    role_id: { type: mongoose.SchemaTypes.ObjectId, required: true },
    permission: { type: String, required: true },
    created_by: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true
    }
}, {
    versionKey: false,
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
});

class RolePrivleges extends mongoose.Model {

}

schema.loadClass(RolePrivleges);
module.exports = mongoose.model("role_privleges", schema);