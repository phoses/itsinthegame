package com.gaming.rest;

import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gaming.domain.Game;
import com.gaming.repository.GameService;
import com.google.common.collect.Lists;

@RestController
public class GamesRest {

	@Autowired
	GameService gameService;
	
	@RequestMapping(value="/playedGames/{tournamentName}")
	public Collection<Game> getGamesByTournamentName(@PathVariable("tournamentName") String tournamentName){		
		return sortGamesByTime(gameService.gamesByTournamentName(tournamentName));	
	}
	
	@RequestMapping(value="/playedGames")
	public Collection<Game> getGames(){
		return sortGamesByTime(gameService.findAll());	
	}
	
	private Collection<Game> sortGamesByTime(Iterable<Game> games){
		List<Game> gamesList = Lists.newArrayList(games);
		Collections.sort(gamesList, new Comparator<Game>(){

			@Override
			public int compare(Game o1, Game o2) {
				return o1.getTimeMillis().compareTo(o2.getTimeMillis()) * -1;
			}
			
		});	
		
		return gamesList;
	}
}
