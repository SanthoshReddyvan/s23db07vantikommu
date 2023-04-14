var rose = require('../models/rose');
// List of all rose
// List of all rose
exports.rose_list = async function(req, res) {
    try{
    therose = await rose.find();
    res.send(therose);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };
// for a specific rose.
exports.rose_detail = function(req, res) {
 res.send('NOT IMPLEMENTED: rose detail: ' + req.params.id);
};
// Handle rose create on POST.
exports.rose_create_post = async function(req, res) {
    console.log(req.body)
    let document = new rose();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"rose_type":"goat", "cost":12, "size":"large"}
    document.Rose_color = req.body.Rose_color;
    document.Rose_size = req.body.Rose_size;
    document.Rose_cost = req.body.Rose_cost;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };
// Handle rose delete form on DELETE.
exports.rose_delete = function(req, res) {
 res.send('NOT IMPLEMENTED: rose delete DELETE ' + req.params.id);
};
// Handle rose update form on PUT.
exports.rose_update_put = function(req, res) {
 res.send('NOT IMPLEMENTED: rose update PUT' + req.params.id);
};

// VIEWS
// Handle a show all view
exports.rose_view_all_Page = async function(req, res) {
    try{
    therose = await rose.find();
    res.render('rose', { title: 'rose Search Results', results: therose });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
   };