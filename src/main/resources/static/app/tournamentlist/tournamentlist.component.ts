import { Component, OnInit } from '@angular/core';

import { Tournament } from '../tournaments/tournament';
import { BackendService } from '../backend/backend.service';

@Component({
    selector: 'tournamentlist',
    templateUrl: 'app/tournamentlist/tournamentlist.html'
})

export class TournamentList implements OnInit {

    tournaments : Tournament[] = [];
    selected : String;
    
    constructor(private backendService: BackendService) {}

    getTournaments(): void {       
        this.backendService
            .getTournaments()
            .then(tournaments => {
                this.tournaments = tournaments;
            });
    }
    
    
    ngOnInit(): void {        
       this.getTournaments();
    }
    
    setSelected(selected : String): void {
        this.selected = selected;
    }
    
    getSelected(): String{
        return this.selected;
    }
}
