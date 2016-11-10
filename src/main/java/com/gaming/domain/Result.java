package com.gaming.domain;

public class Result {

	private String player;
	private int games;
	private int wins;
	private int loses;
	private int points;

	public Result(String player){
		this.player = player;
	}
	
	public String getPlayer() {
		return player;
	}

	public void setPlayer(String player) {
		this.player = player;
	}

	public Integer getGames() {
		return games;
	}

	public void setGames(Integer games) {
		this.games = games;
	}

	public Integer getWins() {
		return wins;
	}

	public void setWins(Integer wins) {
		this.wins = wins;
	}

	public Integer getLoses() {
		return loses;
	}

	public void setLoses(Integer loses) {
		this.loses = loses;
	}

	public Integer getPoints() {
		return points;
	}

	public void setPoints(Integer points) {
		this.points = points;
	}
	
	public void addLose(){		
		this.games += 1;
		this.loses += 1;
	}
	
	public void addWin(){		
		this.games += 1;
		this.wins += 1;
		this.points += 2;
	}
	
	public void addPoints(Integer points){		
		this.points += points;
	}

}
