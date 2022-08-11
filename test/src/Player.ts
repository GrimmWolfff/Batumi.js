import Card from "./Card";
import { GameComponent as Game } from '../../app/src/app/components/game/game.component';
// import Game from './index';

interface Combo {
    comboName: string,
    strength: number,
    cards: string[]
};

export default class Player {
    playerCards:Card[];
    bestCombo:Combo;
    game:Game;
    constructor(game: Game) {
        this.game = game;
        this.playerCards = this.DealCards();
        this.bestCombo = { comboName: "", strength: 0, cards: [] }
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
