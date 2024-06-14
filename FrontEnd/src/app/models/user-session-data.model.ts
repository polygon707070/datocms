import { UserPermissionsModel } from './user-permissions.model';

export class UserSessionDataModel {
    userName: string;
    token: string;
    userPermissions: UserPermissionsModel;

    constructor() {
        this.userName = null;
        this.token = null;
        this.userPermissions = new UserPermissionsModel();
    }
}
