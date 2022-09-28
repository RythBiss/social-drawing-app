import React, { useEffect, useRef, useState } from 'react';
import RoundButton from '../Components/RoundButton';
import Undo from '../Images/Drawing Buttons/Undo.svg';
import Redo from '../Images/Drawing Buttons/Redo.svg';
import Brush from '../Images/Drawing Buttons/Brush.svg';
import Pallet from '../Images/Drawing Buttons/Pallet.svg';
import Erase from '../Images/Drawing Buttons/Erase.svg';
import RoundButtonPopUp from './RoundButtonPopUp';

export default function DrawingCanvas() {

    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [tempPath, setTempPath] = useState([]);
    const [history, setHistory] = useState([]);
    const [forward, setForward] = useState([]);

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

        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    };

    const concatPath = (posX, posY) => {
        setTempPath(tempPath.concat({x: posX, y: posY}));
    }

    const finilizePath = () => {
        setHistory(history.concat({tempPath}));
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

    const penSize = () => {
        console.log('open pen size tray...')
    }

    const pickColor = () => {
        console.log('open color tray...')
    }

    const erase = () => {
        console.log('switching to erase tool...');
    }

    const submit = () => {
        console.log('Submiting!')

        const win = window.open();
        win.document.write(`<h1>Drawing Output</h1>`);
        win.document.write(`<img src=${canvasRef.current.toDataURL('image/png')} />`);
    }

    //-------------------------------------------------------

    useEffect(() => {
        const canvas = canvasRef.current;

        //sizes need to match styling.
        canvas.width = 500;
        canvas.height = 500;

        const context = canvas.getContext('2d');
        context.lineCap = 'round';
        context.strokeStyle = 'black';
        context.lineWidth = 5;
        contextRef.current = context;
    }, []);

    useEffect(() => {
        console.log(`forward: ${forward}`)

        history.forEach(path => {
            contextRef.current.beginPath();
            contextRef.current.moveTo(path.tempPath[0].x, path.tempPath[0].y);

            path.tempPath.forEach(point => {
                contextRef.current.lineTo(point.x, point.y);
                contextRef.current.stroke();
            })
        });
    }, [history]);

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
                <RoundButton img={Undo} selectable={true} onClick={undo} />
                <RoundButton img={Brush} selectable={true} onClick={penSize} />
                <RoundButton img={Pallet} selectable={true} onClick={pickColor} />
                <RoundButton img={Erase} selectable={true} onClick={erase} />
                <RoundButton img={Redo} selectable={true} onClick={redo} />
                <RoundButtonPopUp selected={true} />
            </div>
            <button onClick={submit}>Submit</button>
        </div>
    </>
  )
}
