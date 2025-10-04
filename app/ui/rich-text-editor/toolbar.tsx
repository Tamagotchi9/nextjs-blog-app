/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {mergeRegister} from '@lexical/utils';
import {
    $createParagraphNode,
    $getSelection,
    $isRangeSelection,
    CAN_REDO_COMMAND,
    CAN_UNDO_COMMAND,
    COMMAND_PRIORITY_LOW,
    FORMAT_ELEMENT_COMMAND,
    FORMAT_TEXT_COMMAND,
    REDO_COMMAND,
    SELECTION_CHANGE_COMMAND,
    UNDO_COMMAND,
} from 'lexical';
import {useCallback, useEffect, useRef, useState} from 'react';
import {$createHeadingNode, $isHeadingNode, HeadingTagType} from "@lexical/rich-text";
import {$setBlocksType, $wrapNodes} from "@lexical/selection";

function Divider() {
    return <div className="divider" />;
}

export default function ToolbarPlugin() {
    const [editor] = useLexicalComposerContext();
    const toolbarRef = useRef(null);
    const [canUndo, setCanUndo] = useState(false);
    const [canRedo, setCanRedo] = useState(false);
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [isStrikethrough, setIsStrikethrough] = useState(false);
    const [blockType, setBlockType] = useState("paragraph");

    const $updateToolbar = useCallback(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
            // Update text format
            setIsBold(selection.hasFormat('bold'));
            setIsItalic(selection.hasFormat('italic'));
            setIsUnderline(selection.hasFormat('underline'));
            setIsStrikethrough(selection.hasFormat('strikethrough'));

            const anchorNode = selection.anchor.getNode();
            const element = anchorNode.getKey() === 'root' ? anchorNode : anchorNode.getTopLevelElementOrThrow();
            const type = $isHeadingNode(element) ? element.getTag() : element.getType();
            setBlockType(type);
        }
    }, []);

    const headingTags: HeadingTagType[] = ["h1", "h2", "h3", "h4", "h5", "h6"];

    const createHeadline = (type: HeadingTagType) => {
        if (!headingTags.includes(blockType as HeadingTagType)) {
            editor.update(() => {
                const selection = $getSelection();
                if ($isRangeSelection(selection)) {
                    $setBlocksType(selection, () => $createHeadingNode(type));
                }
            });
        } else {
            formatParagraph();
        }
    }

    const formatParagraph = () => {
        if (blockType !== "paragraph") {
            editor.update(() => {
                const selection = $getSelection();

                if ($isRangeSelection(selection)) {
                    $setBlocksType(selection, () => $createParagraphNode());
                }
            });
        }
    };

    useEffect(() => {
        return mergeRegister(
            editor.registerUpdateListener(({editorState}) => {
                editorState.read(() => {
                    $updateToolbar();
                });
            }),
            editor.registerCommand(
                SELECTION_CHANGE_COMMAND,
                (_payload, _newEditor) => {
                    $updateToolbar();
                    return false;
                },
                COMMAND_PRIORITY_LOW,
            ),
            editor.registerCommand(
                CAN_UNDO_COMMAND,
                (payload) => {
                    setCanUndo(payload);
                    return false;
                },
                COMMAND_PRIORITY_LOW,
            ),
            editor.registerCommand(
                CAN_REDO_COMMAND,
                (payload) => {
                    setCanRedo(payload);
                    return false;
                },
                COMMAND_PRIORITY_LOW,
            ),
        );
    }, [editor, $updateToolbar]);

    return (
        <div className="toolbar" ref={toolbarRef}>
            <button
                type="button"
                disabled={!canUndo}
                onClick={(e) => {
                    e.stopPropagation()
                    editor.dispatchCommand(UNDO_COMMAND, undefined);
                }}
                className="toolbar-item spaced"
                aria-label="Undo">
                <i className="format undo"/>
            </button>
            <button
                type="button"
                disabled={!canRedo}
                onClick={(e) => {
                    e.stopPropagation()
                    editor.dispatchCommand(REDO_COMMAND, undefined);
                }}
                className="toolbar-item"
                aria-label="Redo">
                <i className="format redo"/>
            </button>
            <Divider/>
            <button
                type="button"
                onClick={() => createHeadline('h1')}
                className="toolbar-item spaced"
                aria-label="Heading 1"
            >
                <span className="format">H1</span>
            </button>
            <button
                type="button"
                onClick={() => createHeadline('h2')}
                className="toolbar-item spaced"
                aria-label="Heading 2"
            >
                <span className="format">H2</span>
            </button>
            <button
                type="button"
                onClick={() => createHeadline('h3')}
                className="toolbar-item"
                aria-label="Heading 3"
            >
                <span className="format">H3</span>
            </button>
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation()
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
                }}
                className={'toolbar-item spaced ' + (isBold ? 'active' : '')}
                aria-label="Format Bold">
                <i className="format bold"/>
            </button>
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation()
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
                }}
                className={'toolbar-item spaced ' + (isItalic ? 'active' : '')}
                aria-label="Format Italics">
                <i className="format italic"/>
            </button>
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation()
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
                }}
                className={'toolbar-item spaced ' + (isUnderline ? 'active' : '')}
                aria-label="Format Underline">
                <i className="format underline"/>
            </button>
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation()
                    editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
                }}
                className={'toolbar-item spaced ' + (isStrikethrough ? 'active' : '')}
                aria-label="Format Strikethrough">
                <i className="format strikethrough"/>
            </button>
            <Divider/>
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation()
                    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
                }}
                className="toolbar-item spaced"
                aria-label="Left Align">
                <i className="format left-align"/>
            </button>
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation()
                    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
                }}
                className="toolbar-item spaced"
                aria-label="Center Align">
                <i className="format center-align"/>
            </button>
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation()
                    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
                }}
                className="toolbar-item spaced"
                aria-label="Right Align">
                <i className="format right-align"/>
            </button>
            <button
                type="button"
                onClick={(e) => {
                    e.stopPropagation()
                    editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
                }}
                className="toolbar-item"
                aria-label="Justify Align">
                <i className="format justify-align"/>
            </button>
            {' '}
        </div>
    );
}
