package com.gaming.rest;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gaming.domain.Game;
import com.gaming.domain.Result;
import com.gaming.repository.GameRepository;

@RestController
public class ResultRest {

	@Autowired
	GameRepository gameRepository;
	
	@RequestMapping(value="/results/{tournamentName}")
	public Collection<Result> getGamesByTournamentName(@PathVariable("tournamentName") String tournamentName){		
		return resultsByGames(gamesByTournamentName(tournamentName));	
	}
	
	private Iterable<Game> gamesByTournamentName(String tournamentName){
		List<Game> games = new ArrayList<>();
		
		for(Game game : gameRepository.findAll()){
			if(game.getTournamentName() != null && game.getTournamentName().equals(tournamentName)){
				games.add(game);
			}
		}
		
		return games;
	}
	
	@RequestMapping(value="/results")
	public Collection<Result> getGames(){
		return resultsByGames(gameRepository.findAll());	
	}

	private Collection<Result> resultsByGames(Iterable<Game> gameList) {
		Map<String, Result> results = new HashMap<>();
		
		for(Game game : gameList){
			
			for(String homePlayer : game.getHomePlayers()){
				
				if(results.get(homePlayer) == null){
					results.put(homePlayer, new Result(homePlayer));
				}
				
				if(game.getHomeGoals() > game.getAwayGoals()){
					results.get(homePlayer).addWin();
				}else{
					results.get(homePlayer).addLose();
				}
			}
			
			for(String awayPlayer : game.getAwayPlayers()){
				
				if(results.get(awayPlayer) == null){
					results.put(awayPlayer, new Result(awayPlayer));
				}
				
				if(game.getHomeGoals() < game.getAwayGoals()){
					results.get(awayPlayer).addWin();
				}else{
					results.get(awayPlayer).addLose();
				}
			}
		}
		
		List<Result> resultsList = new ArrayList<>(results.values());
		
		Collections.sort(resultsList, new Comparator<Result>(){

			@Override
			public int compare(Result o1, Result o2) {
				return o1.getPoints().compareTo(o2.getPoints()) * -1;
			}
			
		});
		
		return resultsList;
	}
}
