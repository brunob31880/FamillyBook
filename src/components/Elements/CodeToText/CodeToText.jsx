import React, { useEffect, useRef, useState } from 'react';
import './codeToText.css'
import Icon from '../../common/Icon'
import { Interweave } from 'interweave';
import { Transforms } from 'slate';
import { useSlateStatic } from 'slate-react';
/**
 * 
 * @param {*} props 
 * @returns 
 */
const CodeToText = (props)=>{

    const {code,action,location,handleCodeToText} = props
    const codeToTextRef = useRef();
    const wrapperRef = useRef();

    const editor = useSlateStatic();
    const checkClick = (e)=>{
        const clickedComponent = e.target;
            if(wrapperRef?.current?.contains(clickedComponent)&& !codeToTextRef?.current?.contains(clickedComponent)){
                let partialState = {
                    showInput:false
                }
                if(code){
                    partialState.code = action === 'update' ? '' : code 
                }
                handleCodeToText(partialState);
            }
    }
    useEffect(()=>{
        document.addEventListener('click',checkClick);
        return ()=>{
            document.removeEventListener('click',checkClick);
        }
    },[])

    const codeOnChange = async(e)=>{
        // e.preventDefault();
        handleCodeToText({code:e.target.value});
    }
    const addCode = ()=>{
        if(code){

            if(action === 'update'){
                Transforms.setNodes(editor,{
                    code,
                },{
                    at:location
                })
                
            }
            else{
                Transforms.insertNodes(editor,{
                    type:'Code',
                    code:code,
                    children:[{text:''}]
                },
                {
                    select:true
                })
                Transforms.insertNodes(editor,{type:'paragraph',children:[{text:''}]})
            }
        }
        handleCodeToText({
            showInput:false,
            code:''
        })
    }
    const clearCode = ()=>{
        handleCodeToText({code:''});
    }
    return (
      
        <div className='code-wrapper' ref={wrapperRef}>
           <div ref={codeToTextRef} className='codeToTextWrapper'>
                <div className='codeToText'>
                    <textarea style={{height:"100%",backgroundColor:"white"}} name="" id="" value={code} onChange={codeOnChange} placeholder='Write code here...'></textarea>
                    <div style={{display:'flex',alignItems:'center',justifyContent:'center',color:'white'}}>
                        <Icon icon='arrowRight'/>
                    </div>
                   <div  className='textOutput'>
                        <Interweave content={code}/>
                    </div>
                </div>
                <div>
                    <button onClick={addCode} className='done'>Done</button>
                    <button className='clear' onClick={clearCode}>Clear</button>
                </div>
            </div>
        </div>
 
    )
}

export default CodeToText;