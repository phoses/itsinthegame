export class Game{    
    constructor(
        public tournamentName: String,
        public homePlayers: Array<String>,
        public homeGoals: number,
        public awayPlayers: Array<String>,
        public awayGoals: number,
        public timeMillis: number
    ) {}
   
}