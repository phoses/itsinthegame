package com.gaming.domain;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PlayerInfo {

	private String name;
	private List<EnemyWinPros> enemyWinPros;
	private Map<String, List<Boolean>> playedGamesWon;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<EnemyWinPros> getEnemyWinPros() {
		return enemyWinPros;
	}

	public void setEnemyWinPros(List<EnemyWinPros> enemyWinPros) {
		this.enemyWinPros = enemyWinPros;
	}

	public void setPlayedGamesWon(Map<String, List<Boolean>> playedGamesWon) {
		this.playedGamesWon = playedGamesWon;
	}

	public void addEnemy(String enemy, boolean win) {

		if (playedGamesWon == null) {
			playedGamesWon = new HashMap<>();
		}

		if (playedGamesWon.get(enemy) == null) {
			playedGamesWon.put(enemy, new ArrayList<>());
		}

		playedGamesWon.get(enemy).add(win);

		recalculateWinPros();
	}

	private void recalculateWinPros() {

		enemyWinPros = new ArrayList<>();

		for (String enemy : playedGamesWon.keySet()) {

			int gamesWon = countTrues(playedGamesWon.get(enemy));
			int games = playedGamesWon.get(enemy).size();

			enemyWinPros.add(new EnemyWinPros(enemy, (int) (((double) gamesWon / (double) games) * 100)));
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
