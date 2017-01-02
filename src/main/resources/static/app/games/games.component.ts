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
    
    getGames(): void {       
        this.backendService
            .getGames()
            .then(games => {
                this.games = games;
            });
    }
    
    ngOnInit(): void {        
       this.getPlayers();
       this.getGames();
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
                        
        let game = new Game(tournamentName, homePlayers, homeGoals, awayPlayers, awayGoals);
                
        this.backendService.createGame(game)
            .then(game =>{
                this.games.push(game);
            })
            
    }

}
