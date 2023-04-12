package com.oracolo.ilpost.poller

import com.oracolo.ilpost.extractor.NewsDataExtractor
import com.oracolo.ilpost.observer.NewsObserver
import io.quarkus.arc.All
import java.util.concurrent.TimeUnit
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class NewsExtractorPoller : NewsPoller {

    @Inject
    @All
    lateinit var newsExtractors: MutableList<NewsDataExtractor>
    override fun start(period: Int, timeUnit: TimeUnit, newsObserver: List<NewsObserver>) {
       newsExtractors.forEach { it.extract() }
    }

    override fun stop() {
        TODO("Not yet implemented")
    }
}