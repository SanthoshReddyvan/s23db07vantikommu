const mongoose = require("mongoose")
const roseSchema = mongoose.Schema({
Rose_color: {type: String, minlength: 1, maxlength : 50},
Rose_size: {type: String, minlength : 1, maxlength : 50},
Rose_cost: {type : String, min : 1, maxlength : 30}
})
module.exports = mongoose.model("rose",roseSchema)