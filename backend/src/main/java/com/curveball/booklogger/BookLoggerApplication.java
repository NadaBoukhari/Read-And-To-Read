package com.curveball.booklogger;

import com.curveball.booklogger.book.BookService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BookLoggerApplication {
    BookService bookService;

    public static void main(String[] args) {
        SpringApplication.run(BookLoggerApplication.class, args);
    }

}
