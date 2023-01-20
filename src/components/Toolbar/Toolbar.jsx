import React, { useEffect, useState } from "react";
import { useSlate } from "slate-react";
import { Range } from "slate";
import Button from "../common/Button";
import Icon from "../common/Icon";

import {
  toggleBlock,
  toggleMark,
  isMarkActive,
  addMarkData,
  isBlockActive,
  activeMark,
} from "../../utility/SlateUtilityFunctions";
import useFormat from "../../utility/customHooks/useFormat";
import defaultToolbarGroups from "./toolbarGroups.js";
import "./styles.css";
import ColorPicker from "../Elements/ColorPicker/ColorPicker";
import LinkButton from "../Elements/Link/LinkButton";
import Embed from "../Elements/Embed/Embed";
import TableSelector from "../Elements/Table/TableSelector";
import EquationButton from "../Elements/Equation/EquationButton";
import Id from "../Elements/ID/ID";
import TableContextMenu from "../Elements/TableContextMenu/TableContextMenu";
import HtmlToTextButton from "../Elements/HtmlToText/HtmlToTextButton";
import HtmlContextMenu from "../Elements/HtmlToText/HtmlContextMenu";
import CodeToTextButton from "../Elements/CodeToText/CodeToTextButton";
import CodeContextMenu from "../Elements/CodeToText/CodeContextMenu";

/**
 *
 * @param {*} props
 * @returns
 */
const Toolbar = (props) => {
  const {
    handleHtmlToText,
    handleCodeToText,
    handleLangageSelect,
    langage,
    categorySelected,
    categoryRichTextList,
    handleCategorySelect,
  } = props;
 
  const editor = useSlate();
  const isTable = useFormat(editor, "table");
  const [toolbarGroups, setToolbarGroups] = useState(defaultToolbarGroups);

  useEffect(() => {
    // Filter out the groups which are not allowed to be inserted when a table is in focus.
    let filteredGroups = [...defaultToolbarGroups];
    if (isTable) {
      filteredGroups = toolbarGroups.map((grp) =>
        grp.filter(
          (element) =>
            //groups that are not supported inside the table
            !["codeToText"].includes(element.type)
        )
      );
      filteredGroups = filteredGroups.filter((elem) => elem.length);
    }
    setToolbarGroups(filteredGroups);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTable]);

  const BlockButton = ({ format }) => {
    return (
      <Button
        active={isBlockActive(editor, format)}
        format={format}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleBlock(editor, format);
        }}
      >
        <Icon icon={format} />
      </Button>
    );
  };
  /**
   * 
   * @param {*} param0 
   * @returns 
   */
  const MarkButton = ({ format }) => {
    return (
      <Button
        active={isMarkActive(editor, format)}
        format={format}
        onMouseDown={(e) => {
          e.preventDefault();
          toggleMark(editor, format);
        }}
      >
        <Icon icon={format} />
      </Button>
    );
  };
  const Dropdown = ({ format, options }) => {
    return (
      <select
        style={{ display: "inline" }}
        value={activeMark(editor, format)}
        onChange={(e) => changeMarkData(e, format)}
      >
        {options.map((item, index) => (
          <option key={index} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
    );
  };
  /**
   * 
   * @param {*} param0 
   * @returns 
   */
  const DropdownCode = ({ code, options }) => {
    return (
      <select
        style={{ display: "inline" }}
        onChange={(e) => changeCode(e)}
        value={langage}
      >
        {options.map((item, index) => (
          <option key={index} value={item.value}>
            {item.text}
          </option>
        ))}
      </select>
    );
  };
  /**
   *
   * @param {*} event
   */
  const changeCode = (event) => {
    event.preventDefault();
    const value = event.target.value;
    handleLangageSelect(value);
  };
  /**
   *
   * @param {*} event
   */
  const changeCategory = (event) => {
    event.preventDefault();
    const value = event.target.value;
    handleCategorySelect(value);
  };
  /**
   *
   * @param {*} param0
   * @returns
   */
  const CategorySelector = ({ options }) => {
    console.log("Options: " + options);
    return (
      <select
        style={{ display: "inline" }}
        onChange={(e) => changeCategory(e)}
        value={categorySelected}
      >
        {options.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    );
  };
  /**
   *
   * @param {*} event
   * @param {*} format
   */
  const changeMarkData = (event, format) => {
    event.preventDefault();
    const value = event.target.value;
    addMarkData(editor, { format, value });
  };

  return (
    <div className="toolbar">
      {toolbarGroups.map((group, index) => (
        <span key={index} className="toolbar-grp">
          {group.map((element) => {
            switch (element.type) {
              case "block":
                return <BlockButton key={element.id} {...element} />;
              case "mark":
                return <MarkButton key={element.id} {...element} />;
              case "dropdown":
                return <Dropdown key={element.id} {...element} />;
              case "dropdown-code":
                return <DropdownCode key={element.id} {...element} />;
              case "link":
                return (
                  <LinkButton
                    key={element.id}
                    active={isBlockActive(editor, "link")}
                    editor={editor}
                  />
                );
              case "embed":
                return (
                  <Embed
                    key={element.id}
                    format={element.format}
                    editor={editor}
                  />
                );
              case "color-picker":
                return (
                  <ColorPicker
                    key={element.id}
                    activeMark={activeMark}
                    format={element.format}
                    editor={editor}
                  />
                );
              case "table":
                return <TableSelector key={element.id} editor={editor} />;
              case "id":
                return <Id editor={editor} />;
              case "equation":
                return <EquationButton editor={editor} />;
              case "htmlToText":
                return (
                  <HtmlToTextButton handleButtonClick={handleHtmlToText} />
                );
              case "insertCode":
                return (
                  <CodeToTextButton handleButtonClick={handleCodeToText} />
                );
              case "categorySelector":
                console.log("Category Selector ", categoryRichTextList);
                return (
                  <CategorySelector
                    key={element.id}
                    options={categoryRichTextList}
                    handleButtonClick={changeCategory}
                  />
                );
              default:
                return null;
            }
          })}
        </span>
      ))}
      <TableContextMenu editor={editor} />
      <HtmlContextMenu editor={editor} handleHtmlToText={handleHtmlToText} />
      <CodeContextMenu editor={editor} handleCodeToText={handleCodeToText} />
    </div>
  );
};

export default Toolbar;
