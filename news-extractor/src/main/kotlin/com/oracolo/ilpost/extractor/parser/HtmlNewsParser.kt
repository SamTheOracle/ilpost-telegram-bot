package com.oracolo.ilpost.extractor.parser

import com.oracolo.ilpost.extractor.client.NewsHostClient
import com.oracolo.ilpost.extractor.config.ParserConfig
import org.eclipse.microprofile.config.inject.ConfigProperty
import org.eclipse.microprofile.rest.client.inject.RestClient
import org.jsoup.Jsoup
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.*
import javax.annotation.PostConstruct
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class HtmlNewsParser : NewsParser {

    @Inject
    lateinit var parserConfig: ParserConfig

    @ConfigProperty(name = "quarkus.rest-client.\"news.host.client\".url")
    lateinit var baseUrl: String

    @Inject
    @RestClient
    lateinit var newsHostClient: NewsHostClient

    lateinit var dateTimeFormatter: DateTimeFormatter

    @PostConstruct
    fun init() {
        dateTimeFormatter = DateTimeFormatter.ofPattern(parserConfig.datePattern(), Locale.ITALY)
    }


    override fun parse(fileContent: String): Set<ParseResult> {
        val parse = Jsoup.parse(fileContent)
        val articleDOMElements = parse.select(parserConfig.article().articleTag())
        val parseResults = mutableSetOf<ParseResult>()
        for (articleDOM in articleDOMElements) {
            val linkDOMElement = articleDOM.select(parserConfig.article().linkTag())
            val link = linkDOMElement.attr(parserConfig.article().hrefAttribute())
                .replaceAfter(parserConfig.querySuffix(), "").removeSuffix(parserConfig.querySuffix())
            val articleData = newsHostClient.getNews(link.removePrefix(baseUrl))
            val parsedArticleDOM = Jsoup.parse(articleData)
            val category =
                parsedArticleDOM.getElementsByClass(parserConfig.article().categoryClass()).first()?.text()
            val date = parsedArticleDOM.getElementsByClass(parserConfig.article().dateClass()).first()?.text()
            val title = parsedArticleDOM.getElementsByClass(parserConfig.article().titleClass()).first()?.text()
            parseResults.add(
                ParseResult(
                    category = category,
                    date = runCatching { LocalDate.parse(date?.lowercase(), dateTimeFormatter) }.getOrNull(),
                    title = title,
                    link = link
                )
            )
        }
        return parseResults
    }
}