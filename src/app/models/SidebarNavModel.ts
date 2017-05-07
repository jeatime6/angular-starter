/**
 * 左侧导航分组实体
 * 
 * @export
 * @class SidebarNavGroupModel
 */
export class SidebarNavGroupModel {
    GroupName: string;
    GroupIcon: string;
    NavItems: Array<SidebarNavItemModel>
}


/**
 * 左侧导航Item实体
 * 
 * @export
 * @class SidebarNavItemModel
 */
export class SidebarNavItemModel {
    ItemName: string;
    ItemIcon: string;
    ItemUrl: string;
    NavItems: Array<SidebarNavItemModel>;
}