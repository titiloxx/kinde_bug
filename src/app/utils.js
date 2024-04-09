import { createKindeManagementAPIClient } from "@kinde-oss/kinde-auth-nextjs/server";

export const revalidateKindeData = async ({ userId }) => {
  const client = await createKindeManagementAPIClient();
  await client.usersApi.refreshUserClaims({
    userId: userId,
  });
};

export const createOrganization = async ({ orgName, userId }) => {
  const client = await createKindeManagementAPIClient();
  const organization = await client.organizationsApi.createOrganization({
    createOrganizationRequest: {
      name: orgName,
    },
  });
  const orgCode = organization.organization.code;
  if (userId) {
    const response = await client.organizationsApi.addOrganizationUsers({
      orgCode: orgCode,
      addOrganizationUsersRequest: {
        users: [
          {
            id: userId,
          },
        ],
      },
    });
  }
  return orgCode;
};
