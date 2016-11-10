import { Component, OnInit } from '@angular/core';

import { Tournament } from './tournament';
import { BackendService } from '../backend/backend.service';

@Component({
    selector: 'tournaments',
    templateUrl: 'app/tournaments/tournaments.html'
})

export class TournamentsComponent implements OnInit {

    tournaments : Tournament[] = [];
    
    constructor(private backendService: BackendService) {}

    getTournaments(): void {       
        this.backendService
            .getTournaments()
            .then(tournaments => {
                this.tournaments = tournaments;
            });
    }
    
    add(name: string): void {
        name = name.trim();
        if (!name || this.tournaments.indexOf(new Tournament(name)) === 0) { return; }
        this.backendService.createTournament(name)
            .then(name =>{
                this.tournaments.push(new Tournament(name));
            })
            .catch(this.handleError);
    }

    ngOnInit(): void {        
       this.getTournaments();
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }


}
