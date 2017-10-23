package com.gaming.domain;

public class Result {

	private String player;
	private int games;
	private int wins;
	private int loses;
	private int points;
	private int winpros;
	private int plusminus;
	private int elo = 1500;
	
	private boolean fewGames;

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

	public Integer getWinpros() {
		return winpros;
	}

	public void setWinpros(int winpros) {
		this.winpros = winpros;
	}

	public Integer getPlusminus() {
		return plusminus;
	}

	public void setPlusminus(int plusminus) {
		this.plusminus = plusminus;
	}

	public void adjustWinPros() {
		this.winpros = (int)(((double)wins / (double)games) * 1000);		
	}

	public boolean isFewGames() {
		return fewGames;
	}

	public void setFewGames(boolean fewGames) {
		this.fewGames = fewGames;
	}

	public int getElo() {
		return elo;
	}

	public void setElo(int elo) {
		this.elo = elo;
	}

}
