import { redirect } from "next/navigation";

// Legacy slug — merged into Operational Excellence.
export default function Page() {
  redirect("/products/operational-excellence");
}
