package com.oracolo.ilpost.extractor.article

import com.oracolo.ilpost.extractor.ArticleData
import com.oracolo.ilpost.extractor.NewsDataExtractor
import com.oracolo.ilpost.extractor.client.NewsHostClient
import io.quarkus.test.junit.QuarkusTest
import io.quarkus.test.junit.mockito.InjectMock
import org.eclipse.microprofile.rest.client.inject.RestClient
import org.junit.jupiter.api.Assertions.assertDoesNotThrow
import org.junit.jupiter.api.Assertions.assertThrows
import org.junit.jupiter.api.BeforeEach
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.function.ThrowingSupplier
import org.mockito.ArgumentMatchers
import org.mockito.Mockito
import java.io.File
import java.io.FileReader
import java.util.*
import javax.inject.Inject
import kotlin.test.assertEquals
import kotlin.test.assertNotNull
import kotlin.test.assertTrue

@QuarkusTest
class ArticleDataDataExtractorTest {

    @Inject
    lateinit var newsDataExtractor: NewsDataExtractor

    @InjectMock
    @RestClient
    lateinit var newsHostClient: NewsHostClient


    @BeforeEach
    fun setUp() {
        val mainPage = File("src/test/resources/Il Post.html")
        val articlePage = File("src/test/resources/silvio-ber.html")
        Mockito.`when`(newsHostClient.getNews(ArgumentMatchers.anyString()))
            .thenReturn(FileReader(mainPage).use { it.readText() })
            .thenReturn(FileReader(articlePage).use { it.readText() })

    }

    @Test
    fun `should throw when not valid link`() {
        val exception =
            assertThrows(RuntimeException::class.java) { newsDataExtractor.addLocation(UUID.randomUUID().toString()) }
    }

    @Test
    fun `should add location and extract data with new location and default`() {
        newsDataExtractor.addLocation("https://www.ilpost.it/politica/")
        val result = assertDoesNotThrow(ThrowingSupplier { newsDataExtractor.extract() })
        assertEquals(2, result?.size)
    }

    @Test
    fun `should extract main content`() {
        val result = assertDoesNotThrow(ThrowingSupplier { newsDataExtractor.extract() })
        assertNotNull(result)
        assertTrue { result.values.isNotEmpty() }
        assertTrue { result.values.flatten().all { it is ArticleData } }
        assertTrue { result.values.flatten().all { it.link?.isNotEmpty() == true } }
    }

    @Test
    fun `should retrieve all article information`() {
        val result = assertDoesNotThrow(ThrowingSupplier { newsDataExtractor.extract() })
        assertNotNull(result)
        assertTrue {
            result.values.flatten().map { it as ArticleData }.any { it.category?.equals("politica", true) == true }
        }
        assertTrue {
            result.values.flatten().map { it as ArticleData }
                .any { it.date?.equals("GIOVEDÌ 6 APRILE 2023", true) == true }
        }
        assertTrue {
            result.values.flatten().map { it as ArticleData }
                .any { it.link?.equals("https://www.ilpost.it/2023/04/06/berlusconi-leucemia/", true) == true }
        }
        assertTrue {
            result.values.flatten().map { it as ArticleData }
                .any { it.title?.equals("Silvio Berlusconi è in cura al San Raffaele per una leucemia") == true }
        }
    }
}