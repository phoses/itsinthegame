import { Component, OnInit } from '@angular/core';

import { Player } from '../players/player';
import { RandomTeams } from './randomteams';
import { BackendService } from '../backend/backend.service';

@Component({
    selector: 'randomizer',
    templateUrl: 'app/randomgenerator/randomizer.html'
})

export class RandomizerComponent implements OnInit {

    players : Player[] = [];
    selectedPlayers : String[] = [];
    randomteams : RandomTeams = new RandomTeams([],[]);
    
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
            });   
    }
        
    
    getPlayers(): void {       
        this.backendService
            .getPlayers()
            .then(players => {
                this.players = players;
            });
    }
    
    ngOnInit(): void {        
       this.getPlayers();
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }


}
