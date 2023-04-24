package com.oracolo.ilpost;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.Locale;
import java.util.Objects;
import java.util.StringJoiner;

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

    @Override
    public String text() {
        String link = Objects.requireNonNull(this.link);
        String title = Objects.requireNonNull(this.title);
        StringBuilder mainBodyBuilder = new StringBuilder(String.format("%s %s", title, link));
        if (author != null) {
            mainBodyBuilder.append(" ").append(String.format("scritto da %s", author));
        }
        if (timestamp != null) {
            mainBodyBuilder.append(String.format(", il %s", timestamp.format(DateTimeFormatter.ofLocalizedDate(FormatStyle.LONG)
                    .withLocale(Locale.ITALY))));
        }
        if (category != null) {
            mainBodyBuilder.append(String.format(" per la categoria %s", category));
        }
        return mainBodyBuilder.toString();
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", ReadOnlyNews.class.getSimpleName() + "[", "]")
                .add("title='" + title + "'")
                .add("author='" + author + "'")
                .add("link='" + link + "'")
                .add("category='" + category + "'")
                .add("timestamp=" + timestamp)
                .add("timeToComplete=" + timeToComplete)
                .toString();
    }
}
