import { Component, OnInit } from '@angular/core';

import { Player } from './player';
import { BackendService } from '../backend/backend.service';

@Component({
    selector: 'players',
    templateUrl: 'app/players/players.html'
})

export class PlayersComponent implements OnInit {

    players : Player[] = [];
    
    constructor(private backendService: BackendService) {}

    getPlayers(): void {       
        this.backendService
            .getPlayers()
            .then(players => {
                this.players = players;
            });
    }
    
    add(name: string): void {
        name = name.trim();
        if (!name || this.players.indexOf(new Player(name)) === 0) { return; }
        this.backendService.createPlayer(name)
            .then(name =>{
                this.players.push(new Player(name));
            })
            .catch(this.handleError);
    }

    ngOnInit(): void {        
       this.getPlayers();
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }


}
