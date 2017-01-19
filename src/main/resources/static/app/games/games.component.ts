import { Component, OnInit } from '@angular/core';

import { Game } from './game';
import { Player } from '../players/player';
import { Tournament } from '../tournaments/tournament';
import { BackendService } from '../backend/backend.service';

@Component({
    selector: 'games',
    templateUrl: 'app/games/games.html'
})

export class GamesComponent implements OnInit {

    games : Game[] = [];
    tournaments : Tournament[] = [];
    players : Player[] = [];
    
    showAddGame = false;

    constructor(private backendService: BackendService) { }

    getPlayers(): void {       
        this.backendService
            .getPlayers()
            .then(players => {
                this.players = players;
            });
    }
    
    getTournaments(): void {       
        this.backendService
            .getTournaments()
            .then(tournaments => {
                this.tournaments = tournaments;
            });
    }
    
    getGames(tournamentName : String): void {           
        this.backendService
            .getGames(tournamentName)
            .then(games => {
                this.games = games;
            });
    }
    
    ngOnInit(): void {        
       this.getPlayers();
       this.getGames("");
    }
    
    saveGame(tournamentName: String, 
                homePlayer1: String, homePlayer2: String, homePlayer3: String,
                homeGoals: number, 
                awayPlayer1: String, awayPlayer2: String, awayPlayer3: String,
                awayGoals: number) {
                    
        let homePlayers: String[] = [homePlayer1, homePlayer2, homePlayer3];
        let awayPlayers: String[] = [awayPlayer1, awayPlayer2, awayPlayer3];
        homePlayers = homePlayers.filter(function(n){ return n !== "" }); 
        awayPlayers = awayPlayers.filter(function(n){ return n !== "" }); 
                        
        let game = new Game(tournamentName, homePlayers, homeGoals, awayPlayers, awayGoals, new Date().getTime());
                
        this.backendService.createGame(game)
            .then(game =>{
                this.games.push(game);
            })
            
    }
    
    dateChanged(timeMillis : number, index : number) : boolean{
        
        if(index === 0){
            return true;
        }
        
        var prevGame : Game = this.games[index-1];
        var currentDate: Date = new Date(timeMillis);
        var prevDate: Date = new Date(prevGame.timeMillis);
        
        var currentString : String = "" + currentDate.getFullYear() + currentDate.getMonth() + currentDate.getDate();
        var prevString : String = "" + prevDate.getFullYear() + prevDate.getMonth() + prevDate.getDate();
                
        if(currentString !== prevString){
            return true;
        }
        
        return false;       
    }

}
