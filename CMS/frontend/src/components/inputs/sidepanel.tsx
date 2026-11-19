import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { convertArray } from "@/utils/utils";

import type { LucideIcon } from "lucide-react";
import type { FormField, INPUTS } from "@/utils/inputs";
import CustomSelect from "./customSelect";

type formValues = Record<string, string>;

interface Actions<T extends formValues> {
  onSubmit: () => void;
  onFieldChange?: React.Dispatch<React.SetStateAction<T>>;
  onSelectChange?: React.Dispatch<React.SetStateAction<T>>;
}

interface STATES {
  open: boolean;
  setOpen: (open: boolean) => void;
  inputs?: formValues;
}
interface Triger {
  name: string;
  icon?: LucideIcon | string;
}
interface CustomSheetProps<T extends formValues> {
  initiator?: string;
  title: string;
  trigger: Triger;
  formFields: FormField[];
  actions: Actions<T>;
  states: STATES;
}

export default function CustomSheet<T extends formValues>({
  initiator,
  title,
  trigger,
  formFields,
  actions,
  states,
}: CustomSheetProps<T>) {
  const { onSubmit, onFieldChange, onSelectChange } = actions ?? {};
  const { open, setOpen, inputs } = states ?? {};
  const Icon = trigger?.icon;

  //handling selects data
  const handleSelected = (field: string, id: string) => {
    onSelectChange?.((prev) => ({ ...prev, [field]: id }));
  };

  // Handling input data
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: INPUTS,
  ) => {
    const { name, value } = e.target;
    onFieldChange?.((prev) => ({
      ...prev,
      [name]: field.formart ? field.formart(value) : value,
    }));
  };

  const submit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            size={initiator === "small" ? "icon" : "default"}
            variant={initiator === "small" ? "ghost" : "default"}
            className={`${!initiator ? "w-full h-11 tracking-widest capitalize" : ""}`}
          >
            {initiator === "small" ? (
              typeof trigger.icon === "string" ? (
                <img src={trigger.icon} alt="" className="size-5" />
              ) : (
                trigger.icon && <trigger.icon />
              )
            ) : (
              <>
                {typeof trigger.icon === "string" ? (
                  <img src={trigger.icon} alt="" className="size-5" />
                ) : (
                  trigger.icon && <trigger.icon />
                )}
                {trigger.name}
              </>
            )}
          </Button>
        }
      />
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-header heading-normal ">
            {title}
          </SheetTitle>
        </SheetHeader>

        <form onSubmit={submit}>
          <div className="flex flex-col gap-normal px-3.5">
            {formFields.map((singleFormInput, index) => {
              if (singleFormInput.name === "input") {
                return (
                  <>
                    <label className="capitalize">
                      {singleFormInput.data.label}
                    </label>
                    <Input
                      key={index}
                      placeholder={singleFormInput.data.label}
                      name={singleFormInput.data.name}
                      value={inputs?.[singleFormInput.data.name] ?? ""}
                      maxLength={singleFormInput.data.maxLength}
                      required
                      onChange={(e) => {
                        handleInput(e, singleFormInput.data);
                      }}
                    />
                  </>
                );
              }

              if (singleFormInput.name === "select") {
                return (
                  <CustomSelect
                    key={index}
                    item={convertArray(
                      singleFormInput.data.data,
                      singleFormInput.data.idKey,
                      singleFormInput.data.nameKey,
                    )}
                    placeholder={singleFormInput.data.header}
                    select={(id: string) =>
                      handleSelected(singleFormInput.data.idKey, id)
                    }
                  />
                );
              }

              return null;
            })}
          </div>
          <div className="flex items-center justify-center py-3">
            <Button type="submit" variant="secondary" className={"w-2xs h-12"}>
              {trigger.name}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
