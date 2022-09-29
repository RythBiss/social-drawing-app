import React, { useEffect, useRef, useState } from 'react';
import RoundButton from '../Components/RoundButton';
import Undo from '../Images/Drawing Buttons/Undo.svg';
import Redo from '../Images/Drawing Buttons/Redo.svg';
import Brush from '../Images/Drawing Buttons/Brush.svg';
import Pallet from '../Images/Drawing Buttons/Pallet.svg';
import Erase from '../Images/Drawing Buttons/Erase.svg';
import DynamicPenSettingsMenu from './DynamicPenSettingsMenu';

export default function DrawingCanvas() {

    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [tempPath, setTempPath] = useState([]);
    const [history, setHistory] = useState([]);
    const [forward, setForward] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuType, setMenuType] = useState('');
    const [hex, setHex] = useState('#000');
    const [eraserOn, setEraserOn] = useState(false);
    const [penWidth, setPenWidth] = useState(5);

    //event functions
    //-------------------------------------------------------

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        concatPath(offsetX, offsetY);
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setForward([]);
        setIsDrawing(true);
    };

    const finishDrawing = () => {
        contextRef.current.closePath();
        finilizePath();
        setIsDrawing(false);
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) return;

        const { offsetX, offsetY } = nativeEvent;

        concatPath(offsetX, offsetY);

        if(eraserOn){
            contextRef.current.clearRect(offsetX, offsetY, 16, 16);
        }else{
            contextRef.current.lineTo(offsetX, offsetY);
            contextRef.current.stroke();
        }
    };

    //internal functions
    //-------------------------------------------------------

    const concatPath = (posX, posY) => {
        setTempPath(tempPath.concat({x: posX, y: posY}));
    }

    const finilizePath = () => {
        setHistory(history.concat({tempPath, penWidth, hex, eraserOn}));
        setTempPath([]);
    }

    //drawing actions
    //-------------------------------------------------------

    const undo = () => {
        {/*https://stackoverflow.com/questions/53960651/how-to-make-an-undo-function-in-canvas*/}

        if(history.length > 0){
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

            //creates temporary array, pops it, then sets 'History' to the popped array.
            //redrawing happens in useEffect.
            const tempArr = [...history];
            setForward(forward.concat(tempArr.pop()));
            setHistory(tempArr);
        }
    }
  
    const redo = () => {
        //pop the newest from 'forward' and concat it to 'history'
        if(forward.length > 0){
            const tempArr = [...forward];
            setHistory(history.concat(tempArr.pop()));
            setForward(tempArr);
        }
    }

    const pickWidth = (width) => {
        setPenWidth(width);
        
        if(menuOpen && menuType === 'Pen'){
            setMenuOpen(false);
            setMenuType('');
        }else{
            setMenuOpen(true);
            setMenuType('Pen');
        }
    }

    const pickColor = (color) => {
        if(color.hex) setEraserOn(false);

        setHex(color?.hex);

        if(menuOpen && menuType === 'Color'){
            setMenuOpen(false);
            setMenuType('');
        }else{
            setMenuOpen(true);
            setMenuType('Color');
        }
    }

    const erase = () => {
        console.log('switching to erase tool...');
        //create a 'lineTo' function for the eraser so it doesn't skip
        setEraserOn(!eraserOn);
    }

    const submit = () => {
        console.log('Submiting!')

        const win = window.open();
        win.document.write(`<h1>Drawing Output</h1>`);
        win.document.write(`<img src=${canvasRef.current.toDataURL('image/png')} />`);
    }

    //update effects
    //-------------------------------------------------------

    //initialize
    useEffect(() => {
        const canvas = canvasRef.current;

        //sizes need to match styling.
        canvas.width = 500;
        canvas.height = 500;

        const context = canvas.getContext('2d');
        context.lineCap = 'round';
        context.strokeStyle = hex;
        context.lineWidth = penWidth;
        contextRef.current = context;
    }, []);

    //redraw when history changes
    useEffect(() => {

        history.forEach(path => {
            contextRef.current.beginPath();
            contextRef.current.strokeStyle = path.hex;
            contextRef.current.lineWidth = path.penWidth;
            contextRef.current.moveTo(path.tempPath[0].x, path.tempPath[0].y);

            path.tempPath.forEach(point => {
                if(path.eraserOn){
                    contextRef.current.clearRect(point.x, point.y, 16, 16);
                }else{
                    contextRef.current.lineTo(point.x, point.y);
                    contextRef.current.stroke();
                }
            });
        });

        contextRef.current.strokeStyle = hex;
    }, [history]);

    //update canvas stroke color
    useEffect(() => {
        contextRef.current.strokeStyle = hex;
    }, [hex]);
    
    //update canvas stroke width
    useEffect(() => {
        contextRef.current.lineWidth = penWidth;
    }, [penWidth]);

    //-------------------------------------------------------

  return (
    <>
        <canvas
            className='drawing-canvas'
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            ref={canvasRef}
        />
        <div className='drawing-tools'>
            <div className='button-row'>
                <DynamicPenSettingsMenu open={menuOpen} type={menuType} colorResultFunc={pickColor} penWidthFunc={pickWidth} />
                <RoundButton img={Undo} onClick={undo} />
                <RoundButton img={Brush} onClick={pickWidth} />
                <RoundButton img={Pallet} onClick={pickColor} />
                <RoundButton img={Erase} onClick={erase} />
                <RoundButton img={Redo} onClick={redo} />
            </div>
            <button onClick={submit}>Submit</button>
        </div>
    </>
  )
}