import { ArrowUpRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

export function EmptyCard({
  icon,
  title,
  description,
  actionText,
  onAction,
  secondaryActionText,
  onSecondaryAction,
}) {
  return (
    <Empty className="glass-strong rounded-xl border pt-65 pb-70 mt-6">
      <EmptyHeader>
        <EmptyMedia variant="icon" className="w-20 h-20 rounded-xl">
          {icon}
        </EmptyMedia>

        <EmptyTitle className="text-text-primary text-xl">{title}</EmptyTitle>

        <EmptyDescription className="text-text-secondary text-base">
          {description}
        </EmptyDescription>
      </EmptyHeader>

      {(actionText || secondaryActionText) && (
        <EmptyContent className="flex-row justify-center gap-2">
          {actionText && (
            <Button
              onClick={() => {
                onAction?.();
              }}
              type="button"
              className="btn-primary p-5 text-lg cursor-pointer"
            >
              {actionText}
            </Button>
          )}

          {secondaryActionText && (
            <Button
              variant="outline"
              onClick={() => {
                onSecondaryAction?.();
              }}
              className="btn-primary p-5 text-lg cursor-pointer"
            >
              {secondaryActionText}
            </Button>
          )}
        </EmptyContent>
      )}

      <Button
        variant="link"
        className="text-muted-foreground cursor-pointer"
        size="base"
      >
        Learn More <ArrowUpRightIcon />
      </Button>
    </Empty>
  );
}
