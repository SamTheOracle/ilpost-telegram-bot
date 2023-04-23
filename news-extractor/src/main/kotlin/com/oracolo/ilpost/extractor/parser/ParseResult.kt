package com.oracolo.ilpost.extractor.parser

import java.time.LocalDate

data class ParseResult(
    val author: String? = null,
    val date: LocalDate? = null,
    val link: String? = null,
    val timeToComplete: Int? = null,
    val title: String? = null,
    val category: String? = null
)
