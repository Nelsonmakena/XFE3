import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { FormField, INPUTS } from "@/utils/inputs";
import type { ReactElement, ReactSVGElement } from "react";
import type { LucideIcon } from "lucide-react";

import { convertArray } from "@/utils/utils";
import CustomSelect from "./customSelect";

type formValues = Record<string, string>;

interface Actions<T extends formValues> {
  onSubmit: () => void | Promise<void>;
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

interface CenterPanelProps<T extends formValues> {
  initiator?: string;
  title: string;
  trigger: Triger;
  formFields: FormField[];
  actions: Actions<T>;
  states: STATES;
}

export default function CustomDialog<T extends formValues>({
  initiator,
  title,
  trigger,
  formFields,
  actions,
  states,
}: CenterPanelProps<T>) {
  const { onSubmit, onFieldChange, onSelectChange } = actions ?? {};
  const { open, setOpen, inputs } = states ?? {};

  const Icon = trigger.icon;

  // Setting selected IDs
  const handleSelected = (field: string, id: string) => {
    onSelectChange?.((prev) => ({
      ...prev,
      [field]: id,
    }));
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

  //form submission
  const submit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button
            size={initiator === "small" ? "icon" : "default"}
            variant={initiator === "small" ? "ghost" : "default"}
            className={`${!initiator ? "w-full h-11 tracking-widest" : ""}`}
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
      ></DialogTrigger>
      <DialogContent className={"bg-card"}>
        <DialogHeader>
          <DialogTitle className="capitalize">{title}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={submit}>
          <div className="flex flex-col gap-normal px-3.5">
            {formFields.map((singleFormInput, index) => {
              if (singleFormInput.name === "input") {
                return (
                  <Input
                    key={index}
                    className="h-11"
                    type={singleFormInput.data.type}
                    placeholder={singleFormInput.data.label}
                    name={singleFormInput.data.name}
                    value={inputs?.[singleFormInput.data.name] ?? ""}
                    required
                    onChange={(e) => handleInput(e, singleFormInput.data)}
                  />
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
      </DialogContent>
    </Dialog>
  );
}
