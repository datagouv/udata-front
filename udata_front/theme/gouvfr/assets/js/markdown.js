import markdownit from 'markdown-it';
import purify from 'dompurify';
import { markdown as markdownConfig } from "./config";

const markdown = markdownit({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
});

// Disable mail linkification
markdown.linkify.set({ fuzzyEmail: false });

markdown.use(function(md) {
    // Add `rel="ugc nofollow"` to links
    md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
        const link_open = tokens[idx];
        link_open.attrs.push(['rel','ugc nofollow']);
        return self.renderToken(tokens, idx, options);
    };
    // Render ~~<text>~~ as del tag
    md.renderer.rules.s_open = function(tokens, idx, options, env, self) {
        const s_open = tokens[idx];
        s_open.type = 'del_open';
        s_open.tag = 'del';
        return self.renderToken(tokens, idx, options);
    };
    md.renderer.rules.s_close = function(tokens, idx, options, env, self) {
        const s_close = tokens[idx];
        s_close.type = 'del_close';
        s_close.tag = 'del';
        return self.renderToken(tokens, idx, options);
    };
    // Add `loading="lazy"` to all images
    md.renderer.rules.image = function (tokens, idx, options, env, slf) {
      var token = tokens[idx];
      token.attrs[token.attrIndex('alt')][1] = slf.renderInlineAsText(token.children, options, env);
      // this is the line of code responsible for an additional 'loading' attribute
      token.attrSet('loading', 'lazy');
      return slf.renderToken(tokens, idx, options);
    };
});

export default function(text) {
  const attributes = Object.values(markdownConfig.attributes).flat();
  const uniqueAttributes = [...new Set(attributes)];
  const content = markdown.render(text).trim();
  return purify.sanitize(content, {
    ALLOWED_TAGS: markdownConfig.tags,
    ALLOWED_ATTR: uniqueAttributes,
    ALLOW_DATA_ATTR: false,
    USE_PROFILES: { html: true },
  });
}
