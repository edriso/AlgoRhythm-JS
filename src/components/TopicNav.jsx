import { Link } from "react-router-dom";
import { getAdjacentTopics } from "../data/topics";

export default function TopicNav({ slug }) {
  const { prev, next } = getAdjacentTopics(slug);

  return (
    <div className="topic-nav">
      {prev ? (
        <Link to={`/${prev.slug}`} className="topic-nav-link prev">
          <span className="topic-nav-label">Previous</span>
          <span className="topic-nav-title">{prev.title}</span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link to={`/${next.slug}`} className="topic-nav-link next">
          <span className="topic-nav-label">Next</span>
          <span className="topic-nav-title">{next.title}</span>
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
