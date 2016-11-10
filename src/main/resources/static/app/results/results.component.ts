import { Component, OnInit } from '@angular/core';

import { Result } from './result';
import { BackendService } from '../backend/backend.service';

@Component({
    selector: 'results',
    templateUrl: 'app/results/results.html'
})

export class ResultsComponent implements OnInit {

    results : Result[] = [];
    
    constructor(private backendService: BackendService) {}

    getResults(): void {       
        this.backendService
            .getResults()
            .then(results => {
                this.results = results;
            });
    }
  
    ngOnInit(): void {        
       this.getResults();
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }


}
