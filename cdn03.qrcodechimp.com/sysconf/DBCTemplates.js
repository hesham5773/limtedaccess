var DBC_Templates = [
    // DBC New V Template 6
    {
        content: [{
                component: 'profile',
                pr_img: '/images/digitalCard/dbc/profile_1.png',
                br_img: `/images/digitalCard/dbc/brand_logo_1.png`,
                pr_img_label: '(375x375px, 1:1)',
                br_img_label: '(160x80px, 3:1)',
                remove_only_pr_img: 1,
                show_brand_img: 1,
                name: 'Linda Johnson',
                desc: 'Sr. Marketing Manager',
                company: 'Company',
                contact_shortcut_enable: 1,
                contact_shortcuts: [{
                    type: 'mobile',
                    value: ""
                }, {
                    type: 'email',
                    value: ""
                }, {
                    type: 'sms',
                    value: ""
                }]
            },
            {
                component: 'text_desc',
                title: 'About Me',
                desc: 'Description',
            },
            {
                component: 'images',
                header_enable: 0,
                title: '',
                desc: '',
                view_type: 'grid_2',
                images: [
                    '/images/digitalCard/image_1.png',
                    '/images/digitalCard/image_2.png'
                ]
            },
            {
                component: 'social_link',
                header_enable: 0,
                title: 'Social Links',
                desc: 'Description',
                links: [{
                        type: "facebook",
                        url: "",
                        title: "Title",
                        subtitle: "Like us on Facebook",
                        subtitle_enable: 1,
                        icon_img: "/images/digitalCard/fb_icon@72x.png"
                    },
                    {
                        type: "instagram",
                        url: "",
                        title: "Instagram",
                        subtitle: "Follow us on Instagragm",
                        subtitle_enable: 0,
                        icon_img: "/images/digitalCard/insta_icon@72x.png"
                    },
                    {
                        type: "twitter",
                        url: "",
                        title: "Twitter",
                        subtitle: "Talk with us on Twitter",
                        subtitle_enable: 0,
                        icon_img: "/images/digitalCard/tw_icon@72x.png"
                    },
                ]
            },
            {
                component: 'contact',
                contact_title: 'Contact Us',
                icon_img: '/images/digitalCard/contactus.png',
                floating_button_enable: 1,
                floating_button_label: 'Add to Contact',
                contact_infos: [{
                        type: "number",
                        title: "Call Us",
                        label: "Mobile ",
                        number: "123 456 7890",
                    },
                    {
                        type: "email",
                        title: "Email",
                        label: "Email ",
                        email: "contactme@domain.com",
                    },
                    {
                        type: "address",
                        title: "Address",
                        street: '817 N Ave',
                        city: 'California',
                        country: 'US',
                        state: 'Chicago',
                        zip: '60622',
                        action_button_enable: 1,
                        action_button_label: "Direction",
                        action_button_link: "#",
                    },
                ]
            },
            {
                component: 'web_links',
                header_enable: 0,
                title: 'Web Link',
                desc: 'Description',
                links: [{
                    url: "",
                    title: "Portfolio",
                    subtitle: "Visit for more information",
                    subtitle_enable: 1,
                    icon_img: "/images/digitalCard/weblink.png"
                }]
            }
        ],
        style: {
            primary_bg_color: "#e64b54",
            primary_profile_text_color: "#070708",
            primary_text_color: "#e64b54",
            secondary_bg_color: "#ffffff",
            secondary_profile_text_color: "#070708",
            secondary_text_color: "#070708",
            // bg_img: "/images/digitalCard/bg_page_1.jpg",
            card: {
                bg_color: "#ffffff",
                blur: "29",
                border_radius: "16",
                enable: 1,
                shadow_color: "#64646f33",
                spread: "0",
                x: "0",
                y: "7",
            },
            custom_css: `
         body{overflow:auto !important;}
         .qrc_profile_3{background-color: var(--qrc-secondary); margin: 15px 0 0 0; border-radius: var(--qrc-border-radius); overflow: hidden; box-shadow: rgb(255 255 255 / 15%) 0px 0px 3px 0px, rgb(255 255 255 / 15%) 0px 8px 16px -8px;}
         .qrc_profile_3 h2{text-shadow: 2px 2px 3px rgba(0,0,0,0.3); color: var(--qrc-profile-primary); font-size: 38px; line-height:40px width: 80%; word-break: break-word;}
         .qrc_profile_3 p{color: var(--qrc-profile-secondary);}
         .qrc_profile_3 .qrc_profile_inner{ padding-top: 0; position: relative;}
         .qrc_profile_3 .qrc_profilepic{height: 380px; width: 100%; border-radius: 0;}
         .qrc_profile_3_svg{position: absolute; bottom: -1px;}
         .qrc_page_inner{padding-top:0}
         .qrc_profilepic{position: relative; background-position: center;}
         .qrc_profile_shortcut ul li{text-align: center; background: var(--qrc-primary); color: #fff; width: 54px; height: 54px; padding-top:0px}
         .qrc_profile_shortcut ul li a:hover{color: #fff;}
         .qrc_profile_shortcut ul li a{color:#fff;}
         .qrc_gallery_list li{padding-top: 0px;}
   
         .qrc_page_wrapper{background-position: top center; background-size: cover;height:unset; min-height:100vh;}         
          
         @media (max-width: 767px) {
             .qrc_profile_3 {margin: 0 -15px; border-radius: 0px !important; box-shadow: unset;}

             body::-webkit-scrollbar { display: none;}
             body { -ms-overflow-style: none;  scrollbar-width: none;}
         }
         
        `
        },
        html: {
            profile: {
                main: `<div class="section qrc_profile_3">
                         <div class="qrc_profile_inner">
                             ___pr_pic___
                             <div class="qrc_profile_inner_info">
                                 <h2>___name___</h2>
                                 <p>___desc___</p>
                                 <p><strong>___company___</strong></p>
                                 ___br_img_html___
                                 ___shortcut_html___
                             </div>
                         </div>
                     </div>`,
                shortcut: `<div class="qrc_profile_shortcut">
                             <ul>___shortcut_items___</ul>
                         </div>`,
                item: '<li class="qr_cc_card"><a href="___item_link___"><span class="___item_icon___"></span></a></li>',
                pr_img: `<div class="qrc_profilepic" style="background-image: url('___pr_img___');">
                         <svg id="Layer_1" class="qrc_profile_3_svg" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 375 260">
                             <defs>
                                 <style>
                                 .cls-1 {
                                     fill: url(#linear-gradient);
                                 }
                                 </style>
                                 <linearGradient id="linear-gradient" x1="1.06" y1="260.32" x2="1.06" y2="259.32" gradientTransform="translate(-208.5 67424) scale(375 -259)" gradientUnits="userSpaceOnUse">
                                 <stop offset="0" stop-color="#fff" stop-opacity="0" style="stop-color: var(--qrc-secondary);"/>
                                 <stop offset="1" stop-color="#fff" style="stop-color: var(--qrc-secondary);"/>
                                 <!-- #fff - print qrc-secondary color here  -->
                                 </linearGradient>
                             </defs>
                             <rect id="Rectangle_297" data-name="Rectangle 297" class="cls-1" width="375" height="260"/>
                         </svg>
                     </div>`,
                br_img: `<div class="qrc_profile_brand_logo"> <img src="___br_img___"/> </div>`

            },
            social_link: DefaultHtmlTemplate.social_link,
            web_links: DefaultHtmlTemplate.web_links,
            text_desc: DefaultHtmlTemplate.text_desc,
            contact: DefaultHtmlTemplate.contact,
            button: DefaultHtmlTemplate.button,
            video: DefaultHtmlTemplate.video,
            custom_fields: DefaultHtmlTemplate.custom_fields,
            pdf_gallery: DefaultHtmlTemplate.pdf_gallery,
        }
    },


    // DBC New V Template 7
    {
        content: [{
                component: 'profile',
                pr_img: '/images/digitalCard/dbc/profile_2.png',
                br_img: `/images/digitalCard/dbc/brand_logo_2.png`,
                pr_img_label: '(400x500px, 4:5)',
                br_img_label: '(160x80px, 3:1)',
                remove_only_pr_img: 1,
                show_brand_img: 1,

                name: 'KEVIN JOHNSON',
                desc: 'Sr. Marketing Manager',
                company: 'Company',
                contact_shortcut_enable: 1,
                contact_shortcuts: [{
                    type: 'mobile',
                    value: ""
                }, {
                    type: 'email',
                    value: ""
                }, {
                    type: 'sms',
                    value: ""
                }]
            },
            {
                component: 'text_desc',
                title: 'About Me',
                desc: 'Description',
            },
            {
                component: 'images',
                header_enable: 0,
                title: '',
                desc: '',
                view_type: 'grid_2',
                images: [
                    '/images/digitalCard/image_1.png',
                    '/images/digitalCard/image_2.png'
                ]
            },
            {
                component: 'social_link',
                header_enable: 0,
                title: 'Social Links',
                desc: 'Description',
                links: [{
                        type: "facebook",
                        url: "",
                        title: "Title",
                        subtitle: "Like us on Facebook",
                        subtitle_enable: 1,
                        icon_img: "/images/digitalCard/fb_icon@72x.png"
                    },
                    {
                        type: "instagram",
                        url: "",
                        title: "Instagram",
                        subtitle: "Follow us on Instagragm",
                        subtitle_enable: 0,
                        icon_img: "/images/digitalCard/insta_icon@72x.png"
                    },
                    {
                        type: "twitter",
                        url: "",
                        title: "Twitter",
                        subtitle: "Talk with us on Twitter",
                        subtitle_enable: 0,
                        icon_img: "/images/digitalCard/tw_icon@72x.png"
                    },
                ]
            },
            {
                component: 'contact',
                contact_title: 'Contact Us',
                icon_img: '/images/digitalCard/contactus.png',
                floating_button_enable: 1,
                floating_button_label: 'Add to Contact',
                contact_infos: [{
                        type: "number",
                        title: "Call Us",
                        label: "Mobile ",
                        number: "123 456 7890",
                    },
                    {
                        type: "email",
                        title: "Email",
                        label: "Email ",
                        email: "contactme@domain.com",
                    },
                    {
                        type: "address",
                        title: "Address",
                        street: '817 N Ave',
                        city: 'California',
                        country: 'US',
                        state: 'Chicago',
                        zip: '60622',
                        action_button_enable: 1,
                        action_button_label: "Direction",
                        action_button_link: "#",
                    },
                ]
            },
            {
                component: 'web_links',
                header_enable: 0,
                title: 'Web Link',
                desc: 'Description',
                links: [{
                    url: "",
                    title: "Portfolio",
                    subtitle: "Visit for more information",
                    subtitle_enable: 1,
                    icon_img: "/images/digitalCard/weblink.png"
                }]
            }
        ],
        style: {
            primary_bg_color: "#333333",
            primary_profile_text_color: "#ffffff",
            primary_text_color: "#333333",
            secondary_bg_color: "#000000",
            secondary_profile_text_color: "#ffffff",
            secondary_text_color: "#656b6c",
            // bg_img: "/images/digitalCard/bg_page_1.jpg",
            card: {
                bg_color: "#ffffff",
                blur: "29",
                border_radius: "16",
                enable: 1,
                shadow_color: "#64646f33",
                spread: "0",
                x: "0",
                y: "7",
            },
            custom_css: `
         body{overflow:auto !important;}
         .qrc_profile_3{background-color: var(--qrc-secondary); border-radius: 18px; margin: 15px 0 0 0; border-radius: var(--qrc-border-radius); overflow: hidden;  box-shadow: rgb(255 255 255 / 15%) 0px 0px 3px 0px, rgb(255 255 255 / 15%) 0px 8px 16px -8px;}
         .qrc_profile_3 h2{text-shadow: 2px 2px 3px rgba(0,0,0,0.3); color: var(--qrc-profile-primary); font-size: 44px; line-height: 46px; word-break: break-word}
         .qrc_profile_3 p{color: var(--qrc-profile-secondary);}
         .qrc_profile_3 .qrc_profile_inner{ padding-top: 0;}
         .qrc_profile_3 .qrc_profilepic{height: 464px; width: 100%; border-radius: 0;}
         .qrc_profile_3_svg{position: absolute; bottom: -1px;}
         .qrc_page_inner{padding-top:0}
         .qrc_profilepic{position: relative; background-position: center;}
         .qrc_profile_shortcut ul li{text-align: center; background: var(--qrc-primary); color: #fff; padding-top:0px}
         .qrc_profile_shortcut ul li a:hover{color: #fff;}
         .qrc_profile_shortcut ul li a{color:#fff;}
         .qrc_gallery_list li{padding-top: 0px;}
         .qrc_profile_inner_info{margin-top:-228px}
         .qrc_page_wrapper{background-position: top center; background-size: cover;height:unset; min-height:100vh;}
       
         
         @media (max-width: 767px) {
             .qrc_profile_3 {margin: 0 -15px; border-radius: 0px !important; box-shadow: unset; }
             body::-webkit-scrollbar { display: none;}
             body { -ms-overflow-style: none;  scrollbar-width: none;}
         }
         `
        },
        html: {
            profile: {
                main: `<div class="section qrc_profile_3">
                         <div class="qrc_profile_inner">
                             ___pr_pic___
                             <div class="qrc_profile_inner_info">
                                 <h2>___name___</h2>
                                 <p>___desc___</p>
                                 <p><strong>___company___</strong></p>
                                 ___br_img_html___
                                 ___shortcut_html___
                             </div>
                         </div>
                     </div>`,
                shortcut: `<div class="qrc_profile_shortcut">
                             <ul>___shortcut_items___</ul>
                         </div>`,
                item: '<li class="qr_cc_card"><a href="___item_link___"><span class="___item_icon___"></span></a></li>',
                pr_img: `<div class="qrc_profilepic" style="background-image: url('___pr_img___');">
                         <svg id="Layer_1" class="qrc_profile_3_svg" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 375 260">
                                 <defs>
                                     <style>
                                     .cls-1 {
                                         fill: url(#linear-gradient);
                                     }
                                     </style>
                                     <linearGradient id="linear-gradient" x1="1.06" y1="260.32" x2="1.06" y2="259.32" gradientTransform="translate(-208.5 67424) scale(375 -259)" gradientUnits="userSpaceOnUse">
                                     <stop offset="0" stop-color="#000" stop-opacity="0" style="stop-color: var(--qrc-secondary);"/>
                                     <stop offset="1" stop-color="#000" style="stop-color: var(--qrc-secondary);"/>
                                     </linearGradient>
                                 </defs>
                             <rect id="Rectangle_297" data-name="Rectangle 297" class="cls-1" width="375" height="260"/>
                         </svg>           
                     </div>`,
                br_img: `<div class="qrc_profile_brand_logo"> <img src="___br_img___"/> </div>`

            },
            social_link: DefaultHtmlTemplate.social_link,
            web_links: DefaultHtmlTemplate.web_links,
            text_desc: DefaultHtmlTemplate.text_desc,
            contact: DefaultHtmlTemplate.contact,
            button: DefaultHtmlTemplate.button,
            video: DefaultHtmlTemplate.video,
            custom_fields: DefaultHtmlTemplate.custom_fields,
            pdf_gallery: DefaultHtmlTemplate.pdf_gallery,
        }
    },


    // DBC New V Template 8
    {
        content: [{
                component: 'profile',
                pr_img: '/images/digitalCard/dbc/profile_1.png',
                br_img: `/images/digitalCard/dbc/brand_logo_3.png`,
                pr_img_label: '(380x475px, 4:5 Ratio)',
                br_img_label: '(100x100px, 1:1 Ratio)',

                remove_only_pr_img: 1,
                show_brand_img: 1,
                name: 'Linda Johnson',
                desc: 'Sr. Marketing Manager',
                company: 'Company',
                contact_shortcut_enable: 1,
                contact_shortcuts: [{
                    type: 'mobile',
                    value: ""
                }, {
                    type: 'email',
                    value: ""
                }, {
                    type: 'sms',
                    value: ""
                }]
            },
            {
                component: 'text_desc',
                title: 'About Me',
                desc: 'Description',
            },
            {
                component: 'images',
                header_enable: 0,
                title: '',
                desc: '',
                view_type: 'grid_2',
                images: [
                    '/images/digitalCard/image_1.png',
                    '/images/digitalCard/image_2.png'
                ]
            },
            {
                component: 'social_link',
                header_enable: 0,
                title: 'Social Links',
                desc: 'Description',
                links: [{
                        type: "facebook",
                        url: "",
                        title: "Title",
                        subtitle: "Like us on Facebook",
                        subtitle_enable: 1,
                        icon_img: "/images/digitalCard/fb_icon@72x.png"
                    },
                    {
                        type: "instagram",
                        url: "",
                        title: "Instagram",
                        subtitle: "Follow us on Instagragm",
                        subtitle_enable: 0,
                        icon_img: "/images/digitalCard/insta_icon@72x.png"
                    },
                    {
                        type: "twitter",
                        url: "",
                        title: "Twitter",
                        subtitle: "Talk with us on Twitter",
                        subtitle_enable: 0,
                        icon_img: "/images/digitalCard/tw_icon@72x.png"
                    },
                ]
            },
            {
                component: 'contact',
                contact_title: 'Contact Us',
                icon_img: '/images/digitalCard/contactus.png',
                floating_button_enable: 1,
                floating_button_label: 'Add to Contact',
                contact_infos: [{
                        type: "number",
                        title: "Call Us",
                        label: "Mobile ",
                        number: "123 456 7890",
                    },
                    {
                        type: "email",
                        title: "Email",
                        label: "Email ",
                        email: "contactme@domain.com",
                    },
                    {
                        type: "address",
                        title: "Address",
                        street: '817 N Ave',
                        city: 'California',
                        country: 'US',
                        state: 'Chicago',
                        zip: '60622',
                        action_button_enable: 1,
                        action_button_label: "Direction",
                        action_button_link: "#",
                    },
                ]
            },
            {
                component: 'web_links',
                header_enable: 0,
                title: 'Web Link',
                desc: 'Description',
                links: [{
                    url: "",
                    title: "Portfolio",
                    subtitle: "Visit for more information",
                    subtitle_enable: 1,
                    icon_img: "/images/digitalCard/weblink.png"
                }]
            }
        ],
        style: {
            primary_bg_color: "#E64B54",
            primary_profile_text_color: "#ffffff",
            primary_text_color: "#E64B54",
            secondary_bg_color: "#6B5DD3",
            secondary_profile_text_color: "#ffffff",
            secondary_text_color: "#656b6c",
            // bg_img: "/images/digitalCard/bg_page_1.jpg",
            card: {
                bg_color: "#ffffff",
                blur: "29",
                border_radius: "16",
                enable: 1,
                shadow_color: "#64646f33",
                spread: "0",
                x: "0",
                y: "7",
            },
            custom_css: `
         body{overflow:auto !important;}
         .qrc_profile_5{background-color: var(--qrc-secondary); border-radius: 18px; overflow: hidden; margin: 15px 0; box-shadow: rgb(255 255 255 / 15%) 0px 0px 3px 0px, rgb(255 255 255 / 15%) 0px 8px 16px -8px;}
         .qrc_profile_5 h2{text-shadow: 2px 2px 3px rgba(0,0,0,0.3); color: var(--qrc-profile-primary); font-size: 32px; font-weight: bold; word-break: break-word;}
         .qrc_profile_5 p{color: var(--qrc-profile-secondary); margin-bottom: 0;}
         .qrc_profile_5 .qrc_profile_inner{ padding-top: 0; position: relative; padding-bottom: 15px;}
         .qrc_profile_5 .qrc_profilepic{height: 426px; width: 100%; border-radius: 0;}
         .qrc_profile_5_svg{position: absolute; top: 260px; top: 260px;width: 420px;right: 0;}
         .qrc_profile_5_ovrlay_svg{position: absolute; bottom: 60px;}
         .qrc_profile_5 .qrc_profile_inner_info{margin-top: -25px;}
         .qrc_page_inner{padding-top:0}
         .qrc_profilepic{background-position: center; }
         .qrc_profile_shortcut ul li{text-align: center; background: var(--qrc-primary); color: #fff;width: 52px;
             height: 52px;
             font-size: 26px;
             padding-top: 0px;     margin-bottom: 8px; margin-left: 15px;}
         .qrc_profile_shortcut ul li a{color: #fff;}
         .qrc_profile_shortcut ul li a:hover{color: #fff;}
         .qrc_gallery_list li{padding-top: 0px; }
         .qrc_profile_shortcut ul li a{padding: 11px;}
         .qrc_page_wrapper{background-position: top center; background-size: cover;height:unset; min-height:100vh;}
         .qrc_profile_brand_logo{position: absolute; right: 61px;
             top: -194px; border-radius: 100px;
             width: 90px;
             height: 90px;
             margin: auto;
             text-align: center;
             vertical-align: middle;
             display: flex;
             align-items: center;
             overflow: hidden;
         }
         .qrc_profile_brand_logo img{max-width: 100%; max-height: 100%;}
         .qrc_profile_shortcut{margin: 15px 0 0 0; width: 100%;}
         .qrc_profile_shortcut{position: absolute;z-index: 9;}
         .qrc_profile_shortcut ul li:first-child{position: absolute; top: 297px; right: 72%;}
         .qrc_profile_shortcut ul li:nth-child(2){position: absolute; top: 275px; right: 45%;}
         .qrc_profile_shortcut ul li:nth-child(3){position: absolute; top: 310px; right: 30%;}
         .qrc_profile_shortcut ul li:nth-child(4){position: absolute; top: 302px; right: 12%;}
         .qrc_profile_shortcut ul li:nth-child(5){position: absolute; top: 364px; right: 8%;}
         .qrc_profile_shortcut ul li:nth-child(6){position: absolute; top: 426px; right: 8%;}
         
         @media (max-width: 767px) {
             .qrc_profile_5 {margin: 0 -15px; border-radius: 0px !important; margin-top:0; margin-bottom: 0px; box-shadow:unset !important}
             body::-webkit-scrollbar { display: none;}
             body { -ms-overflow-style: none;  scrollbar-width: none;}
             .qrc_profile_shortcut ul li:first-child{position: absolute; top: 297px; right: 70%;}
             .qrc_profile_shortcut ul li:nth-child(2){position: absolute; top: 275px; right: 40%;}
             .qrc_profile_shortcut ul li:nth-child(3){position: absolute; top: 310px; right: 24%;}
             .qrc_profile_shortcut ul li:nth-child(4){position: absolute; top: 302px; right: 6%;}
             .qrc_profile_shortcut ul li:nth-child(5){position: absolute; top: 364px; right: 2%;}
             .qrc_profile_shortcut ul li:nth-child(6){position: absolute; top: 426px; right: 2%;}
         }
         @media (max-width: 320px) {
             .qrc_profile_shortcut ul li:first-child{position: absolute; top: 297px; right: 82%;}
             .qrc_profile_shortcut ul li:nth-child(2){position: absolute; top: 275px; right: 50%;}
             .qrc_profile_shortcut ul li:nth-child(3){position: absolute; top: 310px; right: 31%;}
             .qrc_profile_shortcut ul li:nth-child(4){position: absolute; top: 302px; right: 6%;}
             .qrc_profile_shortcut ul li:nth-child(5){position: absolute; top: 364px; right: 2%;}
             .qrc_profile_shortcut ul li:nth-child(6){position: absolute; top: 426px; right: 2%;}
         }
         `
        },
        html: {
            profile: {
                main: `<div class="section qrc_profile_5">
                         ___shortcut_html___
                         <div class="qrc_profile_inner">
                             ___pr_pic___
                             <div class="qrc_profile_inner_info">
                                 <h2>___name___</h2>
                                 <p>___desc___</p>
                                 <p><strong>___company___</strong></p>
                                 ___br_img_html___
                                 
                             </div>
                         </div>
                     </div>`,
                shortcut: `<div class="qrc_profile_shortcut">
                             <ul>___shortcut_items___</ul>
                         </div>`,
                item: '<li class="qr_cc_card"><a href="___item_link___"><span class="___item_icon___"></span></a></li>',
                pr_img: `<div class="qrc_profilepic" style="background-image: url('___pr_img___');">
                         <!-- overlay svg -->
                         <svg id="Layer_1" class="qrc_profile_5_ovrlay_svg" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 375 300">
                             <defs>
                                 <style>
                                 .cls-1 {
                                     fill: url(#linear-gradient);
                                 }
                                 </style>
                                 <linearGradient id="linear-gradient" x1="1.06" y1="260.32" x2="1.06" y2="259.32" gradientTransform="translate(-208.5 67424) scale(375 -259)" gradientUnits="userSpaceOnUse">
                                 <stop offset="0" stop-color="#fff" stop-opacity="0"/>
                                 <stop offset="1" stop-color="#fff"/>
                                 </linearGradient>
                             </defs>
                             <rect id="Rectangle_297" data-name="Rectangle 297" class="cls-1" width="375" height="300"/>
                         </svg>
 
                         <!-- shape svg -->
 
                         <svg version="1.1" class="qrc_profile_5_svg" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                             viewBox="0 0 375 207" style="enable-background:new 0 0 375 207;" xml:space="preserve">
                         <style type="text/css">
                             .st0{clip-path:url(#SVGID_00000047745947993434661130000014600318458251869100_);}
                             .st1{clip-path:url(#SVGID_00000110431894564677843700000007288187513974406543_);}
                             .st2{fill:var(--qrc-secondary);}
                         </style>
                         <g>
                             <defs>
                                 <rect id="SVGID_1_" y="11.2" width="375" height="195.8"/>
                             </defs>
                             <clipPath id="SVGID_00000044863811748834846860000016783219712372586125_">
                                 <use xlink:href="#SVGID_1_"  style="overflow:visible;"/>
                             </clipPath>
                             <g id="Group_1167" style="clip-path:url(#SVGID_00000044863811748834846860000016783219712372586125_);">
                                 <g id="Group_1166">
                                     <g id="Group_1165">
                                         <g>
                                             <defs>
                                                 <rect id="SVGID_00000101064086539145579110000002822391684289985938_" y="11.2" width="375" height="195.8"/>
                                             </defs>
                                             <clipPath id="SVGID_00000023988623956734590590000012833733061238956698_">
                                                 <use xlink:href="#SVGID_00000101064086539145579110000002822391684289985938_"  style="overflow:visible;"/>
                                             </clipPath>
                                             <g id="Group_1164" style="clip-path:url(#SVGID_00000023988623956734590590000012833733061238956698_);">
                                                 <path id="Path_1436" class="st2" d="M0,142.3V207h375V81.4c0,0-9.1-65-83-37.8c-37.6,13.8-51.9-32.4-79.2-32.4
                                                     c-79.8,0-48,84.3-90.8,102.5C78.2,132.3,0,65.7,0,142.3"/>
                                             </g>
                                         </g>
                                     </g>
                                 </g>
                             </g>
                         </g>
                         </svg>         
                     </div>`,
                br_img: `<div class="qrc_profile_brand_logo"> <img src="___br_img___"/> </div>`

            },
            social_link: DefaultHtmlTemplate.social_link,
            web_links: DefaultHtmlTemplate.web_links,
            text_desc: DefaultHtmlTemplate.text_desc,
            contact: DefaultHtmlTemplate.contact,
            button: DefaultHtmlTemplate.button,
            video: DefaultHtmlTemplate.video,
            custom_fields: DefaultHtmlTemplate.custom_fields,
            pdf_gallery: DefaultHtmlTemplate.pdf_gallery,
        }
    },

    // DBC New V Template 9
    {
        content: [{
                component: 'profile',
                pr_img: '/images/digitalCard/dbc/profile_4.png',
                pr_img_label: '(200x200px, 1:1 Ratio)',

                name: 'Linda Johnson',
                desc: 'Sr. Marketing Manager',
                company: '',
                contact_shortcut_enable: 1,
                contact_shortcuts: [{
                    type: 'mobile',
                    value: ""
                }, {
                    type: 'email',
                    value: ""
                }, {
                    type: 'sms',
                    value: ""
                }]
            },
            {
                component: 'text_desc',
                title: 'About Me',
                desc: 'Description',
            },
            {
                component: 'images',
                header_enable: 0,
                title: '',
                desc: '',
                view_type: 'grid_2',
                images: [
                    '/images/digitalCard/image_1.png',
                    '/images/digitalCard/image_2.png'
                ]
            },
            {
                component: 'social_link',
                header_enable: 0,
                title: 'Social Links',
                desc: 'Description',
                links: [{
                        type: "facebook",
                        url: "",
                        title: "Title",
                        subtitle: "Like us on Facebook",
                        subtitle_enable: 1,
                        icon_img: "/images/digitalCard/fb_icon@72x.png"
                    },
                    {
                        type: "instagram",
                        url: "",
                        title: "Instagram",
                        subtitle: "Follow us on Instagragm",
                        subtitle_enable: 0,
                        icon_img: "/images/digitalCard/insta_icon@72x.png"
                    },
                    {
                        type: "twitter",
                        url: "",
                        title: "Twitter",
                        subtitle: "Talk with us on Twitter",
                        subtitle_enable: 0,
                        icon_img: "/images/digitalCard/tw_icon@72x.png"
                    },
                ]
            },
            {
                component: 'contact',
                contact_title: 'Contact Us',
                icon_img: '/images/digitalCard/contactus.png',
                floating_button_enable: 1,
                floating_button_label: 'Add to Contact',
                contact_infos: [{
                        type: "number",
                        title: "Call Us",
                        label: "Mobile ",
                        number: "123 456 7890",
                    },
                    {
                        type: "email",
                        title: "Email",
                        label: "Email ",
                        email: "contactme@domain.com",
                    },
                    {
                        type: "address",
                        title: "Address",
                        street: '817 N Ave',
                        city: 'California',
                        country: 'US',
                        state: 'Chicago',
                        zip: '60622',
                        action_button_enable: 1,
                        action_button_label: "Direction",
                        action_button_link: "#",
                    },
                ]
            },
            {
                component: 'web_links',
                header_enable: 0,
                title: 'Web Link',
                desc: 'Description',
                links: [{
                    url: "",
                    title: "Portfolio",
                    subtitle: "Visit for more information",
                    subtitle_enable: 1,
                    icon_img: "/images/digitalCard/weblink.png"
                }]
            }
        ],
        style: {
            primary_bg_color: "#161616",
            primary_profile_text_color: "#000000",
            primary_text_color: "#161616",
            secondary_bg_color: "#ffffff",
            secondary_profile_text_color: "#7D7D7D",
            secondary_text_color: "#7D7D7D",
            bg_img: "/images/digitalCard/dbc/bg_image_4.jpg",
            card: {
                bg_color: "#ffffff",
                blur: "29",
                border_radius: "16",
                enable: 1,
                shadow_color: "#64646f33",
                spread: "0",
                x: "0",
                y: "7",
            },
            custom_css: `
         body{overflow:auto !important;}
         .qrc_profile_4{ border-radius: 18px;}
         .qrc_profile_4 h2{text-shadow: 2px 2px 3px rgba(0,0,0,0.3); color: var(--qrc-profile-primary); font-size: 38px; line-height:40px; word-break: break-word;}
         .qrc_profile_4 h2::after{content: ''; width: 74px; height: 6px; background: var(--qrc-profile-primary); display: block; margin-left: 0px; margin-top: 10px;}
         .qrc_profile_4 p{color: var(--qrc-profile-secondary);}
         .qrc_profile_4 .qrc_profile_inner{ padding-top: 100px; padding-bottom: 20px;}
         .qrc_profile_4 .qrc_profilepic{width: 194px;  width: 194px; border-radius: 120px; position: relative;right: -52px;}
         .qrc_profile_inner_info{padding: 0 30px 0 0; margin-top: 20px; position: relative;}
         .qrc_profile_4_svg{position: absolute; bottom: 0px;}
         .qrc_page_inner{padding-top:0}
         .qrc_profilepic{position: relative; background-position: center;}
         .qrc_profile_shortcut ul li{text-align: center; background:#fff; color: var(--qrc-primary); padding-top: 0px;}
         .qrc_profile_shortcut ul li a:hover{color: var(--qrc-primary);}
         .qrc_profile_shortcut ul li a{color: var(--qrc-primary);}
         .qrc_gallery_list li{padding-top: 0px;}
         .qrc_page_wrapper{background-position: top center; background-size: cover;height:unset; min-height:100vh;}
         
         
         @media (max-width: 767px) {
             .qrc_profile_3 {margin: 0 -15px; border-radius: 0px !important}
             .qrc_profile_4 h2::after{content: ''; width: 74px; height: 6px; background: var(--qrc-profile-primary); display: block; margin-left: -30px; margin-top: 10px;}
             body::-webkit-scrollbar { display: none;}
             body { -ms-overflow-style: none;  scrollbar-width: none;}
         }
         
         `
        },
        html: {
            profile: {
                main: `<div class="section qrc_profile_4">
                         <div class="qrc_profile_inner">
                             ___pr_pic___
                             <div class="qrc_profile_inner_info">
                                 <h2>___name___</h2>
                                 <p>___desc___</p>
                                 <p><strong>___company___</strong></p>
                                 ___shortcut_html___
                             </div>
                         </div>
                     </div>`,
                shortcut: `<div class="qrc_profile_shortcut">
                             <ul>___shortcut_items___</ul>
                         </div>`,
                item: '<li class="qr_cc_card"><a href="___item_link___"><span class="___item_icon___"></span></a></li>',
                pr_img: `<div class="qrc_profilepic" style="background-image: url('___pr_img___');"></div>`

            },
            social_link: DefaultHtmlTemplate.social_link,
            web_links: DefaultHtmlTemplate.web_links,
            text_desc: DefaultHtmlTemplate.text_desc,
            contact: DefaultHtmlTemplate.contact,
            button: DefaultHtmlTemplate.button,
            video: DefaultHtmlTemplate.video,
            custom_fields: DefaultHtmlTemplate.custom_fields,
            pdf_gallery: DefaultHtmlTemplate.pdf_gallery,
        }
    },


    // DBC New V Template 10
    {
        content: [{
                component: 'profile',
                pr_img: '/images/digitalCard/dbc/profile_4.png',
                pr_img_label: '(200x200px, 1:1 Ratio)',
                name: 'Linda Johnson',
                desc: 'Sr. Marketing Manager',
                company: '',
                contact_shortcut_enable: 1,
                contact_shortcuts: [{
                    type: 'mobile',
                    value: ""
                }, {
                    type: 'email',
                    value: ""
                }, {
                    type: 'sms',
                    value: ""
                }]
            },
            {
                component: 'text_desc',
                title: 'About Me',
                desc: 'Description',
            },
            {
                component: 'images',
                header_enable: 0,
                title: '',
                desc: '',
                view_type: 'grid_2',
                images: [
                    '/images/digitalCard/image_1.png',
                    '/images/digitalCard/image_2.png'
                ]
            },
            {
                component: 'social_link',
                header_enable: 0,
                title: 'Social Links',
                desc: 'Description',
                links: [{
                        type: "facebook",
                        url: "",
                        title: "Title",
                        subtitle: "Like us on Facebook",
                        subtitle_enable: 1,
                        icon_img: "/images/digitalCard/fb_icon@72x.png"
                    },
                    {
                        type: "instagram",
                        url: "",
                        title: "Instagram",
                        subtitle: "Follow us on Instagragm",
                        subtitle_enable: 0,
                        icon_img: "/images/digitalCard/insta_icon@72x.png"
                    },
                    {
                        type: "twitter",
                        url: "",
                        title: "Twitter",
                        subtitle: "Talk with us on Twitter",
                        subtitle_enable: 0,
                        icon_img: "/images/digitalCard/tw_icon@72x.png"
                    },
                ]
            },
            {
                component: 'contact',
                contact_title: 'Contact Us',
                icon_img: '/images/digitalCard/contactus.png',
                floating_button_enable: 1,
                floating_button_label: 'Add to Contact',
                contact_infos: [{
                        type: "number",
                        title: "Call Us",
                        label: "Mobile ",
                        number: "123 456 7890",
                    },
                    {
                        type: "email",
                        title: "Email",
                        label: "Email ",
                        email: "contactme@domain.com",
                    },
                    {
                        type: "address",
                        title: "Address",
                        street: '817 N Ave',
                        city: 'California',
                        country: 'US',
                        state: 'Chicago',
                        zip: '60622',
                        action_button_enable: 1,
                        action_button_label: "Direction",
                        action_button_link: "#",
                    },
                ]
            },
            {
                component: 'web_links',
                header_enable: 0,
                title: 'Web Link',
                desc: 'Description',
                links: [{
                    url: "",
                    title: "Portfolio",
                    subtitle: "Visit for more information",
                    subtitle_enable: 1,
                    icon_img: "/images/digitalCard/weblink.png"
                }]
            }
        ],
        style: {
            primary_bg_color: "#161616",
            primary_profile_text_color: "#ffffff",
            primary_text_color: "#161616",
            secondary_bg_color: "#ffffff",
            secondary_profile_text_color: "#ffffff",
            secondary_text_color: "#7D7D7D",
            bg_img: "/images/digitalCard/dbc/bg_image_5.jpg",
            card: {
                bg_color: "#ffffff",
                blur: "29",
                border_radius: "16",
                enable: 1,
                shadow_color: "#64646f33",
                spread: "0",
                x: "0",
                y: "7",
            },
            custom_css: `
         body{overflow:auto !important;}
         .qrc_profile_4{ border-radius: 18px;}
         .qrc_profile_4 h2{text-shadow: 2px 2px 3px rgba(0,0,0,0.3); color: var(--qrc-profile-primary); font-size: 38px; line-height:40px; word-break: break-word;}
         .qrc_profile_4 h2::after{content: ''; width: 74px; height: 6px; background: var(--qrc-profile-primary); display: block; margin-left: 0px; margin-top: 10px;}
         .qrc_profile_4 p{color: var(--qrc-profile-secondary);}
         .qrc_profile_4 .qrc_profile_inner{ padding-top: 100px; padding-bottom: 20px;}
         .qrc_profile_4 .qrc_profilepic{width: 194px;  width: 194px; border-radius: 120px; position: relative;right: -52px;}
         .qrc_profile_inner_info{padding: 0 30px 0 0; margin-top: 20px; position: relative;}
         .qrc_profile_4_svg{position: absolute; bottom: 0px;}
         .qrc_profilepic{position: relative; background-position: center;}
         .qrc_profile_shortcut ul li{text-align: center; background:#fff; color: var(--qrc-primary); padding-top: 0px;}
         .qrc_profile_shortcut ul li a:hover{color: var(--qrc-primary);}
         .qrc_gallery_list li{padding-top: 0px;}
         .qrc_page_wrapper{background-position: top center; background-size: cover;height:unset; min-height:100vh;}
         .qrc_page_inner{padding-top:0}
         
         
         @media (max-width: 767px) {
             .qrc_profile_3 {margin: 0 -15px; border-radius: 0px !important}
             .qrc_profile_4 h2::after{content: ''; width: 74px; height: 6px; background: var(--qrc-profile-primary); display: block; margin-left: -30px; margin-top: 10px;}
             body::-webkit-scrollbar { display: none;}
             body { -ms-overflow-style: none;  scrollbar-width: none;}
         }            
         `
        },
        html: {
            profile: {
                main: `<div class="section qrc_profile_4">
                         <div class="qrc_profile_inner">
                             ___pr_pic___
                             <div class="qrc_profile_inner_info">
                                 <h2>___name___</h2>
                                 <p>___desc___</p>
                                 <p><strong>___company___</strong></p>
                                 ___shortcut_html___
                             </div>
                         </div>
                     </div>`,
                shortcut: `<div class="qrc_profile_shortcut">
                             <ul>___shortcut_items___</ul>
                         </div>`,
                item: '<li class="qr_cc_card"><a href="___item_link___"><span class="___item_icon___"></span></a></li>',
                pr_img: `<div class="qrc_profilepic" style="background-image: url('___pr_img___');"></div>`

            },
            social_link: DefaultHtmlTemplate.social_link,
            web_links: DefaultHtmlTemplate.web_links,
            text_desc: DefaultHtmlTemplate.text_desc,
            contact: DefaultHtmlTemplate.contact,
            button: DefaultHtmlTemplate.button,
            video: DefaultHtmlTemplate.video,
            custom_fields: DefaultHtmlTemplate.custom_fields,
            pdf_gallery: DefaultHtmlTemplate.pdf_gallery,
        }
    },

    // DBC New V Template 11
    {
        content: [{
                component: 'profile',
                pr_img: '/images/digitalCard/dbc/profile_1.png',
                br_img: `/images/digitalCard/dbc/brand_logo_3.png`,

                pr_img_label: '(380x475px, 4:5 Ratio)',
                br_img_label: '(120x120px, 1:1 Ratio)',

                remove_only_pr_img: 1,
                show_brand_img: 1,
                name: 'Linda Johnson',
                desc: 'Sr. Marketing Manager',
                company: '',
                contact_shortcut_enable: 1,
                contact_shortcuts: [{
                    type: 'mobile',
                    value: ""
                }, {
                    type: 'email',
                    value: ""
                }, {
                    type: 'sms',
                    value: ""
                }]
            },
            {
                component: 'text_desc',
                title: 'About Me',
                desc: 'Description',
            },
            {
                component: 'images',
                header_enable: 0,
                title: '',
                desc: '',
                view_type: 'grid_2',
                images: [
                    '/images/digitalCard/image_1.png',
                    '/images/digitalCard/image_2.png'
                ]
            },
            {
                component: 'social_link',
                header_enable: 0,
                title: 'Social Links',
                desc: 'Description',
                links: [{
                        type: "facebook",
                        url: "",
                        title: "Title",
                        subtitle: "Like us on Facebook",
                        subtitle_enable: 1,
                        icon_img: "/images/digitalCard/fb_icon@72x.png"
                    },
                    {
                        type: "instagram",
                        url: "",
                        title: "Instagram",
                        subtitle: "Follow us on Instagragm",
                        subtitle_enable: 0,
                        icon_img: "/images/digitalCard/insta_icon@72x.png"
                    },
                    {
                        type: "twitter",
                        url: "",
                        title: "Twitter",
                        subtitle: "Talk with us on Twitter",
                        subtitle_enable: 0,
                        icon_img: "/images/digitalCard/tw_icon@72x.png"
                    },
                ]
            },
            {
                component: 'contact',
                contact_title: 'Contact Us',
                icon_img: '/images/digitalCard/contactus.png',
                floating_button_enable: 1,
                floating_button_label: 'Add to Contact',
                contact_infos: [{
                        type: "number",
                        title: "Call Us",
                        label: "Mobile ",
                        number: "123 456 7890",
                    },
                    {
                        type: "email",
                        title: "Email",
                        label: "Email ",
                        email: "contactme@domain.com",
                    },
                    {
                        type: "address",
                        title: "Address",
                        street: '817 N Ave',
                        city: 'California',
                        country: 'US',
                        state: 'Chicago',
                        zip: '60622',
                        action_button_enable: 1,
                        action_button_label: "Direction",
                        action_button_link: "#",
                    },
                ]
            },
            {
                component: 'web_links',
                header_enable: 0,
                title: 'Web Link',
                desc: 'Description',
                links: [{
                    url: "",
                    title: "Portfolio",
                    subtitle: "Visit for more information",
                    subtitle_enable: 1,
                    icon_img: "/images/digitalCard/weblink.png"
                }]
            }
        ],
        style: {
            primary_bg_color: "#E64B54",
            primary_profile_text_color: "#070708",
            primary_text_color: "#E64B54",
            secondary_bg_color: "#FFE6E8",
            secondary_profile_text_color: "#070708",
            secondary_text_color: "#656b6c",
            // bg_img: "/images/digitalCard/dbc/bg_image_5.jpg",
            card: {
                bg_color: "#ffffff",
                blur: "29",
                border_radius: "16",
                enable: 1,
                shadow_color: "#64646f33",
                spread: "0",
                x: "0",
                y: "7",
            },
            custom_css: `
         body{overflow:auto !important;}
         .qrc_profile_5{background-color: var(--qrc-secondary); border-radius: 18px; overflow: hidden; margin: 15px 0;}
         .qrc_profile_5 h2{text-shadow: 2px 2px 3px rgba(0,0,0,0.3); color: var(--qrc-profile-primary); font-size: 32px; line-height:34px; font-weight: bold; word-break: break-word;}
         .qrc_profile_5 p{color: var(--qrc-profile-secondary);}
         .qrc_profile_5 .qrc_profile_inner{ padding-top: 0; position: relative; padding-bottom: 0;height: 466px;}
         .qrc_profile_5 .qrc_profilepic{height: 426px; width: 100%; border-radius: 0;}
         .qrc_profile_5_svg{position: absolute; bottom: -1px;}
         .qrc_profile_5_ovrlay_svg{position: absolute; bottom: 40px;}
         .qrc_profile_5 .qrc_profile_inner_info{margin-top: -235px;}
         .qrc_profilepic{background-position: center; }
         .qrc_profile_shortcut ul li{text-align: center; background: var(--qrc-primary); color: #fff;width: 44px;
             height: 44px;
             font-size: 22px;
             padding-top: 0px;     margin-bottom: 8px;}
         .qrc_profile_shortcut ul li a{color: #fff;}
         .qrc_profile_shortcut ul li a:hover{color: #fff;}
         .qrc_gallery_list li{padding-top: 0px;}
         .qrc_page_wrapper{background-position: top center; background-size: cover;height:unset; min-height:100vh;}
         .qrc_profile_brand_logo{position: absolute; right: 15px;top: 333px;border-radius: 100px;
             width: 110px;
             height: 110px;
             margin: auto;
             text-align: center;
             vertical-align: middle;
             display: flex;
             align-items: center;
             overflow: hidden;
         }
         .qrc_profile_brand_logo img{max-width: 100%; max-height: 100%;}
         .qrc_profile_shortcut{margin: 15px 0 0 0; width: 240px;}
         .qrc_page_inner{padding-top:0}
         
         
         @media (max-width: 767px) {
             .qrc_profile_5 {margin: 0 -15px; border-radius: 0px !important; margin-top:0; margin-bottom: 0px;}
             body::-webkit-scrollbar { display: none;}
             body { -ms-overflow-style: none;  scrollbar-width: none;}
         }
         `
        },
        html: {
            profile: {
                main: `<div class="section qrc_profile_5">
                         <div class="qrc_profile_inner">
                             ___pr_pic___
                             <div class="qrc_profile_inner_info">
                                 <h2>___name___</h2>
                                 <p>___desc___</p>
                                 <p><strong>___company___</strong></p>
                                 ___shortcut_html___
                             </div>
                             ___br_img_html___
                         </div>
                     </div>`,
                shortcut: `<div class="qrc_profile_shortcut">
                             <ul>___shortcut_items___</ul>
                         </div>`,
                item: '<li class="qr_cc_card"><a href="___item_link___"><span class="___item_icon___"></span></a></li>',
                pr_img: `<div class="qrc_profilepic" style="background-image: url('___pr_img___');">
                         <svg id="Layer_1" class="qrc_profile_5_ovrlay_svg" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 375 300">
                             <defs>
                                 <style>
                                 .cls-1 {
                                     fill: url(#linear-gradient);
                                 }
                                 </style>
                                 <linearGradient id="linear-gradient" x1="1.06" y1="260.32" x2="1.06" y2="259.32" gradientTransform="translate(-208.5 67424) scale(375 -259)" gradientUnits="userSpaceOnUse">
                                 <stop offset="0" stop-color="#fff" stop-opacity="0"/>
                                 <stop offset="1" stop-color="#fff"/>
                                 </linearGradient>
                             </defs>
                             <rect id="Rectangle_297" data-name="Rectangle 297" class="cls-1" width="375" height="300"/>
                         </svg>
 
                         <!-- shape svg -->
                         <svg version="1.1"   class="qrc_profile_5_svg" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                         viewBox="0 0 375 171" style="enable-background:new 0 0 375 171;" xml:space="preserve">
                             <style type="text/css">
                                 .st0{fill:var(--qrc-primary);}
                                 .st1{fill:var(--qrc-secondary);}
                             </style>
                             <path id="Path_1445" class="st0" d="M0,85c0,0,96.58,77.28,187.95-8.02C309.63-48.31,374.49,23.64,374.49,23.64l-0.28,127.04L0,151"
                                 />
                             <path id="Path_1446" class="st1" d="M0,86c0,0,101.54,82.61,192.91-2.7C314.6-41.98,375.2,66.77,375.2,66.77v103.91L0,171V86z"/>
                         </svg>
                     </div>`,
                br_img: `<div class="qrc_profile_brand_logo"> <img src="___br_img___"/> </div>`

            },
            social_link: DefaultHtmlTemplate.social_link,
            web_links: DefaultHtmlTemplate.web_links,
            text_desc: DefaultHtmlTemplate.text_desc,
            contact: DefaultHtmlTemplate.contact,
            button: DefaultHtmlTemplate.button,
            video: DefaultHtmlTemplate.video,
            custom_fields: DefaultHtmlTemplate.custom_fields,
            pdf_gallery: DefaultHtmlTemplate.pdf_gallery,
        }
    },


    // DBC New V Template 12
    {
        content: [{
                component: 'profile',
                pr_img: '/images/digitalCard/dbc/profile_5.png',
                br_img: `/images/digitalCard/dbc/brand_logo_3.png`,
                pr_img_label: '(380x475px, 4:5 Ratio)',
                br_img_label: '(120x120px, 1:1 Ratio)',
                remove_only_pr_img: 1,
                show_brand_img: 1,
                name: 'Linda Johnson',
                desc: 'Sr. Marketing Manager',
                company: '',
                contact_shortcut_enable: 1,
                contact_shortcuts: [{
                    type: 'mobile',
                    value: ""
                }, {
                    type: 'email',
                    value: ""
                }, {
                    type: 'sms',
                    value: ""
                }]
            },
            {
                component: 'text_desc',
                title: 'About Me',
                desc: 'Description',
            },
            {
                component: 'images',
                header_enable: 0,
                title: '',
                desc: '',
                view_type: 'grid_2',
                images: [
                    '/images/digitalCard/image_1.png',
                    '/images/digitalCard/image_2.png'
                ]
            },
            {
                component: 'social_link',
                header_enable: 0,
                title: 'Social Links',
                desc: 'Description',
                links: [{
                        type: "facebook",
                        url: "",
                        title: "Title",
                        subtitle: "Like us on Facebook",
                        subtitle_enable: 1,
                        icon_img: "/images/digitalCard/fb_icon@72x.png"
                    },
                    {
                        type: "instagram",
                        url: "",
                        title: "Instagram",
                        subtitle: "Follow us on Instagragm",
                        subtitle_enable: 0,
                        icon_img: "/images/digitalCard/insta_icon@72x.png"
                    },
                    {
                        type: "twitter",
                        url: "",
                        title: "Twitter",
                        subtitle: "Talk with us on Twitter",
                        subtitle_enable: 0,
                        icon_img: "/images/digitalCard/tw_icon@72x.png"
                    },
                ]
            },
            {
                component: 'contact',
                contact_title: 'Contact Us',
                icon_img: '/images/digitalCard/contactus.png',
                floating_button_enable: 1,
                floating_button_label: 'Add to Contact',
                contact_infos: [{
                        type: "number",
                        title: "Call Us",
                        label: "Mobile ",
                        number: "123 456 7890",
                    },
                    {
                        type: "email",
                        title: "Email",
                        label: "Email ",
                        email: "contactme@domain.com",
                    },
                    {
                        type: "address",
                        title: "Address",
                        street: '817 N Ave',
                        city: 'California',
                        country: 'US',
                        state: 'Chicago',
                        zip: '60622',
                        action_button_enable: 1,
                        action_button_label: "Direction",
                        action_button_link: "#",
                    },
                ]
            },
            {
                component: 'web_links',
                header_enable: 0,
                title: 'Web Link',
                desc: 'Description',
                links: [{
                    url: "",
                    title: "Portfolio",
                    subtitle: "Visit for more information",
                    subtitle_enable: 1,
                    icon_img: "/images/digitalCard/weblink.png"
                }]
            }
        ],
        style: {
            primary_bg_color: "#E64B54",
            primary_profile_text_color: "#070708",
            primary_text_color: "#E64B54",
            secondary_bg_color: "#ffffff",
            secondary_profile_text_color: "#070708",
            secondary_text_color: "#656b6c",
            // bg_img: "/images/digitalCard/dbc/bg_image_5.jpg",
            card: {
                bg_color: "#ffffff",
                blur: "29",
                border_radius: "16",
                enable: 1,
                shadow_color: "#64646f33",
                spread: "0",
                x: "0",
                y: "7",
            },
            custom_css: `
         body{overflow:auto !important;}
         .qrc_profile_5{background-color: var(--qrc-secondary); border-radius: 18px; overflow: hidden; margin: 15px 0;}
         .qrc_profile_5 h2{text-shadow: 2px 2px 3px rgba(0,0,0,0.3); color: var(--qrc-profile-primary); font-size: 32px; line-height:34px; font-weight: bold; word-break: break-word;}
         .qrc_profile_5 p{color: var(--qrc-profile-secondary);}
         .qrc_profile_5 .qrc_profile_inner{ padding-top: 0; position: relative; padding-bottom: 15px;}
         .qrc_profile_5 .qrc_profilepic{height: 426px; width: 100%; border-radius: 0;position:relative;}
         .qrc_profile_5_svg{position: absolute;bottom:-1px; margin-left:-1px;}
         .qrc_profile_5_ovrlay_svg{position: absolute; bottom:0px;}
         .qrc_profile_5 .qrc_profile_inner_info{margin-top:30px;}
         .qrc_profilepic{background-position: top center; }
         .qrc_profile_shortcut ul li{text-align: center; background: var(--qrc-primary); color: #fff;width: 44px;
             height: 44px;
             font-size: 22px;
             padding-top: 0px;     margin-bottom: 8px;}
         .qrc_profile_shortcut ul li a {color: #fff;}
         .qrc_profile_shortcut ul li a:hover{color: #fff;}
         .qrc_gallery_list li{padding-top: 0px;}
         .qrc_page_wrapper{background-position: top center; background-size: cover;height:unset; min-height:100vh;}
         .qrc_profile_brand_logo{position: absolute; right: 15px;top: 333px;border-radius: 100px;
             width: 110px;
             height: 110px;
             margin: auto;
             text-align: center;
             vertical-align: middle;
             display: flex;
             align-items: center;
             overflow: hidden;
         }
         .qrc_profile_brand_logo img{max-width: 100%; max-height: 100%;}
         .qrc_profile_shortcut{margin: 15px 0 0 0;}
         .qrc_page_inner{padding-top:0}
 
         
         @media (max-width: 767px) {
             .qrc_profile_5 {margin: 0 -15px; border-radius: 0px !important; margin-top:0; margin-bottom: 0px;}
             body::-webkit-scrollbar { display: none;}
             body { -ms-overflow-style: none;  scrollbar-width: none;}
         }`
        },
        html: {
            profile: {
                main: `<div class="section qrc_profile_5">
                         <div class="qrc_profile_inner">
                             ___pr_pic___
                             <div class="qrc_profile_inner_info">
                                 <h2>___name___</h2>
                                 <p>___desc___</p>
                                 <p><strong>___company___</strong></p>
                                 ___shortcut_html___
                             </div>
                             ___br_img_html___ 
                         </div>
                     </div>`,
                shortcut: `<div class="qrc_profile_shortcut">
                             <ul>___shortcut_items___</ul>
                         </div>`,
                item: '<li class="qr_cc_card"><a href="___item_link___"><span class="___item_icon___"></span></a></li>',
                pr_img: `<div class="qrc_profilepic" style="background-image: url('___pr_img___');">
                         <!-- overlay svg -->
                         <svg id="Layer_1" class="qrc_profile_5_ovrlay_svg" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 375 300">
                             <defs>
                                 <style>
                                 .cls-1 {
                                     fill: url(#linear-gradient);
                                 }
                                 </style>
                                 <linearGradient id="linear-gradient" x1="1.06" y1="260.32" x2="1.06" y2="259.32" gradientTransform="translate(-208.5 67424) scale(375 -259)" gradientUnits="userSpaceOnUse">
                                 <stop offset="0" stop-color="#fff" stop-opacity="0"/>
                                 <stop offset="1" stop-color="#fff" style="stop-color: var(--qrc-secondary);"/>
                                 </linearGradient>
                             </defs>
                             <rect id="Rectangle_297" data-name="Rectangle 297" class="cls-1" width="375" height="300"/>
                         </svg>
 
                         <!-- shape svg -->
                         <svg version="1.1" class="qrc_profile_5_svg" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                             viewBox="0 0 375 171" style="enable-background:new 0 0 375 171;" xml:space="preserve">
                             <style type="text/css">
                                 .st0{fill:var(--qrc-primary);}
                                 .st1{fill:var(--qrc-secondary);}
                             </style>
                             <path id="Path_1445" class="st0" d="M1.06,84.91c0,0,96.52,77.37,187.89-7.93C310.63-48.31,375.49,23.64,375.49,23.64l-0.28,127.04
                                 H0.2"/>
                             <path id="Path_1446" class="st1" d="M0.2,86.33c0,0,101.34,82.28,192.71-3.03C314.6-41.98,375.2,66.77,375.2,66.77v103.91H0.2V86.33
                                 z"/>
                         </svg>
                     </div>`,
                br_img: `<div class="qrc_profile_brand_logo"> <img src="___br_img___"/> </div>`

            },
            social_link: DefaultHtmlTemplate.social_link,
            web_links: DefaultHtmlTemplate.web_links,
            text_desc: DefaultHtmlTemplate.text_desc,
            contact: DefaultHtmlTemplate.contact,
            button: DefaultHtmlTemplate.button,
            video: DefaultHtmlTemplate.video,
            custom_fields: DefaultHtmlTemplate.custom_fields,
            pdf_gallery: DefaultHtmlTemplate.pdf_gallery,
        }
    },

    // DBC New V Template 13
    {
        content: [{
                component: 'profile',
                pr_img: '/images/digitalCard/dbc/profile_6.png',
                br_img: `/images/digitalCard/dbc/brand_logo_3.png`,
                pr_img_label: '(380x475px, 4:5 Ratio)',
                br_img_label: '(120x120px, 1:1 Ratio)',
                remove_only_pr_img: 1,
                show_brand_img: 1,
                name: 'Linda Johnson',
                desc: 'Sr. Marketing Manager',
                company: '',
                contact_shortcut_enable: 1,
                contact_shortcuts: [{
                    type: 'mobile',
                    value: ""
                }, {
                    type: 'email',
                    value: ""
                }, {
                    type: 'sms',
                    value: ""
                }]
            },
            {
                component: 'text_desc',
                title: 'About Me',
                desc: 'Description',
            },
            {
                component: 'images',
                header_enable: 0,
                title: '',
                desc: '',
                view_type: 'grid_2',
                images: [
                    '/images/digitalCard/image_1.png',
                    '/images/digitalCard/image_2.png'
                ]
            },
            {
                component: 'social_link',
                header_enable: 0,
                title: 'Social Links',
                desc: 'Description',
                links: [{
                        type: "facebook",
                        url: "",
                        title: "Title",
                        subtitle: "Like us on Facebook",
                        subtitle_enable: 1,
                        icon_img: "/images/digitalCard/fb_icon@72x.png"
                    },
                    {
                        type: "instagram",
                        url: "",
                        title: "Instagram",
                        subtitle: "Follow us on Instagragm",
                        subtitle_enable: 0,
                        icon_img: "/images/digitalCard/insta_icon@72x.png"
                    },
                    {
                        type: "twitter",
                        url: "",
                        title: "Twitter",
                        subtitle: "Talk with us on Twitter",
                        subtitle_enable: 0,
                        icon_img: "/images/digitalCard/tw_icon@72x.png"
                    },
                ]
            },
            {
                component: 'contact',
                contact_title: 'Contact Us',
                icon_img: '/images/digitalCard/contactus.png',
                floating_button_enable: 1,
                floating_button_label: 'Add to Contact',
                contact_infos: [{
                        type: "number",
                        title: "Call Us",
                        label: "Mobile ",
                        number: "123 456 7890",
                    },
                    {
                        type: "email",
                        title: "Email",
                        label: "Email ",
                        email: "contactme@domain.com",
                    },
                    {
                        type: "address",
                        title: "Address",
                        street: '817 N Ave',
                        city: 'California',
                        country: 'US',
                        state: 'Chicago',
                        zip: '60622',
                        action_button_enable: 1,
                        action_button_label: "Direction",
                        action_button_link: "#",
                    },
                ]
            },
            {
                component: 'web_links',
                header_enable: 0,
                title: 'Web Link',
                desc: 'Description',
                links: [{
                    url: "",
                    title: "Portfolio",
                    subtitle: "Visit for more information",
                    subtitle_enable: 1,
                    icon_img: "/images/digitalCard/weblink.png"
                }]
            }
        ],
        style: {
            primary_bg_color: "#FFC11A",
            primary_profile_text_color: "#ffffff",
            primary_text_color: "#FFC11A",
            secondary_bg_color: "#061244",
            secondary_profile_text_color: "#ffffff",
            secondary_text_color: "#656b6c",
            // bg_img: "/images/digitalCard/dbc/bg_image_5.jpg",
            card: {
                bg_color: "#ffffff",
                blur: "29",
                border_radius: "16",
                enable: 1,
                shadow_color: "#64646f33",
                spread: "0",
                x: "0",
                y: "7",
            },
            custom_css: `
            body{overflow:auto !important;}
             .qrc_profile_5{background-color: var(--qrc-secondary); border-radius: 18px; overflow: hidden; margin: 15px 0;}
             .qrc_profile_5 h2{text-shadow: 2px 2px 3px rgba(0,0,0,0.3); color: var(--qrc-profile-primary); font-size: 32px; font-weight: bold; line-height:34px; font-weight: bold; word-break: break-word;}
             .qrc_profile_5 p{color: var(--qrc-profile-secondary);}
             .qrc_profile_5 .qrc_profile_inner{ padding-top: 0; position: relative; padding-bottom: 15px; background-color: var(--qrc-secondary);}
             .qrc_profile_5 .qrc_profilepic{height: 380px; width: 100%; border-radius: 0;}
             .qrc_profile_5_svg{position: absolute; top: 269px; margin-left:-1px;}
             .qrc_profile_5_ovrlay_svg{position: absolute; top: 120px;}
             .qrc_profile_5 .qrc_profile_inner_info{margin-top:30px;}
             .qrc_profilepic{background-position: top center; }
             .qrc_profile_shortcut ul li{text-align: center; background: var(--qrc-primary); color: #fff;width: 44px;
                 height: 44px;
                 font-size: 22px;
                 padding-top: 0px;     margin-bottom: 8px;}
                 .qrc_profile_shortcut ul li a{padding: 10px; color:#fff;}
             .qrc_profile_shortcut ul li a:hover{color: #fff;}
             .qrc_gallery_list li{padding-top: 0px;}
             .qrc_page_wrapper{background-position: top center; background-size: cover;height:unset; min-height:100vh;}
             .qrc_profile_brand_logo{position: absolute;    left: 45px;
                 top: 262px;border-radius: 100px;
                 width: 110px;
                 height: 110px;
                 margin: auto;
                 text-align: center;
                 vertical-align: middle;
                 display: flex;
                 align-items: center;
                 overflow: hidden;
             }
             .qrc_profile_brand_logo img{max-width: 100%; max-height: 100%;}
             .qrc_profile_shortcut{margin: 15px 0 0 0; }
             .qrc_page_inner{padding-top:0}
 
 
             @media (max-width: 767px) {
                 .qrc_profile_5 {margin: 0 -15px; border-radius: 0px !important; margin-top:0; margin-bottom: 0px;}
                 body::-webkit-scrollbar { display: none;}
             body { -ms-overflow-style: none;  scrollbar-width: none;}
             }
             `
        },
        html: {
            profile: {
                main: `<div class="section qrc_profile_5">
                         <div class="qrc_profile_inner">
                             ___pr_pic___
                             <div class="qrc_profile_inner_info">
                                 <h2>___name___</h2>
                                 <p>___desc___</p>
                                 <p><strong>___company___</strong></p>
                                 ___shortcut_html___
                             </div>
                             ___br_img_html___
                         </div>
                     </div>`,
                shortcut: `<div class="qrc_profile_shortcut">
                             <ul>___shortcut_items___</ul>
                         </div>`,
                item: '<li class="qr_cc_card"><a href="___item_link___"><span class="___item_icon___"></span></a></li>',
                pr_img: `<div class="qrc_profilepic" style="background-image: url('___pr_img___');">
                         <!-- overlay svg -->
                         <svg id="Layer_1" class="qrc_profile_5_ovrlay_svg" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 375 300">
                             <defs>
                                 <style>
                                 .cls-1 {
                                     fill: url(#linear-gradient);
                                 }
                                 </style>
                                 <linearGradient id="linear-gradient" x1="1.06" y1="260.32" x2="1.06" y2="259.32" gradientTransform="translate(-208.5 67424) scale(375 -259)" gradientUnits="userSpaceOnUse">
                                 <stop offset="0" stop-color="#fff" stop-opacity="0"/>
                                 <stop offset="1" stop-color="#fff"/>
                                 </linearGradient>
                             </defs>
                             <rect id="Rectangle_297" data-name="Rectangle 297" class="cls-1" width="375" height="300"/>
                         </svg>
 
                         <!-- shape svg -->
                         <svg version="1.1" class="qrc_profile_5_svg" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                             viewBox="0 0 375 171" style="enable-background:new 0 0 375 171;" xml:space="preserve">
                             <style type="text/css">
                                 .st0{fill:var(--qrc-primary);}
                                 .st1{fill:var(--qrc-secondary);}
                             </style>
                             <path id="Path_1445" class="st0" d="M1.06,84.91c0,0,96.52,77.37,187.89-7.93C310.63-48.31,375.49,23.64,375.49,23.64l-0.28,127.04
                                 H0.2"/>
                             <path id="Path_1446" class="st1" d="M0.2,86.33c0,0,101.34,82.28,192.71-3.03C314.6-41.98,375.2,66.77,375.2,66.77v103.91H0.2V86.33
                                 z"/>
                         </svg>
                     </div>`,
                br_img: `<div class="qrc_profile_brand_logo"> <img src="___br_img___"/> </div>`

            },
            social_link: DefaultHtmlTemplate.social_link,
            web_links: DefaultHtmlTemplate.web_links,
            text_desc: DefaultHtmlTemplate.text_desc,
            contact: DefaultHtmlTemplate.contact,
            button: DefaultHtmlTemplate.button,
            video: DefaultHtmlTemplate.video,
            custom_fields: DefaultHtmlTemplate.custom_fields,
            pdf_gallery: DefaultHtmlTemplate.pdf_gallery,
        }
    },

    // DBC New V Template 14
    {
        content: [{
                component: 'profile',
                pr_img: '/images/digitalCard/dbc/profile_5.png',
                br_img: `/images/digitalCard/dbc/brand_logo_4.png`,
                pr_img_label: '(380x475px, 4:5 Ratio)',
                br_img_label: '(240x80px, 3:1 Ratio)',
                show_brand_img: 1,
                name: 'Linda Johnson',
                desc: 'Sr. Marketing Manager',
                company: '',
                contact_shortcut_enable: 1,
                contact_shortcuts: [{
                    type: 'mobile',
                    value: ""
                }, {
                    type: 'email',
                    value: ""
                }, {
                    type: 'sms',
                    value: ""
                }]
            },
            {
                component: 'text_desc',
                title: 'About Me',
                desc: 'Description',
            },
            {
                component: 'images',
                header_enable: 0,
                title: '',
                desc: '',
                view_type: 'grid_2',
                images: [
                    '/images/digitalCard/image_1.png',
                    '/images/digitalCard/image_2.png'
                ]
            },
            {
                component: 'social_link',
                header_enable: 0,
                title: 'Social Links',
                desc: 'Description',
                links: [{
                        type: "facebook",
                        url: "",
                        title: "Title",
                        subtitle: "Like us on Facebook",
                        subtitle_enable: 1,
                        icon_img: "/images/digitalCard/fb_icon@72x.png"
                    },
                    {
                        type: "instagram",
                        url: "",
                        title: "Instagram",
                        subtitle: "Follow us on Instagragm",
                        subtitle_enable: 0,
                        icon_img: "/images/digitalCard/insta_icon@72x.png"
                    },
                    {
                        type: "twitter",
                        url: "",
                        title: "Twitter",
                        subtitle: "Talk with us on Twitter",
                        subtitle_enable: 0,
                        icon_img: "/images/digitalCard/tw_icon@72x.png"
                    },
                ]
            },
            {
                component: 'contact',
                contact_title: 'Contact Us',
                icon_img: '/images/digitalCard/contactus.png',
                floating_button_enable: 1,
                floating_button_label: 'Add to Contact',
                contact_infos: [{
                        type: "number",
                        title: "Call Us",
                        label: "Mobile ",
                        number: "123 456 7890",
                    },
                    {
                        type: "email",
                        title: "Email",
                        label: "Email ",
                        email: "contactme@domain.com",
                    },
                    {
                        type: "address",
                        title: "Address",
                        street: '817 N Ave',
                        city: 'California',
                        country: 'US',
                        state: 'Chicago',
                        zip: '60622',
                        action_button_enable: 1,
                        action_button_label: "Direction",
                        action_button_link: "#",
                    },
                ]
            },
            {
                component: 'web_links',
                header_enable: 0,
                title: 'Web Link',
                desc: 'Description',
                links: [{
                    url: "",
                    title: "Portfolio",
                    subtitle: "Visit for more information",
                    subtitle_enable: 1,
                    icon_img: "/images/digitalCard/weblink.png"
                }]
            }
        ],
        style: {
            primary_bg_color: "#FF5B12",
            primary_profile_text_color: "#ffffff",
            primary_text_color: "#FF5B12",
            secondary_bg_color: "#1e0e52",
            secondary_profile_text_color: "#F0F0F0",
            secondary_text_color: "#656b6c",
            // bg_img: "/images/digitalCard/dbc/bg_image_5.jpg",
            card: {
                bg_color: "#ffffff",
                blur: "29",
                border_radius: "16",
                enable: 1,
                shadow_color: "#64646f33",
                spread: "0",
                x: "0",
                y: "7",
            },
            custom_css: `
         body{overflow:auto !important;}
         .qrc_profile_5{ border-radius: 18px; overflow: hidden; margin: 15px 0;}
         .qrc_profile_5 h2{text-shadow: 2px 2px 3px rgba(0,0,0,0.3); color: var(--qrc-profile-primary); font-size: 28px; line-height:30px; word-break: break-word; font-weight: 500;}
         .qrc_profile_5 p{color: var(--qrc-profile-primary); margin-bottom:0px}
         .qrc_profile_5 .qrc_profile_inner{ padding-top: 0; position: relative;  height: 180px; color: var(--qrc-profile-primary); border-radius: var(--qrc-border-radius); 
             overflow: hidden; background: var(--qrc-secondary); display: flex;
             align-items: center;}
         .qrc_profile_5 .qrc_profilepic{height: 180px; width: 130px; border-radius: 0;}
         .qrc_profile_5_svg{position: absolute; bottom: 129px;}
         .qrc_profile_5_ovrlay_svg{position: absolute; bottom: 150px;}
         .qrc_profile_5 .qrc_profile_inner_info{margin-top:unset; width: calc(100% - 141px);}
         .qrc_profilepic{background-position: top center; margin:unset; }
         .qrc_profile_shortcut{background: var(--qrc-primary); border-radius: var(--qrc-border-radius); width: 100%;margin: 15px 0 0 0; padding: 10px 5px 5px 10px; text-align: center;}
         .qrc_profile_shortcut ul li{text-align: center; background: var(--qrc-primary); color: #fff;
             width: 42px;
             height: 42px;
             font-size: 26px;
             padding-top: 0px;     margin-bottom: 8px;    border: solid 1px #fff;}
             .qrc_profile_shortcut ul li a{padding: 10px; color:#fff;}
         .qrc_profile_shortcut ul li a:hover{color: #fff;}
         .qrc_gallery_list li{padding-top: 0px;}
         .qrc_page_wrapper{background-position: top center; background-size: cover;height:unset; min-height:100vh; background-color:var(--qrc-profile-secondary);}
         .qrc_profile_brand_logo{
             width: 200px;
             margin: 80px auto 80px auto;
             text-align: center;  
         }
         .qrc_profile_brand_logo img{max-width: 200px; max-height: 100px;}
         
         .qrc_social_text_heading, .qrc_contact_hdr_text, .qrc_contact_info_title, .qrc_email_info_title, .qrc_address_info_title, .qrc_heading h2{color: var(--qrc-text-primary);}
         
         
         .qrc_addtocontact_circle{width: 42px; height: 42px;}
         .qrc_page_qrcode, .qrc_page_share{color:#fff;width:58px; height:58px; display: flex; justify-content: center;   align-items: center; position: fixed; bottom: 15px; left: 15px; z-index: 9; background: var(--qrc-primary); padding: 8px; border-radius: 52px; box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px; border: solid 1px #ffffff20;}
         .qrc_page_share{bottom: 15px; left: 80px;}
         .qrc_page_qrcode:hover, .qrc_page_share:hover{color:#fff;}
         .qrc_page_qrcode span, .qrc_page_share span{font-size: 24px;}
        
         .qrc_page_inner{padding-top:15px}
         
         
         @media (max-width: 767px) {
             .qrc_profile_5 { border-radius: 0px !important; margin-top:0; margin-bottom: 0px;}
             body::-webkit-scrollbar { display: none;}
             body { -ms-overflow-style: none;  scrollbar-width: none;}
         }
         
             `
        },
        html: {
            profile: {
                main: `<div class="section qrc_profile_5">
                     ___br_img_html___ 
                         <div class="qrc_profile_inner">
                             ___pr_pic___
                             <div class="qrc_profile_inner_info">
                                 <h2>___name___</h2>
                                 <p>___desc___</p>
                                 <p><strong>___company___</strong></p>
                             </div>                                
                         </div>
                         ___shortcut_html___
                     </div>`,
                shortcut: `<div class="qrc_profile_shortcut">
                             <ul>___shortcut_items___</ul>
                         </div>`,
                item: '<li class="qr_cc_card"><a href="___item_link___"><span class="___item_icon___"></span></a></li>',
                pr_img: `<div class="qrc_profilepic" style="background-image: url('___pr_img___');"></div>`,
                br_img: `<div class="qrc_profile_brand_logo"> <img src="___br_img___"/> </div>`

            },
            social_link: DefaultHtmlTemplate.social_link,
            web_links: DefaultHtmlTemplate.web_links,
            text_desc: DefaultHtmlTemplate.text_desc,
            contact: DefaultHtmlTemplate.contact,
            button: DefaultHtmlTemplate.button,
            video: DefaultHtmlTemplate.video,
            custom_fields: DefaultHtmlTemplate.custom_fields,
            pdf_gallery: DefaultHtmlTemplate.pdf_gallery,
        }
    },


    // DBC New V Template 15
    {
        content: [{
                component: 'profile',
                pr_img: '/images/digitalCard/dbc/profile_5.png',
                br_img: `/images/digitalCard/dbc/brand_logo_6.png`,
                pr_img_label: '(380x475px, 4:5 Ratio)',
                br_img_label: '(240x80px, 3:1 Ratio)',
                remove_only_pr_img: 1,
                show_brand_img: 1,
                name: 'LINDA JOHNSON',
                desc: 'Sr. Marketing Manager',
                company: '',
                contact_shortcut_enable: 1,
                contact_shortcuts: [{
                    type: 'mobile',
                    value: ""
                }, {
                    type: 'email',
                    value: ""
                }, {
                    type: 'sms',
                    value: ""
                }]
            },
            {
                component: 'text_desc',
                title: 'About Me',
                desc: 'Description',
            },
            {
                component: 'images',
                header_enable: 0,
                title: '',
                desc: '',
                view_type: 'grid_2',
                images: [
                    '/images/digitalCard/image_1.png',
                    '/images/digitalCard/image_2.png'
                ]
            },
            {
                component: 'social_link',
                header_enable: 0,
                title: 'Social Links',
                desc: 'Description',
                links: [{
                        type: "facebook",
                        url: "",
                        title: "Title",
                        subtitle: "Like us on Facebook",
                        subtitle_enable: 1,
                        icon_img: "/images/digitalCard/fb_icon@72x.png"
                    },
                    {
                        type: "instagram",
                        url: "",
                        title: "Instagram",
                        subtitle: "Follow us on Instagragm",
                        subtitle_enable: 0,
                        icon_img: "/images/digitalCard/insta_icon@72x.png"
                    },
                    {
                        type: "twitter",
                        url: "",
                        title: "Twitter",
                        subtitle: "Talk with us on Twitter",
                        subtitle_enable: 0,
                        icon_img: "/images/digitalCard/tw_icon@72x.png"
                    },
                ]
            },
            {
                component: 'contact',
                contact_title: 'Contact Us',
                icon_img: '/images/digitalCard/contactus.png',
                floating_button_enable: 1,
                floating_button_label: 'Add to Contact',
                contact_infos: [{
                        type: "number",
                        title: "Call Us",
                        label: "Mobile ",
                        number: "123 456 7890",
                    },
                    {
                        type: "email",
                        title: "Email",
                        label: "Email ",
                        email: "contactme@domain.com",
                    },
                    {
                        type: "address",
                        title: "Address",
                        street: '817 N Ave',
                        city: 'California',
                        country: 'US',
                        state: 'Chicago',
                        zip: '60622',
                        action_button_enable: 1,
                        action_button_label: "Direction",
                        action_button_link: "#",
                    },
                ]
            },
            {
                component: 'web_links',
                header_enable: 0,
                title: 'Web Link',
                desc: 'Description',
                links: [{
                    url: "",
                    title: "Portfolio",
                    subtitle: "Visit for more information",
                    subtitle_enable: 1,
                    icon_img: "/images/digitalCard/weblink.png"
                }]
            }
        ],
        style: {
            primary_bg_color: "#FF5B12",
            primary_profile_text_color: "#ffffff",
            primary_text_color: "#FF5B12",
            secondary_bg_color: "#061244",
            secondary_profile_text_color: "#061244",
            secondary_text_color: "#656b6c",
            // bg_img: "/images/digitalCard/dbc/bg_image_5.jpg",
            card: {
                bg_color: "#ffffff",
                blur: "29",
                border_radius: "16",
                enable: 1,
                shadow_color: "#64646f33",
                spread: "0",
                x: "0",
                y: "7",
            },
            custom_css: `
         body{overflow:auto !important;}
         .qrc_profile_5{ border-radius: 18px; overflow: hidden; margin: 15px 0; position: inherit;}
         .qrc_profile_5 h2{color: var(--qrc-profile-primary); font-size: 26px; font-weight: 500; margin-bottom: 0; line-height:28px; word-break: break-word;}
         .qrc_profile_5 p{color: var(--qrc-profile-primary); margin-bottom:0px}
         .qrc_profile_5 .qrc_profile_inner{ padding-top: 0; position: relative;  color: var(--qrc-profile-primary); border-radius: var(--qrc-border-radius); 
             overflow: hidden; background: var(--qrc-profile-secondary);}
         .qrc_profile_5 .qrc_profilepic{height: 332px; width: 100%; border-radius: 0;}
         .qrc_profile_5_svg{position: absolute; bottom: 129px;}
         .qrc_profile_5_ovrlay_svg{position: absolute; bottom: 0;}
         .qrc_profile_5 .qrc_profile_inner_info{margin-top: unset; width: 100%; background: var(--qrc-primary); padding: 15px; text-align: center;}
         .qrc_profilepic{background-position: top center; margin:unset; }
         .qrc_profile_shortcut{ width: calc(100% - 30px); margin: auto; padding: 15px 0px 8px 0px; text-align: center; position: absolute; bottom: 0px; left: 15px;}
         .qrc_profile_shortcut ul li{text-align: center; background: var(--qrc-primary); color: #fff;
             width: 54px;
             height: 54px;
             font-size: 26px;
             padding-top: 0px;     margin-bottom: 8px; }
             .qrc_profile_shortcut ul li a{padding: 10px; color:#fff;}
         .qrc_profile_shortcut ul li a:hover{color: #fff;}
         .qrc_gallery_list li{padding-top: 0px;}
         .qrc_page_wrapper{background-position: top center; background-size: cover;height:unset; min-height:100vh;}
         .qrc_profile_brand_logo{
             width: 200px;
             margin: 30px auto 30px auto;
             text-align: center;  
         }
         .qrc_profile_brand_logo img{max-width: 200px; max-height: 100px;}
         
         .qrc_social_text_heading, .qrc_contact_hdr_text, .qrc_contact_info_title, .qrc_email_info_title, .qrc_address_info_title, .qrc_heading h2{color: var(--qrc-text-primary);}
         
         
         .qrc_addtocontact_circle{width: 42px; height: 42px;}
         .qrc_page_qrcode, .qrc_page_share{color:#fff;width:58px; height:58px; display: flex; justify-content: center;   align-items: center; position: fixed; bottom: 15px; left: 15px; z-index: 9; background: var(--qrc-primary); padding: 8px; border-radius: 52px; box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px; border: solid 1px #ffffff20;}
         .qrc_page_share{bottom: 15px; left: 80px;}
         .qrc_page_qrcode:hover, .qrc_page_share:hover{color:#fff;}
         .qrc_page_qrcode span, .qrc_page_share span{font-size: 24px;}
                
         @media (max-width: 767px) {
             .qrc_profile_5 { border-radius: 0px !important; margin-top:0; margin-bottom: 0px;}
             body::-webkit-scrollbar { display: none;}
             body { -ms-overflow-style: none;  scrollbar-width: none;}
         }
         
             `
        },
        html: {
            profile: {
                main: `<div class="section qrc_profile_5">
                         ___br_img_html___
                         <div class="qrc_profile_inner">
                             <div class="qrc_profile_inner_info">
                                 <h2>___name___</h2>
                                 <p>___desc___</p>
                                 <p><strong>___company___</strong></p>
                             </div>
                             ___pr_pic___                                
                         </div>
                         ___shortcut_html___
                     </div>`,
                shortcut: `<div class="qrc_profile_shortcut">
                             <ul>___shortcut_items___</ul>
                         </div>`,
                item: '<li class="qr_cc_card"><a href="___item_link___"><span class="___item_icon___"></span></a></li>',
                pr_img: `<div class="qrc_profilepic" style="background-image: url('___pr_img___');">
                             <svg id="Layer_1" class="qrc_profile_5_ovrlay_svg" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 375 160">
                             <defs>
                                 <style>
                                 .cls-1 {
                                     fill: url(#linear-gradient);
                                 }
                                 </style>
                                 <linearGradient id="linear-gradient" x1="1.06" y1="260.32" x2="1.06" y2="259.32" gradientTransform="translate(-208.5 67424) scale(375 -259)" gradientUnits="userSpaceOnUse">
                                 <stop offset="0" stop-color="#fff" stop-opacity="0"></stop>
                                 <stop offset="1" stop-color="#fff"></stop>
                                 </linearGradient>
                             </defs>
                             <rect id="Rectangle_297" data-name="Rectangle 297" class="cls-1" width="375" height="160"></rect>
                         </svg>
                     </div>`,
                br_img: `<div class="qrc_profile_brand_logo"> <img src="___br_img___"/> </div>`

            },
            social_link: DefaultHtmlTemplate.social_link,
            web_links: DefaultHtmlTemplate.web_links,
            text_desc: DefaultHtmlTemplate.text_desc,
            contact: DefaultHtmlTemplate.contact,
            button: DefaultHtmlTemplate.button,
            video: DefaultHtmlTemplate.video,
            custom_fields: DefaultHtmlTemplate.custom_fields,
            pdf_gallery: DefaultHtmlTemplate.pdf_gallery,
        }
    },

    // DBC New V Template 16
    {
        content: [{
                component: 'profile',
                pr_img: '/images/digitalCard/dbc/profile_7.png',
                br_img: `/images/digitalCard/dbc/brand_logo_5.png`,
                pr_img_label: '(380x475px, 4:5 Ratio)',
                br_img_label: '(120x120px, 1:1 Ratio)',
                remove_only_pr_img: 1,
                show_brand_img: 1,
                name: 'Linda Johnson',
                desc: 'Sr. Marketing Manager',
                company: '',
                contact_shortcut_enable: 1,
                contact_shortcuts: [{
                    type: 'mobile',
                    value: ""
                }, {
                    type: 'email',
                    value: ""
                }, {
                    type: 'sms',
                    value: ""
                }]
            },
            {
                component: 'text_desc',
                title: 'About Me',
                desc: 'Description',
            },
            {
                component: 'images',
                header_enable: 0,
                title: '',
                desc: '',
                view_type: 'grid_2',
                images: [
                    '/images/digitalCard/image_1.png',
                    '/images/digitalCard/image_2.png'
                ]
            },
            {
                component: 'social_link',
                header_enable: 0,
                title: 'Social Links',
                desc: 'Description',
                links: [{
                        type: "facebook",
                        url: "",
                        title: "Title",
                        subtitle: "Like us on Facebook",
                        subtitle_enable: 1,
                        icon_img: "/images/digitalCard/fb_icon@72x.png"
                    },
                    {
                        type: "instagram",
                        url: "",
                        title: "Instagram",
                        subtitle: "Follow us on Instagragm",
                        subtitle_enable: 0,
                        icon_img: "/images/digitalCard/insta_icon@72x.png"
                    },
                    {
                        type: "twitter",
                        url: "",
                        title: "Twitter",
                        subtitle: "Talk with us on Twitter",
                        subtitle_enable: 0,
                        icon_img: "/images/digitalCard/tw_icon@72x.png"
                    },
                ]
            },
            {
                component: 'contact',
                contact_title: 'Contact Us',
                icon_img: '/images/digitalCard/contactus.png',
                floating_button_enable: 1,
                floating_button_label: 'Add to Contact',
                contact_infos: [{
                        type: "number",
                        title: "Call Us",
                        label: "Mobile ",
                        number: "123 456 7890",
                    },
                    {
                        type: "email",
                        title: "Email",
                        label: "Email ",
                        email: "contactme@domain.com",
                    },
                    {
                        type: "address",
                        title: "Address",
                        street: '817 N Ave',
                        city: 'California',
                        country: 'US',
                        state: 'Chicago',
                        zip: '60622',
                        action_button_enable: 1,
                        action_button_label: "Direction",
                        action_button_link: "#",
                    },
                ]
            },
            {
                component: 'web_links',
                header_enable: 0,
                title: 'Web Link',
                desc: 'Description',
                links: [{
                    url: "",
                    title: "Portfolio",
                    subtitle: "Visit for more information",
                    subtitle_enable: 1,
                    icon_img: "/images/digitalCard/weblink.png"
                }]
            }
        ],
        style: {
            primary_bg_color: "#4DCE96",
            primary_profile_text_color: "#ffffff",
            primary_text_color: "#070708",
            secondary_bg_color: "#054358",
            secondary_profile_text_color: "#ffffff",
            secondary_text_color: "#656b6c",
            // bg_img: "/images/digitalCard/dbc/bg_image_5.jpg",
            card: {
                bg_color: "#ffffff",
                blur: "29",
                border_radius: "16",
                enable: 1,
                shadow_color: "#64646f33",
                spread: "0",
                x: "0",
                y: "7",
            },
            custom_css: `
                body{overflow:auto !important;}
                 .qrc_profile_5{background-color: var(--qrc-secondary); border-radius: 18px; overflow: hidden; margin: 15px 0;}
                 .qrc_profile_5 h2{text-shadow: 2px 2px 3px rgba(0,0,0,0.3); color: var(--qrc-profile-primary); font-size: 32px; line-height:34px; word-break: break-word; font-weight: bold;}
                 .qrc_profile_5 p{color: var(--qrc-profile-secondary);}
                 .qrc_profile_5 .qrc_profile_inner{ padding-top: 0; position: relative; padding-bottom: 15px; background: var(--qrc-secondary);}
                 .qrc_profile_5 .qrc_profilepic{height: 426px; width: 100%; border-radius: 0; position: relative;}
                 .qrc_profile_5_svg{position: absolute; bottom:-1px;}
                 .qrc_profile_5_ovrlay_svg{position: absolute; bottom:0px;}
                 .qrc_profile_5 .qrc_profile_inner_info{margin-top:30px;}
                 .qrc_profilepic{background-position: top center; }
                 .qrc_profile_shortcut ul li{text-align: center; background: var(--qrc-primary); color: #fff;width: 52px;
                     height: 52px;
                     font-size: 28px;
                     padding-top: 0px;     margin-bottom: 8px;}
                 .qrc_profile_shortcut ul li a{color: #fff;}
                 .qrc_profile_shortcut ul li a:hover{color: #fff;}
                 .qrc_gallery_list li{padding-top: 0px;}
                 .qrc_page_wrapper{background-position: top center; background-size: cover;height:unset; min-height:100vh;}
                 .qrc_profile_brand_logo{position: absolute; left: 15px; top: 327px; border-radius: 100px; width: 110px; height: 110px; margin: auto; text-align: center; vertical-align: middle; display: flex; align-items: center; overflow: hidden;}
                 .qrc_profile_brand_logo img{max-width: 100%; max-height: 100%;}
                 .qrc_profile_shortcut{margin: 15px 0 0 0;}
                 .qrc_page_inner{padding-top:0}
                 
                 @media (max-width: 767px) {
                     .qrc_profile_5 {margin: 0 -15px; border-radius: 0px !important; margin-top:0; margin-bottom: 0px;}
                     body::-webkit-scrollbar { display: none;}
             body { -ms-overflow-style: none;  scrollbar-width: none;}
                 }
             `
        },
        html: {
            profile: {
                main: `<div class="section qrc_profile_5">                         
                         <div class="qrc_profile_inner">
                             ___pr_pic___
                             <div class="qrc_profile_inner_info">
                                 <h2>___name___</h2>
                                 <p>___desc___</p>
                                 <p><strong>___company___</strong></p>
                                 ___shortcut_html___
                             </div>                                
                         </div>
                         ___br_img_html___
                     </div>`,
                shortcut: `<div class="qrc_profile_shortcut">
                             <ul>___shortcut_items___</ul>
                         </div>`,
                item: '<li class="qr_cc_card"><a href="___item_link___"><span class="___item_icon___"></span></a></li>',
                pr_img: `
                     <div class="qrc_profilepic" style="background-image: url('___pr_img___');">
                         <svg id="Layer_1" class="qrc_profile_5_ovrlay_svg" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 375 160">
                             <defs>
                                 <style>
                                 .cls-1 {
                                     fill: url(#linear-gradient);
                                 }
                                 </style>
                                 <linearGradient id="linear-gradient" x1="1.06" y1="260.32" x2="1.06" y2="259.32" gradientTransform="translate(-208.5 67424) scale(375 -259)" gradientUnits="userSpaceOnUse">
                                 <stop offset="0" stop-color="#fff" stop-opacity="0"/>
                                 <stop offset="1" stop-color="#fff"/>
                                 </linearGradient>
                             </defs>
                             <rect id="Rectangle_297" data-name="Rectangle 297" class="cls-1" width="375" height="160"/>
                         </svg>
 
                         <!-- shape svg -->
                         <svg class="qrc_profile_5_svg"  version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                             viewBox="0 0 375 171" style="enable-background:new 0 0 375 171;" xml:space="preserve">
                             <style type="text/css">
                                 .st0{clip-path:url(#SVGID_00000036219246076494728470000017374480116725635218_);}
                                 .st1{clip-path:url(#SVGID_00000013883360152138881360000004362807276448791426_);}
                                 .st2{opacity:0.4;}
                                 .st3{clip-path:url(#SVGID_00000017499636662424706970000010139036290721883057_);}
                                 .st4{fill:var(--qrc-secondary);}
                                 .st5{opacity:0.8;}
                                 .st6{opacity:0.8;clip-path:url(#SVGID_00000029015751149852034850000014280094789272284827_);}
                                 .st7{opacity:0.6;}
                                 .st8{clip-path:url(#SVGID_00000145742892846470675550000004335227359204681608_);}
                                 .st9{fill:var(--qrc-primary);}
                             </style>
                             <g>
                                 <defs>
                                     <rect id="SVGID_1_" y="27.69" width="375" height="143.31"/>
                                 </defs>
                                 <clipPath id="SVGID_00000127036728355068578640000008236430726977132698_">
                                     <use xlink:href="#SVGID_1_"  style="overflow:visible;"/>
                                 </clipPath>
                                 <g id="Mask_Group_1208" style="clip-path:url(#SVGID_00000127036728355068578640000008236430726977132698_);">
                                     <g id="Group_1207">
                                         <g>
                                             <defs>
                                                 <rect id="SVGID_00000090258371631854484790000010572689061235239599_" y="27.69" width="375" height="143.31"/>
                                             </defs>
                                             <clipPath id="SVGID_00000017485985627204784540000005544471912785514386_">
                                                 <use xlink:href="#SVGID_00000090258371631854484790000010572689061235239599_"  style="overflow:visible;"/>
                                             </clipPath>
                                             <g id="Group_1206" style="clip-path:url(#SVGID_00000017485985627204784540000005544471912785514386_);">
                                                 <g id="Group_1199" class="st2">
                                                     <g id="Group_1198">
                                                         <g>
                                                             <defs>
                                                                 <rect id="SVGID_00000106847669940097894000000010948430668567545744_" y="27.69" width="375" height="143.31"/>
                                                             </defs>
                                                             <clipPath id="SVGID_00000157295860964999380990000015843520932965952906_">
                                                                 <use xlink:href="#SVGID_00000106847669940097894000000010948430668567545744_"  style="overflow:visible;"/>
                                                             </clipPath>
                                                             <g id="Group_1197" style="clip-path:url(#SVGID_00000157295860964999380990000015843520932965952906_);">
                                                                 <path id="Path_1464" class="st4" d="M0,40.99V171h375v-0.26c0,0-3.27-52.57-70.26-62.61c-6.35-0.95-12.45-1.53-18.35-1.82
                                                                     c-47.47-2.4-81.23,13.41-113.24-0.31c-6.49-2.82-12.53-6.59-17.93-11.17C113.56,60.08,103.76,1.2,0,40.99"/>
                                                             </g>
                                                         </g>
                                                     </g>
                                                 </g>
                                                 <g id="Group_1202" transform="translate(0 3.269)" class="st5">
                                                     <g id="Group_1201">
                                                         <g>
                                                             <defs>
                                                                 <rect id="SVGID_00000063601624665265517210000016556430701088474788_" y="27.69" width="374.61" height="140.04"/>
                                                             </defs>
                                                             <clipPath id="SVGID_00000057865653743668018200000013668462227941497473_">
                                                                 <use xlink:href="#SVGID_00000063601624665265517210000016556430701088474788_"  style="overflow:visible;"/>
                                                             </clipPath>
                                                             <g id="Group_1200" style="opacity:0.8;clip-path:url(#SVGID_00000057865653743668018200000013668462227941497473_);">
                                                                 <path id="Path_1465" class="st4" d="M0,40.99v126.74h374.61c-1.89-11.3-12.56-51.02-69.87-59.61
                                                                     c-20.56-3.08-38.67-2.25-55.08-0.62c-37.07,3.68-65.55,11.4-94.43-12.68c-2.86-2.39-5.58-4.89-8.18-7.46
                                                                     C111.77,52.45,96.63,3.93,0,40.99"/>
                                                             </g>
                                                         </g>
                                                     </g>
                                                 </g>
                                                 <g id="Group_1205" transform="translate(0 13.534)" class="st7">
                                                     <g id="Group_1204">
                                                         <g>
                                                             <defs>
                                                                 <rect id="SVGID_00000111183132094132999480000017693177102971219120_" y="27.69" width="375" height="129.78"/>
                                                             </defs>
                                                             <clipPath id="SVGID_00000094590725953952989040000009740309496246966427_">
                                                                 <use xlink:href="#SVGID_00000111183132094132999480000017693177102971219120_"  style="overflow:visible;"/>
                                                             </clipPath>
                                                             <g id="Group_1203" style="clip-path:url(#SVGID_00000094590725953952989040000009740309496246966427_);">
                                                                 <path id="Path_1466" class="st9" d="M0,49.12v108.34h375v-25.52c0,0-3.27-52.17-70.26-53.82
                                                                     c-57.4-1.42-95.61,25.25-131.59,14.34c-6.42-1.98-12.48-4.99-17.93-8.92c-2.86-2.03-5.57-4.19-8.18-6.44
                                                                     C111.77,46.6,96.63-0.03,0,49.12"/>
                                                             </g>
                                                         </g>
                                                     </g>
                                                 </g>
                                                 <path id="Path_1467" class="st4" d="M0,66.47V171h375v-8.13c0,0-3.27-52.29-70.26-56.37c-6.34-0.38-12.45-0.43-18.35-0.2
                                                     c-12.34,0.57-24.62,2.07-36.73,4.47c-37.07,6.98-65.56,17.25-94.43-4.27C113.56,75.45,103.76,17.45,0,66.47"/>
                                             </g>
                                         </g>
                                     </g>
                                 </g>
                             </g>
                         </svg>
                     </div>`,
                br_img: `<div class="qrc_profile_brand_logo"> <img src="___br_img___"/> </div>`

            },
            social_link: DefaultHtmlTemplate.social_link,
            web_links: DefaultHtmlTemplate.web_links,
            text_desc: DefaultHtmlTemplate.text_desc,
            contact: DefaultHtmlTemplate.contact,
            button: DefaultHtmlTemplate.button,
            video: DefaultHtmlTemplate.video,
            custom_fields: DefaultHtmlTemplate.custom_fields,
            pdf_gallery: DefaultHtmlTemplate.pdf_gallery,
        }
    },

    // DBC New V Template 17
    {
        content: [{
                component: 'profile',
                pr_img: '/images/digitalCard/dbc/profile_8.png',
                br_img: `/images/digitalCard/dbc/brand_logo_5.png`,
                pr_img_label: '(380x475px, 4:5 Ratio)',
                br_img_label: '(120x120px, 1:1 Ratio)',
                remove_only_pr_img: 1,
                show_brand_img: 1,
                name: 'Linda Johnson',
                desc: 'Sr. Marketing Manager',
                company: '',
                contact_shortcut_enable: 1,
                contact_shortcuts: [{
                    type: 'mobile',
                    value: ""
                }, {
                    type: 'email',
                    value: ""
                }, {
                    type: 'sms',
                    value: ""
                }]
            },
            {
                component: 'text_desc',
                title: 'About Me',
                desc: 'Description',
            },
            {
                component: 'images',
                header_enable: 0,
                title: '',
                desc: '',
                view_type: 'grid_2',
                images: [
                    '/images/digitalCard/image_1.png',
                    '/images/digitalCard/image_2.png'
                ]
            },
            {
                component: 'social_link',
                header_enable: 0,
                title: 'Social Links',
                desc: 'Description',
                links: [{
                        type: "facebook",
                        url: "",
                        title: "Title",
                        subtitle: "Like us on Facebook",
                        subtitle_enable: 1,
                        icon_img: "/images/digitalCard/fb_icon@72x.png"
                    },
                    {
                        type: "instagram",
                        url: "",
                        title: "Instagram",
                        subtitle: "Follow us on Instagragm",
                        subtitle_enable: 0,
                        icon_img: "/images/digitalCard/insta_icon@72x.png"
                    },
                    {
                        type: "twitter",
                        url: "",
                        title: "Twitter",
                        subtitle: "Talk with us on Twitter",
                        subtitle_enable: 0,
                        icon_img: "/images/digitalCard/tw_icon@72x.png"
                    },
                ]
            },
            {
                component: 'contact',
                contact_title: 'Contact Us',
                icon_img: '/images/digitalCard/contactus.png',
                floating_button_enable: 1,
                floating_button_label: 'Add to Contact',
                contact_infos: [{
                        type: "number",
                        title: "Call Us",
                        label: "Mobile ",
                        number: "123 456 7890",
                    },
                    {
                        type: "email",
                        title: "Email",
                        label: "Email ",
                        email: "contactme@domain.com",
                    },
                    {
                        type: "address",
                        title: "Address",
                        street: '817 N Ave',
                        city: 'California',
                        country: 'US',
                        state: 'Chicago',
                        zip: '60622',
                        action_button_enable: 1,
                        action_button_label: "Direction",
                        action_button_link: "#",
                    },
                ]
            },
            {
                component: 'web_links',
                header_enable: 0,
                title: 'Web Link',
                desc: 'Description',
                links: [{
                    url: "",
                    title: "Portfolio",
                    subtitle: "Visit for more information",
                    subtitle_enable: 1,
                    icon_img: "/images/digitalCard/weblink.png"
                }]
            }
        ],
        style: {
            primary_bg_color: "#904713",
            primary_profile_text_color: "#070708",
            primary_text_color: "#904713",
            secondary_bg_color: "#ffffff",
            secondary_profile_text_color: "#656b6c",
            secondary_text_color: "#656b6c",
            // bg_img: "/images/digitalCard/dbc/bg_image_5.jpg",
            card: {
                bg_color: "#ffffff",
                blur: "29",
                border_radius: "16",
                enable: 1,
                shadow_color: "#64646f33",
                spread: "0",
                x: "0",
                y: "7",
            },
            custom_css: `
                body{overflow:auto !important;}
                 .qrc_profile_5{background-color: var(--qrc-secondary); border-radius: 18px; overflow: hidden; margin: 15px 0;}
                 .qrc_profile_5 h2{ color: var(--qrc-profile-primary); font-size: 32px; line-height:34px; word-break: break-word; font-weight: normal;}
                 .qrc_profile_5 p{color: var(--qrc-profile-secondary);}
                 .qrc_profile_5 .qrc_profile_inner{ padding-top: 0; position: relative; padding-bottom: 15px; background: var(--qrc-secondary);}
                 .qrc_profile_5 .qrc_profilepic{height: 380px; width: 100%; border-radius: 0; position: relative;}
                 .qrc_profile_5_svg{position: absolute; bottom:-1px;  text-shadow: 2px 2px 3px rgba(0,0,0,0.3); margin-right:-1px;}
                 .qrc_profile_5_ovrlay_svg{position: absolute; bottom:0px; opacity: 0.7; }
                 .qrc_profile_5 .qrc_profile_inner_info{margin-top:40px;}
                 .qrc_profilepic{background-position: top center; }
                 .qrc_heading h2{font-weight: normal;}
                 .qrc_profile_shortcut ul li{text-align: center; background: var(--qrc-primary); color: #fff;width: 52px;
                     height: 52px;
                     font-size: 28px;
                     padding-top: 0px;     margin-bottom: 8px;}
                 .qrc_profile_shortcut ul li a{color: #fff;}
                 .qrc_profile_shortcut ul li a:hover{color: #fff;}
                 .qrc_gallery_list li{padding-top: 0px;}
                 .qrc_page_wrapper{background-position: top center; background-size: cover;height:unset; min-height:100vh;}
                 .qrc_profile_brand_logo{ background:#fff; position: absolute; left: 15px; top: 298px; border: solid 3px #00000010; border-radius: 100px; width: 110px; height: 110px; margin: auto; text-align: center; vertical-align: middle; display: flex; align-items: center; overflow: hidden;}
                 .qrc_profile_brand_logo img{max-width: 100%; max-height: 100%;}
                 .qrc_profile_shortcut{margin: 15px 0 0 0;}
                 .qrc_page_inner{padding-top:0}
                 
                 @media (max-width: 767px) {
                     .qrc_profile_5 {margin: 0 -15px; border-radius: 0px !important; margin-top:0; margin-bottom: 0px;}
                     body::-webkit-scrollbar { display: none;}
                     body { -ms-overflow-style: none;  scrollbar-width: none;}
                 }        
             `
        },
        html: {
            profile: {
                main: `<div class="section qrc_profile_5">                         
                         <div class="qrc_profile_inner">
                             ___pr_pic___
                             <div class="qrc_profile_inner_info">
                                 <h2>___name___</h2>
                                 <p>___desc___</p>
                                 <p><strong>___company___</strong></p>
                                 ___shortcut_html___
                             </div>                                
                         </div>
                         ___br_img_html___
                     </div>`,
                shortcut: `<div class="qrc_profile_shortcut">
                             <ul>___shortcut_items___</ul>
                         </div>`,
                item: '<li class="qr_cc_card"><a href="___item_link___"><span class="___item_icon___"></span></a></li>',
                pr_img: `
                     <div class="qrc_profilepic" style="background-image: url('___pr_img___');">
                             <svg id="Layer_1" class="qrc_profile_5_ovrlay_svg" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 375 300">
                             <defs>
                                 <style>
                                 .cls-1 {
                                     fill: url(#linear-gradient);
                                 }
                                 </style>
                                 <linearGradient id="linear-gradient" x1="1.06" y1="260.32" x2="1.06" y2="259.32" gradientTransform="translate(-208.5 67424) scale(375 -259)" gradientUnits="userSpaceOnUse">
                                 <stop offset="0" stop-color="#070708" stop-opacity="0"/>
                                 <stop offset="1" stop-color="#070708"/>
                                 </linearGradient>
                             </defs>
                             <rect id="Rectangle_297" data-name="Rectangle 297" class="cls-1" width="375" height="300"/>
                         </svg>
 
                         <!-- shape svg -->
                         <svg class="qrc_profile_5_svg" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375 117"><defs><style>.cls-3{fill:var(--qrc-secondary);}.cls-2{opacity:.7;}</style></defs><g id="Group_1240" class="cls-2">
                         <path id="Path_1471" class="cls-3" d="M.08,81.65l3.11-3.68,3.99,1.3,3.79-2.06,5.68,1.13s.42-.6,2.73,1.42,2.1,3.39,3.99,1.85,3.15-3.23,4.41-1.78c1.26,1.45,6.31,3.2,6.31,3.2l1.89-.19,7.15-2.5,4.42-2.68s0-.22,1.47-.14c1.47,.08,6.52-3.11,6.73-3.8s1.05-.1,2.73,1.3,7.15,.42,9.04-1.11,3.79-3.29,4.63-2.7,2.73-1.39,4.41-2.45,4.62-3.15,5.47-1.43,5.47,.36,5.47,.36v-1.66s4.2,3.73,5.26,4.07,9.46,4.91,10.3,4.61c.83-.42,1.6-.95,2.31-1.57v1.8s3.79,2.55,5.05,2.2,7.78,1.48,7.78,1.48c.66-.34,1.41-.41,2.1-.21,1.26,.33,3.79,2,5.05,.47s7.15,.36,7.15,1.04,10.51,1.89,12.61,.34,3.36,1.24,3.36,1.24c0,0,8.83,.71,9.67,.4s5.88-4.62,8.2-3.95c2.08,.71,4.12,1.57,6.1,2.57,2.61-1.78,5.56-2.92,8.62-3.33,4.63-.45,11.14-6.25,13.67-8.07,2.52-1.82,7.99-5.72,10.3-5.95,2.31-.23,13.26-7.82,15.14-10.11,2.31-2.83,9.88-4.24,11.98-5.79s4.42-3.8,5.05-2.51,9.25-2.7,11.98-4.32c2.73-1.61,5.88,3.02,8.83,3.63s13.03-1.27,15.35-2.17,9.67-2.74,11.35-.21c1.68,2.53,10.09,5.3,10.93,5.22s16.19-.01,18.08-1.09c1.89-1.08,9.46-6.83,11.57-3.97s11.77,3.93,13.03,3.14,6.94-.68,8.83,.48,10.3,2.81,10.3,2.81c0,0-.84,.55,1.47-2.38s2.1-3.81,3.79-2.4c2.08,2.08,4.04,4.29,5.88,6.61l6.26,.29V117.73L.08,117.35v-35.7Z"/></g><g id="Group_1240-2"><path id="Path_1471-2" class="cls-3" d="M.08,83.43l3.11-3.4,3.99,1.27,3.79-1.87,5.68,1.14s.42-.56,2.73,1.37c2.31,1.92,2.1,3.2,3.99,1.79s3.15-2.98,4.41-1.6,6.31,3.09,6.31,3.09l1.89-.15,7.15-2.23,4.42-2.44s0-.21,1.47-.11c1.47,.1,6.52-2.81,6.73-3.46s1.05-.08,2.73,1.26,7.15,.5,9.04-.9,3.79-3.02,4.63-2.46,2.73-1.26,4.41-2.23,4.62-2.88,5.47-1.26,5.47,.42,5.47,.42v-1.56s4.2,3.55,5.26,3.89,9.46,4.74,10.3,4.46c.83-.38,1.6-.87,2.31-1.44v1.68s3.79,2.44,5.05,2.13,7.78,1.5,7.78,1.5c.66-.31,1.41-.37,2.1-.16,1.26,.32,3.79,1.93,5.05,.51s7.15,.44,7.15,1.07,10.51,1.92,12.61,.5,3.36,1.21,3.36,1.21c0,0,8.83,.8,9.67,.52s5.88-4.24,8.2-3.57c2.08,.7,4.12,1.53,6.1,2.49,2.61-1.63,5.56-2.65,8.62-2.99,4.63-.36,11.14-5.69,13.67-7.36,2.52-1.67,7.99-5.24,10.3-5.42s13.26-7.13,15.14-9.24c2.31-2.61,9.88-3.83,11.98-5.25s4.42-3.49,5.05-2.28,9.25-2.39,11.98-3.86,5.88,2.91,8.83,3.53c2.95,.61,13.03-1,15.35-1.81s9.67-2.43,11.35-.03c1.68,2.39,10.09,5.11,10.93,5.05s16.19,.23,18.08-.76,9.46-6.25,11.57-3.55,11.77,3.86,13.03,3.13,6.94-.53,8.83,.58c1.89,1.12,10.3,2.78,10.3,2.78,0,0-.84,.5,1.47-2.21s2.1-3.53,3.79-2.19c2.08,1.98,4.04,4.08,5.88,6.27l6.26,.36v57.43L.08,116.86v-33.43Z"/>
                         </g>
                         </svg>
 
                     </div>`,
                br_img: `<div class="qrc_profile_brand_logo"> <img src="___br_img___"/> </div>`


            },
            social_link: DefaultHtmlTemplate.social_link,
            web_links: DefaultHtmlTemplate.web_links,
            text_desc: DefaultHtmlTemplate.text_desc,
            contact: DefaultHtmlTemplate.contact,
            button: DefaultHtmlTemplate.button,
            video: DefaultHtmlTemplate.video,
            custom_fields: DefaultHtmlTemplate.custom_fields,
            pdf_gallery: DefaultHtmlTemplate.pdf_gallery,
        }
    },

    // DBC New V Template 18
    {
        content: [{
                component: 'profile',
                pr_img: '/images/digitalCard/dbc/profile_8.png',
                pr_bg_img: `/images/digitalCard/dbc/bg_image_6.png`,
                pr_img_label: '(200x200px, 1:1 Ratio)',
                pr_bg_img_label: '(380x475px, 4:5 Ratio)',
                remove_only_pr_bg_img: 1,
                show_pr_bg_img: 1,
                name: 'Linda Johnson',
                desc: 'Sr. Marketing Manager',
                company: '',
                contact_shortcut_enable: 1,
                contact_shortcuts: [{
                    type: 'mobile',
                    value: ""
                }, {
                    type: 'email',
                    value: ""
                }, {
                    type: 'sms',
                    value: ""
                }]
            },
            {
                component: 'text_desc',
                title: 'About Me',
                desc: 'Description',
            },
            {
                component: 'images',
                header_enable: 0,
                title: '',
                desc: '',
                view_type: 'grid_2',
                images: [
                    '/images/digitalCard/image_1.png',
                    '/images/digitalCard/image_2.png'
                ]
            },
            {
                component: 'social_link',
                header_enable: 0,
                title: 'Social Links',
                desc: 'Description',
                links: [{
                        type: "facebook",
                        url: "",
                        title: "Title",
                        subtitle: "Like us on Facebook",
                        subtitle_enable: 1,
                        icon_img: "/images/digitalCard/fb_icon@72x.png"
                    },
                    {
                        type: "instagram",
                        url: "",
                        title: "Instagram",
                        subtitle: "Follow us on Instagragm",
                        subtitle_enable: 0,
                        icon_img: "/images/digitalCard/insta_icon@72x.png"
                    },
                    {
                        type: "twitter",
                        url: "",
                        title: "Twitter",
                        subtitle: "Talk with us on Twitter",
                        subtitle_enable: 0,
                        icon_img: "/images/digitalCard/tw_icon@72x.png"
                    },
                ]
            },
            {
                component: 'contact',
                contact_title: 'Contact Us',
                icon_img: '/images/digitalCard/contactus.png',
                floating_button_enable: 1,
                floating_button_label: 'Add to Contact',
                contact_infos: [{
                        type: "number",
                        title: "Call Us",
                        label: "Mobile ",
                        number: "123 456 7890",
                    },
                    {
                        type: "email",
                        title: "Email",
                        label: "Email ",
                        email: "contactme@domain.com",
                    },
                    {
                        type: "address",
                        title: "Address",
                        street: '817 N Ave',
                        city: 'California',
                        country: 'US',
                        state: 'Chicago',
                        zip: '60622',
                        action_button_enable: 1,
                        action_button_label: "Direction",
                        action_button_link: "#",
                    },
                ]
            },
            {
                component: 'web_links',
                header_enable: 0,
                title: 'Web Link',
                desc: 'Description',
                links: [{
                    url: "",
                    title: "Portfolio",
                    subtitle: "Visit for more information",
                    subtitle_enable: 1,
                    icon_img: "/images/digitalCard/weblink.png"
                }]
            }
        ],
        style: {
            primary_bg_color: "#904713",
            primary_profile_text_color: "#904713",
            primary_text_color: "#904713",
            secondary_bg_color: "#ffffff",
            secondary_profile_text_color: "#656b6c",
            secondary_text_color: "#656b6c",
            // bg_img: "/images/digitalCard/dbc/bg_image_5.jpg",
            card: {
                bg_color: "#ffffff",
                blur: "29",
                border_radius: "16",
                enable: 1,
                shadow_color: "#64646f33",
                spread: "0",
                x: "0",
                y: "7",
            },
            custom_css: `
                body{overflow:auto !important;}
                 .qrc_profile_5{background-color: var(--qrc-secondary); border-radius: 18px; overflow: hidden; margin: 15px 0;}
                 .qrc_profile_5 h2{ color: var(--qrc-profile-primary); font-size: 32px; font-weight: normal; line-height:34px; word-break: break-word; }
                 .qrc_profile_5 p{color: var(--qrc-profile-secondary);}
                 .qrc_profile_5 .qrc_profile_inner{ padding-top: 0; position: relative; padding-bottom: 15px; background: var(--qrc-secondary);}
                 .qrc_profile_5 .qrc_coverimage{height: 290px; width: 100%; border-radius: 0; position: relative;}
                 .qrc_profile_5_svg{position: absolute; bottom: -1px;   text-shadow: 2px 2px 3px rgba(0,0,0,0.3); margin-right:-1px;}
                 .qrc_profile_5_ovrlay_svg{position: absolute; bottom: 0px; opacity: 0.7; }
                 .qrc_profile_5 .qrc_profile_inner_info{margin-top:70px;}
                 .qrc_coverimage{background-position: top center; background-size: cover; }
                 .qrc_heading h2{font-weight: normal;}
                 .qrc_profile_shortcut ul li{text-align: center; background: var(--qrc-primary); color: #fff;width: 52px;
                     height: 52px;
                     font-size: 28px;
                     padding-top: 0px;     margin-bottom: 8px;}
                 .qrc_profile_shortcut ul li a{color: #fff;}
                 .qrc_profile_shortcut ul li a:hover{color: #fff;}
                 .qrc_gallery_list li{padding-top: 0px;}
                 .qrc_page_wrapper{background-position: top center; background-size: cover;height:unset; min-height:100vh;}
                 .qrc_profile_brand_logo{ background:#fff; position: absolute; left: 15px; top: 298px; border: solid 3px #00000010; border-radius: 100px; width: 110px; height: 110px; margin: auto; text-align: center; vertical-align: middle; display: flex; align-items: center; overflow: hidden;}
                 .qrc_profile_brand_logo img{max-width: 100%; max-height: 100%;}
                 .qrc_profile_shortcut{margin: 15px 0 0 0;}
                 .qrc_social_links_list li, .qrc_gallery, .qrc_contact{} 
                 .qrc_profilepic{width: 160px; height: 160px; background-position: center; background-size: cover; position: absolute; top: 180px; left: 15px; border-radius: 180px;}
                 .qrc_page_inner{padding-top:0}
                 
                 @media (max-width: 767px) {
                     .qrc_profile_5 {margin: 0 -15px; border-radius: 0px !important; margin-top:0; margin-bottom: 0px;}
                     body::-webkit-scrollbar { display: none;}
                     body { -ms-overflow-style: none;  scrollbar-width: none;}
                 }                
             `
        },
        html: {
            profile: {
                main: `<div class="section qrc_profile_5">                         
                         <div class="qrc_profile_inner">
                             ___pr_bg_img_html___
                             <div class="qrc_profile_inner_info">
                                 <h2>___name___</h2>
                                 <p>___desc___</p>
                                 <p><strong>___company___</strong></p>
                                 ___shortcut_html___
                             </div>    
                             ___pr_pic___                            
                         </div>
                     </div>`,
                shortcut: `<div class="qrc_profile_shortcut">
                             <ul>___shortcut_items___</ul>
                         </div>`,
                item: '<li class="qr_cc_card"><a href="___item_link___"><span class="___item_icon___"></span></a></li>',
                pr_img: `<div class="qrc_profilepic" style="background-image: url('___pr_img___');"></div>`,
                pr_bg_img: `<div class="qrc_coverimage" style="background-image: url('___pr_bg_img___');">
                             <svg id="Layer_1" class="qrc_profile_5_ovrlay_svg" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 375 160">
                                     <defs>
                                         <style>
                                         .cls-1 {
                                             fill: url(#linear-gradient);
                                         }
                                         </style>
                                         <linearGradient id="linear-gradient" x1="1.06" y1="260.32" x2="1.06" y2="259.32" gradientTransform="translate(-208.5 67424) scale(375 -259)" gradientUnits="userSpaceOnUse">
                                         <stop offset="0" stop-color="#070708" stop-opacity="0"/>
                                         <stop offset="1" stop-color="#070708"/>
                                         </linearGradient>
                                     </defs>
                                     <rect id="Rectangle_297" data-name="Rectangle 297" class="cls-1" width="375" height="160"/>
                             </svg>
 
                                 <!-- shape svg -->
                             <svg class="qrc_profile_5_svg" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375 117">
                                 <defs><style>.cls-3{fill:var(--qrc-secondary);}.cls-2{opacity:.7;}</style></defs><g id="Group_1240" class="cls-2"><path id="Path_1471" class="cls-3" d="M.08,81.65l3.11-3.68,3.99,1.3,3.79-2.06,5.68,1.13s.42-.6,2.73,1.42,2.1,3.39,3.99,1.85,3.15-3.23,4.41-1.78c1.26,1.45,6.31,3.2,6.31,3.2l1.89-.19,7.15-2.5,4.42-2.68s0-.22,1.47-.14c1.47,.08,6.52-3.11,6.73-3.8s1.05-.1,2.73,1.3,7.15,.42,9.04-1.11,3.79-3.29,4.63-2.7,2.73-1.39,4.41-2.45,4.62-3.15,5.47-1.43,5.47,.36,5.47,.36v-1.66s4.2,3.73,5.26,4.07,9.46,4.91,10.3,4.61c.83-.42,1.6-.95,2.31-1.57v1.8s3.79,2.55,5.05,2.2,7.78,1.48,7.78,1.48c.66-.34,1.41-.41,2.1-.21,1.26,.33,3.79,2,5.05,.47s7.15,.36,7.15,1.04,10.51,1.89,12.61,.34,3.36,1.24,3.36,1.24c0,0,8.83,.71,9.67,.4s5.88-4.62,8.2-3.95c2.08,.71,4.12,1.57,6.1,2.57,2.61-1.78,5.56-2.92,8.62-3.33,4.63-.45,11.14-6.25,13.67-8.07,2.52-1.82,7.99-5.72,10.3-5.95,2.31-.23,13.26-7.82,15.14-10.11,2.31-2.83,9.88-4.24,11.98-5.79s4.42-3.8,5.05-2.51,9.25-2.7,11.98-4.32c2.73-1.61,5.88,3.02,8.83,3.63s13.03-1.27,15.35-2.17,9.67-2.74,11.35-.21c1.68,2.53,10.09,5.3,10.93,5.22s16.19-.01,18.08-1.09c1.89-1.08,9.46-6.83,11.57-3.97s11.77,3.93,13.03,3.14,6.94-.68,8.83,.48,10.3,2.81,10.3,2.81c0,0-.84,.55,1.47-2.38s2.1-3.81,3.79-2.4c2.08,2.08,4.04,4.29,5.88,6.61l6.26,.29V117.73L.08,117.35v-35.7Z"/></g><g id="Group_1240-2"><path id="Path_1471-2" class="cls-3" d="M.08,83.43l3.11-3.4,3.99,1.27,3.79-1.87,5.68,1.14s.42-.56,2.73,1.37c2.31,1.92,2.1,3.2,3.99,1.79s3.15-2.98,4.41-1.6,6.31,3.09,6.31,3.09l1.89-.15,7.15-2.23,4.42-2.44s0-.21,1.47-.11c1.47,.1,6.52-2.81,6.73-3.46s1.05-.08,2.73,1.26,7.15,.5,9.04-.9,3.79-3.02,4.63-2.46,2.73-1.26,4.41-2.23,4.62-2.88,5.47-1.26,5.47,.42,5.47,.42v-1.56s4.2,3.55,5.26,3.89,9.46,4.74,10.3,4.46c.83-.38,1.6-.87,2.31-1.44v1.68s3.79,2.44,5.05,2.13,7.78,1.5,7.78,1.5c.66-.31,1.41-.37,2.1-.16,1.26,.32,3.79,1.93,5.05,.51s7.15,.44,7.15,1.07,10.51,1.92,12.61,.5,3.36,1.21,3.36,1.21c0,0,8.83,.8,9.67,.52s5.88-4.24,8.2-3.57c2.08,.7,4.12,1.53,6.1,2.49,2.61-1.63,5.56-2.65,8.62-2.99,4.63-.36,11.14-5.69,13.67-7.36,2.52-1.67,7.99-5.24,10.3-5.42s13.26-7.13,15.14-9.24c2.31-2.61,9.88-3.83,11.98-5.25s4.42-3.49,5.05-2.28,9.25-2.39,11.98-3.86,5.88,2.91,8.83,3.53c2.95,.61,13.03-1,15.35-1.81s9.67-2.43,11.35-.03c1.68,2.39,10.09,5.11,10.93,5.05s16.19,.23,18.08-.76,9.46-6.25,11.57-3.55,11.77,3.86,13.03,3.13,6.94-.53,8.83,.58c1.89,1.12,10.3,2.78,10.3,2.78,0,0-.84,.5,1.47-2.21s2.1-3.53,3.79-2.19c2.08,1.98,4.04,4.08,5.88,6.27l6.26,.36v57.43L.08,116.86v-33.43Z"/></g>
                             </svg>
                         </div>`

            },
            social_link: DefaultHtmlTemplate.social_link,
            web_links: DefaultHtmlTemplate.web_links,
            text_desc: DefaultHtmlTemplate.text_desc,
            contact: DefaultHtmlTemplate.contact,
            button: DefaultHtmlTemplate.button,
            video: DefaultHtmlTemplate.video,
            custom_fields: DefaultHtmlTemplate.custom_fields,
            pdf_gallery: DefaultHtmlTemplate.pdf_gallery,
        }
    },


    // DBC New V Template 19
    {
        content: [{
                component: 'profile',
                pr_img: '/images/digitalCard/dbc/profile_6.png',
                br_img: `/images/digitalCard/dbc/brand_logo_5.png`,
                pr_bg_img: `/images/digitalCard/dbc/bg_image_7.png`,
                pr_img_label: '(200x200px, 1:1 Ratio)',
                br_img_label: '(120x120px, 1:1 Ratio)',
                pr_bg_img_label: '(380x475px, 4:5 Ratio)',

                remove_only_pr_bg_img: 1,
                show_brand_img: 1,
                show_pr_bg_img: 1,
                name: 'Linda Johnson',
                desc: 'Sr. Marketing Manager',
                company: '',
                contact_shortcut_enable: 1,
                contact_shortcuts: [{
                    type: 'mobile',
                    value: ""
                }, {
                    type: 'email',
                    value: ""
                }, {
                    type: 'sms',
                    value: ""
                }]
            },
            {
                component: 'text_desc',
                title: 'About Me',
                desc: 'Description',
            },
            {
                component: 'images',
                header_enable: 0,
                title: '',
                desc: '',
                view_type: 'grid_2',
                images: [
                    '/images/digitalCard/image_1.png',
                    '/images/digitalCard/image_2.png'
                ]
            },
            {
                component: 'social_link',
                header_enable: 0,
                title: 'Social Links',
                desc: 'Description',
                links: [{
                        type: "facebook",
                        url: "",
                        title: "Title",
                        subtitle: "Like us on Facebook",
                        subtitle_enable: 1,
                        icon_img: "/images/digitalCard/fb_icon@72x.png"
                    },
                    {
                        type: "instagram",
                        url: "",
                        title: "Instagram",
                        subtitle: "Follow us on Instagragm",
                        subtitle_enable: 0,
                        icon_img: "/images/digitalCard/insta_icon@72x.png"
                    },
                    {
                        type: "twitter",
                        url: "",
                        title: "Twitter",
                        subtitle: "Talk with us on Twitter",
                        subtitle_enable: 0,
                        icon_img: "/images/digitalCard/tw_icon@72x.png"
                    },
                ]
            },
            {
                component: 'contact',
                contact_title: 'Contact Us',
                icon_img: '/images/digitalCard/contactus.png',
                floating_button_enable: 1,
                floating_button_label: 'Add to Contact',
                contact_infos: [{
                        type: "number",
                        title: "Call Us",
                        label: "Mobile ",
                        number: "123 456 7890",
                    },
                    {
                        type: "email",
                        title: "Email",
                        label: "Email ",
                        email: "contactme@domain.com",
                    },
                    {
                        type: "address",
                        title: "Address",
                        street: '817 N Ave',
                        city: 'California',
                        country: 'US',
                        state: 'Chicago',
                        zip: '60622',
                        action_button_enable: 1,
                        action_button_label: "Direction",
                        action_button_link: "#",
                    },
                ]
            },
            {
                component: 'web_links',
                header_enable: 0,
                title: 'Web Link',
                desc: 'Description',
                links: [{
                    url: "",
                    title: "Portfolio",
                    subtitle: "Visit for more information",
                    subtitle_enable: 1,
                    icon_img: "/images/digitalCard/weblink.png"
                }]
            }
        ],
        style: {
            primary_bg_color: "#FD8031",
            primary_profile_text_color: "#ffffff",
            primary_text_color: "#FD8031",
            secondary_bg_color: "#7A3DC9",
            secondary_profile_text_color: "#ffffff",
            secondary_text_color: "#656b6c",
            // bg_img: "/images/digitalCard/dbc/bg_image_5.jpg",
            card: {
                bg_color: "#ffffff",
                blur: "29",
                border_radius: "16",
                enable: 1,
                shadow_color: "#64646f33",
                spread: "0",
                x: "0",
                y: "7",
            },
            custom_css: `
                body{overflow:auto !important;}
                 .qrc_profile_5{background-color: var(--qrc-secondary); border-radius: 18px; overflow: hidden; margin: 15px 0; box-shadow: rgb(255 255 255 / 15%) 0px 0px 3px 0px, rgb(255 255 255 / 15%) 0px 8px 16px -8px;}
                 .qrc_profile_5 h2{ color: var(--qrc-profile-primary); font-size: 32px; line-height:34px; word-break:break-word; font-weight: normal;}
                 .qrc_profile_5 p{color: var(--qrc-profile-secondary);}
                 .qrc_profile_5 .qrc_profile_inner{ padding-top: 0; position: relative; padding-bottom: 15px; background: var(--qrc-secondary);}
                 .qrc_profile_5 .qrc_coverimage{height: 410px; width: 100%; border-radius: 0; position: relative;}
                 .qrc_profile_5_svg{position: absolute; top: 185px;   text-shadow: 2px 2px 3px rgba(0,0,0,0.3);}
                 .qrc_profile_5_ovrlay_svg{position: absolute; top: 135px; opacity: 0.7; }
                 .qrc_profile_5 .qrc_profile_inner_info{margin-top:10px; z-index: 99; background: var(--qrc-seconary);}
                 .qrc_coverimage{background-position: top center;  opacity: 0.7; background-size: cover;}
                 .qrc_heading h2{font-weight: normal;}
                 .qrc_profile_shortcut ul li{text-align: center; background: var(--qrc-primary); color: #fff;width: 52px;
                     height: 52px;
                     font-size: 28px;
                     padding-top: 0px;     margin-bottom: 8px;}
                 .qrc_profile_shortcut ul li a{color: #fff;}
                 .qrc_profile_shortcut ul li a:hover{color: #fff;}
                 .qrc_gallery_list li{padding-top: 0px;}
                 .qrc_page_wrapper{background-position: top center; background-size: cover; height:unset; min-height:100vh;}
                 .qrc_profile_brand_logo{position: absolute; right: 15px; top: 60px; border: solid 3px #fff; width: 80px; height: 80px; margin: auto; text-align: center; background: #fff; vertical-align: middle; display: flex; align-items: center; overflow: hidden; background-size: 80%; clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); background-position: center; background-repeat: no-repeat; z-index: 99;}
                 .qrc_profile_brand_logo img{max-width: 100%; max-height: 100%;}
                 .qrc_profile_shortcut{margin: 15px 0 0 0;}
                 .qrc_page_inner{padding-top:0}
                 .qrc_profilepic{width: 160px; height: 160px; background-position: top center; background-size: cover; position: absolute; top: 220px; left: 15px; -webkit-clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
                     clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);     z-index: 99; border-radius: 0;}
                 
                     .qrc_svg_shape_overlay{    position: absolute;
                         top: 0;
                         z-index: 9;
                         width: 100%;
                     }
                 
                 
                 @media (max-width: 767px) {
                     .qrc_profile_5 {margin: 0 -15px; border-radius: 0px !important; margin-top:0; margin-bottom: 0px; box-shadow: unset;}
                     body::-webkit-scrollbar { display: none;}
             body { -ms-overflow-style: none;  scrollbar-width: none;}
                 }
                             
             `
        },
        html: {
            profile: {
                main: `<div class="section qrc_profile_5">                         
                         <div class="qrc_profile_inner">
                             ___pr_bg_img_html___                         
                             <div class="qrc_profile_inner_info">
                                 <h2>___name___</h2>
                                 <p>___desc___</p>
                                 <p><strong>___company___</strong></p>
                                 ___shortcut_html___
                             </div>    
                             ___pr_pic___    
                             ___br_img_html___   
                             <div class="qrc_svg_shape_overlay">
                                 <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                     viewBox="0 0 375 487.8" style="enable-background:new 0 0 375 487.8;" xml:space="preserve">
                                 <style type="text/css">
                                     .st0{fill:var(--qrc-primary);}
                                 </style>
                                 <polygon class="st1" points="382.4,554.9 -8.6,554.9 -8.6,257.9 382.4,398.9 " style="fill:var(--qrc-secondary);"/>
                                 <rect x="182" y="121.7" transform="matrix(0.3448 -0.9387 0.9387 0.3448 -186.7654 389.4778)" class="st0" width="7.2" height="413.7"/>
                                 <rect x="315.3" y="328.2" transform="matrix(0.3374 -0.9414 0.9414 0.3374 -158.1293 560.2241)" class="st0" width="7.2" height="128.4"/>
                                 <rect x="303.8" y="279.1" transform="matrix(0.3412 -0.94 0.94 0.3412 -132.2774 523.5345)" class="st0" width="7.2" height="154.1"/>
                                 <rect x="216.3" y="-113.9" transform="matrix(0.3425 -0.9395 0.9395 0.3425 90.2338 241.7497)" class="st0" width="3.1" height="340.6"/>
                                 </svg>
 
                             </div>                        
                         </div>
                     </div>`,
                shortcut: `<div class="qrc_profile_shortcut">
                             <ul>___shortcut_items___</ul>
                         </div>`,
                item: '<li class="qr_cc_card"><a href="___item_link___"><span class="___item_icon___"></span></a></li>',
                pr_img: `<div class="qrc_profilepic" style="background-image: url('___pr_img___');"></div>`,
                br_img: `<div class="qrc_profile_brand_logo" style="background-image: url('___br_img___');"></div>`,
                pr_bg_img: `<div class="qrc_coverimage" style="background-image: url('___pr_bg_img___');"></div>`
            },
            social_link: DefaultHtmlTemplate.social_link,
            web_links: DefaultHtmlTemplate.web_links,
            text_desc: DefaultHtmlTemplate.text_desc,
            contact: DefaultHtmlTemplate.contact,
            button: DefaultHtmlTemplate.button,
            video: DefaultHtmlTemplate.video,
            custom_fields: DefaultHtmlTemplate.custom_fields,
            pdf_gallery: DefaultHtmlTemplate.pdf_gallery,
        }
    },


    // DBC New V Template 20
    {
        content: [{
                component: 'profile',
                pr_img: '/images/digitalCard/dbc/profile_6.png',
                br_img: `/images/digitalCard/dbc/brand_logo_4.png`,
                pr_img_label: '(380x475px, 4:5 Ratio)',
                br_img_label: '(240x80px, 3:1 Ratio)',
                remove_only_pr_img: 1,
                show_brand_img: 1,
                name: 'Linda Johnson',
                desc: 'Sr. Marketing Manager',
                company: '',
                contact_shortcut_enable: 1,
                contact_shortcuts: [{
                    type: 'mobile',
                    value: ""
                }, {
                    type: 'email',
                    value: ""
                }, {
                    type: 'sms',
                    value: ""
                }]
            },
            {
                component: 'text_desc',
                title: 'About Me',
                desc: 'Description',
            },
            {
                component: 'images',
                header_enable: 0,
                title: '',
                desc: '',
                view_type: 'grid_2',
                images: [
                    '/images/digitalCard/image_1.png',
                    '/images/digitalCard/image_2.png'
                ]
            },
            {
                component: 'social_link',
                header_enable: 0,
                title: 'Social Links',
                desc: 'Description',
                links: [{
                        type: "facebook",
                        url: "",
                        title: "Title",
                        subtitle: "Like us on Facebook",
                        subtitle_enable: 1,
                        icon_img: "/images/digitalCard/fb_icon@72x.png"
                    },
                    {
                        type: "instagram",
                        url: "",
                        title: "Instagram",
                        subtitle: "Follow us on Instagragm",
                        subtitle_enable: 0,
                        icon_img: "/images/digitalCard/insta_icon@72x.png"
                    },
                    {
                        type: "twitter",
                        url: "",
                        title: "Twitter",
                        subtitle: "Talk with us on Twitter",
                        subtitle_enable: 0,
                        icon_img: "/images/digitalCard/tw_icon@72x.png"
                    },
                ]
            },
            {
                component: 'contact',
                contact_title: 'Contact Us',
                icon_img: '/images/digitalCard/contactus.png',
                floating_button_enable: 1,
                floating_button_label: 'Add to Contact',
                contact_infos: [{
                        type: "number",
                        title: "Call Us",
                        label: "Mobile ",
                        number: "123 456 7890",
                    },
                    {
                        type: "email",
                        title: "Email",
                        label: "Email ",
                        email: "contactme@domain.com",
                    },
                    {
                        type: "address",
                        title: "Address",
                        street: '817 N Ave',
                        city: 'California',
                        country: 'US',
                        state: 'Chicago',
                        zip: '60622',
                        action_button_enable: 1,
                        action_button_label: "Direction",
                        action_button_link: "#",
                    },
                ]
            },
            {
                component: 'web_links',
                header_enable: 0,
                title: 'Web Link',
                desc: 'Description',
                links: [{
                    url: "",
                    title: "Portfolio",
                    subtitle: "Visit for more information",
                    subtitle_enable: 1,
                    icon_img: "/images/digitalCard/weblink.png"
                }]
            }
        ],
        style: {
            primary_bg_color: "#88CDE5",
            primary_profile_text_color: "#ffffff",
            primary_text_color: "#88CDE5",
            secondary_bg_color: "#070708",
            secondary_profile_text_color: "#ffffff",
            secondary_text_color: "#656b6c",

            // bg_img: "/images/digitalCard/dbc/bg_image_5.jpg",
            card: {
                bg_color: "#ffffff",
                blur: "29",
                border_radius: "16",
                enable: 1,
                shadow_color: "#64646f33",
                spread: "0",
                x: "0",
                y: "7",
            },
            custom_css: `
                body{overflow:auto !important;}
                 .qrc_profile_5{background-color: var(--qrc-secondary); border-radius: 18px; overflow: hidden; margin: 15px 0;box-shadow: rgb(255 255 255 / 15%) 0px 0px 3px 0px, rgb(255 255 255 / 15%) 0px 8px 16px -8px;}
                 .qrc_profile_5 h2{ color: var(--qrc-profile-primary); font-size: 32px; line-height:34px; word-break: break-word; font-weight: bold; width: 71%;}
                 .qrc_profile_5 p{color: var(--qrc-profile-secondary);}
                 .qrc_profile_5 .qrc_profile_inner{ padding-top: 0; position: relative; padding-bottom: 15px; background: var(--qrc-secondary);}
                 .qrc_profile_5 .qrc_profilepic{height: 380px; width: 100%; border-radius: 0; position: relative;}
                 .qrc_profile_5_svg{position: absolute; top: 185px;   text-shadow: 2px 2px 3px rgba(0,0,0,0.3);}
                 .qrc_profile_5_ovrlay_svg{position: absolute; top: 135px; opacity: 0.7; }
                 .qrc_profile_5 .qrc_profile_inner_info{margin-top:-80px; width: 90%;  background: var(--qrc-seconary); -webkit-clip-path: polygon(0% 0%, 85% 0, 100% 100%, 0% 100%);
                     clip-path: polygon(0% 0%, 85% 0, 100% 100%, 0% 100%); background: var(--qrc-primary); padding-top: 20px;
                     padding-bottom: 20px;}
                 .qrc_profilepic{background-position: top center;}
                 .qrc_heading h2{font-weight: normal; transform:   }
                 .qrc_profile_shortcut ul li{text-align: center; background: var(--qrc-primary); color: #fff;width: 52px;
                     height: 52px;
                     font-size: 28px;
                     padding-top: 0px;     margin-bottom: 8px;}
                 .qrc_profile_shortcut ul li a{color: #fff;}
                 .qrc_profile_shortcut ul li a:hover{color: #fff;}
                 .qrc_gallery_list li{padding-top: 0px;}
                 .qrc_page_wrapper{background-position: top center; background-size: cover;height:unset; min-height:100vh;}
                 .qrc_profile_brand_logo{ width: 180px; height: 60px; text-align: left; vertical-align: middle; display: flex;     align-items: start; overflow: hidden; background-size: 80%;background-repeat: no-repeat; z-index: 99;}
                 .qrc_profile_brand_logo img{max-width: 100%; max-height: 100%;}
                 .qrc_profile_shortcut{margin: 30px 0 0 10px;}
                 .qrc_page_inner{padding-top:0}
                 .qrc_profile_image{width: 160px; height: 160px; background-position: top center; background-size: cover; position: absolute; top: 220px; left: 15px;     z-index: 99;}
                 
                     .qrc_svg_shape_overlay{    position: absolute;
                         top: 0;
                         z-index: 9;
                         width: 100%;
                     }
                 
                 
                 @media (max-width: 767px) {
                     .qrc_profile_5 {margin: 0 -15px; border-radius: 0px !important; margin-top:0; margin-bottom: 0px; box-shadow:unset !important}
                     body::-webkit-scrollbar { display: none;}
                     body { -ms-overflow-style: none;  scrollbar-width: none;}
                 }
                 `
        },
        html: {
            profile: {
                main: `<div class="section qrc_profile_5">                         
                         <div class="qrc_profile_inner">
                             ___pr_pic___
                             <div class="qrc_profile_inner_info">
                                 <h2>___name___</h2>
                                 <p>___desc___</p>
                                 <p><strong>___company___</strong></p>
                                 ___br_img_html___
                             </div>    
                             ___shortcut_html___                            
                         </div>
                     </div>`,
                shortcut: `<div class="qrc_profile_shortcut">
                             <ul>___shortcut_items___</ul>
                         </div>`,
                item: '<li class="qr_cc_card"><a href="___item_link___"><span class="___item_icon___"></span></a></li>',
                pr_img: `<div class="qrc_profilepic" style="background-image: url('___pr_img___');"></div>`,
                br_img: `<div class="qrc_profile_brand_logo"> <img src="___br_img___"/> </div>`

            },
            social_link: DefaultHtmlTemplate.social_link,
            web_links: DefaultHtmlTemplate.web_links,
            text_desc: DefaultHtmlTemplate.text_desc,
            contact: DefaultHtmlTemplate.contact,
            button: DefaultHtmlTemplate.button,
            video: DefaultHtmlTemplate.video,
            custom_fields: DefaultHtmlTemplate.custom_fields,
            pdf_gallery: DefaultHtmlTemplate.pdf_gallery,
        }
    },



];

if (typeof DigitalBusinessPageTemplates != "undefined") {
    Array.prototype.push.apply(DigitalBusinessPageTemplates, DBC_Templates);
}