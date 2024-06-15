import { z } from "zod";

import { useNewAccount } from "@/features/accounts/hooks/use-new-accounts";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { insertAccountSchema } from "@/db/schema";

import { AccountsForm } from "./account-form";

export const NewAccountSheet = () => {
  const { isOpen, onClose } = useNewAccount();
  const formSchema = insertAccountSchema.pick({
    name: true,
  });

  type FormValues = z.input<typeof formSchema>;

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Account</SheetTitle>
          <SheetDescription>
            Create a new account to track your Xpenses
          </SheetDescription>
        </SheetHeader>
        <AccountsForm
          onSubmit={onSubmit}
          disabled={false}
          defautValues={{ name: "" }}
        />
      </SheetContent>
    </Sheet>
  );
};
