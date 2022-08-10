import Game from './index';
import Card from './Card';

export default class Board {
    cardsOnBoard:Card[];
    game:Game;
    constructor(game: Game) {
        this.game = game;
        this.cardsOnBoard = this.DealCards();
    }
    DealCards():Card[] {
        let cards:Card[] = [];
        for(let i = 0; i < 5; i++) {
            let dealtCard = this.game.cards[Math.floor(Math.random() * this.game.cards.length)];
            this.game.cards.splice(this.game.cards.indexOf(dealtCard), 1);
            cards.push(dealtCard);
        }
        return cards;
    }
}
