import markdownit from 'markdown-it';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import strip from 'strip-markdown';

const markdown = markdownit({
    html: false,
    linkify: true,
    typographer: true,
    breaks: true,
});

// Disable mail linkification
markdown.linkify.add('mailto:', null)

markdown.use(function(md) {
  md.renderer.rules.link_open = function(tokens, idx, options, _env, self) {
    const link_open = tokens[idx];
    link_open.attrs?.push(['rel','ugc nofollow noopener']);
    return self.renderToken(tokens, idx, options);
  };
  // Render ~~<text>~~ as del tag
  md.renderer.rules.s_open = function(tokens, idx, options, _env, self) {
    const s_open = tokens[idx];
    s_open.type = 'del_open';
    s_open.tag = 'del';
    return self.renderToken(tokens, idx, options);
  };
  md.renderer.rules.s_close = function(tokens, idx, options, _env, self) {
    const s_close = tokens[idx];
    s_close.type = 'del_close';
    s_close.tag = 'del';
    return self.renderToken(tokens, idx, options);
  };
});

export default function renderMarkdown(text: string): string {
  return markdown.render(text).trim();
}

export async function removeMarkdown(text: string) {
  const file = await remark()
    .use(remarkGfm)
    .use(strip)
    .process(text)
  return String(file)
}
