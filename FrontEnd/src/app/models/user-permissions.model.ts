export class UserPermissionsModel {
    canEditArticles: boolean;
    canEditTags: boolean;
    canEditKeyWords: boolean;

    constructor() {
        this.canEditArticles = false;
        this.canEditTags = false;
        this.canEditKeyWords = false;
    }
}
