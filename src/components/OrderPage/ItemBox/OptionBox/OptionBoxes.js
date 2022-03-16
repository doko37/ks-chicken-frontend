import React from 'react';
import OptionBox from './OptionBox';
import ChickenOption from './ChickenOption';

export default function OptionBoxes(props) {
    let boxes = null

    switch(props.type) {
        case "chips":
            boxes = <div>
                <OptionBox type="size" changeSize={newSize => props.sizeChange(newSize)} size={props.size}/>
                <OptionBox type="powdertopping" changePowderTopping={topping => props.changePowderToppings(topping)} powderToppings={props.powderToppings}/>
            </div>
            break
        case "sauce":
            boxes = <OptionBox type="sauce" sauce={props.sauce} changeSauce={sauce => props.sauceChange(sauce)}/>
            break
        case "halfchicken":
            boxes = <div>
                <ChickenOption changeChicken={chicken => props.changeChicken(chicken)} chicken={props.chicken} itemSelectedState={props.itemSelectedState}/>
                <OptionBox type="cut" changeCut={cut => props.changeCut(cut)} cut={props.cut}/>
                <OptionBox type="chickentopping" changeChickenTopping={topping => props.changeChickenToppings(topping)} chickenToppings={props.chickenToppings} changePowderTopping={topping => props.changePowderToppings(topping)} powderToppings={props.powderToppings}/>
                <OptionBox id="Side" type="side" changeSide={side => props.changeSide(side, "sides1")} side={props.sides.side1}/>
            </div>
            break
        case "fullchicken":
            boxes = <div>
                <ChickenOption changeChicken={chicken => props.changeChicken(chicken)} chicken={props.chicken} itemSelectedState={props.itemSelectedState}/>
                <OptionBox type="cut" changeCut={cut => props.changeCut(cut)} cut={props.cut}/>
                <OptionBox type="chickentopping" changeChickenTopping={topping => props.changeChickenToppings(topping)} chickenToppings={props.chickenToppings} changePowderTopping={topping => props.changePowderToppings(topping)} powderToppings={props.powderToppings}/>
                <OptionBox id="Side 1" type="side" changeSide={side => props.changeSide(side, "sides1")} side={props.sides.side1}/>
                <OptionBox id="Side 2" type="side" changeSide={side => props.changeSide(side, "sides2")} side={props.sides.side2}/>
            </div>
            break
        default:
            boxes = <div/>
            break
    }

  return boxes;
}
