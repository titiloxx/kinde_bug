# Kinde create organization bug demonstration

## Overview
This repository is dedicated to showcasing a specific bug encountered with the Kinde library during the user login and organization creation process.

## Bug Description
Upon creating a new user, the application correctly navigates to a window where the user can input the name of their organization. The bug manifests after the user submits the name of the organization. Despite the backend successfully associating the newly created organization with the user, the front-end interface does not reflect this change. It continues to display the organization creation screen as if the user has not yet created an organization. This behavior leads to multiple organization creation and disrupts the user experience.

### Steps to Reproduce
1. ``npm run i``
2. ``npm run dev``
3. Sign up 
4. Complete the input with the name of desired organization
4. Submit the form

### Expected Behavior
After submitting the organization name, the application should:
- Successfully associate the new organization with the user in the backend.
- Navigate away from the organization creation screen

### Actual Behavior
After the organization name is submitted:
- The new organization is successfully created and associated with the user in the backend (confirmed via kinde console inspection).
- The application interface fails to update, remaining on the organization creation screen and prompting the user to input an organization name as if it hadn't been done.

## Additional Information
- Another solution would be to use the kinde option to create te organization and user at the same time, but this has negative implications:
-- This has another bug showed in this video: https://www.loom.com/share/55a5bcfad7dc4a028046539779e675fc?utm_medium=gif


