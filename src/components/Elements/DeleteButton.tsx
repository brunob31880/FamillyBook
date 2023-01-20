
import { useSlate, ReactEditor } from "slate-react";
import { Button} from "../common/Button";
import { Icon } from "../common/Icon";
import { Transforms, Element as SlateElement } from "slate";
/**
 *
 * @param param0
 * @returns
 */
export const DeleteButton = ({ icon }) => {
  const editor = useSlate();
  //  const path = ReactEditor.findPath(editor, element);

  return (
    <Button
      onMouseDown={(event) => {
        event.preventDefault();
        const { selection } = editor;

        //
        // Avoir la selection en cours dans l'editeur

        let selected;
        if (selection !== null && selection.anchor !== null) {
          selected = editor.children[selection.anchor.path[0]];
        } else {
          selected = null;
        }
        if (selected) {
          console.log("Delete Button Selected: ", selected);
   //       const path = ReactEditor.findPath(editor, selected);
   //       Transforms.removeNodes(editor, { at: path });
        }
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  );
};
