import { Component, OnInit } from '@angular/core';

import { Generalinfo } from './generalinfo';
import { BackendService } from '../backend/backend.service';

@Component({
    selector: 'generalinfo',
    templateUrl: 'app/generalinfo/generalinfo.html'
})

export class GeneralinfoComponent implements OnInit {

    generalinfo : Generalinfo = new Generalinfo();
    
    constructor(private backendService: BackendService) {}
    
    getInfo(): void {       
        this.backendService
            .getGeneralinfo()
            .then(generalinfo => {
                this.generalinfo = generalinfo;
            });
    }
    
    ngOnInit(): void {        
       this.getInfo();
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }


}
