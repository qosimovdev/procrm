import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function Alert({ alerTitle, alertDesc, handler, icon }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          className="p-4 cursor-pointer rounded-2xl"
        >
          Delete Member
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm" className="glass-strong">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 w-17 h-15 text-destructive dark:bg-destructive/20 dark:text-destructive rounded-xl">
            {icon}
          </AlertDialogMedia>
          <AlertDialogTitle className="text-text-primary text-xl">
            {alerTitle}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-text-secondary text-base">
            {alertDesc}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            variant="outline"
            className="cursor-pointer p-4 text-text-primary rounded-xl"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            className="cursor-pointer p-4 rounded-xl"
            onClick={handler}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
