import { getAssetPath } from "@/core/helpers/assets";

export interface MenuItem {
  heading?: string;
  sectionTitle?: string;
  route?: string;
  pages?: Array<MenuItem>;
  svgIcon?: string;
  fontIcon?: string;
  sub?: Array<MenuItem>;
}

const MainMenuConfig: Array<MenuItem> = [
  {
    pages: [
      {
        heading: "Dashboard",
        route: "/dashboard",
        svgIcon: getAssetPath("media/icons/duotune/art/art002.svg"),
        fontIcon: "bi-app-indicator",
      },
    ],
  },
  {
    heading: "Parametres",
    pages: [
      {
        route: "/blog",
        svgIcon: getAssetPath("media/icons/duotune/art/art002.svg"),
        fontIcon: "bi-app-indicator",
        sectionTitle: "Gestion Blog",
        sub: [
          {
            heading: "Categorie Articles",
            route: "/categorie-articles",
          },
          {
            heading: "Articles",
            route: "/articles",
          },
        ],
      },
      {
        route: "/portfolio",
        svgIcon: getAssetPath("media/icons/duotune/files/fil003.svg"),
        fontIcon: "bi-app-indicator",
        sectionTitle: "Portfolio",
        sub: [
          {
            heading: "Categorie Photos",
            route: "/categorie-photos",
          },
          {
            heading: "Specialités",
            route: "/specialites",
          },
          {
            heading: "Tags",
            route: "/tags",
          },
        ],
      },

      {
        route: "/users",
        svgIcon: getAssetPath("media/icons/duotune/social/soc002.svg"),
        fontIcon: "bi-app-indicator",
        sectionTitle: "Users",
        sub: [
          {
            heading: "Gestion Permissions",
            route: "/permissions",
          },
          {
            heading: "Gestion Roles",
            route: "/roles",
          },
          {
            heading: "Gestion Utilisateurs",
            route: "/utilisateurs",
          },
          {
            heading: "Gestion Photographes",
            route: "/photographes",
          },
        ],
      },
    ],
  },
];

const RedacteurMenuConfig: Array<MenuItem> = [
  {
    pages: [
      {
        heading: "Dashboard",
        route: "/dashboard",
        svgIcon: getAssetPath("media/icons/duotune/art/art002.svg"),
        fontIcon: "bi-app-indicator",
      },
    ],
  },
  {
    heading: "Parametres",
    pages: [
      {
        route: "/blog",
        svgIcon: getAssetPath("media/icons/duotune/art/art002.svg"),
        fontIcon: "bi-app-indicator",
        sectionTitle: "Gestion Blog",
        sub: [
          {
            heading: "Categorie Articles",
            route: "/categorie-articles",
          },
          {
            heading: "Articles",
            route: "/articles",
          },
        ],
      },
    ],
  },
];

export { MainMenuConfig, RedacteurMenuConfig };
