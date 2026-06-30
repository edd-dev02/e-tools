export interface MenuRoute {
    path: string;
    title: string;
    fullPath: string;
    data: RouteData;

}

export interface RouteData {
    icon: string;
    classIcon: string;
    ariaLabelIcon: string;
}