export const parseMarkdown = (text: string): string => {
    // Markdown hyperlink
    text = text.replace(/markdownum/g, '[markdownum](https://en.wikipedia.org/wiki/Markdown)');

    // Headers
    text = text.replace(/^## (.*$)/gim, '## $1');
    text = text.replace(/^# (.*$)/gim, '# $1');

    // Bold
    text = text.replace(/\*\*(.*?)\*\*/gim, '**$1**');

    // Italic
    text = text.replace(/\*(.*?)\*/gim, '*$1*');

    // Blockquotes
    text = text.replace(/^\> (.*$)/gim, '> $1');

    return text;
};