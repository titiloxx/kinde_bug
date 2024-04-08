import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { createOrganization } from "@/app/utils";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const { getUser, getOrganization } = getKindeServerSession();
  const user = await getUser()
  const organization = await getOrganization();
  let orgCode=organization?.orgCode



if(user && !orgCode){
  return (
    <>
      <form action={async (e) => {
      "use server"

        const orgName=e.get('org')
        const newOrg = await createOrganization({orgName: orgName, userId: user.id})
        console.log("🚀 ~ <formaction={ ~ newOrg:", newOrg)
        revalidatePath('/')
        // To disable the bug comment out the line below
        // redirect("api/auth/logout");
      }}>
        
        <input type="text" name='org' placeholder="Organization Name"  className="text-black"/>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Create Organization</button>
      </form>
    </>
  );
}

if(user) {
  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-4">
      <h1 className="text-2xl">Welcome {user?.family_name}</h1>
      <h1 className="text-2xl">Organization Code: {organization?.orgCode}</h1>
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
