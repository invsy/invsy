import { invsy } from "@/libs/invsy";
import { redirect } from "next/navigation";

export default async function Page() {
  // Create new chat and returns the chat id
  const { id } = await invsy.create({
    title: "new chat"
  })

  redirect(`/${id}`)
}