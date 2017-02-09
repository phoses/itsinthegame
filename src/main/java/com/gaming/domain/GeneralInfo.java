package com.gaming.domain;

public class GeneralInfo {

	private Integer gamesplayed;
	private Integer goals;
	private Double avggoaldif;
	private Integer homewinpros;

	public GeneralInfo(Integer gamesplayed, Integer goals, Double avggoaldif, Integer homewinpros) {
		super();
		this.gamesplayed = gamesplayed;
		this.goals = goals;
		this.avggoaldif = avggoaldif;
		this.homewinpros = homewinpros;
	}

	public Integer getGamesplayed() {
		return gamesplayed;
	}

	public void setGamesplayed(Integer gamesplayed) {
		this.gamesplayed = gamesplayed;
	}

	public Integer getGoals() {
		return goals;
	}

	public void setGoals(Integer goals) {
		this.goals = goals;
	}

	public Double getAvggoaldif() {
		return avggoaldif;
	}

	public void setAvggoaldif(Double avggoaldif) {
		this.avggoaldif = avggoaldif;
	}

	public Integer getHomewinpros() {
		return homewinpros;
	}

	public void setHomewinpros(Integer homewinpros) {
		this.homewinpros = homewinpros;
	}

}
