import Card from "./Card";
import { GameComponent as Game } from '../../app/src/app/components/game/game.component';
import { res } from "./functions/Combinations";
// import Game from './index';


export default class Player {
    playerCards:Card[];
    bestCombo:res;
    game:Game;
    money:number;
    constructor(game: Game) {
        this.game = game;
        this.playerCards = this.DealCards();
        this.bestCombo = { combo: "", comboName: "" }
        this.money = 100;
    }
    DealCards():Card[] {
        let cardsForPlayer:Card[] = [];
        for(let i = 0; i < 2; i++) {
            const takenCard = this.game.cards[Math.floor(Math.random() * this.game.cards.length)];
            this.game.cards.splice(this.game.cards.indexOf(takenCard), 1);
            cardsForPlayer.push(takenCard);
        }
        return cardsForPlayer;
    }
}
