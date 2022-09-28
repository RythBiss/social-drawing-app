import React, { useEffect, useRef, useState } from 'react';
import RoundButton from '../Components/RoundButton'
import Undo from '../Images/Drawing Buttons/Undo.svg'
import Brush from '../Images/Drawing Buttons/Brush.svg'
import Pallet from '../Images/Drawing Buttons/Pallet.svg'
import Erase from '../Images/Drawing Buttons/Erase.svg'

export default function DrawingCanvas() {

    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [tempPath, setTempPath] = useState([]);
    const [history, setHistory] = useState([]);

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;

        concatPath(offsetX, offsetY);

        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
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
        console.log('undo...');

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

        const tempArr = [...history];
        tempArr.pop();
        setHistory(tempArr);
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
    }

    //-------------------------------------------------------

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = 500;
        canvas.height = 500;

        const context = canvas.getContext('2d');
        context.lineCap = 'round';
        context.strokeStyle = 'black';
        context.lineWidth = 5;
        contextRef.current = context;
    }, []);

    useEffect(() => {
        history.forEach(path => {
            contextRef.current.beginPath();
            contextRef.current.moveTo(path.tempPath[0].x, path.tempPath[0].y);

            path.tempPath.forEach(point => {
                contextRef.current.lineTo(point.x, point.y);
                contextRef.current.stroke();
            })
        });
    }, [history])

  return (
    <>
        <canvas
            className='drawing-canvas'
            onMouseDown={startDrawing}
            onMouseUp={finishDrawing}
            onMouseMove={draw}
            ref={canvasRef}
        />
        <div className='button-row'>
            {/* for undo and redo, you don't save an 'action'. You save the variables for the action (x and y) in an array, then clear the canvas, then use the array to re-draw the canvas. 
            https://stackoverflow.com/questions/53960651/how-to-make-an-undo-function-in-canvas
            */}
            <RoundButton img={Undo} onClick={undo} />
            <RoundButton img={Brush} onClick={penSize} />
            <RoundButton img={Pallet} onClick={pickColor} />
            <RoundButton img={Erase} onClick={erase} />
        </div>
        <button onClick={submit}>Submit</button>
    </>
  )
}
