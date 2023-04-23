package com.oracolo.ilpost;

import java.time.LocalDate;

public class NewsFactory {

    private NewsFactory() {
    }


    public static News readOnlyNews(String author, String link, String category, LocalDate timestamp, String title, Integer timeToComplete) {
        ReadOnlyNews readOnlyNews = new ReadOnlyNews();
        readOnlyNews.setAuthor(author);
        readOnlyNews.setLink(link);
        readOnlyNews.setCategory(category);
        readOnlyNews.setTimestamp(timestamp);
        readOnlyNews.setTimeToComplete(timeToComplete);
        readOnlyNews.setTitle(title);
        return readOnlyNews;
    }

}
