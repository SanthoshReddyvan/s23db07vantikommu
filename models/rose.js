const mongoose = require("mongoose")
const roseSchema = mongoose.Schema({
Rose_color: String,
Rose_size: String,
Rose_cost: String
})
module.exports = mongoose.model("rose",roseSchema)