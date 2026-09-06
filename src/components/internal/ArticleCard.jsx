import { Clock, ArrowRight } from "lucide-react";
import BlogCover from "./BlogCover";
import "./ArticleCard.css";

/**
 * Editorial article card in three sizes for a magazine-style grid:
 *  - "featured": large, cover beside copy
 *  - "medium":   vertical card with cover on top
 *  - "small":    compact row (mini cover + title + meta, no excerpt)
 *
 * Pass `post.image` to use a real photo; otherwise an on-brand BlogCover shows.
 * Rendered as <article> (no detail route exists yet) — wrap in a link later.
 */
export default function ArticleCard({ post, size = "medium" }) {
  const { category, title, excerpt, author, date, read, tint, image, coverArt: CoverArt } = post;
  return (
    <article className={`article article--${size} tint-${tint}`}>
      <div className="article__cover">
        {image ? (
          <img src={image} alt="" loading="lazy" />
        ) : CoverArt ? (
          <CoverArt />
        ) : (
          <BlogCover
            category={category}
            tint={tint}
            size={size === "featured" ? 110 : size === "small" ? 34 : 76}
          />
        )}
      </div>

      <div className="article__body">
        {size !== "small" && <span className="article__tag">{category}</span>}
        <h3 className="article__title">{title}</h3>
        {size === "featured" && excerpt && (
          <p className="article__excerpt">{excerpt}</p>
        )}

        <div className="article__meta">
          {author && size !== "small" && (
            <>
              <span>{author}</span>
              <span aria-hidden="true">·</span>
            </>
          )}
          <span>{date}</span>
          <span className="article__read">
            <Clock size={13} />
            {read}
          </span>
        </div>

        {size === "featured" && (
          <span className="article__link">
            Read article <ArrowRight size={16} />
          </span>
        )}
      </div>
    </article>
  );
}
