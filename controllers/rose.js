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
exports.rose_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
    result = await rose.findById( req.params.id)
    res.send(result)
    } catch (error) {
    res.status(500)
    res.send(`{"error": document for id ${req.params.id} not found`);
    }
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
// Handle rose delete on DELETE.
exports.rose_delete = async function(req, res) {
    console.log("delete " + req.params.id)
    try {
    result = await rose.findByIdAndDelete( req.params.id)
    console.log("Removed " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": Error deleting ${err}}`);
    }
   };

//Handle rose update form on PUT.
exports.rose_update_put = async function(req, res) {
 console.log(`update on id ${req.params.id} with body
${JSON.stringify(req.body)}`)
 try {
 let toUpdate = await rose.findById( req.params.id)
 // Do updates of properties
 if(req.body.Rose_color)
 toUpdate.Rose_color = req.body.Rose_color;
 if(req.body.Rose_size) toUpdate.Rose_size = req.body.Rose_size;
 if(req.body.Rose_cost) toUpdate.Rose_cost = req.body.Rose_cost;
 let result = await toUpdate.save();
 console.log("Sucess " + result)
 res.send(result)
 } catch (err) {
 res.status(500)
 res.send(`{"error": ${err}: Update for id ${req.params.id}
failed`);
 }
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

   // Handle a show one view with id specified by query
exports.rose_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id)
    try{
    result = await rose.findById( req.query.id)
    res.render('rosedetail',
   { title: 'rose Detail', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };

   // Handle building the view for creating a rose.
// No body, no in path parameter, no query.
// Does not need to be async
exports.rose_create_Page = function(req, res) {
    console.log("create view")
    try{
    res.render('rosecreate', { title: 'rose Create'});
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };

   // Handle building the view for updating a rose.
// query provides the id
exports.rose_update_Page = async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
    let result = await rose.findById(req.query.id)
    res.render('roseupdate', { title: 'rose Update', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };

   // Handle a delete one view with id from query
exports.rose_delete_Page = async function(req, res) {
    console.log("Delete view for id " + req.query.id)
    try{
    result = await rose.findById(req.query.id)
    res.render('rosedelete', { title: 'rose Delete', toShow:
   result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };