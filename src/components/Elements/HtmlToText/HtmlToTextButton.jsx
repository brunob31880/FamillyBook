import React from 'react';
import Button from '../../common/Button'
import Icon from '../../common/Icon'
/**
 * 
 * @param {*} props 
 * @returns 
 */
const HtmlToTextButton = (props) => {
    const {handleButtonClick} = props
    
    return (
        <>
            <Button format='insert Html' onClick={() => handleButtonClick({showInput:true,action:'insert'})}>
                <Icon icon='insertHtml'/>
            </Button>
        </>
    )
}

export default HtmlToTextButton