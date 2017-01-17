import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { Headers, Http } from '@angular/http';

import { Player } from '../players/player';
import { Tournament } from '../tournaments/tournament';
import { Game } from '../games/game';
import { Result } from '../results/result';
import { RandomTeams } from '../randomgenerator/randomteams';

@Injectable()
export class BackendService {

    private headers = new Headers({'Content-Type': 'application/json'});
//    private backendurl = 'http://testing.vkcdvpmhqy.us-west-2.elasticbeanstalk.com';
//    private backendurl = 'http://localhost:5000';
    private backendurl = '';
    private playersUrl = this.backendurl+'/players'; 
    private tournamentsUrl = this.backendurl+'/tournaments'; 
    private gamesUrl = this.backendurl+'/games';
    private playedGames = this.backendurl+'/playedGames';  
    private resultsUrl = this.backendurl+'/results'; 
    private randomTeamsUrl = this.backendurl+'/randomteams'; 

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
       
    getGames(tournamentName : String): Promise<Game[]> { 
        console.log("getGames()");  
                  
        return this.http.get(this.playedGames+"/"+tournamentName)
            .toPromise()
            .then(response => {
                  return response.json() as Game[];
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
    
    getRandomTeams(players : String[]): Promise<RandomTeams> { 
                          
        var playerParams = "";
        
        var arrayLength = players.length;
        for (var i = 0; i < arrayLength; i++) {
            if(playerParams != ""){
                playerParams += "&";
            }
        
            playerParams += players[i];
        }
        
        return this.http.get(this.randomTeamsUrl+"/?"+playerParams)
            .toPromise()
            .then(response => {
                return response.json() as RandomTeams;
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
