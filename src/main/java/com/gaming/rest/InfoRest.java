package com.gaming.rest;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gaming.domain.Game;
import com.gaming.domain.GeneralInfo;
import com.gaming.domain.PlayerInfo;
import com.gaming.repository.GameService;

@RestController
public class InfoRest {

	@Autowired
	GameService gameService;

	@RequestMapping(value = "/playerinfo/{name}/{tournamentName}")
	public PlayerInfo getGamesByTournamentName(@PathVariable("name") String name,
			@PathVariable("tournamentName") String tournamentName) {
		return calculateGames(gameService.gamesByTournamentNameByName(tournamentName, name), name);
	}

	@RequestMapping(value = "/playerinfo/{name}")
	public PlayerInfo getGamesByTournamentName(@PathVariable("name") String name) {
		return calculateGames(gameService.gamesByTournamentNameByName(null, name), name);
	}

	@RequestMapping(value = "/generalinfo")
	public GeneralInfo getGeneralinfo() {
		return calculateGeneralInfo(gameService.findAll());
	}

	private GeneralInfo calculateGeneralInfo(Iterable<Game> games) {

		int gamesplayed = 0;
		int goals = 0;
		int goaldif = 0;
		int homewins = 0;

		for (Game game : games) {
			gamesplayed++;
			
			goals += game.getHomeGoals() + game.getAwayGoals();
			homewins += game.getHomeGoals() > game.getAwayGoals() ? 1 : 0;
			goaldif += game.getHomeGoals() > game.getAwayGoals() ? game.getHomeGoals() - game.getAwayGoals() : game.getAwayGoals() - game.getHomeGoals();
			
		}
		
		int homewinpros = (int) (((double) homewins / (double) gamesplayed) * 100);
		Double avggoaldif = (double) goaldif / (double) gamesplayed;
				
		return new GeneralInfo(gamesplayed, goals, avggoaldif, homewinpros);
	}

	private PlayerInfo calculateGames(Collection<Game> games, String name) {

		PlayerInfo playerinfo = new PlayerInfo();
		playerinfo.setName(name);

		for (Game game : games) {

			if (game.getAwayPlayers().contains(name)) {

				boolean win = game.getAwayGoals() > game.getHomeGoals();

				for (String enemy : game.getHomePlayers()) {
					playerinfo.addEnemy(enemy, win);
				}
				
				for(String partner : game.getAwayPlayers()){
					if(!partner.equals(name)){
						playerinfo.addPartner(partner, win);
					}
				}
			}

			if (game.getHomePlayers().contains(name)) {

				boolean win = game.getHomeGoals() > game.getAwayGoals();

				for (String enemy : game.getAwayPlayers()) {
					playerinfo.addEnemy(enemy, win);
				}
				
				for(String partner : game.getHomePlayers()){
					if(!partner.equals(name)){
						playerinfo.addPartner(partner, win);
					}
				}
			}
		}

		return playerinfo;
	}

}
