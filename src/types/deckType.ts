import { CardType } from "./cardType";

export type DeckType = {
    title: string;
    cover_card: string;
    monsters: CardType[];
    spells: CardType[];
    traps: CardType[];
    extra_deck: CardType[];
    owner: string;
}
