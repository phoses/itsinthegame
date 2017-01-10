package com.gaming.domain;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class RandomTeam {

	private List<String> homeTeam;
	private List<String> awayTeam;
	
	public RandomTeam(){
		homeTeam = new ArrayList<>();
		awayTeam = new ArrayList<>();
	}
	
	public List<String> getHomeTeam() {
		return homeTeam;
	}
	public void setHomeTeam(List<String> homeTeam) {
		this.homeTeam = homeTeam;
	}
	public List<String> getAwayTeam() {
		return awayTeam;
	}
	public void setAwayTeam(List<String> awayTeam) {
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
