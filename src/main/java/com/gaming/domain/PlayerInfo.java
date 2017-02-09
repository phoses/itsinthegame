package com.gaming.domain;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

public class PlayerInfo {

	private String name;
	private Map<String, EnemyWinPros> enemyWinProsMap;
	private Map<String, List<Boolean>> playedGamesWon;
	private Map<String, List<Boolean>> playedGamesWonWith;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Collection<EnemyWinPros> getEnemyWinPros() {
		return enemyWinProsMap.values();
	}

	public void setEnemyWinPros(Map<String, EnemyWinPros> enemyWinPros) {
		this.enemyWinProsMap = enemyWinPros;
	}

	public void setPlayedGamesWon(Map<String, List<Boolean>> playedGamesWon) {
		this.playedGamesWon = playedGamesWon;
	}

	public void addEnemy(String enemy, boolean win) {

		if(enemyWinProsMap == null){
			enemyWinProsMap = new HashMap<>();
		}
		
		if (playedGamesWon == null) {
			playedGamesWon = new HashMap<>();
		}

		if (playedGamesWon.get(enemy) == null) {
			playedGamesWon.put(enemy, new ArrayList<>());
		}

		playedGamesWon.get(enemy).add(win);

		recalculateWinPros();
	}
	
	public void addPartner(String partner, boolean win) {
		
		if(enemyWinProsMap == null){
			enemyWinProsMap = new HashMap<>();
		}
		
		if (playedGamesWonWith == null) {
			playedGamesWonWith = new HashMap<>();
		}

		if (playedGamesWonWith.get(partner) == null) {
			playedGamesWonWith.put(partner, new ArrayList<>());
		}

		playedGamesWonWith.get(partner).add(win);

		recalculateWinProsWith();
		
	}

	private void recalculateWinPros() {

		for (String enemy : playedGamesWon.keySet()) {

			int gamesWon = countTrues(playedGamesWon.get(enemy));
			int games = playedGamesWon.get(enemy).size();
			
			if(enemyWinProsMap.get(enemy) == null){
				enemyWinProsMap.put(enemy, new EnemyWinPros());
			}

			EnemyWinPros enemyWinPros = enemyWinProsMap.get(enemy);
			enemyWinPros.setEnemy(enemy);
			enemyWinPros.setGamesWonAgainst(gamesWon);
			enemyWinPros.setGamesAgainst(playedGamesWon.get(enemy).size());
			enemyWinPros.setWinpros((int) (((double) gamesWon / (double) games) * 100));
		}

	}
	
	private void recalculateWinProsWith() {

		for (String partner : playedGamesWonWith.keySet()) {

			int gamesWon = countTrues(playedGamesWonWith.get(partner));
			int games = playedGamesWonWith.get(partner).size();
			
			if(enemyWinProsMap.get(partner) == null){
				enemyWinProsMap.put(partner, new EnemyWinPros());
			}

			EnemyWinPros enemyWinPros = enemyWinProsMap.get(partner);
			enemyWinPros.setEnemy(partner);
			enemyWinPros.setGamesWonWith(gamesWon);
			enemyWinPros.setGamesWith(playedGamesWonWith.get(partner).size());
			enemyWinPros.setWinprosWith((int) (((double) gamesWon / (double) games) * 100));
		}

	}

	private int countTrues(Collection<Boolean> booleans) {
		int count = 0;

		for (Boolean value : booleans) {
			if (value)
				count++;
		}

		return count;
	}

}
