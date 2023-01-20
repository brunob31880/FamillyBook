import React, { useEffect, useState } from 'react'
import useContextMenu from '../../../utility/customHooks/useContextMenu';
import Icon from '../../common/Icon';
import { Transforms, Editor, Element, Node, Path } from 'slate';
import { ReactEditor } from 'slate-react';


const CodeContextMenu = (props) => {
    const {editor,handleCodeToText} = props;
    const [selection,setSelection] = useState()
    const [showMenu,{top,left}] = useContextMenu(editor,'Code',setSelection);

    const handleEditCode = () => {
        Transforms.select(editor,selection);
        const parentPath = Path.parent(selection.focus.path)
        const codeNode = Node.get(editor,parentPath);
        handleCodeToText({
            showInput:true,
            code:codeNode.code,
            action:'update',
            location:selection
        });
    }

    return (
        showMenu &&
        <div className='contextMenu' style={{top,left}}>
            <div className='menuOption' onClick={handleEditCode}>
                <Icon icon='pen' />
                <span>Edit Code</span>
            </div>
        </div>
    )
}

export default CodeContextMenu;

