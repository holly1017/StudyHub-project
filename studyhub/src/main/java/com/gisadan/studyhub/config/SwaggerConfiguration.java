package com.gisadan.studyhub.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import org.springdoc.core.models.GroupedOpenApi;
import io.swagger.v3.oas.annotations.info.Info;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(info = @Info(title = "StudyHub App", description = "StudyHub App Api 명세", version = "v1"))
@RequiredArgsConstructor
@Configuration
public class SwaggerConfiguration {
    @Bean
    public GroupedOpenApi GroupOpenApi() {
        String[] paths = {"/**"};

        return  GroupedOpenApi.builder().group("StudyHub API v1").pathsToMatch(paths).build();
    }
}
