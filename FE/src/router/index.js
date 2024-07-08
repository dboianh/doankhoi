import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom';
//PAGE
import Login from '../pages/login'
import Home from '../pages/home'
import Service from '../pages/services'
import Contact from '../pages/contacts'
import New from '../pages/news'
import Plan from '../pages/plans'
import Envent from '../pages/envents'
import ForgotPassword from '../pages/forgotPassword'
import ManageAccountUser from '../pages/manageAccountUser'
import Profile from '../pages/profile'
import DashboardAppPage from '../pages/DashboardAppPage'
import DashboardLayout from '../layouts/dashboard/DashboardLayout';
import Page404 from '../pages/404'
import AdminNewsPage from '../pages/AdminNewsPage/AdminNewsPage'
import NewsEditorPage from '../pages/AdminNewsPage/ManageCreateNews'
import UpdateEditorPage from '../pages/AdminNewsPage/ManageUpdateNews'
import AdminServicesPage from '../pages/AdminServicesPage'
import AdminCategoriesPage from '../pages/AdminCategoriesPage'
import AdminContactPage from '../pages/AdminContactPage'
import AdminProductPage from '../pages/AdminProductPage'
import AdminGalleryPage from '../pages/AdminGalleryPage'
import AdminAlbumDetailPage from '../pages/AdminAlbumDetailPage'
import AdminIntroPage from '../pages/AdminIntroPage'

import PreviewPage from '../pages/AdminPreviewPage'
import Gallery from '../pages/Gallery'
import GalleryDetailPage from '../pages/Gallery/GalleryDetailPage'
import AdminConfigBanner from '../pages/AdminConfigPage/Banners'
import AdminConfigNavbar from '../pages/AdminConfigPage/Navbar'
import AdminAddBanner from '../pages/AdminConfigPage/Banners/AdminAddBanner'
import AdminUpdateBanner from '../pages/AdminConfigPage/Banners/AdminUpdateBanner'


export const publicRoutes = [
    {
        path: "/",
        element: <Home />

    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/dich-vu",
        element: <Service />
    },
    {
        path: "/contact",
        element: <Contact />
    } ,
    {
        path: "/tintuc/:nid/:name",
        element: <New />
    },
    {
        path: "/tintuc",
        element: <New />
    },

    {
        path: "/gioithieu/:id",
        element: <Envent />
    },
    // {
    //     path:"/tintuc/:nid/:name/:id",
    //     element:<Envent />
    // }, 
    {
        path:"/tintuc/:id",
        element:<Envent />
    }, 
    
    {
        path:"/plan",
        element:<Plan />
    },
    {
        path: "/forgotPassword",
        element: <ForgotPassword />
    },
    {
        path: "/preview/:id",
        element: <PreviewPage />
    },
    {
        path: "/thu-vien",
        element: <Gallery />
    },
    {
        path: "/thu-vien/:id",
        element: <GalleryDetailPage />
    }
    // {
    //     path: "*",
    //     element: <Page404 />
    // }
]

export const privateRoutes = [
    {
        path: "app",
        element: <DashboardAppPage/>
    },
    {
        path: "user",
        element: <ManageAccountUser/>
    },
    {
        path: "profile",
        element: <Profile />
    },
    {
        path: "gioithieu",
        element: <AdminIntroPage />
    },
    {
        path: "tintucsk",
        element: <AdminNewsPage />
    },
    // {
    //     path: "serviceManagement",
    //     element: <AdminServicesPage />
    // },
    {
        path: "tintucsk/add",
        element: <NewsEditorPage />
    },
    {
        path: "update/:id",
        element: <UpdateEditorPage />
    },
    {
        path: "update/:id",
        element: <UpdateEditorPage />
    },
    {
        path: "tintucsk/topic/:id",
        element: <AdminCategoriesPage />
    },
    {
        path: "gioithieu/topic/:id",
        element: <AdminCategoriesPage />
    },

    {
        path: "Quan-ly-hom-thu-gop-y",
        element: <AdminContactPage />
    },
    // {
    //     path: "Quan-ly-san-pham",
    //     element: <AdminProductPage />
    // },
    {
        path: "albums",
        element: <AdminGalleryPage />
    },
    {
        path: "album/:id",
        element: <AdminAlbumDetailPage />,
    },
    {
        path: "config/banners",
        element: <AdminConfigBanner />,
    },
    {
        path: "config/banners/add",
        element: <AdminAddBanner />,
    },
    {
        path: "config/banners/update/:id",
        element: <AdminUpdateBanner />,
    },
    {
        path: "config/navbar",
        element: <AdminConfigNavbar />,
    },
    

    


    
    // {
    //     path: "/dashboard",
    //     element: <Dashboard />
    // },

    // {
    //     path: "/manageAccountUser",
    //     element: <ManageAccountUser />
    // },
]