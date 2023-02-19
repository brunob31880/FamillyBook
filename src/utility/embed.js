import { Transforms} from 'slate';

import {createParagraph} from './paragraph'
// embeded
export const createEmbedNode = (type,{url,alt,height,width}) =>({
    type,
    alt,
    url,
    height,
    width,
    
    children: [{text:""}]
});

export const insertEmbed = (editor,embedData,format) => {
    const {url} = embedData;
    if(!url) return;
    const embed = createEmbedNode(format,embedData);
    
    Transforms.insertNodes(editor,embed,{select:true});
    Transforms.insertNodes(editor,createParagraph(""))
}