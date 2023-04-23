package com.oracolo.ilpost.extractor.config

import io.smallrye.config.ConfigMapping
import io.smallrye.config.WithName

@ConfigMapping(prefix = "html.parser")
interface ParserConfig {
    @WithName("date.pattern")
    fun datePattern(): String

    @WithName("query-suffix")
    fun querySuffix(): String

    fun article(): ArticleConfig
}

@ConfigMapping(prefix = "article")
interface ArticleConfig {
    @WithName("tag")
    fun articleTag(): String

    @WithName("link.tag")
    fun linkTag(): String

    @WithName("href.attribute")
    fun hrefAttribute(): String

    @WithName("title.class")
    fun titleClass(): String

    @WithName("category.class")
    fun categoryClass(): String

    @WithName("date.class")
    fun dateClass(): String
}