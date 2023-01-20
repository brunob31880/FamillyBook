import React, { useEffect } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Transforms, Path, Node } from "slate";
import {
  useSelected,
  useFocused,
  useSlateStatic,
  ReactEditor,
} from "slate-react";
import useFormat from "../../../utility/customHooks/useFormat";

const Code = (props) => {
  const { attributes, element, children, langage } = props;
  const selected = useSelected();
  const focused = useFocused();
  const editor = useSlateStatic();
  console.log("Rendering in " + langage);
  const isCodeEmbed = useFormat(editor, "Code");

  const handleKeyUp = (e) => {
    if (!isCodeEmbed) return;
    if (e.keyCode === 13) {
      const parentPath = Path.parent(editor.selection.focus.path);
      const nextPath = Path.next(parentPath);
      Transforms.insertNodes(
        editor,
        {
          type: "paragraph",
          children: [{ text: "" }],
        },
        {
          at: nextPath,
          select: true, // Focus on this node once inserted
        }
      );
    } else if (e.keyCode === 8) {
      Transforms.removeNodes(editor);
    }
    // console.log(e);
  };
  useEffect(() => {
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [isCodeEmbed]);

  //console.log("ELEMENT", element)
  return (
    <div
      {...attributes}
      {...element.attr}
      style={{
        boxShadow: selected && focused && "0 0 3px 3px lightgray",
        marginRight: "20px",
      }}
    >
      <div contentEditable={false}>
        <SyntaxHighlighter language={langage} style={docco}>
        {element.code}
        </SyntaxHighlighter>     
      </div>
      {children}
    </div>
  );
};

export default Code;
