package com.oracolo.ilpost.poller.profile

import com.oracolo.ilpost.extractor.NewsDataExtractor
import io.quarkus.test.junit.QuarkusTestProfile
import org.mockito.Mockito.mock
import javax.enterprise.inject.Alternative
import javax.enterprise.inject.Produces
import javax.inject.Named

class PollerProfile : QuarkusTestProfile {
    override fun getEnabledAlternatives(): MutableSet<Class<*>> {
        return mutableSetOf(MockExtractor::class.java)
    }

    @Alternative
    class MockExtractor {
        @Produces
        @Named("mock-extractor")
        fun mockExtractor(): NewsDataExtractor = mock(NewsDataExtractor::class.java, "test-extractor")
    }
}