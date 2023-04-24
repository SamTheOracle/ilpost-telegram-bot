package com.oracolo.ilpost.extractor.client

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient
import javax.ws.rs.GET
import javax.ws.rs.Path
import javax.ws.rs.PathParam
import javax.ws.rs.Produces
import javax.ws.rs.core.MediaType

@RegisterRestClient(configKey = "telegram.api.client")
interface NewsHostClient {

    @Path("{location}")
    @GET
    @Produces(MediaType.TEXT_HTML)
    fun getNews(@PathParam("location") location: String): String
}