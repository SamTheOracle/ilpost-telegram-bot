package com.oracolo.ilpost.poller

import io.quarkus.test.junit.QuarkusTest
import org.junit.jupiter.api.Assertions
import org.junit.jupiter.api.Test

import org.junit.jupiter.api.Assertions.*
import java.util.concurrent.TimeUnit
import javax.inject.Inject

@QuarkusTest
class NewsExtractorPollerTest {

    @Inject
    lateinit var newsPoller: NewsPoller

    @Test
    fun start() {
        assertDoesNotThrow { newsPoller.start(10, TimeUnit.DAYS, emptyList()) }
    }
}