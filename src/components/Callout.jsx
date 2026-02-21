import { Lightbulb, AlertTriangle, Info, Briefcase } from "lucide-react";

const config = {
  tip: { icon: Lightbulb, label: "Tip" },
  warning: { icon: AlertTriangle, label: "Watch Out" },
  info: { icon: Info, label: "Note" },
  interview: { icon: Briefcase, label: "Interview Tip" },
};

export default function Callout({ type = "tip", title, children }) {
  const { icon: Icon, label } = config[type] || config.tip;

  return (
    <div className={`callout ${type}`}>
      <div className="callout-title">
        <Icon size={16} />
        {title || label}
      </div>
      {typeof children === "string" ? <p>{children}</p> : children}
    </div>
  );
}
