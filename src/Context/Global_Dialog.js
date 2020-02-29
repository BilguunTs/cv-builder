import React from "react";
import { Dialog, Classes, Button } from "@blueprintjs/core";
import { dialog_types, section_types } from "./config";
const Global_Dialog = props => {
  const { dialog } = props.state;

  const handleClose = () => {
    props.closeDialog();
  };
  const handleAdd = () => {
    if (dialog.targetEl === null) {
      return;
    }
    const { column, sectionIndex, sectionType } = dialog.targetEl;
    if (dialog.targetEl.type === "block") {
      props.createBlock(sectionType, column, sectionIndex);
    }
    handleClose();
  };
  const handleDeleteSection = () => {
    if (dialog.targetEl === null) {
      return;
    } else {
      const { column, sectionIndex, blockIndex } = dialog.targetEl;
      if (dialog.targetEl.type === "section") {
        props.deleteSection(column, sectionIndex);
      } else if (dialog.targetEl.type === "block") {
        props.deleteBlock(column, sectionIndex, blockIndex);
      }
    }
    handleClose();
  };
  const renderInputs = sectionType => {
    let instance;
    switch (sectionType) {
      case section_types.Education:
        instance = "edu";
        break;
      case section_types.Work_History:
        instance = "Workh";
        break;
      case section_types.Interests:
        instance = "Interest";
        break;

      default:
        break;
    }
    return <div>{instance}</div>;
  };
  const renderAction = type => {
    let instance;
    switch (type) {
      case dialog_types.ACCEPT:
        instance = (
          <>
            <Button onClick={handleClose}>Close</Button>

            <Button intent="primary">Accept</Button>
          </>
        );
        break;
      case dialog_types.SUBMIT:
        instance = (
          <>
            <Button onClick={handleClose}>Close</Button>

            <Button intent="primary">Submit</Button>
          </>
        );
        break;
      case dialog_types.WARN:
        instance = (
          <>
            <Button intent="warning">Ok</Button>
          </>
        );
        break;
      case dialog_types.ADD:
        instance = (
          <>
            <Button onClick={handleClose}>Close</Button>

            <Button intent="success" onClick={handleAdd}>
              Add
            </Button>
          </>
        );
        break;
      case dialog_types.DELETE:
        instance = (
          <>
            <Button onClick={handleClose}>Close</Button>

            <Button intent="danger" onClick={handleDeleteSection}>
              Delete
            </Button>
          </>
        );
      default:
        break;
    }
    return <div className={Classes.DIALOG_FOOTER_ACTIONS}>{instance}</div>;
  };
  return (
    <Dialog onClose={handleClose} isOpen={dialog.isOpen}>
      <div className={Classes.DIALOG_HEADER}>
        <h2>{dialog.header}</h2>
      </div>
      <div className={Classes.DIALOG_BODY}>
        <h3>{dialog.body}</h3>
        {dialog.type === dialog_types.ADD
          ? renderInputs(dialog.targetEl.sectionType)
          : null}
      </div>
      <div className={Classes.DIALOG_FOOTER}>{renderAction(dialog.type)}</div>
    </Dialog>
  );
};
export default Global_Dialog;
