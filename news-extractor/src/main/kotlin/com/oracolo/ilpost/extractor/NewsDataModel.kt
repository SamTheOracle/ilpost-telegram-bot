package com.oracolo.ilpost.extractor

typealias NewsLocationUrl = String

abstract class NewsData(open val author: String? = null, open val link: String? = null, open val date: String? = null)

class ArticleData(
    override val author: String? = null,
    override val link: String? = null,
    override val date: String? = null,
    val title: String? = null,
    val category: String? = null
) :
    NewsData(author, link, date)

typealias NewsExtractionResult = Map<NewsLocationUrl, Set<NewsData>>