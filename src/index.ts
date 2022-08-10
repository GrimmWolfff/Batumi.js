import Card from './Card';
import Player from './Player';
import Board from './Board';

const NumberToColor:object = {
    0: 'H',
    1: 'D',
    2: 'C',
    3: 'S'
}

const NumberToType:object = {
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
    10: '10',
    11: 'J',
    12: 'Q',
    13: 'K',
    14: 'A'
}

const Combinations:object = {
    1: "Pair", //*
    2: "Two Pair", //*
    3: "Three of a kind", //*
    4: "Straight", //!
    5: "Flush", //!
    6: "Full House", //!
    7: "Four of a kind", //*
    8: "Straight Flush", //!
    9: "Royal Flush" //!
}

export default class Game {
    cards:Card[];
    player1:Player;
    player2:Player;
    board:Board;
    constructor(){
        this.cards = this.GenerateCards();
        this.player1 = new Player(this);
        this.player2 = new Player(this);
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
        let p1_cards = this.board.cardsOnBoard.concat(this.player1.playerCards);
    
        function Convert(p1_cards: Card[]): object {
            let types1:string[] = [];
            p1_cards.map(i => types1.push(i.type))
            const count = (strings:string[]) => strings.reduce((a, b) => ({ ...a, [b]: (a[b as keyof object] || 0) + 1}), {})
            let p1Obj = count(types1);
            return p1Obj;
        }

        function Pair(p1: Card[]) {
            let p1Obj = Convert(p1)
            let pairs1 = Object.entries(p1Obj).filter(subArr => subArr[1] === 2);
            let alltypes1 = pairs1.map(i => i[0]);
            let arr1:number[] = [];
            alltypes1.map(t => arr1.push(Number(Object.entries(NumberToType).filter(arr => arr[1] == t)[0][0])))
            let res1:number = NumberToType[Math.max(...arr1) as keyof object]; 
            return { combo: res1 == undefined ? false : res1.toString(), comboName: 'Pair' };
        }

        function TwoPairs(p1: Card[]) {
            let p1Obj = Convert(p1)
            let pairs1 = Object.entries(p1Obj).filter(subArr => subArr[1] === 2);
            let alltypes1 = pairs1.map(i => i[0]);
            let arr1:string[] = [], arr2:number[] = [];
            let rr:any[] = Object.keys(NumberToType) as keyof object
            alltypes1.map(i => arr1.push(rr.find(k=>NumberToType[k as keyof object] === i)))
            arr1.map(el => arr2.push(Number(el)));
            arr2 = arr2.sort((a,b) => b - a)
            let res:string[] = [NumberToType[arr2[0] as keyof object], NumberToType[arr2[1] as keyof object]];
            let finalRes = { 
                combo: res.map(i => i == 'undefined') ? false : res, 
                comboName: 'Two Pairs' 
            }
            return finalRes;
            // if(finalRes.combo) {return finalRes}
            // else {Pair(p1);} 
        }
        
        function ThreeOfAKind(p1: Card[]) {
            let p1Obj = Convert(p1)
            let pairs1 = Object.entries(p1Obj).filter(subArr => subArr[1] === 3);
            let alltypes1 = pairs1.map(i => i[0]);
            let arr1:string[] = [], arr2:number[] = [];
            let rr:any[] = Object.keys(NumberToType) as keyof object;
            alltypes1.map(i => arr1.push(rr.find(k=>NumberToType[k as keyof object] === i)))
            arr1.map(el => arr2.push(Number(el)));
            arr2 = arr2.sort((a,b) => b - a)
            let res:string = NumberToType[arr2[0] as keyof object];
            let finalRes = { 
                combo: res == 'undefined' ? false : res, 
                comboName: 'Three of a kind' 
            }
            return finalRes;
        }

        function FourOfAKind(p1: Card[]) {
            let p1Obj = Convert(p1)
            let pairs1 = Object.entries(p1Obj).filter(subArr => subArr[1] === 4);
            let alltypes1 = pairs1.map(i => i[0]);
            let arr1:string[] = [], arr2:number[] = [];
            let rr:any[] = Object.keys(NumberToType) as keyof object;
            alltypes1.map(i => arr1.push(rr.find(k=>NumberToType[k as keyof object] === i)))
            arr1.map(el => arr2.push(Number(el)));
            arr2 = arr2.sort((a,b) => b - a)
            let res:string = NumberToType[arr2[0] as keyof object];
            let finalRes = { 
                combo: res == 'undefined' ? false : res, 
                comboName: 'Four of a kind' 
            }
            return finalRes;
        }
        // function Straight(p1: Card[]) {
        //     let types1:string[] = [], types2:number[] = [];
        //     p1.map(i => types1.push(i.type));
        //     let rr:any[] = Object.keys(NumberToType) as keyof object;
        //     types2 = types1.map(el => Number(rr.find(k => NumberToType[k as keyof object] === el))).sort((a,b) => b - a);
        //     let StraightArray:number[] = [], count = 0;
        //     for(let i = 0; i < types2.length; i++) {
        //         if(types2[i] === types2[i + 1] + 1) {
        //             StraightArray.push(types2[i])
        //         }
        //     }
        //     return count === 4;
        // }
        // console.log(Straight([new Card('Q','H'),new Card('K','H'),new Card('J','H'),new Card('9','H'),new Card('10','H'),new Card('J','H'),]));
    }
}

const game = new Game();
// const cards = game.GenerateCards();
// console.log(game.board);
game.CheckCombinations()