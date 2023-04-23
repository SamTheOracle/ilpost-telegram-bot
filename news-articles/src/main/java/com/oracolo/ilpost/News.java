package com.oracolo.ilpost;

import java.time.LocalDate;

public interface News {

    String author();

    LocalDate timestamp();

    String category();

    String link();

    String title();

    Integer timeToComplete();
}
