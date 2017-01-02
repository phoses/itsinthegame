import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Headers, Http } from '@angular/http';

import { Player } from '../players/player';
import { Tournament } from '../tournaments/tournament';
import { Game } from '../games/game';
import { Result } from '../results/result';

@Injectable()
export class BackendService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private playersUrl = '/players'; 
    private tournamentsUrl = '/tournaments'; 
    private gamesUrl = '/games'; 
    private resultsUrl = '/results'; 

    constructor(private http: Http) { }

    getPlayers(): Promise<Player[]> {    
        console.log("getPlayers()");     
        
        return this.http.get(this.playersUrl)
            .toPromise()
            .then(response => {   
                if(response.json()._embedded !== undefined){
                    return response.json()._embedded.players as Player[];
                }else{
                    return [];
                }
             })
            .catch(this.handleError);
    }
    
    getTournaments(): Promise<Tournament[]> { 
        console.log("getTournaments()");  
                  
        return this.http.get(this.tournamentsUrl)
            .toPromise()
            .then(response => {
                if(response.json()._embedded !== undefined){
                    return response.json()._embedded.tournaments as Tournament[];
                }else{
                    return [];
                }
            })
            .catch(this.handleError);
    }
       
    getGames(): Promise<Game[]> { 
        console.log("getGames()");  
                  
        return this.http.get(this.gamesUrl)
            .toPromise()
            .then(response => {
                if(response.json()._embedded !== undefined){
                    return response.json()._embedded.games as Game[];
                }else{
                    return [];
                }
            })
            .catch(this.handleError);
    }
    
    getResults(tournamentName : String): Promise<Result[]> { 
                  
        return this.http.get(this.resultsUrl+"/"+tournamentName)
            .toPromise()
            .then(response => {
                return response.json() as Result[];
            })
            .catch(this.handleError);
    }
        
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    createPlayer(name: string): Promise<String> {
        return this.http
            .post(this.playersUrl, JSON.stringify({ name: name }), { headers: this.headers })
            .toPromise()
            .then(() => name)
            .catch(this.handleError);
    }
    
     createTournament(name: string): Promise<String> {
        return this.http
            .post(this.tournamentsUrl, JSON.stringify({ name: name }), { headers: this.headers })
            .toPromise()
            .then(() => name)
            .catch(this.handleError);
    }
    
     createGame(game: Game): Promise<Game> {
                  
        return this.http
            .post(this.gamesUrl, JSON.stringify(game), { headers: this.headers })
            .toPromise()
            .then(() => game)
            .catch(this.handleError);
    }
     
     
//    delete(id: String): Promise<void> {
//        let url = `${this.playersUrl}/${id}`;
//        return this.http.delete(url, { headers: this.headers })
//            .toPromise()
//            .then(() => null)
//            .catch(this.handleError);
//    }
//    update(player: Player): Promise<Player> {
//        const url = `${this.playersUrl}/${player.id}`;
//        return this.http
//            .put(url, JSON.stringify(player), { headers: this.headers })
//            .toPromise()
//            .then(() => player)
//            .catch(this.handleError);
//    }
     
 //    getPlayer(id: String): Promise<Player> {
//        return this.getPlayers()
//            .then(players => players.find(player => player.id === id));
//    }
}
