package come.oracolo.ilpost

import io.smallrye.config.ConfigMapping
import java.util.concurrent.TimeUnit

@ConfigMapping(prefix = "poller")
interface PollerConfig {

    fun period(): Int

    fun timeUnit(): TimeUnit
}