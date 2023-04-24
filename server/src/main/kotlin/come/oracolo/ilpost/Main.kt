package come.oracolo.ilpost

import com.oracolo.ilpost.extractor.NewsDataExtractor
import com.oracolo.ilpost.observer.NewsObserver
import com.oracolo.ilpost.poller.NewsPoller
import io.quarkus.arc.All
import io.quarkus.runtime.Startup
import org.eclipse.microprofile.config.inject.ConfigProperty
import javax.annotation.PostConstruct
import javax.enterprise.context.ApplicationScoped
import javax.inject.Inject

@Startup
@ApplicationScoped
class Main {

    @Inject
    lateinit var newsPoller: NewsPoller

    @Inject
    @All
    lateinit var observers: MutableList<NewsObserver>

    @Inject
    lateinit var newsDataExtractor: NewsDataExtractor

    @Inject
    lateinit var pollerConfig: PollerConfig

    @ConfigProperty(name = "extractor.locations")
    lateinit var locations: MutableList<String>

    @PostConstruct
    fun init() {
        locations.forEach {
            newsDataExtractor.addLocation(it)
        }
        newsPoller.start(pollerConfig.period(), pollerConfig.timeUnit(), observers)
    }
}