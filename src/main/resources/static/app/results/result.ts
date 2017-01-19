import { Playerinfo } from './playerinfo';

export class Result{
    player: String;
    games: number;
    wins: number;
    loses: number;
    points: number;  
    winpros: number;
    plusminus: number;
    fewGames: boolean;  
    showInfo: boolean;  
    
    playerinfo : Playerinfo = new Playerinfo();
}