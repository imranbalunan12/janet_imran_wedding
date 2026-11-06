import { AdminView } from "@/components/admin/AdminView";
import { isAdmin } from "@/lib/auth";
import { listRsvps, usingLocalStore } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const unlocked = await isAdmin();
  const rsvps = unlocked ? await listRsvps() : [];
  return <AdminView unlocked={unlocked} initialRsvps={rsvps} local={usingLocalStore()} />;
}
