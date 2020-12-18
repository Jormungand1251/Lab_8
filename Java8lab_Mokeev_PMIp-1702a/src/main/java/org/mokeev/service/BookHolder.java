package org.tairov.service;

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Service;
import org.tairov.model.Book;

import java.util.ArrayList;
import java.util.List;

@Service
@Scope(value = "session", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class BookHolder {

    private List<Book> books = new ArrayList<>();
    private int count = 1;

    public BookHolder() {
    }

    public int counter() {
        return count++;
    }

    public List<Book> getBooks() {
        return books;
    }

    public Book getBookById(int id) {
        for(Book book : books) {
            if (book.getId() == id) {
                return book;
            }
        }
        return null;
    }

    public void removeBook(int id) {
        for (int i = 0; i < books.size(); i++) {
            if (books.get(i).getId() == id) {
                books.remove(i);
            }
        }
    }

    public void addBook(Book book) {
        books.add(book);
    }

    public void updateBook(Book book) {
        for (int i = 0; i < books.size(); i ++) {
            if (books.get(i).getId() == book.getId()) {
                books.set(i, book);
            }
        }
    }

}
