import { createOrganization, revalidateKindeData } from "@/app/utils";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const { getUser, getOrganization, getUserOrganizations } =
    getKindeServerSession();
  const user = await getUser();
  const organization = await getOrganization();
  const userOrgs = await getUserOrganizations();
  let orgCode = organization?.orgCode;

  if (user && !orgCode && userOrgs.orgCodes.length === 0) {
    return (
      <>
        <form
          action={async (e) => {
            "use server";
            const { refreshTokens } = getKindeServerSession();
            const orgName = e.get("org");
            const newOrg = await createOrganization({
              orgName: orgName,
              userId: user.id,
            });
            console.log("🚀 ~ <formaction={ ~ newOrg:", newOrg);
            await revalidateKindeData({ userId: user.id });
            await refreshTokens();
            revalidatePath("/");
            // To disable the bug comment out the line below
            // redirect("api/auth/logout");
          }}
        >
          <input
            type="text"
            name="org"
            placeholder="Organization Name"
            className="text-black"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Organization
          </button>
        </form>
      </>
    );
  }

  if (user) {
    return (
      <>
        <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-4">
          <h1 className="text-2xl">Welcome {user?.family_name}</h1>
          <h1 className="text-2xl">
            Organization Code: {organization?.orgCode || userOrgs.orgCodes[0]}
          </h1>
          <h1 className="text-2xl">Email: {user?.email}</h1>
          <LogoutLink>Log out</LogoutLink>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-4">
        <LoginLink>Sign in</LoginLink>
        <RegisterLink>Sign up</RegisterLink>
      </div>
    </>
  );
}
