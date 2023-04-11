package com.oracolo.ilpost.extractor

interface NewsDataExtractor {


    fun addLocation(newsLocationUrl: NewsLocationUrl)

    fun extract(): NewsExtractionResult?


}