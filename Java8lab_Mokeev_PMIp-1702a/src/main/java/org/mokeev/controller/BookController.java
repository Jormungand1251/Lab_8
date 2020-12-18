package org.tairov.controller;
//
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.tairov.model.Book;
import org.tairov.service.BookHolder;
//
@Controller
public class BookController {

//    @Autowired
//    private BookHolder bookHolder;
////
//    @RequestMapping(value = "/")
//    public String index() {
//        return "index";
//    }
//
    @RequestMapping(value = "books", method = RequestMethod.GET)
    public String bookList(Model model) {
//        model.addAttribute("book", new Book());
//        model.addAttribute("listBooks", bookHolder.getBooks());

        return "books";
    }
//
//    @RequestMapping(value = "/books/add", method = RequestMethod.POST)
//    public String addBook(@ModelAttribute("book") Book book) {
//        if (book.getId() == 0) {
//            book.setId(bookHolder.counter());
//            bookHolder.addBook(book);
//        } else {
//            bookHolder.updateBook(book);
//        }
//
//        return "redirect:/books";
//    }
//////
//    @RequestMapping(value = "books/remove/{id}", method = RequestMethod.GET)
//    public String removeBook(@PathVariable("id") int id) {
//        bookHolder.removeBook(id);
//
//        return "redirect:/books";
//    }
//////
//    @RequestMapping(value = "books/edit/{id}")
//    public String editBook(@PathVariable("id") int id, Model model) {
//        model.addAttribute("book", bookHolder.getBookById(id));
//        model.addAttribute("listBooks", bookHolder.getBooks());
//
//        return "books";
//    }
//
}
