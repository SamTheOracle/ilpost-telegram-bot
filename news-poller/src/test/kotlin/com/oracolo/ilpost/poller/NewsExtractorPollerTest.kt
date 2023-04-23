package com.oracolo.ilpost.poller


import com.oracolo.ilpost.News
import com.oracolo.ilpost.extractor.NewsDataExtractor
import com.oracolo.ilpost.observer.NewsObserver
import com.oracolo.ilpost.poller.profile.PollerProfile
import io.quarkus.test.junit.QuarkusTest
import io.quarkus.test.junit.TestProfile
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.assertDoesNotThrow
import org.mockito.Mockito.mock
import org.mockito.Mockito.`when`
import java.util.concurrent.BlockingQueue
import java.util.concurrent.LinkedBlockingQueue
import java.util.concurrent.TimeUnit
import javax.inject.Inject

@QuarkusTest
@TestProfile(PollerProfile::class)
class NewsExtractorPollerTest {

    @Inject
    lateinit var newsPoller: NewsPoller

    @Inject
    lateinit var dataExtractor: NewsDataExtractor

    private val linkedQueue: BlockingQueue<Set<News>> = LinkedBlockingQueue()


    @Test
    fun `should start polling`() {
        assertDoesNotThrow { newsPoller.start(10, TimeUnit.DAYS, emptyList()) }
    }

    @Test
    fun `should extract something and pass to the news observer`() {
        `when`(dataExtractor.extract()).thenReturn(mapOf("some" to emptySet()))
        val mockObserver = mock(NewsObserver::class.java)
        assertDoesNotThrow { newsPoller.start(10, TimeUnit.DAYS, listOf(mockObserver)) }
    }

    @Test
    fun `should poll correctly every 1 seconds`() {
        `when`(dataExtractor.extract()).thenReturn(mapOf("some" to emptySet()))
        assertDoesNotThrow {
            newsPoller.start(1, TimeUnit.SECONDS, buildList {
                add(object : NewsObserver {
                    override fun onNewsUpdates(updates: Set<News>) {
                        if (linkedQueue.size != 3)
                            linkedQueue.put(updates)
                    }
                })
            })
        }
        Thread.sleep(3000)
        Assertions.assertEquals(3, linkedQueue.size)
    }
}