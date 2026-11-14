import { toast } from "@/components/ui/toast";

function handleDispatchResults(thunk: any, result: any) {
  if (thunk.fulfilled.match(result)) {
    toast.add({
      type: result.payload.success ? "success" : "warning",
      description: result.payload.message,
    });
  } else {
    toast.add({
      type: "warning",
      description: result.payload?.message ?? "Something went wrong",
    });
  }
}
