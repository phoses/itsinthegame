import { Component, OnInit, Input } from '@angular/core';

import { Result } from './result';
import { Playerinfo } from './playerinfo';
import { BackendService } from '../backend/backend.service';
import { GamesComponent } from '../games/games.component';

@Component({
    selector: 'results',
    templateUrl: 'app/results/results.html'
})

export class ResultsComponent implements OnInit {

    results : Result[] = [];
    @Input() gamesRef:GamesComponent;
    
    constructor(private backendService: BackendService) {}

    getResults(tournamentName: String): void {           
        this.backendService
            .getResults(tournamentName)
            .then(results => {
                this.results = results;
            });
        
        this.gamesRef.getGames(tournamentName);
    }
    
    getPlayerinfo(result : Result, tournamentName: String): void {  
    
        result.showInfo = !result.showInfo;
        
        this.backendService
            .getPlayerinfo(tournamentName, result.player)
            .then(playerinfo => {
                result.playerinfo = playerinfo;
            });
    }
  
    ngOnInit(): void {        
       this.getResults("");
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }


}
