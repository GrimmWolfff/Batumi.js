import { GameComponent as Game } from '../../app/src/app/components/game/game.component';
import Card from './Card';
// import Game from './index';

export default class Board {
    cardsOnBoard:Card[];
    game:Game;
    stage:number;
    moneyOnBoard:number;
    constructor(game: Game) {
        this.game = game;
        this.cardsOnBoard = [];
        this.stage = 1;
        this.moneyOnBoard = 0;
    }

    private DealCard():void {
        let dealtCard = this.game.cards[Math.floor(Math.random() * this.game.cards.length)];
        this.game.cards.splice(this.game.cards.indexOf(dealtCard), 1);
        this.cardsOnBoard.push(dealtCard);
    }

    DealCards() {
        if(this.stage === 1) {
            for(let i = 0; i < 3; i++) {
                this.DealCard();
            }    
        } else if(this.stage === 2) {
            this.DealCard();
        } else if(this.stage === 3) {
            this.DealCard();
        }
    }
}
