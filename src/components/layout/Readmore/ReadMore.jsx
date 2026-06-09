import { useState } from "react";
import { Button } from "@/components/ui/button";

function ReadMore({ text }) {
  const [expanded, setExpanded] = useState(false);
  if (!text) return null;
  const isLong = text.length > 150;
  return (
    <div>
      <p className={!expanded ? "line-clamp-3" : ""}>{text}</p>
      {isLong && (
        <Button
          variant="link"
          onClick={() => setExpanded(!expanded)}
          className="h-auto p-0"
        >
          {expanded ? "Show less" : "Read more"}
        </Button>
      )}
    </div>
  );
}

export default ReadMore;
