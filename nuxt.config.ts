import { defineNuxtConfig } from '@nuxt/bridge'
import fetch from "node-fetch";

let dynamicRoutes = async () => {
    const routesPosts = await fetch("https://areeltrip.com/wp-json/wp/v2/posts?page=1&per_page=20")
        .then(res => res.json())
        .then(data => data.map(post => `/blog/${post.slug}`));
    const routesPages = await fetch("https://areeltrip.com/wp-json/wp/v2/pages?page=1&per_page=20")
        .then(res => res.json())
        .then(data => data.map(post => `/${post.slug}`));
    return [...routesPosts, ...routesPages];
}

export default defineNuxtConfig({
    target: 'static',
    /*
     ** Headers of the page
     */
    head: {
        title: process.env.npm_package_name || "",
        meta: [
            {charset: "utf-8"},
            {name: "viewport", content: "width=device-width, initial-scale=1"},
            {
                hid: "description",
                name: "description",
                content: process.env.npm_package_description || ""
            }
        ],
        link: [
            {rel: "icon", type: "image/x-icon", href: "/favicon.ico"}
        ]
    },
    /*
     ** Customize the progress-bar color
     */
    loading: {color: "#fff"},
    /*
     ** Global CSS
     */
    css: ["~/assets/mixins.scss"],
    /*
     ** Plugins to load before mounting the App
     */
    plugins: [
        "~/plugins/pages.server.ts",
        "~/plugins/posts.server.ts",
        "~/plugins/tags.server.ts",
        "~/plugins/dateformat.ts"
    ],
    generate: {
        routes: dynamicRoutes
    },
    /*
     ** Nuxt.js dev-modules
     */
    buildModules: [],
    /*
     ** Build configuration
     */
    build: {
        /*
         ** You can extend webpack config here
         */
        extend(config, ctx) {
        }
    }
});
