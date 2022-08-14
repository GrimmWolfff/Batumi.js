import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Card from '../../../../../test/src/Card';
import Player from '../../../../../test/src/Player';
import Board from '../../../../../test/src/Board';
import { Pair, TwoPairs, ThreeOfAKind, FourOfAKind, Straight, Flush, StraightFlush, NumberToType, CombinationPower }
from '../../../../../test/src/functions/Combinations';
import { res } from '../../../../../test/src/functions/Combinations';


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1

//* Frontend / Images
// TODO: Money, Game stages
// TODO: Socket.io

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1

const NumberToColor:object = {
    0: 'H',
    1: 'D',
    2: 'C',
    3: 'S'
}

const colorToCOLOR:object = {
    'H':'hearts',
    'D':'diamonds',
    'C':'clubs',
    'S':'spades'
}
const typeToTYPE:object = {
    'J':'jack',
    'K':'king',
    'Q':'queen',
    'A':'ace'
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
        this.players = [new Player(this)];
        this.board = new Board(this);
    }

    GenerateCards(): Card[] {
        let cards:Card[] = [];
        for(let i = 2; i <= 14; i++) {
            for(let j = 0; j < 4; j++) {
                let type:string = NumberToType[i as keyof object], color:string = NumberToColor[j as keyof object]; 
                let typeForImage = (t:string) => isNaN(Number(t)) ? typeToTYPE[t as keyof object] : t;
                let image:string = 
                `../../assets/images/${typeForImage(type)}_of_${colorToCOLOR[color as keyof object]}.png`;
                let newCard:Card = new Card(type, color, image);
                cards.push(newCard);
            }
        }
        return cards;
    }
    
    CheckCombinations(playerIdx:number):res {
        let p1_cards = this.board.cardsOnBoard.concat(this.players[playerIdx].playerCards);
        // Handle Combinations
        if      (StraightFlush(p1_cards, playerIdx, this.players).combo) return StraightFlush(p1_cards, playerIdx, this.players);
        else if (Flush(p1_cards, playerIdx, this.players).combo)         return(Flush(p1_cards, playerIdx, this.players));
        else if (Straight(p1_cards, playerIdx, this.players).combo)      return(Straight(p1_cards, playerIdx, this.players));
        else if (FourOfAKind(p1_cards, playerIdx, this.players).combo)   return(FourOfAKind(p1_cards, playerIdx, this.players));
        else if (ThreeOfAKind(p1_cards, playerIdx, this.players).combo)  return(ThreeOfAKind(p1_cards, playerIdx, this.players));
        else if (TwoPairs(p1_cards, playerIdx, this.players).combo)      return(TwoPairs(p1_cards, playerIdx, this.players));
        else if (Pair(p1_cards, playerIdx, this.players).combo)          return(Pair(p1_cards, playerIdx, this.players));
        else                                    return { combo: false, comboName: 'none' };
    }

    IncreaseStage() {
        this.board.DealCards();
        this.board.stage++;
    }

    Bet(idx:number) {
        let powers:number[] = [];
        if(this.players[idx].money) {
            this.players[idx].money -= 10;
            this.board.moneyOnBoard += 10;
            this.IncreaseStage();            
        } else {
            alert('You dont have enough money');
        }
        if(this.board.stage == 4) {
            for(let i in this.players) {
                let pPower = CombinationPower[this.players[i].bestCombo.comboName as keyof object];
                powers.push(pPower);    
            }
            let winner = "";
            let rr:any[] = Object.keys(CombinationPower) as keyof object
            powers.map(i => winner = rr.find(k=>CombinationPower[k as keyof object] === i));
            console.log(`Winner is Player 
            ${this.players.filter((p,i) => p.bestCombo.comboName = winner)} with ${winner}`);
        }
    }

    ngOnInit(): void {}
}
