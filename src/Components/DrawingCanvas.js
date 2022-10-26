import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import RoundButton from '../Components/RoundButton';
import Undo from '../Images/Drawing Buttons/Undo.svg';
import Redo from '../Images/Drawing Buttons/Redo.svg';
import Brush from '../Images/Drawing Buttons/Brush.svg';
import Pallet from '../Images/Drawing Buttons/Pallet.svg';
import Erase from '../Images/Drawing Buttons/EraserOff.svg';
import EraseOn from '../Images/Drawing Buttons/EraserOn.svg';
import PenSettings from './PenSettings';
import { postDrawing } from '../Functions/API';
import { motion } from "framer-motion"

export default function DrawingCanvas(props) {
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
    const [penWidth, setPenWidth] = useState(9);
    const [frameSize, setFrameSize] = useState(0);

    //event functions
    //-------------------------------------------------------

    const scaleToFrame = (_x, _y) => {
       return { x: (_x / (frameSize / 500)), y: (_y / (frameSize / 500)) }
    }

    const startDrawing = ({ nativeEvent }) => {

        setMenuOpen(false);
        setMenuType('');

        const target = nativeEvent.target.getBoundingClientRect();
        const coords = {
            offsetX: (nativeEvent.touches) ? nativeEvent.touches[0].pageX - target.left : nativeEvent.offsetX,
            offsetY: (nativeEvent.touches) ? nativeEvent.touches[0].pageY - target.top : nativeEvent.offsetY
        }
        const plots = scaleToFrame(coords.offsetX, coords.offsetY);;

        concatPath(plots.x, plots.y);
        contextRef.current.beginPath();
        contextRef.current.moveTo(plots.x, plots.y);
        setForward([]);
        setIsDrawing(true);
    };

    const finishDrawing = () => {
        if(isDrawing){
            contextRef.current.closePath();
            commitPath();
            setIsDrawing(false);
        }
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) return;

        // const { offsetX, offsetY } = nativeEvent;
        const target = nativeEvent.target.getBoundingClientRect();
        const coords = {
            offsetX: (nativeEvent.touches) ? nativeEvent.touches[0].pageX - target.left : nativeEvent.offsetX,
            offsetY: (nativeEvent.touches) ? nativeEvent.touches[0].pageY - target.top : nativeEvent.offsetY
        }
        const plots = scaleToFrame(coords.offsetX, coords.offsetY);

        concatPath(plots.x, plots.y);
        generateStroke(plots.x, plots.y);
    };

    //internal functions
    //-------------------------------------------------------

    const concatPath = (posX, posY) => {
        setTempPath(tempPath.concat({x: posX, y: posY}));
    }

    const commitPath = () => {
        setHistory(history.concat({tempPath, penWidth, hex, eraserOn, }));
        setTempPath([]);
    }

    const generateStroke = (x, y) => {
        contextRef.current.lineTo(x, y);
        contextRef.current.stroke();
    }

    //drawing actions
    //-------------------------------------------------------

    const undo = () => {
        /*https://stackoverflow.com/questions/53960651/how-to-make-an-undo-function-in-canvas*/

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
        if(typeof width === 'number') {
            setPenWidth(width);
            setEraserOn(false)
        }
        
        if(menuOpen && menuType === 'Pen'){
            setMenuOpen(false);
            setMenuType('');
        }else{
            setMenuOpen(true);
            setMenuType('Pen');
        }
    }

    const pickColor = (color) => {
        //turns off eraser if a color is selected.
        if(typeof color === 'string') {
            setHex(color);
            setEraserOn(false);
        }

        if(menuOpen && menuType === 'Color'){
            setMenuOpen(false);
            setMenuType('');
        }else{
            setMenuOpen(true);
            setMenuType('Color');
        }
    }

    const erase = () => {
        setEraserOn(!eraserOn);
    }

    const submit = async() => {
        if(history.length !== 0){
            props.setLoading(true)
            await postDrawing(canvasRef.current, props.onCompletion);
        }
    }

    //update effects
    //-------------------------------------------------------

    useEffect(() => {
        props.setLoading(false)
    }, []);

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

        setFrameSize(canvasRef.current.offsetWidth);
        // eslint-disable-next-line
    }, []);

    //redraw when history changes
    useEffect(() => {
        history.forEach(path => {
            contextRef.current.beginPath();
            contextRef.current.moveTo(path.tempPath[0].x, path.tempPath[0].y);
            contextRef.current.strokeStyle = path.hex;
            contextRef.current.lineWidth = path.penWidth;
            path.eraserOn ? contextRef.current.globalCompositeOperation = 'destination-out' : contextRef.current.globalCompositeOperation = 'source-over';
            

            path.tempPath.forEach(point => {
                generateStroke(point.x, point.y);
            });
        });

        contextRef.current.strokeStyle = hex;
        contextRef.current.lineWidth = penWidth;
        eraserOn ? contextRef.current.globalCompositeOperation = 'destination-out' : contextRef.current.globalCompositeOperation = 'source-over';
        // eslint-disable-next-line
    }, [history]);

    //update canvas stroke color
    useEffect(() => {
        contextRef.current.strokeStyle = hex;
    }, [hex]);
    
    //update canvas stroke width
    useEffect(() => {
        contextRef.current.lineWidth = penWidth;
    }, [penWidth]);

    //update erase mode
    useEffect(() => {
        eraserOn ? contextRef.current.globalCompositeOperation = 'destination-out' : contextRef.current.globalCompositeOperation = 'source-over';
    }, [eraserOn]);

    useLayoutEffect(() => {
        const resizeListener = () => { if(canvasRef.current.offsetWidth !== frameSize) setFrameSize(canvasRef.current.offsetWidth) }

        window.addEventListener('resize', resizeListener);

        return () => window.removeEventListener('resize', resizeListener);
    });

    //-------------------------------------------------------

    const canvasAnim = {
        hidden: { opacity: 0, y: '50%' },
        show: { opacity: 1, y: '0%',
        transition: { duration: 0.25, type: "tween", delay: 0.05 }
    }
      };

    const submitButton = {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            delay: 0.5
          }
        }
      };

    const buttonsContainer = {
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: {
            staggerChildren: 0.05,
            delayChildren: 0.25
          }
        }
      };

      const buttonAnim = {
        hidden: { opacity: 0 },
        show: { opacity: 1 }
      };

  return (
    <>
        <motion.canvas
            variants={canvasAnim} initial="hidden" animate="show"
            className='drawing-canvas'
            onMouseDown={startDrawing}
            onTouchStart={startDrawing}
            onMouseUp={finishDrawing}
            onTouchEnd={finishDrawing}
            onMouseMove={draw}
            onTouchMove={draw}
            onMouseLeave={finishDrawing}
            ref={canvasRef}
        />
        <div className='drawing-tools'>
            <motion.div className='button-row' variants={buttonsContainer} initial="hidden" animate="show">
                <PenSettings open={menuOpen} type={menuType} colorResultFunc={pickColor} penWidthFunc={pickWidth} />
                <RoundButton img={Undo} onClick={undo} variants={buttonAnim} />
                <RoundButton img={Brush} onClick={pickWidth} variants={buttonAnim} />
                <RoundButton img={Pallet} onClick={pickColor} variants={buttonAnim} />
                {eraserOn ? <RoundButton toggled={true} img={EraseOn} onClick={erase} variants={buttonAnim} /> : <RoundButton toggled={false} img={Erase} onClick={erase} variants={buttonAnim} />}
                <RoundButton img={Redo} onClick={redo} variants={buttonAnim} />
            </motion.div>
            <motion.button onClick={submit} variants={submitButton} initial="hidden" animate="show">Submit</motion.button>
        </div>
    </>
  )
}