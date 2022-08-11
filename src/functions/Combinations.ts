import Card from "../Card";

export const NumberToType:object = {
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

export function Convert(p1_cards: Card[]): object {
    let types1:string[] = [];
    p1_cards.map(i => types1.push(i.type))
    const count = (strings:string[]) => strings.reduce((a, b) => ({ ...a, [b]: (a[b as keyof object] || 0) + 1}), {})
    let p1Obj = count(types1);
    return p1Obj;
}

export function Pair(p1: Card[]) {
    let p1Obj = Convert(p1)
    let pairs1 = Object.entries(p1Obj).filter(subArr => subArr[1] === 2);
    let alltypes1 = pairs1.map(i => i[0]);
    let arr1:number[] = [];
    alltypes1.map(t => arr1.push(Number(Object.entries(NumberToType).filter(arr => arr[1] == t)[0][0])))
    let res1:number = NumberToType[Math.max(...arr1) as keyof object]; 
    return { combo: res1 == undefined ? false : res1.toString(), comboName: 'Pair' };
}

export function TwoPairs(p1: Card[]) {
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

export function ThreeOfAKind(p1: Card[]) {
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
        combo: res == undefined ? false : res, 
        comboName: 'Three of a kind' 
    }
    return finalRes;
}

export function FourOfAKind(p1: Card[]) {
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
        combo: res == undefined ? false : res, 
        comboName: 'Four of a kind' 
    }
    return finalRes;
}

export function Straight(p1: Card[]) {
    let types1:string[] = [], types2:number[] = [];
    p1.map(i => types1.push(i.type));
    let rr:any[] = Object.keys(NumberToType) as keyof object;
    types2 = types1.map(el => Number(rr.find(k => NumberToType[k as keyof object] === el))).sort((a,b) => b - a);
    types2 = types2.sort((a,b) => a - b);
    let UniqueItems:number[] = [];
    for(let i = 0; i < types2.length; i++) {
        if (!UniqueItems.includes(types2[i])) {
            UniqueItems.push(types2[i]);
        }
    }
    interface res {
        combo: number[] | boolean,
        comboName: string
    }

    let LastFiveElements:number[] = [], counter = 0, checkStraight:number[] = [], finalRes:res = {combo: false, comboName: "Straight"};
    for(let i = UniqueItems.length - 1; i >= 0; i--) {
        if(counter < 5) {
            LastFiveElements.push(UniqueItems[i]);
            counter++;
        }
    }
    LastFiveElements = LastFiveElements.sort((a,b) => a - b).map(el => NumberToType[el as keyof object]);
    checkStraight = types1.map(el => Number(rr.find(k => NumberToType[k as keyof object] === el))).sort((a,b) => b - a);
    for(let i = 0; i < checkStraight.length - 1; i++) {
        if(checkStraight[i] - 1 == checkStraight[i + 1]) {
            finalRes = {
                combo: LastFiveElements,
                comboName: "Straight"
            }
        } else {
            finalRes = {
                combo: false,
                comboName: "Straight"                        
            }
            break;
        }
    }
    return finalRes;
}

export function Flush(p1: Card[]) {
    let colors:string[] = [];
    p1.map(i => colors.push(i.color));
    const count = (strings:string[]) => strings.reduce((a, b) => ({ ...a, [b]: (a[b as keyof object] || 0) + 1}), {})
    let p1Obj = count(colors);
    let flushed = Object.entries(p1Obj).filter(subArr => Number(subArr[1]) >= 5);
    if(flushed.length){
        let flushedCards = p1.filter(card => card.color === flushed[0][0]);
        let types:string[] = flushedCards.map(card => card.type);
        let rr:any[] = Object.keys(NumberToType) as keyof object;
        let sortedCards:number[] = [];
        types.map(i => sortedCards.push(rr.find(k=>NumberToType[k as keyof object] === i)))
        let finalCards = sortedCards
            .map(el => Number(el))
            .sort((a,b) => b - a)
            .splice(0, 5)
            .map(el => NumberToType[el.toString() as keyof object]);
        let finalRes = {
            combo: finalCards,
            comboName: 'Flush'
        }
        return finalRes;
    } else {
        return { combo: false, comboName: 'Flush' }
    }
}
export const StraightFlush = (p1: Card[]) => Flush(p1).combo && Straight(p1).combo && Straight(p1) == Flush(p1) ? 
    { combo: Straight(p1).combo, comboName: "Straight Flush" } : { combo: false, comboName: "Straight Flush" }