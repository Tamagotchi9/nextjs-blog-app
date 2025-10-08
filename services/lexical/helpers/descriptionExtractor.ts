const extractLexicalText = (node: any): string => {
    if (!node) return '';

    let result = '';

    if (node.type === 'text' && typeof node.text === 'string') {
        result += node.text;
    }

    if (Array.isArray(node.children)) {
        for (const child of node.children) {
            result += extractLexicalText(child) + ' ';
        }
    }

    return result.trim();
}

export const getLexicalDescription = (editorStateJSON: string) : string => {
    const {root} = JSON.parse(editorStateJSON)
    const text = extractLexicalText(root);
    return text.length > 100 ? text.slice(0, 100).trim() + '...' : text;
}