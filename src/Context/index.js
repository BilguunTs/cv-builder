import React, { createContext, createRef, forwardRef } from "react";
import update from "immutability-helper";
import { array_move } from "../components/Draggables/utils";
import { block_types, config, section_types } from "./config";
export const Contextulize = createContext();

export class ContextWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      snippets: {
        globalColor: "#39c3b1",
        globalDrag: { isOn: false, id: null },
        gfond: "Century Gothic",
        toast: {
          isOpen: false,
          content: null,
          type: null,
        },
        callout: {
          isOpen: false,
          content: null,
          type: null,
        },
        effect: {
          isOn: false,
          type: null,
          duration: null,
        },
      },
      dialog: {
        isOpen: false,
        type: undefined,
        header: undefined,
        body: undefined,
        action: undefined,
        targetEl: null,
      },
      blocks: [],
      existing_section_types: [],
      targetBlock: null,
      isPreviewOpen: false,
      sidedrawer: {
        isOpen: false,
      },
      heading: null,
      summary: null,
      leftCollumn: {
        id: "L",
        sections: [
          {
            id: "0",
            title: "Education",
            type: block_types.main.Education,
            blocks: [
              {
                id: "_0r",
                fieldofstudy: "",
                degree: "",
                school: "",
                schoollocation: "",
                startDate: "",
                endDate: "",
                description: "",
              },
            ],
          },
          {
            id: "1",
            title: "Work history",
            type: block_types.main.Work_History,
            blocks: [
              {
                id: "hie3",
                value: "3",
                jobtitle: "",
                employer: "",
                city: "",
                state: "",
                startDate: "",
                endDate: "",
                workdetail: "",
              },
            ],
          },
        ],
      },
      rightCollumn: {
        id: "R",
        sections: [
          {
            id: "_33xg",
            title: "Contact",
            type: block_types.main.Contact,
            blocks: [
              {
                id: "rand_ex3",
                first_name: "Bill",
                last_name: "kill",
                profession: "assassin",
                street_address: "b-33",
                city: "las-vegas",
                state_province: "somewhere",
                zipcode: "12304",
                phone: "99424149",
                email: "BillKill@example.com",
                social_links: "",
              },
            ],
          },
          {
            id: "2",
            title: "skills",
            type: block_types.main.Skills,
            blocks: [
              { id: "_3hi6", value: 5, name: "Team management" },
              { id: "f_hi7", value: 2, name: "Document management" },
            ],
          },
          {
            id: "3",
            title: "languages",
            type: block_types.additional.language,
            blocks: [
              { id: "h_3t1", value: 5, name: "English" },
              { id: "h_4x1", value: 5, name: "Japaneses" },
            ],
          },
        ],
      },
      focusedElement: null,
    };
  }
  componentDidMount() {
    if (this.state.existing_section_types.length <= 0) {
      let array = Array.from(
        [
          ...this.state.rightCollumn.sections,
          ...this.state.leftCollumn.sections,
        ],
        (s) => s.type
      );
      this.setState({ existing_section_types: array });
    }
  }

  /**
   * @public methods
   */
  edit_header = (text) => {
    this.state.heading = text;
  };
  edit_summary = (text) => {
    this.state.summary = text;
  };
  openDialog = (obj) => {
    let dialog = Object.assign(config.dialog, { ...obj, isOpen: true });
    this.setState({ dialog: dialog });
  };
  closeDialog = () => {
    this.setState({ dialog: { isOpen: false } });
  };
  setTargetBlock = (obj) => {
    let target = {};
    const {
      column,
      sectionIndex,
      blockIndex,
      blockType,
      id,
      sectiontitle,
    } = obj;
    if (this.state.targetBlock !== null && id === this.state.targetBlock.id) {
      return;
    }
    switch (column) {
      case "R":
        target = this.state.rightCollumn.sections[sectionIndex].blocks[
          blockIndex
        ];
        break;

      default:
        target = this.state.leftCollumn.sections[sectionIndex].blocks[
          blockIndex
        ];
        break;
    }

    let newTarget = Object.assign(
      {},
      { ...target, blockType, sectionIndex, blockIndex, column, sectiontitle }
    );
    this.setState({
      ...this.state,
      targetBlock: update(this.state.targetBlock, { $set: newTarget }),
    });
  };

  onEdit_currentTargetBlock = (targetkey, value) => {
    if (this.state.targetBlock === null) return;
    if (this.state.targetBlock.hasOwnProperty(targetkey.toString())) {
      this.state.targetBlock[targetkey] = value;

      this._updateBlock();
    }
  };
  openPreView = () => {
    this.setState({ isPreviewOpen: true });
  };
  closePreView = () => {
    this.setState({ isPreviewOpen: false });
  };
  /**
   * @method onDragEnd-will-trigger-after-drag-action-finished
   */
  onDragStart(result) {
    //  this.state.snippets.globalDrag.isOn = true;
    // this.state.snippets.globalDrag.id = result.draggableId;
  }
  onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    if (result.type === "HTML_DOMEditable_Component") {
      return;
    }
    if (result.type === "section_container") {
      console.log(result);
      if (result.source.droppableId === result.destination.droppableId) {
        if (result.source.droppableId === "L") {
          let newArray = array_move(
            this.state.leftCollumn.sections,
            result.source.index,
            result.destination.index
          );
          this._update_targetBlock(result.destination);
          this.setState({
            ...this.state,
            leftCollumn: update(this.state.leftCollumn, {
              sections: { $set: newArray },
            }),
          });
        } else if (result.source.droppableId === "R") {
          let newArray = array_move(
            this.state.rightCollumn.sections,
            result.source.index,
            result.destination.index
          );
          this._update_targetBlock(result.destination);
          this.setState({
            ...this.state,
            rightCollumn: update(this.state.rightCollumn, {
              sections: { $set: newArray },
            }),
          });
        }
      } else {
        if (result.source.droppableId === "L") {
          const target = this.state.leftCollumn.sections.find(
            (i) => i.id === result.draggableId
          );
          this._update_targetBlock(result.destination);
          this.setState({
            ...this.state,
            leftCollumn: update(this.state.leftCollumn, {
              sections: { $splice: [[result.source.index, 1]] },
            }),
            rightCollumn: update(this.state.rightCollumn, {
              sections: { $splice: [[result.destination.index, 0, target]] },
            }),
          });
        } else {
          const target = this.state.rightCollumn.sections.find(
            (i) => i.id === result.draggableId
          );
          this._update_targetBlock(result.destination);
          this.setState({
            ...this.state,
            rightCollumn: update(this.state.rightCollumn, {
              sections: { $splice: [[result.source.index, 1]] },
            }),
            leftCollumn: update(this.state.leftCollumn, {
              sections: { $splice: [[result.destination.index, 0, target]] },
            }),
          });
        }
      }
      // this.Off_GlobalDrag();
    } else {
      if (result.source.id === result.destination.id) {
        console.log(result);
        this._blockSort(
          result.source.droppableId,
          result.source.index,
          result.destination.index
        );
        this._update_blockIndex_of_targetBlock(result.destination.index);
      }
    }
    //  return this.Off_GlobalDrag();
  }
  check = (type) => {
    for (let i = 0; i <= this.state.existing_section_types.length; i++) {
      console.log(this.state.existing_section_types[i] === type);
      if (this.state.existing_section_types[i] === type) {
        return true;
      } else {
        return false;
      }
    }
  };
  changeSectionTitle(column, index, newTitle) {
    //this.setState({...this.state,})
    if (column === "R") {
      this.setState({
        ...this.state,
        rightCollumn: update(this.state.rightCollumn, {
          sections: { [index]: { title: { $set: newTitle } } },
        }),
      });
    } else {
      this.setState({
        ...this.state,
        leftCollumn: update(this.state.leftCollumn, {
          sections: { [index]: { title: { $set: newTitle } } },
        }),
      });
      //return (this.state.leftCollumn.sections[index].title = newTitle);
    }
  }
  create_section = (type, title, column) => {
    if (this.check(type) === true) {
      return;
    } else {
      console.log(this.state.snippets);
      const instance = this._init_Section(type, title);
      if (column !== undefined && column !== null) {
        switch (column) {
          case "R":
            this.setState({
              ...this.state,
              snippets: {
                ...this.state.snippets,
                toast: {
                  isOpen: true,
                  content: "new section has been added",
                  type: "SUCCESS",
                },
              },
              existing_section_types: update(
                this.state.existing_section_types,
                { $push: [type] }
              ),
              rightCollumn: update(this.state.rightCollumn, {
                sections: { $push: [instance] },
              }),
            });

          default:
            this.setState({
              ...this.state,
              snippets: {
                ...this.state.snippets,
                toast: {
                  isOpen: true,
                  content: "new section has been added",
                  type: "SUCCESS",
                },
              },
              existing_section_types: update(
                this.state.existing_section_types,
                { $push: [type] }
              ),
              leftCollumn: update(this.state.leftCollumn, {
                sections: { $push: [instance] },
              }),
            });
        }
        setTimeout(() => {
          this.state.snippets.toast.isOpen = false;
          /*this.setState({
            ...this.state,
            snippents: { ...this.state.snippets, toast: { isOpen: false } },
          });*/
        }, 200);
        /*  this.setState({
          ...this.state,
          existing_section_types: this.state.existing_section_types.push(type),
          leftCollumn: update(this.state.leftCollumn, {
            sections: { $push: [instance] }
          })
        });*/
      }
    }
  };
  deleteSection = (column, sectionIndex) => {
    const { TC_types, effect_types } = config.snippets;
    this._toggle_TOAST_with_EFFECT(
      TC_types.DANGER,
      "section has been deleted",
      effect_types.FADE,
      200
    );
    if (column === "R") {
      this.setState({
        ...this.state,
        rightCollumn: update(this.state.rightCollumn, {
          sections: { $splice: [[sectionIndex, 1]] },
        }),
      });
    } else {
      this.setState({
        ...this.state,
        leftCollumn: update(this.state.leftCollumn, {
          sections: { $splice: [[sectionIndex, 1]] },
        }),
      });
    }
  };
  create_block = (type, column, sectionIndex) => {
    let instance = this._init_Block(type);
    if (column === "R") {
      this.setState({
        ...this.state,
        snippents: {
          toast: {
            isOpen: true,
            content: "new block has been added",
            type: "SUCCESS",
          },
        },
        rightCollumn: update(this.state.rightCollumn, {
          sections: {
            [sectionIndex]: {
              blocks: {
                $push: [instance],
              },
            },
          },
        }),
      });
    } else {
      this.setState({
        ...this.state,
        snippents: {
          toast: {
            isOpen: true,
            content: "new block has been added",
            type: "SUCCESS",
          },
        },
        leftCollumn: update(this.state.leftCollumn, {
          sections: {
            [sectionIndex]: {
              blocks: {
                $push: [instance],
              },
            },
          },
        }),
      });
    }
    setTimeout(() => {
      this.state.snippets.toast.isOpen = false;
    }, 1000);
  };
  delete_block = (column, sectionIndex, blockIndex) => {
    if (column === "R") {
      this.setState({
        ...this.state,
        rightCollumn: update(this.state.rightCollumn, {
          sections: {
            [sectionIndex]: { blocks: { $splice: [[blockIndex, 1]] } },
          },
        }),
      });
    } else {
      this.setState({
        ...this.state,
        leftCollumn: update(this.state.leftCollumn, {
          sections: {
            [sectionIndex]: { blocks: { $splice: [[blockIndex, 1]] } },
          },
        }),
      });
    }
  };
  open_sideDrawer = () => {
    if (this.state.sidedrawer.isOpen === true) return;
    this.setState({ sidedrawer: { isOpen: true } });
  };
  close_sideDrawer = () => {
    if (this.state.sidedrawer.isOpen === false) return;
    this.setState({ sidedrawer: { isOpen: false } });
  };
  setFocuse = (el) => {
    this.setState({ focusedElement: el });
  };
  Off_GlobalDrag = () => {
    this.setState({
      snippents: { globalDrag: { isOn: false, targetID: null } },
    });
  };
  /**
   * @returns {main contexts, render() method}
   */
  render() {
    return (
      <Contextulize.Provider
        value={{
          state: this.state,
          editHeader: (text) => this.edit_header(text),
          editSummary: (text) => this.edit_summary(text),
          onDragStart: (e) => this.onDragStart(e),
          onDragEnd: (e) => this.onDragEnd(e),
          setfocus: (e) => this.setFocuse(e),
          changeSectionTitle: (cL, sI, nV) =>
            this.changeSectionTitle(cL, sI, nV),
          setTargetBlock: (blockstatus) => this.setTargetBlock(blockstatus),
          onEditBlock: (k, v) => this.onEdit_currentTargetBlock(k, v),
          openSideDrawer: () => this.open_sideDrawer(),
          closeSideDrawer: () => this.close_sideDrawer(),
          createSection: (ty, ti, c) => this.create_section(ty, ti, c),
          deleteSection: (c, i) => this.deleteSection(c, i),
          createBlock: (t, c, s) => this.create_block(t, c, s),
          deleteBlock: (c, sI, bI) => this.delete_block(c, sI, bI),
          openPreview: () => this.openPreView(),
          closePreview: () => this.closePreView(),
          openDialog: (obj) => this.openDialog(obj),
          closeDialog: () => this.closeDialog(),
          Off_GlobalDrag: () => this.Off_GlobalDrag(),
        }}
      >
        {this.props.children}
      </Contextulize.Provider>
    );
  }
  /**
   * @private {methods are denoted as '_'}
   */
  _generateRandomID = () => "_" + Math.random().toString(36).substr(2, 9);
  _init_Section = (type, title) => {
    let instance = Object.assign({}, config.section);
    instance.id = this._generateRandomID();
    instance.title = title;

    switch (type) {
      case section_types.Custom:
        instance.type = this._generateRandomID();
        break;

      default:
        instance.type = type;
        break;
    }

    return instance;
  };
  _init_Block = (type) => {
    let instance;
    switch (type) {
      case block_types.main.Education:
        instance = Object.assign(
          {},
          {
            ...config.block.education,
            id: this._generateRandomID(),
          }
        );
        break;
      case block_types.main.Work_History:
        instance = Object.assign(
          {},
          {
            ...config.block.work_history,
            id: this._generateRandomID(),
          }
        );
        break;
      case block_types.additional.language:
        instance = Object.assign(
          {},
          { ...config.block.language, id: this._generateRandomID() }
        );
        break;
      case block_types.main.Skills:
        instance = Object.assign(
          {},
          { ...config.block.skill, id: this._generateRandomID() }
        );
        break;
      case block_types.main.Contact:
        instance = Object.assign(
          {},
          {
            ...config.block.contact,
            id: this._generateRandomID(),
          }
        );
      default:
        instance = Object.assign(
          {},
          {
            ...config.block.type,
            id: this._generateRandomID(),
          }
        );
        break;
    }
    return instance;
  };
  _update_blockIndex_of_targetBlock = (index) => {
    if (this.state.targetBlock === null) return;

    return (this.state.targetBlock.blockIndex = index);
  };
  _update_targetBlock = (destination) => {
    if (this.state.targetBlock === null) {
      return;
    } else {
      const { droppableId, index } = destination;
      const { sectionIndex, column } = this.state.targetBlock;
      if (column === droppableId && sectionIndex === index) {
        return;
      } else {
        this.state.targetBlock.sectionIndex = index;
        return (this.state.targetBlock.column = droppableId);
      }
    }
  };
  _blockSort = (sectionID, oldIndex, newIndex) => {
    let result = this.state.leftCollumn.sections.findIndex(
      (s) => s.id === sectionID
    );
    let newArray;
    switch (result) {
      case -1: {
        result = this.state.rightCollumn.sections.findIndex(
          (s) => s.id === sectionID
        );
        newArray = array_move(
          this.state.rightCollumn.sections[result].blocks,
          oldIndex,
          newIndex
        );
        this.setState({
          ...this.state,
          rightCollumn: update(this.state.rightCollumn, {
            sections: {
              [result]: {
                blocks: {
                  $set: newArray,
                },
              },
            },
          }),
        });
        break;
      }
      default:
        newArray = array_move(
          this.state.leftCollumn.sections[result].blocks,
          oldIndex,
          newIndex
        );
        this.setState({
          ...this.state,
          leftCollumn: update(this.state.leftCollumn, {
            sections: {
              [result]: {
                blocks: {
                  $set: newArray,
                },
              },
            },
          }),
        });
    }
  };

  _updateBlock = () => {
    const { column, sectionIndex, blockIndex } = this.state.targetBlock;
    let target;
    let fixedObj;
    if (column === "R") {
      target = this.state.rightCollumn.sections[sectionIndex].blocks[
        blockIndex
      ];
      if (JSON.stringify(this.state.targetBlock) !== JSON.stringify(target)) {
        fixedObj = Object.assign({}, this.state.targetBlock);
        delete fixedObj["column"];
        delete fixedObj["sectionIndex"];
        delete fixedObj["blockIndex"];
        this.setState({
          ...this.state,
          rightCollumn: update(this.state.rightCollumn, {
            sections: {
              [sectionIndex]: { blocks: { [blockIndex]: { $set: fixedObj } } },
            },
          }),
        });
      }
    } else {
      target = this.state.leftCollumn.sections[sectionIndex].blocks[blockIndex];
      if (JSON.stringify(this.state.targetBlock) !== JSON.stringify(target)) {
        fixedObj = Object.assign({}, this.state.targetBlock);
        delete fixedObj["column"];
        delete fixedObj["sectionIndex"];
        delete fixedObj["blockIndex"];
        this.setState({
          ...this.state,
          leftCollumn: update(this.state.leftCollumn, {
            sections: {
              [sectionIndex]: { blocks: { [blockIndex]: { $set: fixedObj } } },
            },
          }),
        });
      }
    }
  };
  _toggle_TOAST = (toastType, toastContent) => {
    console.log("I am called");
    this.setState({
      ...this.state,
      snippets: {
        toast: { isOpen: true, type: toastType, content: toastContent },
      },
    });
    setTimeout(() => {
      this.setState({ snippents: { toast: { isOpen: false } } });
    }, 1000);
  };
  _toggle_TOAST_with_EFFECT = (
    toastType,
    toastContent,
    effectType,
    duration
  ) => {
    this.setState({
      ...this.state,
      snippets: {
        ...this.state.snippets,
        effect: { isOn: true, type: effectType, duration },
      },
    });
    setTimeout(() => {
      this.setState({
        snippets: {
          ...this.state.snippets,
          effect: { isOn: false },
          toast: { isOpen: true, type: toastType, content: toastContent },
        },
      });
      setTimeout(() => {
        this.setState({
          snippets: {
            ...this.state.snippets,
            effect: { isOn: false },
            toast: { isOpen: false },
          },
        });
      }, duration + 10);
    }, duration);
  };
  _isSectionAlreadyExists = (type) => {
    let result = this.state.existing_section_types.findIndex((s) => s === type);
    console.log(this.state.existing_section_types);
    console.log(result);
    if (result === -1) {
      this.setState({
        existing_section_types: this.state.existing_section_types.concat(type),
      });
      return false;
    } else {
      return true;
    }
  };
}
export function connect(Component) {
  return class WrapperComponent extends React.Component {
    render() {
      return (
        <Contextulize.Consumer>
          {(store) => <Component {...this.props} context={store} />}
        </Contextulize.Consumer>
      );
    }
  };
}
