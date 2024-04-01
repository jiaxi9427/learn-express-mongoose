let async = require('async');
let Book = require('../models/book');
let BookInstance = require('../models/bookinstance');

function isValidObjectId(id) {
    return /^[0-9a-fA-F]{24}$/.test(id);
}

function get_book(id) {
    if (!isValidObjectId(id)) {
        return Promise.resolve({status: "error", message: "Invalid ID format"});
    }
    return Book.findOne({'_id': {$eq: id}}).populate('author');
}

function get_book_dtl(id) {
    if (!isValidObjectId(id)) {
        return Promise.resolve({status: "error", message: "Invalid ID format"});
    }
    return BookInstance
          .find({ 'book': id })
          .select('imprint status');
}

exports.show_book_dtls = async (res, id) => {
    try {
        const results = await Promise.all([get_book(id), get_book_dtl(id)]);
        let book = results[0];
        let copies = results[1];

        if (book.status === "error" || copies.status === "error") {
            throw new Error("Invalid ID format");
        }

        res.send({
            title: book.title,
            author: book.author.name,
            copies: copies,
        });
    } catch(err) {
        res.send(`Error: ${err.message}`);
    } 
}

