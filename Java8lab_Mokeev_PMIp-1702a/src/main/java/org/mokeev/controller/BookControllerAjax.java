package org.tairov.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.tairov.model.Book;
import org.tairov.service.BookHolder;

import java.util.List;

@Controller
public class BookControllerAjax {

    @Autowired
    private BookHolder bookHolder;

    @RequestMapping(value = "books/ajax", method = RequestMethod.GET)
    @ResponseBody
    public List<Book> bookListAjax() {

        return bookHolder.getBooks();
    }

    @RequestMapping(value = "books/ajax/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Book getBookAjax(@PathVariable("id") int id) {

        return bookHolder.getBookById(id);
    }

    @RequestMapping(value = "/books/add/ajax", method = RequestMethod.POST)
    public @ResponseBody
    Book addBookAjax(@RequestBody Book book) {
        bookHolder.addBook(book);

        return book;
    }

    @RequestMapping(value = "books/remove/ajax/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    public Book removeBookAjax(@PathVariable("id") int id) {
        Book book = bookHolder.getBookById(id);
        bookHolder.removeBook(id);

        return book;
    }

    @RequestMapping(value = "books/edit/ajax")
    @ResponseBody
    public Book editBook(@RequestBody Book book) {
        Book bookObj = bookHolder.getBookById(book.getId());
        bookHolder.updateBook(book);

        return bookObj;
    }

}
