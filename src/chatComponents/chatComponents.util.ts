export const parseMarkdown = (text: string): string => {
    // Custom Markdown for hyperlink
    text = text.replace(/markdownum/g, '[markdownum](https://en.wikipedia.org/wiki/Markdown)');
    return text;
};