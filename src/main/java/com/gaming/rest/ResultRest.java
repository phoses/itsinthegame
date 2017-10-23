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
import com.gaming.repository.GameService;

@RestController
public class ResultRest {

	@Autowired
	GameService gameService;
	
	@RequestMapping(value="/results/{tournamentName}")
	public Collection<Result> getGamesByTournamentName(@PathVariable("tournamentName") String tournamentName){		
		return resultsByGames(gameService.gamesByTournamentName(tournamentName));	
	}
		
	@RequestMapping(value="/results")
	public Collection<Result> getGames(){
		return resultsByGames(gameService.findAll());	
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
				
				int plusminus = results.get(homePlayer).getPlusminus();
				plusminus += (game.getHomeGoals() - game.getAwayGoals());
				results.get(homePlayer).setPlusminus(plusminus);
				
				results.get(homePlayer).adjustWinPros();
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
				
				int plusminus = results.get(awayPlayer).getPlusminus();
				plusminus += game.getAwayGoals() - game.getHomeGoals();
				results.get(awayPlayer).setPlusminus(plusminus);
				
				results.get(awayPlayer).adjustWinPros();
			}
			
			Map<String, Integer> newElos = new HashMap<>();
			
			for(String homePlayer : game.getHomePlayers()){
				Integer ownElo = results.get(homePlayer).getElo();
				Integer opponentElo = 0;
				for(String awayPlayer : game.getAwayPlayers()){
					opponentElo += results.get(awayPlayer).getElo();
				}
				opponentElo = opponentElo / game.getAwayPlayers().size();		
				
				Integer newElo = calculateElo(ownElo, opponentElo, game.getHomeGoals() > game.getAwayGoals());
				
				newElos.put(homePlayer, newElo);
			}
			
			for(String awayPlayer : game.getAwayPlayers()){
				Integer ownElo = results.get(awayPlayer).getElo();
				Integer opponentElo = 0;
				for(String homeplayer : game.getHomePlayers()){
					opponentElo += results.get(homeplayer).getElo();
				}
				opponentElo = opponentElo / game.getHomePlayers().size();		
				
				Integer newElo = calculateElo(ownElo, opponentElo, game.getHomeGoals() < game.getAwayGoals());
				
				newElos.put(awayPlayer, newElo);
			}
			
			for(String player : newElos.keySet()){
				results.get(player).setElo(newElos.get(player));
			}
			
			
		}
				
		List<Result> resultsList = new ArrayList<>(results.values());
		calculateFewPlayedPlayers(resultsList);
		
		Collections.sort(resultsList, new ResultComparator());
		
		return resultsList;
	}
	
	private void calculateFewPlayedPlayers(List<Result> resultsList) {
		
		int maxPlayed = 0;
		
		for(Result result : resultsList){
			if(result.getGames() > maxPlayed){
				maxPlayed = result.getGames();
			}
		}
		
		for(Result result : resultsList){
			int playedPros = (int)(((double)result.getGames() / (double)maxPlayed) * 100);
			if(playedPros < 40){
				result.setFewGames(true);
			}
		}
		
	}
	
	private Integer calculateElo(Integer elo1, Integer elo2, boolean win){
		
		Integer result = win ? 1 : 0;
		Integer weight = 15;
		
		Double elo1Exp = 1 / ( 1 + Math.pow( 10, ( (elo2 - elo1) / 400 ) ) );
		Integer newElo = (int) (elo1 + Math.round( weight * (result - elo1Exp) ));
				
		return newElo;
	}

	class ResultComparator implements Comparator<Result>{

		@Override
		public int compare(Result o1, Result o2) {
			
			if(o1.getWinpros().compareTo(o2.getWinpros()) == 0){
				if(o1.getPoints().compareTo(o2.getPoints()) == 0){
					return o1.getPlusminus().compareTo(o2.getPlusminus())*-1;
				}else{
					return o1.getPoints().compareTo(o2.getPoints())*-1;
				}	
			}else{
				return o1.getWinpros().compareTo(o2.getWinpros())*-1;
			}
						
		}
		
	}
}
