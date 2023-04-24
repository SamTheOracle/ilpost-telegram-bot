package com.oracolo.ilpost;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtensionContext;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.ArgumentsProvider;
import org.junit.jupiter.params.provider.ArgumentsSource;

import java.time.LocalDate;
import java.util.stream.Stream;

class ReadOnlyNewsTest implements ArgumentsProvider {

    @Test
    @DisplayName("Should show at least link")
    void shouldShowLink() {
        News news = NewsFactory.readOnlyNews(null,
                "some link",
                null,
                null,
                "some title",
                null
        );
        String text = Assertions.assertDoesNotThrow(news::text);
        Assertions.assertTrue(text.contains(news.link()));
    }

    @Test
    @DisplayName("Should throw if link is null")
    public void shouldThrowIfLinkNull() {
        News news = NewsFactory.readOnlyNews(null,
                null,
                null,
                null,
                "some title",
                null
        );
        Assertions.assertThrows(NullPointerException.class, news::text);
    }

    @Test
    @DisplayName("Should throw if title is null")
    public void shouldThrowIfTitleNull() {
        News news = NewsFactory.readOnlyNews(null,
                "some link",
                null,
                null,
                null,
                null
        );
        Assertions.assertThrows(NullPointerException.class, news::text);
    }

    @ParameterizedTest
    @ArgumentsSource(ReadOnlyNewsTest.class)
    @DisplayName("Should contain some news information")
    public void shouldContainSomeNews(News news) {
        String newsAsText = Assertions.assertDoesNotThrow(news::text);
        Assertions.assertTrue(
                newsAsText.contains(news.author()) ||
                        newsAsText.contains(news.category()) ||
                        newsAsText.contains(news.title()) ||
                        newsAsText.contains(news.timeToComplete().toString())
        );
    }

    @Override
    public Stream<? extends Arguments> provideArguments(ExtensionContext extensionContext) throws Exception {
        return Stream.of(
                Arguments.of(NewsFactory.readOnlyNews(
                                "marco carta",
                                "some link",
                                "category",
                                LocalDate.now(),
                                "some title",
                                4
                        )
                ),
                Arguments.of(
                        NewsFactory.readOnlyNews(
                                "marco carta",
                                "some link",
                                null,
                                LocalDate.now(),
                                "some title",
                                null
                        )
                )
        );
    }


}