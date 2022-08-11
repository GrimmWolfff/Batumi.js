import Card from './Card';
import Player from './Player';
import Board from './Board';
import { Pair, TwoPairs, ThreeOfAKind, FourOfAKind, Straight, Flush, StraightFlush, NumberToType }  from './functions/Combinations';

const NumberToColor:object = {
    0: 'H',
    1: 'D',
    2: 'C',
    3: 'S'
}

export default class Game {
    cards:Card[];
    players:Player[];
    board:Board;
    
    constructor(){
        this.cards = this.GenerateCards();
        this.players = [new Player(this)];
        this.board = new Board(this);
    }

    GenerateCards(): Card[] {
        let cards:Card[] = [];
        for(let i = 2; i <= 14; i++) {
            for(let j = 0; j < 4; j++) {
                let newCard = new Card(NumberToType[i as keyof object], NumberToColor[j as keyof object]);
                cards.push(newCard);
            }
        }
        return cards;
    }
    
    CheckCombinations() {
        let p1_cards = this.board.cardsOnBoard.concat(this.players[0].playerCards);
        // Handle Combinations
        if      (StraightFlush(p1_cards).combo) return StraightFlush(p1_cards);
        else if (Flush(p1_cards).combo)         return(Flush(p1_cards));
        else if (Straight(p1_cards).combo)      return(Straight(p1_cards));
        else if (FourOfAKind(p1_cards).combo)   return(FourOfAKind(p1_cards));
        else if (ThreeOfAKind(p1_cards).combo)  return(ThreeOfAKind(p1_cards));
        else if (TwoPairs(p1_cards).combo)      return(TwoPairs(p1_cards));
        else if (Pair(p1_cards).combo)          return(Pair(p1_cards));
        else                                    return false;
    }
}

const game = new Game();
console.log(game.CheckCombinations());