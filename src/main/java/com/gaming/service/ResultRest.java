package com.gaming.service;

import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gaming.domain.Game;
import com.gaming.domain.Result;

@RestController
public class ResultRest {

	@Autowired
	GameRepository gameRepository;
	
	@RequestMapping(value="/results")
	public Collection<Result> getGames(){
				
		Map<String, Result> results = new HashMap<>();
		
		for(Game game : gameRepository.findAll()){
			
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
		
		return results.values();	
	}
}
