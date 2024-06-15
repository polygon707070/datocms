import { UserPermissionsModel } from './user-permissions.model';

export class LoginResultModel {
    success: boolean;
    errorMessage: string;
    token: string;
    permissions: UserPermissionsModel;
}
