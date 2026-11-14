import axios from "axios";

export function handleAxiosError(error: unknown) {
  if (axios.isAxiosError(error)) {
    console.error("API Error:", error.response?.data);

    return {
      success: false as const,
      message:
        error.response?.data?.message ??
        "Something went wrong. Please try again.",
    };
  }

  return {
    success: false as const,
    message: "An unexpected error occurred.",
  };
}
