package com.gaming.service;

import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.gaming.domain.Player;

@EnableScan
@RepositoryRestResource(path = "player")
public interface PlayerRepository extends CrudRepository<Player, String> {

}
