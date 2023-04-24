package com.oracolo.ilpost.poller

import com.oracolo.ilpost.extractor.NewsDataExtractor
import com.oracolo.ilpost.observer.NewsObserver
import io.quarkus.arc.All
import java.util.concurrent.Executors
import java.util.concurrent.TimeUnit
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class NewsExtractorPoller : NewsPoller {

    @Inject
    @All
    lateinit var newsExtractors: MutableList<NewsDataExtractor>

    private var scheduler = Executors.newSingleThreadScheduledExecutor()
    override fun start(period: Int, timeUnit: TimeUnit, newsObserver: List<NewsObserver>) {
        if (scheduler.isShutdown) {
            scheduler = Executors.newSingleThreadScheduledExecutor()
        }
        scheduler.scheduleAtFixedRate({ pollData(newsObserver) }, 0, period.toLong(), timeUnit)
    }

    private fun pollData(newsObserver: List<NewsObserver>) {
        newsObserver.forEach {
            newsExtractors.forEach { newsExtractor ->
                it.onNewsUpdates(newsExtractor.extract()?.values?.flatten()?.toSet() ?: emptySet())
            }
        }
    }

    override fun stop() {
        scheduler.shutdown()
    }
}