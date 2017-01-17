package com.gaming.repository;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gaming.domain.Game;

@Service
public class GameService {

	@Autowired
	GameRepository gameRepository;
	
	public Iterable<Game> findAll(){
		return gameRepository.findAll();
	}
	
	public Iterable<Game> gamesByTournamentName(String tournamentName){
		List<Game> games = new ArrayList<>();
		
		for(Game game : gameRepository.findAll()){
			if(game.getTournamentName() != null && game.getTournamentName().equals(tournamentName)){
				games.add(game);
			}
		}
		
		return games;
	}
}
