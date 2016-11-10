package com.gaming;

import org.socialsignin.spring.data.dynamodb.repository.config.EnableDynamoDBRepositories;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@EnableAutoConfiguration
@EnableDynamoDBRepositories
@Configuration
@ComponentScan
public class ItsinthegameApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(ItsinthegameApplication.class, args);
	}
	
}
