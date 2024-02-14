import original from '../Images/original.jpg'
import chicken from '../Images/chicken.jpg'
import boneless from '../Images/boneless.jpg'
import nibble from '../Images/nibble.jpg'
import halfchicken from '../Images/halfchicken.png'

export const Cut = [
    {
        img: "https://i.ibb.co/DDbT9sZ/original.jpg",
        title: "Whole Chicken",
        key: 'whole'
    },
    {
        img: boneless,
        title: "Boneless Chicken",
        key: 'boneless'
    },
    {
        img: nibble,
        title: "Chicken Nibbles",
        key: 'nibble'
    },
]

export const OrderChicken = [
    {
        img: halfchicken,
        title: "1/2 Chicken",
        type: "halfchicken",
        price: null,
        priceLabel: "From $19",
        key: "half",
        details: true
    },
    {
        img: chicken,
        title: "Full Chicken",
        type: "fullchicken",
        price: null,
        priceLabel: "From $35",
        key: "full",
        details: true
    }
]

export const ChickenSides = [
    {
        title: "No Sides",
        key: "nosides",
    },
    {
        img: "https://i.ibb.co/kMC9B7F/radish.jpg",
        title: "Pickled Radish",
        key: "radish",
    },
    {
        img: "https://i.ibb.co/ZHLNNpj/coleslaw.jpg",
        title: "Coleslaw",
        key: "coleslaw",
    },
]

export const Toppings = [
    {
        title: 'Sesame',
        key: 'sesame'
    },
    {
        title: 'Peanuts',
        key: 'peanuts'
    },
    {
        title: 'Parsley',
        key: 'parsley'
    },
    {
        img: "https://i.ibb.co/svjCrz4/snowy.jpg",
        title: "Snowy Cheese Topping",
        price: 2,
        key: "snowy"
    },
    {
        img: "https://i.ibb.co/mtbRYM4/onion.jpg",
        title: "Onion Seasoning Topping",
        price: 2,
        key: "onion"
    },
]

// export const Lunch = {
//     Chicken: [
//         {
//             img: teriyaki,
//             title: "Teriyaki Chicken",
//             key: "teriyaki"
//         },
//         {
//             img: bulgogi,
//             title: "Bulgogi",
//             key: "bulgogi"
//         },
//         {
//             img: popcorn,
//             title: "Popcorn Chicken",
//             key: "popcorn"
//         },
//         {
//             img: lunchspicy,
//             title: "Spicy Chicken",
//             key: "lunchspicy"
//         },
//         {
//             img: lunchhoney,
//             title: "Honey Butter Chicken",
//             key: "lunchhoney"
//         },
//         {
//             img: bbq,
//             title: "BBQ Chicken",
//             key: "lunchbbq"
//         },
//         {
//             img: garlic,
//             title: "Garlic Soy Chicken",
//             key: "lunchgarlic"
//         },
//         {
//             img: lunchonion,
//             title: "Onion Seasoning Chicken",
//             key: "lunchonion"
//         },
//     ],
//     Salad: [
//         {
//             img: broccoli,
//             title: "Broccoli Salad",
//             key: "broccoli"
//         },
//         {
//             img: pasta,
//             title: "Pasta Salad",
//             key: "pasta"
//         },
//         {
//             img: mac,
//             title: "Mac and Cheese",
//             key: "mac"
//         },
//         {
//             img: potato,
//             title: "Potato and Bacon",
//             key: "potato"
//         },
//         {
//             img: lunchcoleslaw,
//             title: "Coleslaw",
//             key: "lunchcoleslaw"
//         },
//         {
//             img: salad,
//             title: "Balsamic and Vineger Salad",
//             key: "salad"
//         },
//         {
//             img: udon,
//             title: "Udon Salad",
//             key: "udon"
//         },
//         {
//             img: spicyudon,
//             title: "Spicy Udon Salad",
//             key: "spicyudon"
//         }
//     ]
// }

export const Sauces = [
    {
        title: "Korean",
        key: 'korean'
    },
    {
        title: "Spicy",
        key: 'spicy'
    },
    {
        title: "Hot and Spicy",
        key: 'hotandspicy'
    },
    {
        title: "Sweet Chilly",
        key: 'sweetchilly'
    },
]