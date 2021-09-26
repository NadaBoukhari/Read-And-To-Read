package com.curveball.booklogger.book;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", updatable = false)
    private UUID id;
    @Column(name = "title", columnDefinition = "TEXT")
    private String title;
    @Column(name = "author", columnDefinition = "TEXT")
    private String author;
    @Column(name = "rating")
    private Double rating;
    @Column(name = "review", columnDefinition = "TEXT")
    private String review;
    @Column(name = "img_url", columnDefinition = "TEXT")
    private String img_url;
    @Column(name = "created_on")
    @CreationTimestamp
    private LocalDateTime createdOn;

}
