package com.gaming.domain;

import java.util.HashSet;
import java.util.Set;

public class RandomTeam {

	private Set<String> homeTeam;
	private Set<String> awayTeam;
	
	public RandomTeam(){
		homeTeam = new HashSet<>();
		awayTeam = new HashSet<>();
	}
	
	public Set<String> getHomeTeam() {
		return homeTeam;
	}
	public void setHomeTeam(Set<String> homeTeam) {
		this.homeTeam = homeTeam;
	}
	public Set<String> getAwayTeam() {
		return awayTeam;
	}
	public void setAwayTeam(Set<String> awayTeam) {
		this.awayTeam = awayTeam;
	}
	
	public void addHomePlayer(String player){
		if(!homeTeam.contains(player) && !awayTeam.contains(player)){
			homeTeam.add(player);
		}
	}
	
	public void addAwayPlayer(String player){
		if(!homeTeam.contains(player) && !awayTeam.contains(player)){
			awayTeam.add(player);
		}
	}
	
	public int playerCount(){
		return homeTeam.size() + awayTeam.size();
	}
}
