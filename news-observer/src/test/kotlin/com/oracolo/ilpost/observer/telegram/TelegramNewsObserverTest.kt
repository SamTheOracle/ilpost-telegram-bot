package com.oracolo.ilpost.observer.telegram

import com.oracolo.ilpost.NewsFactory
import com.oracolo.ilpost.observer.NewsObserver
import com.oracolo.ilpost.observer.telegram.client.TelegramClient
import io.quarkus.test.junit.QuarkusTest
import io.quarkus.test.junit.mockito.InjectMock
import org.eclipse.microprofile.rest.client.inject.RestClient
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions.assertDoesNotThrow
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation
import org.junit.jupiter.api.Order
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestMethodOrder
import org.mockito.ArgumentMatchers
import org.mockito.Mockito.*
import javax.inject.Inject
import javax.ws.rs.core.Response

@QuarkusTest
@TestMethodOrder(OrderAnnotation::class)
class TelegramNewsObserverTest {

    @InjectMock
    @RestClient
    lateinit var telegramClient: TelegramClient

    @Inject
    lateinit var telegramConfig: TelegramConfig

    @Inject
    lateinit var newsObserver: NewsObserver

    @AfterEach
    fun reset() {
        reset(telegramClient)
    }

    @Test
    @Order(1)
    fun `should send all news`() {
        val firstNews = NewsFactory.readOnlyNews(
            null,
            "https://www.ilpost.it/2023/04/24/evacuazione-italiani-europei-sudan/?homepagePosition=0",
            null,
            null,
            "Some title",
            null,
        )
        val secondNews = NewsFactory.readOnlyNews(
            null,
            "https://www.ilpost.it/2023/04/24/crollo-palazzo-di-dacca-10-anni/?homepagePosition=2",
            null,
            null,
            "Some title",
            null,
        )
        `when`(
            telegramClient.sendMessageToChannel(
                ArgumentMatchers.anyString(),
                ArgumentMatchers.anyString(),
                ArgumentMatchers.anyString()
            )
        ).thenReturn(Response.status(Response.Status.OK).build())
        assertDoesNotThrow { newsObserver.onNewsUpdates(setOf(firstNews, secondNews)) }
        verify(telegramClient).sendMessageToChannel(
            telegramConfig.channel().bot(),
            telegramConfig.channel().id(),
            firstNews.text()
        )
        verify(telegramClient).sendMessageToChannel(
            telegramConfig.channel().bot(),
            telegramConfig.channel().id(),
            secondNews.text()
        )
    }

    @Test
    @Order(2)
    fun `should send only new news`() {
        val firstNews = NewsFactory.readOnlyNews(
            null,
            "https://www.ilpost.it/2023/04/24/evacuazione-italiani-europei-sudan/?homepagePosition=0",
            null,
            null,
            "Some title",
            null,
        )
        val newArticleToSend = NewsFactory.readOnlyNews(
            null,
            "https://www.ilpost.it/new_article",
            null,
            null,
            "Some title",
            null,
        )
        `when`(
            telegramClient.sendMessageToChannel(
                ArgumentMatchers.anyString(),
                ArgumentMatchers.anyString(),
                ArgumentMatchers.anyString()
            )
        ).thenReturn(Response.status(Response.Status.OK).build())
        assertDoesNotThrow { newsObserver.onNewsUpdates(setOf(firstNews, newArticleToSend)) }
        verify(telegramClient).sendMessageToChannel(
            ArgumentMatchers.matches(telegramConfig.channel().bot()),
            ArgumentMatchers.matches(telegramConfig.channel().id()),
            ArgumentMatchers.matches(newArticleToSend.text())
        )
        verify(telegramClient, never()).sendMessageToChannel(
            ArgumentMatchers.matches(telegramConfig.channel().bot()),
            ArgumentMatchers.matches(telegramConfig.channel().id()),
            ArgumentMatchers.matches(firstNews.text())
        )
    }

}