package com.gaming.repository;

import org.socialsignin.spring.data.dynamodb.repository.EnableScan;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.gaming.domain.Tournament;

@EnableScan
@RepositoryRestResource(path = "tournaments")
public interface TournamentRepository extends CrudRepository<Tournament, String> {

}
