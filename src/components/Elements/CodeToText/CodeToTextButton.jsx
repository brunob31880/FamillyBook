import React from "react";
import Button from "../../common/Button";
import Icon from "../../common/Icon";
import "./codeToTextButton.css";
/**
 *
 * @param {*} props
 * @returns
 */
const CodeToTextButton = (props) => {
  const { handleButtonClick } = props;

  return (
    <Button
      format="insert Code"
      onClick={() => handleButtonClick({ showInput: true, action: "insert" })}
    >
      <Icon icon="insertCode" />
    </Button>
  );
};

export default CodeToTextButton;
