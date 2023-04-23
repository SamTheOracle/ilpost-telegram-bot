package com.oracolo.ilpost;

import java.time.LocalDate;

public class ReadOnlyNews implements News {

    private String title, author, link, category;
    private LocalDate timestamp;
    private Integer timeToComplete;

    public void setTitle(String title) {
        this.title = title;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setTimestamp(LocalDate timestamp) {
        this.timestamp = timestamp;
    }

    public void setTimeToComplete(Integer timeToComplete) {
        this.timeToComplete = timeToComplete;
    }

    @Override
    public String author() {
        return author;
    }

    @Override
    public LocalDate timestamp() {
        return timestamp;
    }

    @Override
    public String category() {
        return category;
    }

    @Override
    public String link() {
        return link;
    }

    @Override
    public String title() {
        return title;
    }

    @Override
    public Integer timeToComplete() {
        return timeToComplete;
    }
}
