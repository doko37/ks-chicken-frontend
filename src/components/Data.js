import mimg1 from '../Images/mSlide1.png'
import mimg2 from '../Images/mSlide2.jpg'
import img1 from '../Images/slide1.png'
import img2 from '../Images/slide2.png'
import original from '../Images/original.jpg'
import crispy from '../Images/crispy.jpg'
import korean from '../Images/korean.jpg'
import sweetchilly from '../Images/sweetchilly.jpg'
import spicy from '../Images/spicy.jpg'
import hotandspicy from '../Images/hotandspicy.jpg'
import soy from '../Images/soy.jpg'
import spicysoy from '../Images/spicysoy.jpg'
import honey from '../Images/honeybutter.jpg'
import snowy from '../Images/snowy.jpg'
import onion from '../Images/onion.jpg'
import padak from '../Images/padak.jpg'
import teriyaki from '../Images/Lunch/teriyaki.jpg'
import bulgogi from '../Images/Lunch/bulgogi.jpg'
import popcorn from '../Images/Lunch/popcorn.jpg'
import lunchspicy from '../Images/Lunch/spicy.jpg'
import lunchhoney from '../Images/Lunch/honeybutter.jpg'
import bbq from '../Images/Lunch/bbq.jpg'
import garlic from '../Images/Lunch/garlicsoy.jpg'
import lunchonion from '../Images/Lunch/onion.jpg'
import broccoli from '../Images/Lunch/broccoli.jpg'
import pasta from '../Images/Lunch/pasta.jpg'
import mac from '../Images/Lunch/macandcheese.jpg'
import potato from '../Images/Lunch/potatoandbacon.jpg'
import lunchcoleslaw from '../Images/Lunch/coleslaw.jpg'
import salad from '../Images/Lunch/salad.jpg'
import udon from '../Images/Lunch/udonsalad.jpg'
import spicyudon from '../Images/Lunch/spicy_udon.jpg'
import chips from '../Images/chips.JPG'
import coleslaw from '../Images/coleslaw.jpg'
import rice from '../Images/rice.jpg'
import radish from '../Images/radish.jpg'
import sauce from '../Images/sauce.jpg'

export const mSlides = [
    {
        img: mimg1,
        key: mimg1
    },
    {
        img: mimg2,
        key: mimg2
    }
]

export const slides = [
    {
        img: img1,
        key: img1
    },
    {
        img: img2,
        key: img2
    }
]

export const Chicken = [
    {
        img: original,
        title: "Original Fried Chicken",
        halfprice: 17,
        fullprice: 32,
        key: "original"
    },
    {
        img: crispy,
        title: "Crispy Fried Chicken",
        halfprice: 17,
        fullprice: 32,
        key: "crispy"
    },
    {
        img: korean,
        title: "Korean Fried Chicken",
        halfprice: 18,
        fullprice: 34,
        key: "korean"
    },
    {
        img: spicy,
        title: "Spicy Chicken",
        halfprice: 18,
        fullprice: 34,
        key: "spicy"
    },
    {
        img: hotandspicy,
        title: "Hot and Spicy Chicken",
        halfprice: 18,
        fullprice: 34,
        key: "hotandspicy"
    },
    {
        img: sweetchilly,
        title: "Sweet Chilly Chicken",
        halfprice: 18,
        fullprice: 34,
        key: "sweetchilly"
    },
    {
        img: soy,
        title: "Soy Chicken",
        halfprice: 18,
        fullprice: 34,
        key: "soy"
    },
    {
        img: soy,
        title: "Garlic Soy Chicken",
        halfprice: 18,
        fullprice: 34,
        key: "garlicsoy"
    },
    {
        img: soy,
        title: "BBQ Chicken",
        halfprice: 18,
        fullprice: 34,
        key: "bbq"
    },
    {
        img: spicysoy,
        title: "Spicy Soy Chicken",
        halfprice: 18,
        fullprice: 34,
        key: "spicysoy"
    },
    {
        img: honey,
        title: "Honey Butter Chicken",
        halfprice: 19,
        fullprice: 38,
        key: "honey"
    },
    {
        img: snowy,
        title: "Snowy Cheese Chicken",
        halfprice: 19,
        fullprice: 36,
        key: "snowy"
    },
    {
        img: onion,
        title: "Onion Seasoning Chicken",
        halfprice: 19,
        fullprice: 36,
        key: "onion"
    },
    {
        img: padak,
        title: "Padak Chicken",
        halfprice: 22,
        fullprice: 39,
        key: "padak"
    },
]

export const Lunch = {
    Chicken: [
        {
            img: teriyaki,
            title: "Teriyaki Chicken",
            key: "teriyaki"
        },
        {
            img: bulgogi,
            title: "Bulgogi",
            key: "bulgogi"
        },
        {
            img: popcorn,
            title: "Popcorn Chicken",
            key: "popcorn"
        },
        {
            img: lunchspicy,
            title: "Spicy Chicken",
            key: "lunchspicy"
        },
        {
            img: lunchhoney,
            title: "Honey Butter Chicken",
            key: "lunchhoney"
        },
        {
            img: bbq,
            title: "BBQ Chicken",
            key: "lunchbbq"
        },
        {
            img: garlic,
            title: "Garlic Soy Chicken",
            key: "lunchgarlic"
        },
        {
            img: lunchonion,
            title: "Onion Seasoning Chicken",
            key: "lunchonion"
        },
    ],
    Salad: [
        {
            img: broccoli,
            title: "Broccoli Salad",
            key: "broccoli"
        },
        {
            img: pasta,
            title: "Pasta Salad",
            key: "pasta"
        },
        {
            img: mac,
            title: "Mac and Cheese",
            key: "mac"
        },
        {
            img: potato,
            title: "Potato and Bacon",
            key: "potato"
        },
        {
            img: lunchcoleslaw,
            title: "Coleslaw",
            key: "lunchcoleslaw"
        },
        {
            img: salad,
            title: "Balsamic and Vineger Salad",
            key: "salad"
        },
        {
            img: udon,
            title: "Udon Salad",
            key: "udon"
        },
        {
            img: spicyudon,
            title: "Spicy Udon Salad",
            key: "spicyudon"
        }
    ]
}

export const Sides = [
    {
        img: chips,
        title: "Chips",
        price: "Medium: $4 | Large: $6",
        key: "chips"
    },
    {
        img: rice,
        title: "Rice",
        price: "$2 per serving.",
        key: "rice"
    },
    {
        img: radish,
        title: "Radish",
        price: "$2 per serving.",
        key: "radish"
    },
    {
        img: coleslaw,
        title: "Coleslaw",
        price: "$2 per serving.",
        key: "coleslaw"
    },
    {
        img: sauce,
        title: "Sauce",
        price: "$3 per serving.",
        key: "sauce"
    },
]