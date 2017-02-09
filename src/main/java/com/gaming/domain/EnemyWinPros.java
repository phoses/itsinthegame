package com.gaming.domain;

public class EnemyWinPros {

	private String enemy;
	private Integer gamesWonAgainst;
	private Integer gamesAgainst;
	private Integer winpros;
	private Integer gamesWonWith;
	private Integer gamesWith;
	private Integer winprosWith;

	public EnemyWinPros() {
		super();
		
		gamesWith = 0;
		gamesAgainst = 0;
	}

	public String getEnemy() {
		return enemy;
	}

	public void setEnemy(String enemy) {
		this.enemy = enemy;
	}

	public Integer getWinpros() {
		return winpros;
	}

	public void setWinpros(Integer winpros) {
		this.winpros = winpros;
	}

	public Integer getWinprosWith() {
		return winprosWith;
	}

	public void setWinprosWith(Integer winprosWith) {
		this.winprosWith = winprosWith;
	}

	public Integer getGamesAgainst() {
		return gamesAgainst;
	}

	public void setGamesAgainst(Integer gamesAgainst) {
		this.gamesAgainst = gamesAgainst;
	}

	public Integer getGamesWith() {
		return gamesWith;
	}

	public void setGamesWith(Integer gamesWith) {
		this.gamesWith = gamesWith;
	}

	public Integer getGamesWonAgainst() {
		return gamesWonAgainst;
	}

	public void setGamesWonAgainst(Integer gamesWonAgainst) {
		this.gamesWonAgainst = gamesWonAgainst;
	}

	public Integer getGamesWonWith() {
		return gamesWonWith;
	}

	public void setGamesWonWith(Integer gamesWonWith) {
		this.gamesWonWith = gamesWonWith;
	}

}
