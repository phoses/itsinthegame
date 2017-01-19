package com.gaming.domain;

public class EnemyWinPros {

	private String enemy;
	private Integer winpros;

	public EnemyWinPros(String enemy, Integer winpros) {
		super();
		this.enemy = enemy;
		this.winpros = winpros;
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
}
