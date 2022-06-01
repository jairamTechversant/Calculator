/* eslint-disable no-new-func */
import React, { useState } from "react";
import { Button } from "./Common/Button";
import { InputBox } from "./Common/InputBox";



export const Parent = () => {
    const [showValue, setShowValue] = useState('');
    const [undo, setUndo] = useState([]);
    const [undoBtnClk,setUndoBtnClk] = useState(1);
    const [removeButton] = useState([{ text: "CE"}, { text: "C" }, { text: "Copy"}]);
    const [degreeButton] = useState([{ text: "sin"}, { text: "cos"}, { text: "tan"}]);
    const [operatorButton] = useState([{ text: "Undo"}, { text: "+"}, { text: "-"}, { text: "x"}, { text: "/"}, { text: "="}]);
    const [extraButton] = useState([{ text: "(" }, { text: "0" }, { text: ")"}]);

/*** {CALLBACK FUNCTIONS START HERE} ***/

    //... CALCULATOR BUTTON CLICK BASED CHANGE STATE VALUE ...//
    const buttonHandleFunction = (input) => {
        if (input === "=") {
            try {
                if(showValue.includes("sin" || "cos" || "tan")){
                    let res =degreeFunc(showValue);
                    let calc = new Function("return " + res);
                    setShowValue(calc);
                }else{
                let undoArr = [...undo];
                undoArr.push(showValue);
                let changeMul = showValue.replace("x","*");
                let calc = new Function("return " + changeMul);
                setShowValue(calc);
                setUndo(undoArr);
                setUndoBtnClk(1);
            }
            } catch (error) {
                setShowValue("Error");
            };
        } else if (input === "Copy") {
            copyFunc();
        } else if (input === "CE") {
            setShowValue("");
        }else if (input === "C") {
            deleteFunc();
        }else if (input === "sin" || input === "cos" || input === "tan") {
            let deg = showValue.concat(input + "()");
            setShowValue(deg);
        }else if (input === "Undo") {
            let val =undo[undo.length-undoBtnClk];
            if(val){
            setUndoBtnClk((pre)=>pre +1);
            setShowValue(val);
            };
        } else {
            let mergeStr = showValue.toString().concat(input);
            setShowValue(mergeStr);
        }
    };
    // ... USER GIVE INPUT BASED STATE VALUE CHANGE ...//
    const handleChange = (e) => {
        setShowValue(e.target.value);
        document.getElementById("input").addEventListener('keydown', (e) => {
            if (e.key === "Delete") {
                deleteFunc();
            }
        });
    };

    //... DELETE LAST VALUE FUNCTION ...//
    const deleteFunc = () => {
        let arr = showValue.split(/(?!$)/u);
        arr.pop();
        let str = arr.join('');
        setShowValue(str);
    };

    //... COPY TO CLIPBOARD FUNCTION ...//
    const copyFunc =()=>{
        navigator.clipboard.writeText(showValue);
    };

    //... DEGREE CALCULATION FUNCTION ...//
    const degreeFunc = (input) => {
        let arr1 =input;
        if(arr1.indexOf("sin") !== -1) return arr1.slice(0, arr1.indexOf("sin")) + "Math." + arr1.slice(arr1.indexOf("sin"))
                
        setShowValue(arr1);
    };

    //... CALCULATOR BUTTON RENDER FUNCTION ...//
    const buttonRenderFunc = (type) => {
        let typeValueArr = type === "degree" ? degreeButton : type === "remove" ? removeButton : type === "operator" ? operatorButton : type === "extra" ? extraButton : '';
        if (type === "number") {
            let buttonsArr = [];
            for (let i = 1; i < 10; i++) {
                buttonsArr.push(<Button className="btn-style" buttonText={i} key={i} onClick={() => buttonHandleFunction(i)} />);
            };
            return buttonsArr;
        } else {
            let button = typeValueArr?.map((val, idx) => {
                return <Button
                    className={type === "operator" && val.text !== "=" && val.text !== "Undo" ? "btn-style mr-rmv clr-add" : type === "operator" ? "btn-style mr-rmv" : "btn-style"}
                    style={{ backgroundColor: val.text === "=" ? "#00FA9A" : "", color: val.text === "=" ? "white" : "", }}
                    buttonText={val.text} key={idx} onClick={() => buttonHandleFunction(val.text)} />
            })
            return button;
        }
    };

/*** {CALLBACK FUNCTIONS END HERE} ***/

//... COMPONENT RENDER PART ...//
    return (
        <div className="card">
            <InputBox className="input-box" id="input" value={showValue ?? ""} onChange={handleChange} />
            <div className="num-align">
                <div>
                    <div className="grid-container">
                        {buttonRenderFunc("remove")}
                    </div>
                    {buttonRenderFunc("degree")}
                    {buttonRenderFunc("number")}
                    {buttonRenderFunc("extra")}
                </div>
                <div>
                    {buttonRenderFunc("operator")}
                </div>
            </div>
        </div>
    );
};