import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Card from '../../../../../test/src/Card';
import Player from '../../../../../test/src/Player';
import Board from '../../../../../test/src/Board';
import { Pair, TwoPairs, ThreeOfAKind, FourOfAKind, Straight, Flush, StraightFlush, NumberToType }
from '../../../../../test/src/functions/Combinations';
import { res } from '../../../../../test/src/functions/Combinations';


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1

// TODO: Frontend / Images
// TODO: Money, Game stages
// TODO: Socket.io

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1

const NumberToColor:object = {
    0: 'H',
    1: 'D',
    2: 'C',
    3: 'S'
}

@Component({
    selector: 'app-game',
    templateUrl: './game.component.html',
    styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {
    @Input() cards:Card[];
    @Input() players:Player[];
    @Input() board:Board;

    constructor(){
        this.cards = this.GenerateCards();
        this.players = [new Player(this), new Player(this)];
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
    
    CheckCombinations(playerIdx:number):res {
        let p1_cards = this.board.cardsOnBoard.concat(this.players[playerIdx].playerCards);
        // Handle Combinations
        if      (StraightFlush(p1_cards).combo) return StraightFlush(p1_cards);
        else if (Flush(p1_cards).combo)         return(Flush(p1_cards));
        else if (Straight(p1_cards).combo)      return(Straight(p1_cards));
        else if (FourOfAKind(p1_cards).combo)   return(FourOfAKind(p1_cards));
        else if (ThreeOfAKind(p1_cards).combo)  return(ThreeOfAKind(p1_cards));
        else if (TwoPairs(p1_cards).combo)      return(TwoPairs(p1_cards));
        else if (Pair(p1_cards).combo)          return(Pair(p1_cards));
        else                                    return { combo: false, comboName: 'none' };
    }

    ngOnInit(): void {}
}
