package com.oracolo.ilpost.observer.telegram.client

import org.eclipse.microprofile.rest.client.inject.RegisterRestClient
import javax.ws.rs.*
import javax.ws.rs.core.MediaType
import javax.ws.rs.core.Response

@RegisterRestClient(configKey = "telegram.client")
interface TelegramClient {

    @Path("bot{botToken}/sendMessage")
    @GET
    @Produces(MediaType.APPLICATION_JSON)
    fun sendMessageToChannel(
        @PathParam("botToken") token: String,
        @QueryParam("chat_id") chatId: String,
        @QueryParam("text") text: String
    ): Response
}