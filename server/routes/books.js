// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

  res.render("books/details",{
    viewTitle : "insert books"
  });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

  if (req.body._id == '')
  insertRecord(req,res);
  else
  updateRecord (req,res);

});

function insertRecord(req,res) {
  var books = new book();
  books.Price = req.body.Price;
  books.Author = req.body.Author;
  books.Genre = req.body.Genre;
  books.save((err, doc)=>{
      if (!err)
      res.redirect("books/index");
      else{
          console.log("Error during record insertion : " + err);
 
      }
  });
 
 }
 function updateRecord(req,res) {
  book.findOneAndUpdate({_id: req.body._id}, req.body, { new: true }, (err,doc)=>{
      if (!err) {
           res.redirect("/books/index");
  }
  else{
      console.log("error during record update:" + err);
  }
  });
}
// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

  book.findById(req.params.id, (err,doc) => {
    if(!err){
        res.render("/books/details", {
            viewTitle: "Update booklist",
            books: doc
            
        });
    }
    else{
      console.log("error during record update:" + err);
  }
});
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
  if (req.body._id == '')
  insertRecord(req,res);
  else
  updateRecord (req,res);
 
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

  book.findByIdAndDelete(req.params.id, (err,doc) => {
    if(!err){
        res.render("/books/index");
    }
    else{
        console.log("Error in retriving book list : " + err);
    }
});
});


module.exports = router;
