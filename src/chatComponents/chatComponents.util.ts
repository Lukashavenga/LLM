export const parseMarkdown = (text: string): string => {
    // Markdown hyperlink
    text = text.replace(/markdownum/g, '[markdownum](https://en.wikipedia.org/wiki/Markdown)');
    return text;
};