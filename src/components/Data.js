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
import chicken from '../Images/chicken.jpg'

export const mSlides = [
    {
        img: mimg1,
        key: mimg1
    },
]

export const slides = [
    {
        img: img1,
        key: img1
    },
]

export const OrderChicken = [
    {
        img: chicken,
        title: "1/2 Chicken",
        type: "halfchicken",
        price: null,
        priceLabel: "From $19",
        key: "halfchicken",
        details: true
    },
    {
        img: chicken,
        title: "Full Chicken",
        type: "fullchicken",
        price: null,
        priceLabel: "From $35",
        key: "fullchicken",
        details: true
    }
]

export const Chicken = [
    {
        img: original,
        title: "Original Fried Chicken",
        halfprice: 20,
        fullprice: 37,
        key: "original"
    },
    {
        img: crispy,
        title: "Crispy Fried Chicken",
        halfprice: 20,
        fullprice: 37,
        key: "crispy"
    },
    {
        img: korean,
        title: "Korean Fried Chicken",
        halfprice: 21,
        fullprice: 39,
        key: "korean"
    },
    {
        img: spicy,
        title: "Spicy Chicken",
        halfprice: 21,
        fullprice: 39,
        key: "spicy"
    },
    {
        img: hotandspicy,
        title: "Hot and Spicy Chicken",
        halfprice: 21,
        fullprice: 39,
        key: "hotandspicy"
    },
    {
        img: sweetchilly,
        title: "Sweet Chilly Chicken",
        halfprice: 21,
        fullprice: 39,
        key: "sweetchilly"
    },
    {
        img: soy,
        title: "Soy Chicken",
        halfprice: 21,
        fullprice: 39,
        key: "soy"
    },
    {
        img: soy,
        title: "Garlic Soy Chicken",
        halfprice: 21,
        fullprice: 39,
        key: "garlicsoy"
    },
    {
        img: spicysoy,
        title: "Spicy Soy Chicken",
        halfprice: 21,
        fullprice: 39,
        key: "spicysoy"
    },
    {
        img: soy,
        title: "BBQ Chicken",
        halfprice: 21,
        fullprice: 39,
        key: "bbq"
    },
    {
        img: honey,
        title: "Honey Butter Chicken",
        halfprice: 22,
        fullprice: 44,
        key: "honey"
    },
    {
        img: padak,
        title: "Padak Chicken",
        halfprice: 25,
        fullprice: 44,
        key: "padak"
    },
    {
        img: snowy,
        title: "Snowy Cheese Topping",
        halfprice: 2,
        key: "snowy"
    },
    {
        img: onion,
        title: "Onion Seasoning Topping",
        halfprice: 2,
        key: "onion"
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
        type: "chips",
        price: 6.00,
        priceLabel: "From $6",
        mediumPrice: 6.00,
        largePrice: 8.00,
        key: "chips",
        details: true,
    },
    {
        img: rice,
        title: "Rice",
        type: "side",
        price: 3.00,
        priceLabel: "$3 per serving",
        key: "rice",
        details: false
    },
    {
        img: radish,
        title: "Pickled Radish",
        type: "side",
        price: 3.00,
        priceLabel: "$3 per serving",
        key: "radish",
        details: false
    },
    {
        img: coleslaw,
        title: "Coleslaw",
        type: "side",
        price: 3.00,
        priceLabel: "$3 per serving",
        key: "coleslaw",
        details: false
    },
    {
        img: sauce,
        title: "Sauce",
        type: "sauce",
        price: 3.00,
        priceLabel: "$3 per serving",
        key: "sauce",
        details: true
    },
]