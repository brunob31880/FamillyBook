import React, { useCallback, useMemo, useState } from "react";
import { createEditor } from "slate";
import { withHistory } from "slate-history";
import { Slate, Editable, withReact } from "slate-react";
import Toolbar from "../../components/Toolbar/Toolbar";
import { getMarked, getBlock } from "../../utility/SlateUtilityFunctions.jsx";
import withLinks from "../../plugins/withLinks.js";
import withTables from "../../plugins/withTable.js";
import withEmbeds from "../../plugins/withEmbeds.js";
import withEquation from "../../plugins/withEquation.js";
import "./Editor.css";
import HtmlToText from "../../components/Elements/HtmlToText/HtmlToText";
import CodeToText from "../../components/Elements/CodeToText/CodeToText";

const Element = (props) => {
  return getBlock(props);
};
const Leaf = ({ attributes, children, leaf }) => {
  children = getMarked(leaf, children);
  return <span {...attributes}>{children}</span>;
};

/**
 *
 * @returns
 */
export const SlateEditor = React.forwardRef((props, ref) => {
  const { givenValue, atChange, handleCategorySelect, categoryRichTextList,iniCategorySelected } =
    props;

  const editor = useMemo(
    () =>
      withEquation(
        withHistory(
          withEmbeds(withTables(withLinks(withReact(createEditor()))))
        )
      ),
    []
  );

  const handleEditorChange = (newValue) => {
    // setValue(newValue);
    const isAtChange = editor.operations.some(
      (op) => "set_selection" !== op.type
    );
    if (isAtChange) {
      atChange(newValue);
    }
  };

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  const [htmlAction, setHtmlAction] = useState({
    showInput: false,
    html: "",
    action: "",
    location: "",
  });

  const [codeAction, setCodeAction] = useState({
    showInput: false,
    code: "",
    action: "",
    location: "",
    langage: "",
  });

  const [categorySelected, setCategorySelected] = useState(iniCategorySelected);

  const renderElement = useCallback(
    (props) => <Element {...props} langage={codeAction.langage} />,
    [codeAction.langage]
  );
  /**
   *
   * @param {*} partialState
   */
  const handleHtmlToText = (partialState) => {
    setHtmlAction((prev) => ({
      ...prev,
      ...partialState,
    }));
  };

  /**
   *
   * @param {*} partialState
   */
  const handleCodeToText = (partialState) => {
    setCodeAction((prev) => ({
      ...prev,
      ...partialState,
    }));
  };

  const handleCategorySelector = (cat) => {
    setCategorySelected(cat);
    handleCategorySelect(cat);
  };
  /**
   *
   * @param {*} lang
   */
  const handleLangageSelect = (lang) => {
    console.log("Choosing langage " + lang);
    setCodeAction((prev) => ({ ...codeAction, langage: lang }));
  };

  return (
    <Slate editor={editor} value={givenValue} onChange={handleEditorChange}>
      <Toolbar
        handleHtmlToText={handleHtmlToText}
        handleCodeToText={handleCodeToText}
        handleLangageSelect={handleLangageSelect}
        handleCategorySelect={handleCategorySelector}
        iniCategorySelected={iniCategorySelected}
        categorySelected={categorySelected}
        langage={codeAction.langage}
        categoryRichTextList={categoryRichTextList}
      />
      <div
        className="editor-wrapper"
        style={{ borderTop: "5px solid black", padding: "0 10px" }}
      >
        <div ref={ref} id="my-node">
          <Editable
            spellCheck
            autoFocus
            placeholder="Write something"
            renderElement={renderElement}
            renderLeaf={renderLeaf}
          />
        </div>
      </div>
      {htmlAction.showInput && (
        <HtmlToText {...htmlAction} handleHtmlToText={handleHtmlToText} />
      )}
      {codeAction.showInput && (
        <CodeToText {...codeAction} handleCodeToText={handleCodeToText} />
      )}
    </Slate>
  );
});

export default SlateEditor;
