import { staticMetadata } from "@/lib/seo";

export const metadata = staticMetadata(
  "Start a Conversation",
  "Reach out to Enso Mind Matters to ask about counselling, arts-based therapy, programs or workshops in Mumbai.",
  "/start-a-conversation",
);

export default function StartConversationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
