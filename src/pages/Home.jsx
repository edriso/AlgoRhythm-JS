import { Link } from "react-router-dom";
import { topics } from "../data/topics";
import * as Icons from "lucide-react";

export default function Home() {
  return (
    <div className="home-page">
      <div className="home-hero">
        <h1>
          Master <span>Algorithms</span> &<br />
          Data Structures
        </h1>
        <p>
          Your focused study guide for JavaScript problem solving. Clear
          explanations, real code, and the tips that actually matter for
          interviews and daily work.
        </p>
      </div>

      {topics.map((group) => (
        <div key={group.category} className="home-category">
          <div className="home-category-title">{group.category}</div>
          <div className="home-cards">
            {group.items.map((item) => {
              const Icon = Icons[item.icon];
              return (
                <Link
                  key={item.slug}
                  to={`/${item.slug}`}
                  className="home-card"
                >
                  <div className="home-card-icon">
                    {Icon && <Icon size={20} />}
                  </div>
                  <div className="home-card-title">{item.title}</div>
                  <div className="home-card-desc">{item.description}</div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
