'use client';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';
import {RichTextPlugin} from "@lexical/react/LexicalRichTextPlugin";
import {ContentEditable} from "@lexical/react/LexicalContentEditable";
import {LexicalComposer} from "@lexical/react/LexicalComposer";
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { TextNode, ParagraphNode } from "lexical";
import { HeadingNode } from "@lexical/rich-text";
import {LexicalErrorBoundary} from "@lexical/react/LexicalErrorBoundary";

type Props = {
    initialJson: string;
};

function ReadOnlyPlugin({ initialJson }: Props) {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        editor.setEditable(false); // readonly
        const parsedState = editor.parseEditorState(initialJson);
        editor.setEditorState(parsedState, { tag: 'read-only' });
    }, [editor, initialJson]);

    return null;
}

export const ReadOnlyEditor = ({initialJson}: Props) => {
    const initialConfig = {
        namespace: 'ReadOnlyEditor',
        editable: false,
        nodes: [TextNode, ParagraphNode, HeadingNode],
        theme: {
            paragraph: 'mb-2',
        },
        onError(error: Error) {
            console.error(error);
        },
    };

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <RichTextPlugin
                contentEditable={<ContentEditable className="prose"/>}
                placeholder={null}
                ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <ReadOnlyPlugin initialJson={initialJson} />
        </LexicalComposer>
    )
}