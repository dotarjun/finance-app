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
import { useCreateAccount } from "@/features/accounts/api/use-create-account";

const formSchema = insertAccountSchema.pick({
  name: true,
});

type FormValues = z.input<typeof formSchema>;

export const NewAccountSheet = () => {
  const { isOpen, onClose } = useNewAccount();

  const mutation = useCreateAccount();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(values),
      {
        onSucces: () => {
          onClose();
        },
      };
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
          disabled={mutation.isPending}
          defautValues={{ name: "" }}
        />
      </SheetContent>
    </Sheet>
  );
};
