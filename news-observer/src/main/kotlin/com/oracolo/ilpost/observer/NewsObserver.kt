package com.oracolo.ilpost.observer

import com.oracolo.ilpost.News

interface NewsObserver {

    fun onNewsUpdates(updates: Set<News>)
}