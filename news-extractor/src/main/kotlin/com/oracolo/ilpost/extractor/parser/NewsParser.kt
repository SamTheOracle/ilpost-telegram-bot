package com.oracolo.ilpost.extractor.parser

import com.oracolo.ilpost.extractor.NewsData

interface NewsParser {

    fun parse(fileContent: String): Set<NewsData>
}