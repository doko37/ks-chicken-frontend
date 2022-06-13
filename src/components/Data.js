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
        halfprice: 19,
        fullprice: 35,
        key: "original"
    },
    {
        img: crispy,
        title: "Crispy Fried Chicken",
        halfprice: 19,
        fullprice: 35,
        key: "crispy"
    },
    {
        img: korean,
        title: "Korean Fried Chicken",
        halfprice: 20,
        fullprice: 37,
        key: "korean"
    },
    {
        img: spicy,
        title: "Spicy Chicken",
        halfprice: 20,
        fullprice: 37,
        key: "spicy"
    },
    {
        img: hotandspicy,
        title: "Hot and Spicy Chicken",
        halfprice: 20,
        fullprice: 37,
        key: "hotandspicy"
    },
    {
        img: sweetchilly,
        title: "Sweet Chilly Chicken",
        halfprice: 20,
        fullprice: 37,
        key: "sweetchilly"
    },
    {
        img: soy,
        title: "Soy Chicken",
        halfprice: 20,
        fullprice: 37,
        key: "soy"
    },
    {
        img: soy,
        title: "Garlic Soy Chicken",
        halfprice: 20,
        fullprice: 37,
        key: "garlicsoy"
    },
    {
<<<<<<< HEAD
=======
        img: soy,
        title: "BBQ Chicken",
        halfprice: 20,
        fullprice: 37,
        key: "bbq"
    },
    {
>>>>>>> 9e7b2317363948fae9ca3d13cfaac912251e064e
        img: spicysoy,
        title: "Spicy Soy Chicken",
        halfprice: 20,
        fullprice: 37,
        key: "spicysoy"
    },
    {
        img: soy,
        title: "BBQ Chicken",
        halfprice: 20,
        fullprice: 37,
        key: "bbq"
    },
    {
        img: honey,
        title: "Honey Butter Chicken",
        halfprice: 21,
        fullprice: 41,
        key: "honey"
    },
    {
        img: padak,
        title: "Padak Chicken",
        halfprice: 24,
<<<<<<< HEAD
        fullprice: 42,
=======
        fullprice: 43,
>>>>>>> 9e7b2317363948fae9ca3d13cfaac912251e064e
        key: "padak"
    },
    {
        img: snowy,
        title: "Snowy Cheese Topping",
<<<<<<< HEAD
        halfprice: 2,
=======
        price: "$2 per half.",
>>>>>>> 9e7b2317363948fae9ca3d13cfaac912251e064e
        key: "snowy"
    },
    {
        img: onion,
        title: "Onion Seasoning Topping",
<<<<<<< HEAD
        halfprice: 2,
=======
        price: "$2 per half.",
>>>>>>> 9e7b2317363948fae9ca3d13cfaac912251e064e
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
<<<<<<< HEAD
        type: "chips",
        price: 5.00,
        priceLabel: "From $5",
        mediumPrice: 5.00,
        largePrice: 7.00,
        key: "chips",
        details: true,
=======
        price: "Medium: $5 | Large: $7",
        key: "chips"
>>>>>>> 9e7b2317363948fae9ca3d13cfaac912251e064e
    },
    {
        img: rice,
        title: "Rice",
<<<<<<< HEAD
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
=======
        price: "$3 per serving.",
        key: "rice"
    },
    {
        img: radish,
        title: "Radish",
        price: "$3 per serving.",
        key: "radish"
>>>>>>> 9e7b2317363948fae9ca3d13cfaac912251e064e
    },
    {
        img: coleslaw,
        title: "Coleslaw",
<<<<<<< HEAD
        type: "side",
        price: 3.00,
        priceLabel: "$3 per serving",
        key: "coleslaw",
        details: false
=======
        price: "$3 per serving.",
        key: "coleslaw"
>>>>>>> 9e7b2317363948fae9ca3d13cfaac912251e064e
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