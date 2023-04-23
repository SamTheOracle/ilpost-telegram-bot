package com.oracolo.ilpost.extractor.article


import com.oracolo.ilpost.News
import com.oracolo.ilpost.NewsFactory
import com.oracolo.ilpost.extractor.NewsDataExtractor
import com.oracolo.ilpost.extractor.NewsExtractionResult
import com.oracolo.ilpost.extractor.NewsLocationUrl
import com.oracolo.ilpost.extractor.client.NewsHostClient
import com.oracolo.ilpost.extractor.parser.NewsParser
import org.eclipse.microprofile.config.inject.ConfigProperty
import org.eclipse.microprofile.rest.client.inject.RestClient
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class ArticleDataExtractor : NewsDataExtractor {

    @RestClient
    lateinit var newsHostClient: NewsHostClient

    @Inject
    lateinit var newsParser: NewsParser

    @ConfigProperty(name = "quarkus.rest-client.\"news.host.client\".url")
    lateinit var baseUrl: String


    private var locations: MutableList<NewsLocationUrl> = mutableListOf()


    override fun addLocation(newsLocationUrl: NewsLocationUrl) {
        if (!newsLocationUrl.contains(baseUrl)) {
            throw RuntimeException("Not a valid location url: $newsLocationUrl")
        }
        locations.add(newsLocationUrl)
    }

    override fun extract(): NewsExtractionResult {
        val extractionResult = locations.associateWith { doExtract(it) }
        return extractionResult.plus(DEFAULT_LOCATION to doExtract())
    }


    private fun doExtract(location: String = DEFAULT_LOCATION): Set<News> {
        val htmlFile = newsHostClient.getNews(location)
        return newsParser.parse(htmlFile).map {
            NewsFactory.readOnlyNews(
                null, it.link, it.category,
                it.date, it.title, null
            )
        }.toSet()
    }

    companion object {
        const val DEFAULT_LOCATION = ""
    }

}