package com.oracolo.ilpost.poller

import com.oracolo.ilpost.observer.NewsObserver
import java.util.concurrent.TimeUnit

interface NewsPoller {

    fun start(period: Int, timeUnit: TimeUnit, newsObserver: List<NewsObserver>)

    fun stop()
}