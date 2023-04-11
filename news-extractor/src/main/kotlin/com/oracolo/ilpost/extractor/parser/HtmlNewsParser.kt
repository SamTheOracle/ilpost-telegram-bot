package com.oracolo.ilpost.extractor.parser

import com.oracolo.ilpost.extractor.ArticleData
import com.oracolo.ilpost.extractor.NewsData
import com.oracolo.ilpost.extractor.client.NewsHostClient
import org.eclipse.microprofile.config.inject.ConfigProperty
import org.eclipse.microprofile.rest.client.inject.RestClient
import org.jsoup.Jsoup
import javax.enterprise.context.ApplicationScoped
import javax.inject.Inject

@ApplicationScoped
class HtmlNewsParser : NewsParser {

    @ConfigProperty(name = "html.parser.article.tag")
    lateinit var articleTag: String

    @ConfigProperty(name = "html.parser.article.link.tag")
    lateinit var linkTag: String

    @ConfigProperty(name = "html.parser.article.href.attribute")
    lateinit var hrefAttribute: String

    @ConfigProperty(name = "html.parser.article.title.class")
    lateinit var titleClass: String

    @ConfigProperty(name = "html.parser.article.category.class")
    lateinit var categoryClass: String

    @ConfigProperty(name = "html.parser.article.date.class")
    lateinit var dateClass: String

    @ConfigProperty(name = "html.parser.query-suffix")
    lateinit var querySuffix: String

    @ConfigProperty(name = "quarkus.rest-client.\"news.host.client\".url")
    lateinit var baseUrl: String

    @Inject
    @RestClient
    lateinit var newsHostClient: NewsHostClient

    override fun parse(fileContent: String): Set<NewsData> {
        val parse = Jsoup.parse(fileContent)
        val articleDOMElements = parse.select(articleTag)
        val newsData = mutableListOf<NewsData>()
        for (articleDOM in articleDOMElements) {
            val linkDOMElement = articleDOM.select(linkTag)
            val link = linkDOMElement.attr(hrefAttribute).replaceAfter(querySuffix, "").removeSuffix(querySuffix)
            val articleData = newsHostClient.getNews(link.removePrefix(baseUrl))
            val parsedArticleDOM = Jsoup.parse(articleData)
            val category = parsedArticleDOM.getElementsByClass(categoryClass).first()?.text()
            val date = parsedArticleDOM.getElementsByClass(dateClass).first()?.text()
            val title = parsedArticleDOM.getElementsByClass(titleClass).first()?.text()
            newsData.add(ArticleData(link = link, title = title, category = category, date = date))
        }
        return newsData.toSet()
    }
}