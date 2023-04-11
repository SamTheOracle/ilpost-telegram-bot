package com.oracolo.ilpost.observer

interface NewsObserver {

    fun onNewsUpdates(newsUpdate: NewsUpdate)
}