package com.gaming.rest;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gaming.domain.Game;
import com.gaming.domain.PlayerInfo;
import com.gaming.repository.GameService;

@RestController
public class PlayerinfoRest {

	@Autowired
	GameService gameService;
	
	@RequestMapping(value="/playerinfo/{name}/{tournamentName}")
	public PlayerInfo getGamesByTournamentName(@PathVariable("name") String name, @PathVariable("tournamentName") String tournamentName){		
		return calculateGames(gameService.gamesByTournamentNameByName(tournamentName, name), name);	
	}
	
	@RequestMapping(value="/playerinfo/{name}")
	public PlayerInfo getGamesByTournamentName(@PathVariable("name") String name){		
		return calculateGames(gameService.gamesByTournamentNameByName(null, name), name);	
	}
	
	private PlayerInfo calculateGames(Collection<Game> games, String name){
		
		PlayerInfo playerinfo = new PlayerInfo();
		playerinfo.setName(name);
		
		for(Game game : games){
						
			if(game.getAwayPlayers().contains(name)){
				
				boolean win = game.getAwayGoals() > game.getHomeGoals();
								
				for(String enemy : game.getHomePlayers()){					
					playerinfo.addEnemy(enemy, win);
				}
			}
			
			if(game.getHomePlayers().contains(name)){
								
				boolean win = game.getHomeGoals() > game.getAwayGoals();			
				
				for(String enemy : game.getAwayPlayers()){					
					playerinfo.addEnemy(enemy, win);
				}
			}
		}
		
		return playerinfo;
	}
}
