package com.oracolo.ilpost.observer.telegram

import io.smallrye.config.ConfigMapping

@ConfigMapping(prefix = "telegram.ilpost")
interface TelegramConfig {

    fun channel(): Channel
}

@ConfigMapping(prefix = "channel")
interface Channel {

    fun id(): String

    fun bot(): String
}