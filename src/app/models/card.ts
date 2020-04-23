export interface Card {
    id: string;
    name: string;
    nationalPokedexNumber: number;
    imageUrl: string;
    imageUrlHiRes: string;
    types: string[];
    supertype: string;
    subtype: string;
    hp: string;
    retreatCost: string[];
    convertedRetreatCost: number;
    number: string;
    artist: string;
    rarity: string;
    series: string;
    set: string;
    setCode: string;
    attacks: {
        cost: string[];
        name: string;
        text: string;
        damage: string;
        convertedEnergyCost: number;
    }[];
    resistances: {
        type: string;
        value: string;
    }[]
    weaknesses: {
        type: string;
        value: string;
    }[]
    flipped: boolean;
    selected: boolean;
}
