package com.gaming.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.gaming.domain.RandomTeam;

@RestController
public class RandomTeams {

	@RequestMapping(value="/randomteams/")
	public RandomTeam getGames(@RequestParam Map<String,String> allRequestParams){
		
		if(allRequestParams.keySet().size() % 2 != 0
				|| allRequestParams.keySet().size() < 2){
			throw new IllegalArgumentException("Wrong number of players");
		}
		
		RandomTeam randomTeam = new RandomTeam();
		List<String> players = new ArrayList<String>(allRequestParams.keySet());
		
		while(randomTeam.getHomeTeam().size() < allRequestParams.keySet().size() / 2){
			Collections.shuffle(players);
			randomTeam.getHomeTeam().add(players.get(0));
		}
		
		while(randomTeam.getAwayTeam().size() < allRequestParams.keySet().size() / 2){
			Collections.shuffle(players);
			if(!randomTeam.getHomeTeam().contains(players.get(0))){
				randomTeam.getAwayTeam().add(players.get(0));
			}
		}
		
		return randomTeam;
	}
	
}
