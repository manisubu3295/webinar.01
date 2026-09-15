package com.aadhirai.billing.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Wide open for this dev demo, per the shared spec.
        registry.addMapping("/**").allowedOrigins("*").allowedMethods("*");
    }
}
