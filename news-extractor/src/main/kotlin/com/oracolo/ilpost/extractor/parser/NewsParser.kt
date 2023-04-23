package com.oracolo.ilpost.extractor.parser


interface NewsParser {

    fun parse(fileContent: String): Set<ParseResult>
}