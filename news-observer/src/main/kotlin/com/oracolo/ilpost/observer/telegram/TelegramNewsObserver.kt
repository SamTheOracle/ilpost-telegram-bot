package com.oracolo.ilpost.observer.telegram

import com.oracolo.ilpost.News
import com.oracolo.ilpost.observer.NewsObserver
import com.oracolo.ilpost.observer.telegram.client.TelegramClient
import org.eclipse.microprofile.rest.client.inject.RestClient
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class TelegramNewsObserver : NewsObserver {

    @RestClient
    lateinit var telegramClient: TelegramClient

    @Inject
    lateinit var telegramConfig: TelegramConfig

    private var currentNews: MutableSet<News> = mutableSetOf()

    override fun onNewsUpdates(updates: Set<News>) {
        val newsToSend = updates.filter { !currentNews.contains(it) }.map { it.text() }
        newsToSend.forEach {
            telegramClient.sendMessageToChannel(
                telegramConfig.channel().bot(),
                telegramConfig.channel().id(),
                it
            )
        }
        currentNews.addAll(updates)
    }

}