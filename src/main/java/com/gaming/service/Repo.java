package com.gaming.service;

import org.springframework.data.repository.CrudRepository;

import com.gaming.dto.Player;

public interface Repo extends CrudRepository<Player, Long> {
	
}
