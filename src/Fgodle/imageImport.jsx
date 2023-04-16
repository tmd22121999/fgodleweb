import saberClass from "../asset/class/Class-Saber-Gold.webp"
import archerClass from "../asset/class/Class-Archer-Gold.webp"
import alterEgoClass from "../asset/class/Class-Alterego-Gold.webp"
import assassinClass from "../asset/class/Class-Assassin-Gold.webp"
import avengerClass from "../asset/class/Class-Avenger-Gold.webp"
import beastClass from "../asset/class/Class-Beast.webp"
import berserkerClass from "../asset/class/Class-Berserker-Gold.webp"
import casterClass from "../asset/class/Class-Caster-Gold.webp"
import foreignerClass from "../asset/class/Class-Foreigner-Gold.webp"
import lancerClass from "../asset/class/Class-Lancer-Gold.webp"
import moonCancerClass from "../asset/class/Class-MoonCancer-Gold.webp"
import pretenderClass from "../asset/class/Class-Pretender-Gold.webp"
import riderClass from "../asset/class/Class-Rider-Gold.webp"
import rulerClass from "../asset/class/Class-Ruler-Gold.webp"
import shielderClass from "../asset/class/Class-Shielder-Gold.webp"

import artCard from "../asset/card/Artsicon.webp"
import quickCard from "../asset/card/Quickicon.webp"
import busterCard from "../asset/card/Bustericon.webp"

import Star1 from "../asset/rarity/Icon_rarity_1.webp"
import Star2 from "../asset/rarity/Icon_rarity_2.webp"
import Star3 from "../asset/rarity/Icon_rarity_3.webp"
import Star4 from "../asset/rarity/Icon_rarity_4.webp"
import Star5 from "../asset/rarity/Icon_rarity_5.webp"


const classImage={
    "saber":saberClass,
    "archer":archerClass,
    "alterEgo":alterEgoClass,
    "assassin":assassinClass,
    "avenger":avengerClass,
    "berserker":berserkerClass,
    "caster":casterClass,
    "foreigner":foreignerClass,
    "lancer":lancerClass,
    "moonCancer":moonCancerClass,
    "pretender":pretenderClass,
    "rider":riderClass,
    "ruler":rulerClass,
    "shielder":shielderClass,
    "beast":beastClass,
}
const cardImage={
    "arts":artCard,
    "quick":quickCard,
    "buster":busterCard
}
const rarityImage=[Star1,Star1,Star2,Star3,Star4,Star5]

export {classImage,cardImage,rarityImage}