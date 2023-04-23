package com.oracolo.ilpost.poller


import com.oracolo.ilpost.News
import com.oracolo.ilpost.observer.NewsObserver
import io.quarkus.test.junit.QuarkusTest
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertDoesNotThrow
import org.mockito.ArgumentCaptor
import org.mockito.Mockito.*
import java.util.concurrent.TimeUnit
import javax.inject.Inject

@QuarkusTest
class NewsExtractorPollerTest {

    @Inject
    lateinit var newsPoller: NewsPoller


    @Test
    fun `should start polling`() {
        assertDoesNotThrow { newsPoller.start(10, TimeUnit.DAYS, emptyList()) }
    }

    @Test
    fun `should extract something and pass to the news observer`() {
        val mockObserver = mock(NewsObserver::class.java)
        val capture = ArgumentCaptor.forClass(Set::class.java) as ArgumentCaptor<Set<News>>
        verify(mockObserver, atLeastOnce()).onNewsUpdates(capture.capture())
        assertDoesNotThrow { newsPoller.start(10, TimeUnit.DAYS, listOf(mockObserver)) }


    }
}