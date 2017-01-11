import { Component, OnInit, Input } from '@angular/core';

import { Player } from '../players/player';
import { Game } from '../games/game';
import { RandomTeams } from './randomteams';
import { BackendService } from '../backend/backend.service';
import { GamesComponent } from '../games/games.component';
import { ResultsComponent} from '../results/results.component';

@Component({
    selector: 'randomizer',
    templateUrl: 'app/randomgenerator/randomizer.html'
})

export class RandomizerComponent implements OnInit {

    players : Player[] = [];
    selectedPlayers : String[] = [];
    homeGoals: number;
    awayGoals: number;
    randomteams : RandomTeams = new RandomTeams([],[]);
    gameAdded: boolean = false;
    @Input() gamesRef:GamesComponent;
    @Input() resultsRef:ResultsComponent;
    
    constructor(private backendService: BackendService) {}
    
    addPlayer(player : String): void {
        var index = this.selectedPlayers.indexOf(player);
        
        if (index !== -1) {
            this.selectedPlayers.splice(index,1);
        }else{
            this.selectedPlayers.push(player);  
        }
        
    }
    
    isSelected(player : String) : boolean{
        var index = this.selectedPlayers.indexOf(player);
        return index !== -1;
    }
    
    generateTeams(): void{
                
        this.backendService
            .getRandomTeams(this.selectedPlayers)
            .then(randomteams => {
                this.randomteams = randomteams;
                console.log(this.randomteams);
                this.homeGoals = null;
                this.awayGoals = null;
                this.gameAdded=false;
            });   
    }
        
    
    getPlayers(): void {       
        this.backendService
            .getPlayers()
            .then(players => {
                this.players = players;
            });
    }
    
    saveGame(tournamentName: String) {  
                        
        let game = new Game(tournamentName, this.randomteams.homeTeam, this.homeGoals, this.randomteams.awayTeam, this.awayGoals);
                
        this.backendService.createGame(game)
            .then(game =>{
                this.gameAdded = true;
                this.gamesRef.getGames();
                this.resultsRef.getResults(tournamentName);
            })
            
    }
    
    ngOnInit(): void {        
       this.getPlayers();
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }


}
