package com.gaming.rest;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gaming.domain.RandomTeam;

@RestController
public class RandomTeamsRest {

	@RequestMapping(value="/randomteams/")
	public RandomTeam getGames(@RequestParam Map<String,String> allRequestParams){
		
		RandomTeam randomTeam = new RandomTeam();
		
		if(allRequestParams.keySet().size() < 2){
			return randomTeam;
		}
		
		while(randomTeam.playerCount() < allRequestParams.keySet().size()){
			
			randomTeam.addHomePlayer(randomizePlayer(allRequestParams));
			
			if(randomTeam.playerCount() < allRequestParams.keySet().size()){
				
				while(randomTeam.getAwayTeam().size() < randomTeam.getHomeTeam().size()){
					randomTeam.addAwayPlayer(randomizePlayer(allRequestParams));
				}
				
			}
		}
				
		return randomTeam;
	}
	
	private String randomizePlayer(Map<String,String> allRequestParams){
		List<String> players = new ArrayList<String>(allRequestParams.keySet());
		Collections.shuffle(players);
		return players.get(0);		
	}
	
}
