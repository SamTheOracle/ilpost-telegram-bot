package com.oracolo.ilpost.observer.telegram

import com.oracolo.ilpost.NewsFactory
import com.oracolo.ilpost.observer.NewsObserver
import com.oracolo.ilpost.observer.telegram.client.TelegramClient
import io.quarkus.test.junit.QuarkusTest
import io.quarkus.test.junit.mockito.InjectMock
import org.eclipse.microprofile.rest.client.inject.RestClient
import org.junit.jupiter.api.AfterEach
import org.junit.jupiter.api.Assertions.assertDoesNotThrow
import org.junit.jupiter.api.Test
import org.mockito.ArgumentMatchers
import org.mockito.Mockito.*
import javax.inject.Inject
import javax.ws.rs.core.Response

@QuarkusTest
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
    fun `should send all news`() {
        val firstNews = NewsFactory.readOnlyNews(
            null,
            "https://www.ilpost.it/2023/04/24/evacuazione-italiani-europei-sudan/?homepagePosition=0",
            null,
            null,
            null,
            null,
        )
        val secondNews = NewsFactory.readOnlyNews(
            null,
            "https://www.ilpost.it/2023/04/24/crollo-palazzo-di-dacca-10-anni/?homepagePosition=2",
            null,
            null,
            null,
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
        verify(telegramClient, times(2)).sendMessageToChannel(
            ArgumentMatchers.anyString(),
            ArgumentMatchers.anyString(),
            ArgumentMatchers.anyString()
        )

    }

}