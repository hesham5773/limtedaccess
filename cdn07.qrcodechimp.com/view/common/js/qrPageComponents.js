var _timeoutId = null;
const QRPageComponents = {
    _save_callback: null,
    components: [],
    selected_template: 0,
    open_index: 0,
    page_setting: {},
    pr_64: '',
    _set_image: 0,
    cards_open: [1],
    init: function() {


        // if (getUrlParameterByName("basic") && isMobile.any()) {
        if ($("#simple_form").length) {
            QRPageComponents.listeners()
            return;
        }
        if (typeof __savedQrCodeParams == "undefined") {
            __savedQrCodeParams = {}
        }
        if (typeof __savedQrCodeParams != 'undefined' && !empty(__savedQrCodeParams)) {
            QRPageComponents.components = __savedQrCodeParams['content']
            QRPageComponents.page_setting = extractDataFromArray(__savedQrCodeParams, ['page_setting'], {})
        }
        QRPageComponents.selected_template = $(".page_template_card.active").data("index");
        if (typeof QRPageComponents.selected_template == "undefined" || QRPageComponents.selected_template == NaN || QRPageComponents.selected_template == "") {
            QRPageComponents.selected_template = 0;
        }

        if (empty(QRPageComponents.components)) {
            QRPageComponents.components = getComponentContentFromTemplate(QRPageComponents.selected_template)
        }
        if (empty(QRPageComponents.components)) {
            QRPageComponents.components = defaultContentArray.content
        }

        QRPageComponents.selected_template = parseInt(extractDataFromArray(__savedQrCodeParams, ['selected_template'], QRPageComponents.selected_template))
        if (typeof QRPageComponents.selected_template == "undefined" || QRPageComponents.selected_template == NaN || QRPageComponents.selected_template == "") {
            QRPageComponents.selected_template = 0;
        }

        QRPageStyleComponents.style = extractDataFromArray(__savedQrCodeParams, ['style'], {})
        if (empty(QRPageStyleComponents.style)) {
            QRPageStyleComponents.style = getComponentStyleFromTemplate(QRPageComponents.selected_template)
        }
        if (typeof __savedQrCodeParams != 'undefined' && !empty(extractDataFromArray(__savedQrCodeParams, ['ld_url'], ''))) {
            QRPageStyleComponents.style.ld_img = extractDataFromArray(__savedQrCodeParams, ['ld_url'], '')
        }
        if (typeof __savedQrCodeParams != 'undefined' && !empty(extractDataFromArray(__savedQrCodeParams, ['style_selected'], ''))) {
            QRPageStyleComponents.style_selected = extractDataFromArray(__savedQrCodeParams, ['style_selected'], -1)
        }

        if (page == 'displayPage') {
            QRPageComponents.prepareHtml(1)
            return;
        }
        QRPageComponents.listeners()
        QRPageComponents.preparePageInputSections()
        QRPageStyleComponents.getStyleContainerComponents()
        exponentialBackoff(() => {
            return typeof _qrOptions != "undefined"
        }, 30, 1000, () => {
            QRDesignComponents.getWrapperHtml()
            QRPageComponents.syncShortUrl($(".short_url_data").text())
            QRPageStyleComponents.handleStyleInputChange()
            QRPageComponents.prepareHtml()
        })

    },
    syncShortUrl: function(short_url) {
        short_url = short_url.toLowerCase()
        if (!short_url.startsWith('https://')) {
            short_url = "https://" + short_url
        }
        let short_url_code = '';
        if (short_url.includes('/r/')) {
            short_url_code = (short_url.split("//")[1]).split('/r/')[1]
        } else {
            short_url_code = (short_url.split("//")[1]).split('/')[1]
        }
        $(".short_url_data").text(short_url)
        $("#short_url_input").val(short_url_code)
        $(".short_url_data_tab").attr("href", short_url)
        $(".short_url_data_copy").attr("onclick", "copyTextToClipboard('" + short_url + "'); return false;")

    },
    syncAllCardDisplayStates: function() {
        QRPageComponents.cards_open = []
        Array.from($("#qr_page_component_container .qr_page_component_card")).forEach((ele, index) => {
            QRPageComponents.cards_open.push($(ele).find(".qr_page_component_card_body").hasClass("show") ? 1 : 0)
        })
    },
    listeners: function() {
        function checkitem() // check function
        {
            var $this = $('#qrc_template_slider');
            if ($('.carousel-inner .carousel-item:first').hasClass('active')) {
                // Hide left arrow
                $this.children('.carousel-control-prev').hide();
                // But show right arrow
                $this.children('.carousel-control-next').show();
            } else if ($('.carousel-inner .carousel-item:last').hasClass('active')) {
                // Hide right arrow
                $this.children('.carousel-control-next').hide();
                // But show left arrow
                $this.children('.carousel-control-prev').show();
            } else {
                $this.children('.carousel-control-prev').show();
                $this.children('.carousel-control-next').show();
            }
        }

        checkitem();
        $('#qrc_template_slider').on('slid.bs.carousel', checkitem);

        $(".design_nav .nav .nav-item").on("click", function(e) {
            document.body.scrollTop = document.documentElement.scrollTop = 320;
            if ($(this).find("a").text() == "3QR Code") {
                $(".preview_nav button[data-view=qr]").click()
            } else {
                $(".preview_nav button[data-view=page]").click()
            }
        })
        $("#short_url_input").on("input", function(e) {
            let short_url = $(".short_url_slug_prepend")[0].innerText + e.target.value.cleanReplace(/[^a-z0-9\-]/gi, '')
            QRPageComponents.syncShortUrl(short_url)
        })

        $(document).on("click", ".page_template_card", function(e) {
            if ($(this).data("index") == undefined) {
                return
            }
            let pr_img = $('.qr_page_component_card[data-type="profile"] .img_uploaded_card.selected_img').css("background-image");
            if (!empty(pr_img)) {
                pr_img = pr_img.split('"')[1]
            }
            if (pr_img.includes("/images/digitalCard/")) {
                let content = getComponentContentFromTemplate($(this).data("index"));
                content.forEach(component => {
                    if (component.component == 'profile') {
                        let c_pr_img = extractDataFromArray(component, ['pr_img'], "");
                        if (c_pr_img != "") {
                            $('.qr_page_component_card[data-type="profile"] .img_uploaded_card.selected_img').css("background-image", "url('" + c_pr_img + "')");

                            QRPageComponents.components.forEach(c => {
                                if (c.component == 'profile') {
                                    c.pr_img = c_pr_img;
                                }
                            })
                        }

                    }
                })
            }


            $(".page_template_card").removeClass("active")
            $(this).addClass("active")


            QRPageComponents.selected_template = $(this).data("index");
            const ld_img = QRPageStyleComponents.style.ld_img
            QRPageStyleComponents.style = getComponentStyleFromTemplate($(this).data("index"))
            QRPageStyleComponents.style.ld_img = ld_img


            let template_content = getComponentContentFromTemplate($(this).data("index"))
            let profile = {}

            QRPageComponents.components.forEach((component, index) => {
                if (component.component == "profile") {
                    profile = component;
                }
            })

            if (!empty(profile)) {
                template_content.forEach(component => {
                    if (component.component == 'profile') {
                        profile.show_brand_img = 0;
                        profile.show_pr_bg_img = 0;
                        profile.pr_img_label = extractDataFromArray(component, ['pr_img_label'], '(200x200px, 1:1 Ratio)');
                        if (typeof component['show_brand_img'] != "undefined") {
                            profile.show_brand_img = component['show_brand_img'];
                            profile.enable_br = 1;
                            profile.br_img_label = extractDataFromArray(component, ['br_img_label'], '');
                            let br_img = extractDataFromArray(profile, ['br_img'], '')
                            profile.br_img = component['br_img'];
                            if (!empty(br_img)) {
                                if (!br_img.includes("/images/digitalCard/")) {
                                    profile.br_img = br_img;
                                }
                            }
                        }
                        if (typeof component['show_pr_bg_img'] != "undefined") {
                            profile.show_pr_bg_img = component['show_pr_bg_img'];
                            profile.enable_pr_bg = 1;
                            profile.pr_bg_img_label = extractDataFromArray(component, ['pr_bg_img_label'], '');
                            let pr_bg_img = extractDataFromArray(profile, ['pr_bg_img'], '')
                            profile.pr_bg_img = component['pr_bg_img'];
                            if (!empty(pr_bg_img)) {
                                if (!pr_bg_img.includes("/images/digitalCard/")) {
                                    profile.pr_bg_img = pr_bg_img;
                                }
                            }
                        }
                    }
                })
            }



            QRPageComponents.preparePageInputSections()
            QRPageStyleComponents.getStyleContainerComponents(false)

        })

        $(document).on("click", ".add_profile_component a", function(e) {
            e.preventDefault()
            let type = $(this).data('type')
            $(this).parents(".qr_page_component_card_body").find(".list-group").append(ComponentLists.profile.getContactShortcutItem(type, ''))
            QRPageComponents.handleInputChange(e)
        })
        $(document).on("click", ".add_contact_component a", function(e) {
            e.preventDefault()
            let type = $(this).data('type')
            $(this).parents(".qr_page_component_card_body").find(".list-group").append(ComponentLists.contact.getContactInfoItem({
                type
            }))
            QRPageComponents.handleInputChange(e)
        })

        $(document).on("click", ".add_qr_component a", function(e) {
            e.preventDefault()
            let component = $(this).data('type')
            QRPageComponents.components.push(ComponentLists[component].default)
            QRPageComponents.open_index = QRPageComponents.components.length - 1
            QRPageComponents.prepareHtml()
            QRPageComponents.syncAllCardDisplayStates()
            QRPageComponents.cards_open[QRPageComponents.components.length - 1] = 1
            QRPageComponents.preparePageInputSections()
        })
        $(document).on("click", ".video_type_btn", function(e) {
            e.preventDefault()
            $(this).parents(".btn-group").find("button").removeClass("active")
            $(this).addClass("active")
            QRPageComponents.handleInputChange(e)
        })

        $(document).on("click", ".btn_add_web_link", function(e) {
            e.preventDefault()
            $(this).parents(".qr_page_component_card_body").find(".list-group").append(ComponentLists.web_links.getLinkItem(ComponentLists.web_links.default.links[0]))
            QRPageComponents.handleInputChange(e)
        })
        $(document).on("click", ".btn_add_custom_field", function(e) {
            e.preventDefault()
            $(this).parents(".qr_page_component_card_body").find(".list-group").append(ComponentLists.custom_fields.getCustomFieldHtml({
                key: '',
                val: ''
            }))
            QRPageComponents.handleInputChange(e)
        })

        $(document).on("click", ".btn_add_social_link button", function(e) {
            e.preventDefault()
            $(this).parents(".qr_page_component_card_body").find(".list-group").append(ComponentLists.social_link.getSocialLinkItem(ComponentLists.social_link.default.links[0]))
            QRPageComponents.handleInputChange(e)
        })

        $(document).on("click", ".btn_add_pdf_gallery button", function(e) {
            e.preventDefault()
            $(this).parents(".qr_page_component_card_body").find(".list-group").append(ComponentLists.pdf_gallery.getPDFItem(ComponentLists.pdf_gallery.default.pdfs[0]))
            QRPageComponents.handleInputChange(e)
        })



        $(document).on("click", ".qr_page_component_card_title, .toggle_card_visiblitiy", function(e) {
            let parent = $(this).parents(".qr_page_component_card")
            let action = parent.find('.toggle_card_visiblitiy i').hasClass('icon-add_1') ? 'expand' : 'hide';


            // let parentTab = $(this).parents(".tab-pane")
            // parentTab.find('.toggle_card_visiblitiy i').removeClass('icon-remove_1')
            // parentTab.find('.toggle_card_visiblitiy i').addClass('icon-add_1')
            // parentTab.find('.qr_page_component_card_body').removeClass("show")
            // parentTab.find('.card-header').attr("aria-expanded", 'false')


            if (action == 'expand') {
                parent.find('.toggle_card_visiblitiy i').removeClass('icon-add_1')
                parent.find('.toggle_card_visiblitiy i').addClass('icon-remove_1')
                parent.find('.qr_page_component_card_body').addClass("show")
                parent.find('.card-header').attr("aria-expanded", 'true')
            } else {
                parent.find('.toggle_card_visiblitiy i').removeClass('icon-remove_1')
                parent.find('.toggle_card_visiblitiy i').addClass('icon-add_1')
                parent.find('.qr_page_component_card_body').removeClass("show")
                parent.find('.card-header').attr("aria-expanded", 'false')
            }

        })

        $(document).on("change", ".title_desc_wrapper input[name=header_enable]", function(e) {
            if (e.target.checked) {
                $(this).parents('.title_desc_wrapper').find(".title_desc_wrapper_input").show()
            } else {
                $(this).parents('.title_desc_wrapper').find(".title_desc_wrapper_input").hide()
            }
        })

        $(document).on("click", ".image_view_type_card", function(e) {
            $(this).parents('.image_view_type_wrapper').find(".image_view_type_card").removeClass("selected")
            $(this).addClass("selected")
            QRPageComponents.handleInputChange(e)
        })

        $(document).on("click", ".img_uploaded_card.upload_img", function(e) {
            if (!isUserLoggedIn()) {
                e.stopPropagation();
                $("#signup-free").modal("show");
                __signup_callback = false;
                return;
            }

            let parent = $(this).parents('.img_upload_card_wrapper')
            FileManager.showFileManager("IMAGE", 1, (file) => {
                let url = extractDataFromArray(file, [0, 'asset_url'], '')
                parent.find(".selected_img").css("background-image", '')
                parent.find(".selected_img").css("background-image", 'url(' + url + ')')
                if (getUrlParameterByName("basic")) {
                    return;
                }
                if (parent.parents(".pg_loader_wrp").length > 0) {
                    QRPageStyleComponents.style.ld_img = url
                    QRPageStyleComponents.handleStyleInputChange()
                } else {
                    QRPageComponents.handleInputChange(e)
                }
            })
        })

        $(document).on("click", ".upload_pdfs", function(e) {
            if (!isUserLoggedIn()) {
                e.stopPropagation();
                $("#signup-free").modal("show");
                __signup_callback = false;
                return;
            }

            let parent = $(this).parents('.pdf_gallery_input_wrapper')
            FileManager.showFileManager("PDF", 1, (file) => {
                let url = extractDataFromArray(file, [0, 'asset_url'], '')
                parent.find("input[name=url]").val(url)
                if (getUrlParameterByName("basic")) {
                    return;
                }
                QRPageComponents.handleInputChange(e)

            })
        })
        $(document).on("click", ".img_uploaded_card.upload_imgs", function(e) {
            if (!isUserLoggedIn()) {
                e.stopPropagation();
                $("#signup-free").modal("show");
                __signup_callback = false;
                return;
            }

            let parent = $(this).parents('.img_upload_card_wrapper')
            FileManager.showFileManager("IMAGE", 16, (file) => {
                file.forEach(image => {
                    parent.find('.images_grid_wrapper').append(`<div class="img_uploaded_card multiple_img mr-3 handle-img mb-2" style="background-image:url('` + image.asset_url + `')">
                                <div class="img_action">
                                    <a href="#" class="btn text-white"><i class="icon-delete_1 font-14"></i></a>
                                </div>
                            </div>`)
                })
                QRPageComponents.handleInputChange(e)
            })
        })

        $(document).on("click", ".images_grid_wrapper .img_action a", function(e) {
            let card = $(this).parents(".img_uploaded_card")
            let index = $(this).parents(".qr_page_component_card").index()
            showDeleteConfirmation("Delete Image", "Are you sure to delete this image?", "Delete", () => {
                card.remove()
                QRPageComponents.handleInputChange(null, index)
            })

        })

        $(document).on("click", ".btn_delete_pro_card", function(e) {
            let ele = e;
            let index = $(this).parents(".qr_page_component_card").index()
            let card = $(this).parents(".subcomponent_sortable_wrapper")
            showDeleteConfirmation("Delete Sub-Component", "Are you sure to delete this sub-component?", "Delete", () => {
                card.remove()
                QRPageComponents.handleInputChange(null, index)
            })
        })

        $(document).on("click", ".btn_delete_component_card", function(e) {
            let index = $(this).parents(".qr_page_component_card").index()
            let card = $(this).parents(".qr_page_component_card")
            showDeleteConfirmation("Delete Component", "Are you sure to delete this component?", "Delete", () => {
                card.remove()
                QRPageComponents.components.splice(index, 1)
                QRPageComponents.prepareHtml()
            })
        })

        $(document).on("input", "#page-tab-input-content input, #page-tab-input-content textarea", function(e) {
            QRPageComponents.handleInputChange(e)
            if (e.target.name == 'contact_shortcut_enable') {
                if (e.target.checked) {
                    $(".contact_shortcut_container").show()
                } else {
                    $(".contact_shortcut_container").hide()
                }
            }
        })
        $(document).on("change", "#page-tab-input-content select", function(e) {
            QRPageComponents.handleInputChange(e)
        })

        $(document).on("change", ".profile_contact_info", function(e) {
            let parent = $(this).parents(".input-group")
            parent.find('input').attr("placeholder", QRPageComponentWrapper.contactOptions[e.target.value].placeholder)
        })
        $(document).on("change", "#page-tab-style-design-content select", function(e) {
            QRPageStyleComponents.handleStyleInputChange(e)
        })
        $(document).on("input", "#page-tab-style-design-content input", function(e) {
            QRPageStyleComponents.handleStyleInputChange(e)
        })

        $(document).on("change", "input[name=page_protection_enable], input[name=contact_protection_enable]", function(e) {
            if (e.target.name == 'contact_protection_enable' && $("input[name=page_protection_enable]").prop("checked")) {
                $("input[name=page_protection_enable]").prop("checked", false)
            } else if (e.target.name == 'page_protection_enable' && $("input[name=contact_protection_enable]").prop("checked")) {
                $("input[name=contact_protection_enable]").prop("checked", false)
            }
        })

        $(document).on("change", "#btn_dowload_bulk_sample1", function(e) {
            e.preventDefault()
            QRPageComponents.downloadBulkSampleFile()
        })
        $(document).on("change", ".social_media_select", function(e) {
            e.preventDefault()
            let parent = $(this).parents(".social_link_input_wrapper")
            parent.find(".img_uploaded_card.selected_img").css("background-image", '')
            parent.find(".img_uploaded_card.selected_img").css("background-image", "url('" + extractDataFromArray(ComponentLists.social_link.socialLinks, [e.target.value, 'icon'], '') + "')")
        })

        $("#short_url_input_popup").on("input", function(e) {
            e.stopImmediatePropagation();
            let short_url_code = e.target.value.trim()
            short_url_code = short_url_code.toLowerCase()
            $(this).val(short_url_code.replace(/[^a-zA-Z0-9-]/g, ''))
        })
        FileManager.init('popup')
    },
    preparePageInputSections: function() {
        $("#qr_page_component_container").html('')
        QRPageComponents.components.forEach((component, index) => {
            $("#qr_page_component_container").append(QRPageComponentWrapper.getWrapperHtml(index, component, !extractDataFromArray(QRPageComponents, ['cards_open', index], 0)))
            QRPageComponentWrapper.emitListeners(index, component)
        })
        new Sortable(document.getElementById('qr_page_component_container'), {
            handle: '.handle', // handle class
            animation: 150,
            ghostClass: 'blue-background-class',
            onEnd: function(evt) {
                let comp = QRPageComponents.components.splice(evt.oldIndex, 1)[0]
                QRPageComponents.components.splice(evt.newIndex, 0, comp)
                QRPageComponents.prepareHtml()

            }
        });
        $(".select2_no_search").select2({
            minimumResultsForSearch: Infinity
        })
    },
    handleInputChange: function(e, index) {
        if ($("#simple_form").length) {
            return;
        }
        $(".select2_no_search").select2({
            minimumResultsForSearch: Infinity
        })
        if (__KEYUP_DELAY == undefined) __KEYUP_DELAY = 1000;
        if (_timeoutId != null) clearTimeout(_timeoutId);
        _timeoutId = setTimeout(function() {
            if (e != null && $(e.target).parents('.qr_page_component_card').length == 0) {
                return;
            }
            let parent, component;
            if (e == null) {
                parent = $($("#page-tab-input-content .qr_page_component_card")[index])
                component = parent.data('type')
            } else {
                index = $(e.target).parents(".qr_page_component_card").index()
                component = $(e.target).parents(".qr_page_component_card").data('type')
                parent = $(e.target).parents(".qr_page_component_card")
            }
            Array.from($("#qr_page_component_container .qr_page_component_card")).forEach((ele, index) => {
                QRPageComponents.components[index].card_enable = $(ele).find("input[name=card_enable]").prop("checked") ? 1 : 0
            })
            let common_data = {
                component,
                card_background: $(parent).find("input[name=card_bg_enable]").prop("checked") ? 1 : 0,
                card_enable: $(parent).find("input[name=card_enable]").prop("checked") ? 1 : 0,
                card_open: $(parent).find(".qr_page_component_card_body").hasClass("show") ? 1 : 0,
                _id: (typeof QRPageComponents.components[index]['_id'] == "undefined") ? QRPageComponents.getUniqueId() : QRPageComponents.components[index]['_id']
            }


            let component_data = ComponentLists[component].getInputData(index, parent)
            QRPageComponents.components[index] = { ...common_data,
                ...component_data
            }
            QRPageComponents.prepareHtml()
        }, __KEYUP_DELAY)

    },
    prepareHtml: function(preview = 0) {
        QRPageComponents.page_setting = page == 'displayPage' ? extractDataFromArray(__savedQrCodeParams, ['page_setting'], {}) : QRPageComponents.fetchPageSettings();
        QRPageComponents.preview = preview
        if (!preview) {
            $(".select2_no_search").select2({
                minimumResultsForSearch: Infinity
            })
        }
        let innerHtml = '';
        QRPageComponents.components.forEach((component, index) => {
            QRPageComponents.components[index]['_id'] = (typeof QRPageComponents.components[index]['_id'] == "undefined") ? QRPageComponents.getUniqueId() : QRPageComponents.components[index]['_id']
            if (typeof ComponentLists[component.component]['getPreviewHtml'] != "undefined" && parseInt(extractDataFromArray(component, ['card_enable'], 1))) {
                innerHtml += ComponentLists[component.component].getPreviewHtml(component)
            }
        })
        //Make sure to Remove JS inserted by user, we are letting other tags be there, even though they may break html
        innerHtml = cleanJSTags(innerHtml);
        let bg_img = extractDataFromArray(QRPageStyleComponents.style, ['bg_img'], '')
        if (bg_img.endsWith(".mp4")) {
            QRPageComponents.setContentToIFrame(`<div class="qrc_page_wrapper video_bg thinScrollBar" style="display:none;">
                                                    <video autoplay muted playsinline loop>
                                                        <source src="` + bg_img + `" type="video/mp4" data-wf-ignore="true">
                                                    </video>
                                                    <div class="qrc_page_inner">` + innerHtml + `</div>
                                                    ` + QRPageComponents.addExtraButtons() + `
                                                    
                                                </div>`)
        } else {
            if (QRPageComponents.useOldTemplateStyle()) {
                QRPageComponents.setContentToIFrame(`<div class="qrc_page_wrapper thinScrollBar"  style="display:none;">
                                            <div class="qrc_page_cover" style="background-image: url('` + bg_img + `');"></div>
                                            <div class="qrc_page_inner qrc_page_inner_2" style="background:` + extractDataFromArray(QRPageStyleComponents.style, ['primary_bg_color'], "#061244") + `">` + innerHtml + `</div>
                                            ` + QRPageComponents.addExtraButtons() + `
                                        </div>`)
            } else {
                QRPageComponents.setContentToIFrame(`<div class="qrc_page_wrapper thinScrollBar" style="background-image: url('` + bg_img + `');display:none;">
                                            <div class="qrc_page_inner">` + innerHtml + `</div>
                                            ` + QRPageComponents.addExtraButtons() + `
                                        </div>`)
            }
        }
    },
    useOldTemplateStyle: function() {
        __savedQrCodeParams = typeof __savedQrCodeParams == 'undefined' ? {} : __savedQrCodeParams;
        if (extractDataFromArray(__savedQrCodeParams, ['page'], page) == 'digital-business-card' && QRPageComponents.selected_template == 4) {
            return true;
        } else if (extractDataFromArray(__savedQrCodeParams, ['page'], page) == 'coupon-code' && QRPageComponents.selected_template == 1) {
            return true;
        } else if (extractDataFromArray(__savedQrCodeParams, ['page'], page) == 'pdf-gallery' && QRPageComponents.selected_template == 1) {
            return true;
        }
        return false;
    },
    setContentToIFrame: function(content) {



        let scroll = 0;
        let vcf_url = '___vcf___'
        let iframe = document.createElement("iframe")
        if (!QRPageComponents.preview) {
            if ($("#qr_page_prev iframe").length > 0) {
                try {
                    $($("#qr_page_prev iframe")[0].contentDocument.body).find(".qrc_page_wrapper").css("height", "739px")
                    scroll = $($("#qr_page_prev iframe")[0].contentDocument.body).find(".qrc_page_wrapper").scrollTop()
                } catch (e) {

                }

            }
            showLoaderOnBlock("#qr_page_prev")
            $("#qr_page_prev iframe").remove()
            iframe.className = 'landing_page_iframe'
            iframe.onload = function() {
                hideLoader("#qr_page_prev");
                if (document.querySelector('.landing_page_iframe').contentWindow.renderDownloadVcfElement != undefined) {
                    document.querySelector('.landing_page_iframe').contentWindow.renderDownloadVcfElement()
                }
            }
            document.querySelector("#qr_page_prev").append(iframe)
        } else {
            vcf_url = "/user/services/openapi?cmd=downloadVcf&id=" + location.pathname.split("/")[2]
        }


        // if (content.indexOf("/assets/css/landingpage.css") == -1) {
        //     content = content.cleanReplace('</head>', '<link rel="stylesheet" href="' + location.origin + '/home/abishek/company_repos/qrcodechimp/php/user/view/digital-business-card/style.css' + '" as="style" ></head>')
        // }
        // content = content.cleanReplace('</head>', '<script src="' + location.origin + '/assets/js/jquery-slim.min.js' + '" ></script></head>')
        // content = content.cleanReplace('</head>', '<script src="' + location.origin + '/assets/js/landingpage.js' + '" ></script></head>')

        // <link rel="stylesheet" href="/view/common/css/common.css" type="text/css">
        let card_config = extractDataFromArray(QRPageStyleComponents.style, ['card'], {});
        let card_style = '';
        if (extractDataFromArray(card_config, ['enable'], 1)) {
            card_style = `
                            :root {--qrc-card-bg:` + extractDataFromArray(card_config, ['bg_color'], "#fff") + `;}
                            :root {--qrc-border-radius:` + extractDataFromArray(card_config, ['border_radius'], "18") + `px;}
                            :root {--qrc-box-shadow:` + extractDataFromArray(card_config, ['x'], 0) + `px ` + extractDataFromArray(card_config, ['y'], 0) + `px ` + extractDataFromArray(card_config, ['blur'], 0) + `px ` + extractDataFromArray(card_config, ['spread'], 0) + `px ` + extractDataFromArray(card_config, ['shadow_color'], "#333") + `;}
                            .qr_cc_card{
                                background-color : var(--qrc-card-bg);
                                border-radius : var(--qrc-border-radius);
                                box-shadow : var(--qrc-box-shadow);
                            }
                        `
        }
        const page_settings = QRPageComponents.fetchPageSettings()
        const lock_code_settings = extractDataFromArray(page_settings, ['lock_code'], {});
        if (!empty(lock_code_settings)) {
            if (!empty(extractDataFromArray(lock_code_settings, ['lock_enable'], 1))) {
                let title = '',
                    desc = '',
                    lock_img = '';
                if (!empty(extractDataFromArray(lock_code_settings, ['title'], ''))) {
                    title = `<div class="qrc_lock_screen_title">` + extractDataFromArray(lock_code_settings, ['title'], '') + `</div> `
                }
                if (!empty(extractDataFromArray(lock_code_settings, ['desc'], ''))) {
                    desc = `<div class="qrc_lock_screen_des">` + extractDataFromArray(lock_code_settings, ['desc'], '') + `</div> `
                }
                if (!empty(extractDataFromArray(lock_code_settings, ['lock_img_enable'], 1))) {
                    lock_img = `<div class="qrc_lock_screen_img"><img src="` + extractDataFromArray(lock_code_settings, ['lock_img'], '') + `" width="160"/></div>`
                }
                content += `<div class="qrc_lock_screen" style="display:none;">
                                ` + lock_img + ` 
                                ` + title + ` 
                                ` + desc + `                
                            </div>`
            }
        }
        let js_include = `$(".qr_page_loader").show()
                            $(".qrc_page_wrapper").hide()
                            $(".qrc_addtocontact").on("click", function(e){
                                e.preventDefault()
                                if(window.self !== window.top)
                                {
                                    return;
                                }
                                location.href = "` + vcf_url + `";
                            })
                            $(document).on("click", "#btn_page_qr_code", function(e){
                                $(".qrc_addtohome_info").hide()
                                $('.qrc_addtohomescreen').show()
                                $("#qrc_page_qrcode_popup").addClass("show")
                            })
                            $(document).on("click", "#btn_share_page", function(e){
                                if (navigator.share && isMobile.any()) {
                                    navigator.share({
                                        title: document.title,
                                        url: "https://"+_short_url_domain+"/"+__savedQrCodeParams.short_url
                                    }).then(() => {
                                        // SwalPopup.showSingleButtonPopup({
                                        //     icon : "success",
                                        //     text : 'Thanks for sharing!',
                                        //     confirmButtonText: 'Close'
                                        // })
                                    }).catch(console.error);
                                } 
                            })
                            $(document).on("click", "#btn_page_qr_code_close", function(e){
                                $("#qrc_page_qrcode_popup").removeClass("show")
                                
                            })
                            $.post("/user/services/openapi", {cmd : 'logScan' , path : location.pathname, same_window : window.self !== window.top?1:0} , function(response){
                                let lock_tag = response.errorCode;
                                setTimeout(function() {
                                    if(!lock_tag){
                                        $(".qrc_page_wrapper").show()
                                    }else{
                                        $(".qrc_lock_screen").show()
                                    }
                                    $(".qr_page_loader").hide()
                                    if(window.self !== window.top)
                                    {
                                        setTimeout(function() {
                                            $(document.body).find(".qrc_page_wrapper").scrollTop(` + scroll + `)
                                            // document.body.children[2].scrollBy(0,` + scroll + `);
                                        }, 100)
                                    }
                                    
                                }, 1000)
                            })
                           `
        if (page == 'displayPage') {
            js_include += QRPageComponents.getAddToHomeScreenListenser()
        }
        if (typeof _favicon == "undefined") {
            _favicon = "___favicon___";
        }
        //just a fix in case we do not provide user_info somewhere else ::ToDo:: check if this is ok
        if (typeof user_info == "undefined") {
            user_info = {};
        }
        if (!empty(extractDataFromArray(QRPageStyleComponents, ['style', 'ld_img'], '')) || typeof _loader_img == "undefined") {
            _loader_img = extractDataFromArray(QRPageStyleComponents.style, ['ld_img'], extractDataFromArray(user_info, ['default_loader_img'], '/assets/images/def_qrc_loader.png'));
        }
        let g_tag_code = '';
        try {
            if (typeof _gtag_ids == "object" && !empty(_gtag_ids) && _gtag_ids.length > 0) {
                _gtag_ids.forEach(tag_id => {
                    g_tag_code += `  <script async src="https://www.googletagmanager.com/gtag/js?id=` + tag_id + `"></script>
                <script>
                window.dataLayer = window.dataLayer || [];
                
                function gtag() {
                    dataLayer.push(arguments);
                }
                gtag('js', new Date());
                
                gtag('config', "` + tag_id + `");
                </script>`;
                })
            }
        } catch (err) {
            console.log(err.message);
        }
        let custom_css = extractDataFromArray(QRPageStyleComponents, ['style', 'custom_css'], "");
        if (custom_css != "") {
            custom_css = "<style>" + custom_css + "</style>";
        }

        let style = `<style>
                        :root {--qrc-primary:` + extractDataFromArray(QRPageStyleComponents.style, ['primary_bg_color'], "#061244") + `;}
                        :root {--qrc-secondary: ` + extractDataFromArray(QRPageStyleComponents.style, ['secondary_bg_color'], "#ffeea0") + `;}
                        :root {--qrc-text-primary: ` + extractDataFromArray(QRPageStyleComponents.style, ['primary_text_color'], "#333333") + `;}
                        :root {--qrc-text-secondary: ` + extractDataFromArray(QRPageStyleComponents.style, ['secondary_text_color'], "#DDDDDD") + `;}
                        :root {--qrc-profile-primary: ` + extractDataFromArray(QRPageStyleComponents.style, ['primary_profile_text_color'], "#333333") + `;}
                        :root {--qrc-profile-secondary: ` + extractDataFromArray(QRPageStyleComponents.style, ['secondary_profile_text_color'], "#DDDDDD") + `;}
                        ` + card_style + `
                    </style>` + custom_css +
            QRPageStyleComponents.styleComponentWrappers.font_style.fonts[extractDataFromArray(QRPageStyleComponents.style, ['font'], "default")].src

        let scriptHtml = `<script type="text/javascript" src="/assets/js/jquery-slim.min.js?v=1632850791"></script>
                        ` + (QRDesignComponents.preview ? '' : '<script type="text/javascript" src="/assets/js/lightbox-plus-jquery.js?v=1632850791"></script>') + `
                        ` + (QRDesignComponents.preview ? '' : g_tag_code) + `
                        <script>      
                        ` + js_include + `
                        </script>`;

        let body = ` <body class="notranslate" style="overflow:hidden;font-family: ` + QRPageStyleComponents.styleComponentWrappers.font_style.fonts[extractDataFromArray(QRPageStyleComponents.style, ['font'], "default")].style + `;"> 
                        <div class="qr_page_loader">
                            <img class="loader_img" src="` + _loader_img + `" />
                        </div>
                        
                        ` + QRPageComponents.getPageQRCodePreviewHtml() + `
                        ` + content + `
                        
                    </body>`
        let head = `<link rel="manifest" href="/user/services/manifest?cmd=getAddToHomeScreenManifest&short_url=` + location.pathname.split("/page/")[1] + `">
                    <link rel="stylesheet" href="/assets/css/font.css" type="text/css">
                    <link rel="stylesheet" href="/assets/css/style.css?v=` + (new Date().getTime()) + `" as="style" >
                    <link rel="stylesheet" href="/view/digital-business-card/style.css?v=` + (new Date().getTime()) + `" as="style" >
                    <link rel="stylesheet" href="/assets/css/lightbox.css?v=` + (new Date().getTime()) + `" as="style" >
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`


        if (!QRPageComponents.preview) {
            content = `<html>
                <head>
                    <meta charset="utf-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    
                    <meta property="og:title" content="` + QRPageComponents.profile_name + `">
                    <title>` + QRPageComponents.profile_name + `</title>
                    <link rel="icon" href="` + _favicon + `" type="image/x-icon" />
                    <link rel="shortcut icon" href="` + _favicon + `" type="image/x-icon" />
                    <link rel="apple-touch-icon" href="` + _favicon + `" type="image/x-icon" />
                    ` + head + `
                    <!-- Custom CSS -->` + style + `
                    <style> .qrc_page_wrapper{height : 798px} </style>
                    </head>
                ` + body + scriptHtml + `  
            </html>`
            iframe.srcdoc = content
            hideLoader("#qr_page_prev")
        } else {
            // document.open();
            // document.write(content);
            // document.close();
            /*
                        //var script = document.createElement('script');
            //script.innerHTML = js_include;
            //document.getElementsByTagName('head')[0].appendChild(script);*/
            document.children[0].children[1].style.fontFamily = QRPageStyleComponents.styleComponentWrappers.font_style.fonts[extractDataFromArray(QRPageStyleComponents.style, ['font'], "default")].style
            document.getElementsByTagName('head')[0].innerHTML = document.getElementsByTagName('head')[0].innerHTML + style
            document.children[0].children[1].innerHTML = body
            $('head').append(scriptHtml);
        }

    },
    saveQRCode: function(callback = null) {
        QRPageComponents._save_callback = callback
        /**Check if action called from bulk upload page */
        if (getUrlParameterByName('bulk')) {
            if (QRFunctions.isQRSaved()) {
                BulkUploadComponent.saveBulkRecAndTransformExisting(page, true)
            } else {
                BulkUploadComponent.createBulkUpload(page, true)
            }
            return;
        }

        if (empty($('input[name=template_name]').val())) {
            if (!$("#folder-select").hasClass("select2-hidden-accessible")) {
                $("#folder-select").select2({
                    placeholder: "Select Folder",
                    templateResult: function(data, container) {
                        if (data.element) {
                            $(container).addClass($(data.element).attr("class"));
                        }
                        return data.text;
                    }
                });
            }
            $("#short_url_input_popup").val($("#short_url_input").val())
            if (empty($('input[name=id]').val()) || $('input[name=id]').val() == "new") {
                $(".short_url_slug_input").show()
            }

            $("#template_name_modal").modal("show")
            return
        }
        short_url_code = $("#short_url_input_popup").val();
        if (empty(short_url_code)) {
            short_url_code = $(".short_url_data").text()
            if (short_url_code.includes('/r/')) {
                short_url_code = short_url_code.split("/r/")[1]
            } else {
                short_url_code = (short_url_code.split("//")[1]).split('/')[1]
            }
        }
        $("input[name=short_url]").val(short_url_code)
        let short_url = "https://" + $(".short_url_slug_prepend")[0].innerText + short_url_code
        _qrOptions.QR_OPTS.content = short_url;
        refreshQRCode()
        let page_config = {
            content: QRPageComponents.components,
            style: QRPageStyleComponents.style,
            selected_template: QRPageComponents.selected_template,
            template_name: $('input[name=template_name]').val(),
            short_url: short_url_code,
            id: $('input[name=id]').val(),
            page: page,
            qr_type: 'D',
            style_selected: QRPageStyleComponents.style_selected
        }
        page_config['page_setting'] = QRPageComponents.fetchPageSettings()
        QRPageComponents.syncShortUrl(short_url)
        let pageHTML = '';

        /**commented because html is now generated on page load */
        // let iframeHtml = $("#qr_page_prev iframe")[0].contentWindow.document.children[0]
        // $(iframeHtml.children[1]).find("#lightboxOverlay").remove()
        // $(iframeHtml.children[1]).find("#lightbox").remove()
        // if ($("#qr_page_prev iframe")[0].contentWindow.document.children.length == 0) {
        //     pageHTML = $("#qr_page_prev iframe")[0].srcdoc
        // } else {
        //     pageHTML = $("#qr_page_prev iframe")[0].contentWindow.document.children[0].innerHTML
        // }
        saveQrCodeTemplate(page_config, pageHTML, callback)


    },
    fetchPageSettings: function() {
        if (page == 'digital-business-card') {
            return {
                email_on_scan: {
                    enable: $('input[name=email_on_scan_enable]').prop('checked') ? 1 : 0,
                    emails: $('[name=emails]').val()
                },
                page_qr_code: $('input[name=style_page_qr_code]').prop('checked') ? 1 : 0,
                page_sharing: $('input[name=style_page_sharing]').prop('checked') ? 1 : 0,
            };
        } else if (page == 'pet-id-tags') {
            return {
                email_on_scan: {
                    enable: $('input[name=email_on_scan_enable]').prop('checked') ? 1 : 0,
                    emails: $('[name=emails]').val()
                }
            };
        } else if (page == 'event-ticket') {
            let lock_img = $(".lock_code_input_wrapper .img_uploaded_card.selected_img").css("background-image")
            if (!empty(lock_img)) {
                lock_img = lock_img.split('"')[1]
            }
            return {
                lock_code: {
                    lock_enable: $('.lock_code_input_wrapper input[name=lock_enable]').prop('checked') ? 1 : 0,
                    scan_count: $('.lock_code_input_wrapper input[name=scan_count]').val(),
                    lock_by_owner: $('.lock_code_input_wrapper input[name=lock_by_owner]').prop('checked') ? 1 : 0,
                    title: $('.lock_code_input_wrapper input[name=title]').val(),
                    desc: $('.lock_code_input_wrapper input[name=desc]').val(),
                    lock_img_enable: $('.lock_code_input_wrapper input[name=enable_pr]').prop('checked') ? 1 : 0,
                    desc: $('.lock_code_input_wrapper input[name=desc]').val(),
                    lock_img
                }

            };
        }
        return {}
    },
    getVcardData: function() {
        let profile, contact, links = [],
            social_link = [];
        QRPageComponents.components.forEach(component => {
            if (component.component == 'profile') {
                profile = component;
            } else if (component.component == 'contact') {
                contact = component;
            } else if (component.component == 'web_links') {
                links = links.concat(component.links);
            } else if (component.component == 'social_link') {
                social_link = social_link.concat(component.links);
            }
        })

        let itemCount = 1;

        let full_name = extractDataFromArray(profile, ['name'], '')
        let first_name = full_name.split(" ")[0]
        let last_name = (full_name.split(" ").length > 1) ? full_name.split(" ")[1] : "";
        let name = (last_name != "" || first_name != "") ? `\r\nN:` + last_name + `;` + first_name : '';
        var fName = !empty(full_name) ? `\r\nFN:` + full_name : '';

        var org = (extractDataFromArray(profile, ['company'], '') != "") ? `\r\nORG:` + extractDataFromArray(profile, ['company'], '') : '';
        var title = (extractDataFromArray(profile, ['desc'], '') != "") ? `\r\nTITLE:` + extractDataFromArray(profile, ['desc'], '') : '';
        let img_type = '',
            pic_v = '';
        if (profile.pr_img.endsWith(".jpg") || profile.pr_img.endsWith(".jpeg")) {
            img_type = "JPEG";
        } else if (profile.pr_img.endsWith(".gif")) {
            img_type = "GIF";
        } else if (profile.pr_img.endsWith(".png")) {
            img_type = "PNG";
        }
        if (!empty(img_type)) {
            pic_v = "\r\nPHOTO;ENCODING=b;TYPE=" + img_type + ":" + QRPageComponents.pr_64;
        }
        let address = '';
        // var address = `\r\nADR:;;`;
        // address += ($("input[name=street]").val() != "") ? $("input[name=street]").val() + ';' : ';';
        // address += ($("input[name=city]").val() != "") ? $("input[name=city]").val() + ';' : ';';
        // address += ($("input[name=state]").val() != "") ? $("input[name=state]").val() + ';' : ';';
        // address += ($("input[name=zipcode]").val() != "") ? $("input[name=zipcode]").val() + ';' : ';';
        // address += ($("input[name=country]").val() != "") ? $("input[name=country]").val() : '';
        // if (address == `\r\nADR:;;;;;;`) address = '';

        let tel = "",
            email = "",
            url = '';
        contact.contact_infos.forEach(contact_info => {
            if (contact_info.type == 'number') {
                tel += `\r\nitem` + itemCount + `.TEL;type=` + contact_info.title + `:` + contact_info.number
                tel += `\r\nitem` + itemCount + `.X-ABLabel:` + contact_info.title
            } else if (contact_info.type == 'email') {
                email += `\r\nitem` + itemCount + `.EMAIL;` + contact_info.title + `:` + contact_info.email
                email += `\r\nitem` + itemCount + `.X-ABLabel:` + contact_info.title
            } else if (contact_info.type == 'address') {
                let temp = '\r\nitem' + itemCount + '.ADR:;'
                //need to reverse in .vcf file (address line2 should be before address line1)
                temp += extractDataFromArray(contact_info, ['building'], '') + ";";
                temp += extractDataFromArray(contact_info, ['street'], '') + ";";
                temp += extractDataFromArray(contact_info, ['city'], '') + ";";
                temp += extractDataFromArray(contact_info, ['state'], '') + ";";
                temp += extractDataFromArray(contact_info, ['zip'], '') + ";";
                temp += extractDataFromArray(contact_info, ['country'], '') + ";";

                if (temp != `\r\nitem` + itemCount + `.ADR:;;;;;;`) {
                    temp += `\r\nitem` + itemCount + `.X-ABLabel:` + contact_info.title
                    address += temp;

                }
            }
            itemCount += 1
        })
        links.forEach(link => {
            url += `\r\nitem` + itemCount + `.URL:` + link.url
            url += `\r\nitem` + itemCount + `.X-ABLabel:` + link.title
            itemCount += 1
        })

        social_link.forEach(link => {
            if (link.type == 'email') {
                email += `\r\nitem` + itemCount + `.EMAIL;` + link.title + `:` + link.url
                email += `\r\nitem` + itemCount + `.X-ABLabel:` + link.title
            } else {
                url += `\r\nitem` + itemCount + `.URL;type=` + link.type + `:` + link.url
                url += `\r\nitem` + itemCount + `.X-ABLabel:` + link.title
            }
            itemCount += 1
        })

        var text = `BEGIN:VCARD
VERSION:3.0` + name + fName + org + title + address + tel + email + pic_v + url + `
END:VCARD`;
        //console.log(text);
        return text;
    },
    getPrBase64: async function(src) {
        var img = new Image();
        // img.crossOrigin = 'Anonymous';
        let ext = 'png';
        if (src.endsWith('jpg')) {
            ext = 'jpg'
        } else if (src.endsWith('jpeg')) {
            ext = 'jpeg'
        }
        if (src.includes("cdn03.qrcodechimp.com")) {
            src = src.cleanReplace("cdn03.qrcodechimp.com", "qrcodechimp.s3.us-east-1.amazonaws.com")
        }
        img.onload = function() {
            var canvas = document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            var dataURL;
            canvas.height = this.naturalHeight;
            canvas.width = this.naturalWidth;
            ctx.drawImage(this, 0, 0);
            dataURL = canvas.toDataURL("image/" + ext);
            QRPageComponents.pr_64 = dataURL.cleanReplace(/^data:image\/(png|jpg|jpeg);base64,/, "");
        };
        img.setAttribute('crossorigin', 'anonymous')
        img.src = src;
        // var xhr = new XMLHttpRequest();
        // xhr.onload = function () {
        //     var reader = new FileReader();
        //     reader.onloadend = function () {
        //         QRPageComponents.pr_64 = this.result
        //         // callback(reader.result);
        //     }
        //     reader.readAsDataURL(xhr.response);
        // };
        // xhr.open('GET', src);
        // xhr.responseType = 'blob';
        // xhr.send();
    },
    downloadBulkSampleFile: function() {
        function fitToColumn(arrayOfArray) {
            // get maximum character of each column
            return arrayOfArray[0].map((a, i) => ({
                wch: Math.max(...arrayOfArray.map(a2 => a2[i] ? a2[i].toString().length : 0))
            }));
        }
        let wb = XLSX.utils.book_new();
        let ws_data = QRPageComponents.prepareColumn();
        let ws = XLSX.utils.aoa_to_sheet(ws_data);
        ws['!cols'] = fitToColumn(ws_data);
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet 1');
        XLSX.writeFile(wb, 'sample-' + page + '.xlsx');
    },
    prepareColumn: function() {
        let sheet_columns = ['QR Name', 'Page-code']
        let sheet_samples = ['QR Name', 'Page-code']
        QRPageComponents.components.forEach((component, index) => {
            if (!empty(extractDataFromArray(component, ['card_enable'], 1))) {
                let getColumnNames = extractDataFromArray(ComponentLists, [component.component, 'getColumnNames'], null)
                if (!empty(getColumnNames)) {
                    ComponentLists[component.component].getColumnNames(index, sheet_columns, sheet_samples, component)
                }
            }
        })
        return [sheet_columns, sheet_samples]
    },
    addExtraButtons: function() {
        return `<div class="extra_button_wrapper">` + QRPageComponents.getPageQRCodeButton() + QRPageComponents.getShareButton() + `</div>`
    },
    getPageQRCodeButton: function() {
        if (!(extractDataFromArray(__savedQrCodeParams, ['page'], '') == 'digital-business-card' && parseInt(extractDataFromArray(QRPageComponents.page_setting, ['page_qr_code'], 1)))) {
            return '';
        }
        return `<button class="btn " id="btn_page_qr_code"><i class="icon-qrcode"></i></button>`
    },
    getShareButton: function() {
        if (!(extractDataFromArray(__savedQrCodeParams, ['page'], '') == 'digital-business-card' && parseInt(extractDataFromArray(QRPageComponents.page_setting, ['page_sharing'], 1)))) {
            return '';
        }
        return `<button class="btn " id="btn_share_page" ><i class="icon-file_upload_1"></i></button>`
    },
    getPageQRCodePreviewHtml: function() {
        if (!(extractDataFromArray(__savedQrCodeParams, ['page'], '') == 'digital-business-card' && parseInt(extractDataFromArray(QRPageComponents.page_setting, ['page_qr_code'], 1)))) {
            return '';
        }
        let profile_section = '';
        QRPageComponents.components.forEach(component => {
            if (component.component == 'profile' && parseInt(extractDataFromArray(component, ['card_enable'], 1))) {
                let pr_img = '';
                if (parseInt(extractDataFromArray(component, ['enable_pr'], 1))) {
                    pr_img = `<div class="qrc_profile_pic_popup" style="background-image: url('` + extractDataFromArray(component, ['pr_img'], 0) + `')"></div>`
                }
                profile_section = `<div class="qrc_profile_inner_info_popup">
                                        ` + pr_img + `
                                        <h2>` + extractDataFromArray(component, ['name'], '') + `</h2>
                                        <p>` + extractDataFromArray(component, ['desc'], '') + `</p>
                                        <p class="qrc_profile_company">` + extractDataFromArray(component, ['company'], '') + `</p>
                                    </div>`
            }
        })

        let qr_img_path = '';
        if (typeof _qr_img_path == 'undefined' && page != 'displayPage') {
            qr_img_path = $("#qrcode_preview").attr("src")
        } else {
            qr_img_path = _qr_img_path
        }
        return `<div id="qrc_page_qrcode_popup" >
                    <div class="">
                        <button class="btn " id="btn_page_qr_code_close">
                            <i class="icon-cross"></i>
                        </button>
                    </div>
                    ` + profile_section + `
                    <div class="qrc_profile_qrcode_popup">
                        <img src="` + qr_img_path + `?v=` + (new Date().getTime()) + `" class="img-fluid">
                    </div>

                    <a href="#" class="qrc_addtohomescreen ` + ((isMobile.any() && !(isSafariBrowser())) ? "d-none" : "") + `"  >
                        <div class="qrc_addtohomescreen_text">Add to Home Screen </div>
                        <div class="">
                            <span class="icon-add_1"></span>
                        </div>                
                    </a>
                    <div class="qrc_addtohome_info" style="display:none;">
                        <img src="/assets/images/add_to_homescreen_1.png" class="img-fluid">
                        <img src="/assets/images/add_to_homescreen_2.png" class="img-fluid">
                    </div>
                </div>`;
    },
    getAddToHomeScreenListenser: function() {
        if (!(extractDataFromArray(__savedQrCodeParams, ['page'], '') == 'digital-business-card' && extractDataFromArray(QRPageComponents.page_setting, ['page_qr_code'], 1))) {
            return '';
        }
        return ` if ('serviceWorker' in navigator) {
            navigator.serviceWorker
              .register('/service-worker.js')
              .then(() => { console.log('Service Worker Registered'); });
          }
          console.log("loading")
          // Code to handle install prompt on desktop
          
          let deferredPrompt;
          const addBtn = document.querySelector('.qrc_addtohomescreen');
          
          if(isMobile.iOS()){
            if(isSafariBrowser()){
                addBtn.addEventListener('click', () => {
                    $(".qrc_addtohome_info").show()
                    $('.qrc_addtohomescreen').hide()
                })
            }else{
                setTimeout(()=>{
                    $(".qrc_addtohome_info").hide()
                    $('.qrc_addtohomescreen').hide()
                },1000)
            }
          }else{
          window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later.
            deferredPrompt = e;
            // Update UI to notify the user they can add to home screen
          
            
          });
          if(addBtn){
          addBtn.addEventListener('click', () => {
          // hide our user interface that shows our A2HS button
        //   addBtn.style.display = 'none';
          // Show the prompt
            if(deferredPrompt == null){
                alert("Successfully added, thank you!")
                return;
            }
            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
                } else {
                console.log('User dismissed the A2HS prompt');
                }
                deferredPrompt = null;
            });
            });
        }
        }`
    },
    setQRImgForFirstTime: function(img) {
        if (QRPageComponents._set_image == 0 && page == 'digital-business-card') {
            try {
                QRPageComponents._set_image = 1;
                $($("#qr_page_prev iframe")[0].contentDocument.body.children[1]).find(".qrc_profile_qrcode_popup img").attr("src", '')
                $($("#qr_page_prev iframe")[0].contentDocument.body.children[1]).find(".qrc_profile_qrcode_popup img").attr("src", img)
            } catch {

            }
        }
    },
    getUniqueId: function() {
        let date = new Date();
        return random_str() + date.getTime()
    }
}

function QRPageComponents_GetPageTypeTemplates(pageType) {
    var selectedPageArr = [];
    if (pageType == 'pet-id-tags') {
        selectedPageArr = PetIdTagTemplates;
    } else if (pageType == 'event-ticket') {
        selectedPageArr = EventTicketTemplates;
    } else if (pageType == 'coupon-code') {
        selectedPageArr = CouponCodeTemplates;
    } else if (pageType == 'pdf-gallery') {
        selectedPageArr = PDFGalleryTemplates;
    } else {
        selectedPageArr = DigitalBusinessPageTemplates;
    }

    return selectedPageArr;
}

const QRPageComponentWrapper = {
    contactOptions: {
        mobile: {
            label: 'Mobile',
            icon: 'icon-smartphone_1',
            placeholder: 'Mobile number'
        },
        email: {
            label: 'Email',
            icon: 'icon-email_1',
            placeholder: 'Email'
        },
        sms: {
            label: 'SMS',
            icon: 'icon-textsms_1',
            placeholder: 'Mobile number'
        },
        location: {
            label: 'Location',
            icon: 'icon-pin',
            placeholder: 'Google location URL'
        },
        whatsapp: {
            label: 'Whatsapp',
            icon: 'icon-whatsapp_1',
            placeholder: 'Whatsapp URL'
        },
        fax: {
            label: 'Fax',
            icon: 'icon-contact_1',
            placeholder: 'Fax number'
        },
        tel: {
            label: 'Telephone',
            icon: 'icon-telephone_1',
            placeholder: 'Telephone number'
        }
    },
    emitListeners: function(index, component) {
        let component_listener = extractDataFromArray(ComponentLists, [component.component, 'listeners'], null)
        if (!empty(component_listener)) {
            component_listener(index)
        }
    },
    getSwitcheryButton: function(name, on = 0) {
        return `<div class="switchery d-inline">
                    <label class="switch mb-0">
                        <input type="checkbox" ` + (parseInt(on) ? 'checked' : '') + `  name="` + name + `">
                        <span class="slider round"></span>
                    </label>
                </div>`
    },
    getImageUploader: function(title = 'Images', selectedImages = [], size = "", thumbnail_size = '', switchButton = false, switchState = 0, col = 12, field_name = '', size_position = "top") {
        let imageHtml = '';
        selectedImages.forEach(image => {
            imageHtml += `<div class="img_uploaded_card selected_img mr-3 ` + field_name + `" style="background-image:url('` + image + `')"></div>`
        })
        return `
            <div class="col-md-` + col + ` px-3 mb-3">
                <div class="mb-2">` + title + ` ` + (!empty(size) && size_position == 'top' ? '<span class="text-muted font-12">' + size + '</span>' : '') + (switchButton ? QRPageComponentWrapper.getSwitcheryButton('enable_' + field_name.replace("_img", ''), switchState) : '') + `</div>
                <div class="d-flex img_upload_card_wrapper">
                    ` + imageHtml + `
                    <div class="img_uploaded_card upload_img mr-3 d-flex justify-content-center align-items-center flex-column">
                        <i class="font-24 icon-file_upload_1 my-2"></i>
                        ` + (!empty(thumbnail_size) ? '<span class="text-muted font-12">' + thumbnail_size + '</span>' : '') + `
                    </div>
                    <input class="d-none" type="file" name="pg_upload_image" accept="image/*">
                </div>
                ` + (!empty(size) && size_position == 'bottom' ? '<div class=""><span class="text-muted font-12">' + size + '</span></div>' : '') + `
            </div>
        `;
    },
    getImagesUploader: function(title = 'Images', selectedImages = [], index) {
        let imageHtml = '';
        selectedImages.forEach(image => {
            imageHtml += `<div class="img_uploaded_card multiple_img mr-3 handle-img mb-2" style="background-image:url('` + image + `')">
                    <div class="img_action">
                        <a href="#" class="btn text-white"><i class="icon-delete_1 font-14"></i></a>
                    </div>
                </div>`
        })
        return `
            <div class="col-md-12 px-3 mb-3">
                <div class="mb-3">` + title + ` <span class="text-muted font-12">(600x600px, 1:1, 4:5 Ratio)</span></div>
                <div class="img_upload_card_wrapper">
                    <div class="images_grid_wrapper" id="images_grid_` + index + `">
                    ` + imageHtml + `
                    </div>
                    <div class="img_uploaded_card upload_imgs mr-3 d-flex justify-content-center align-items-center">
                        <i class="font-24 icon-file_upload_1"></i>
                    </div>
                    <input class="d-none" type="file" name="pg_upload_images" accept="image/*">
                </div>
            </div>
        `;
    },
    getInputText: function(label = '', name = '', value = '', col = 12, switch_name = '', switch_on = false, placeholder = '', type = 'text') {
        let switchHtml = '';
        if (!empty(switch_name)) {
            switchHtml = QRPageComponentWrapper.getSwitcheryButton(switch_name, switch_on)
        }
        return `
            <div class="col-md-` + col + `  px-3">
                <div class="mb-2 d-flex"><span class="mr-2">` + label + '</span>' + switchHtml + ` </div>
                <div class="d-flex">
                    <input class="form-control" autocomplete="off" name="` + name + `" value="` + unescapeHTML(value) + `" type="` + type + `" placeholder="` + placeholder + `">
                </div>
            </div>
        `;
    },
    getTextAreaInput: function(label = '', name = '', value = '') {
        return `
            <div class="col-md-12  px-3">
                <div class="mb-2">` + label + `</div>
                <div class="d-flex">
                    <textarea class="form-control" name="` + name + `" rows="4">` + unescapeHTML(value) + `</textarea>
                </div>
            </div>
        `;
    },
    getTitleDescSection: function(title = '', desc = '', on = false) {
        return `<div class="col-md-12 title_desc_wrapper">
                    <div class="row mx-0">
                        <div class="mr-2 mb-2" > Title, Description </div>` + QRPageComponentWrapper.getSwitcheryButton('header_enable', on) + `
                    </div>
                    <div class="row mx-0 title_desc_wrapper_input gray_card mb-4 " style="` + (on ? '' : 'display:none;') + `">
                        ` + QRPageComponentWrapper.getInputText('Title', 'title', title) + `
                        ` + QRPageComponentWrapper.getTextAreaInput('Description', 'desc', desc) + `
                    </div> 
                </div> `

    },
    getWrapperHtml: function(index, component, hide = false) {
        let component_config = extractDataFromArray(ComponentLists, [component.component], [])
        let fixed_components = ['profile', 'contact', 'coupon_code']
        let no_bg_components = ['profile', 'event_profile']
        let skip_component = ['password'];
        if (empty(component_config) || skip_component.indexOf(component.component) > 0) {
            return '';
        }
        return `  <div class="card collapse_card mb-3 qr_page_component_card list-group-item"  data-type="` + component.component + `">
                        <div class="card-header d-flex justify-content-between" aria-expanded="true">
                            <h5 class="mb-0 d-flex align-item-center w-100">
                                <a class="btn handle display_on_hover py-2 pr-0 text-muted"><i class="icon-drag_1"></i></a>
                                <a class="btn btn-link qr_page_component_card_title w-100 text-left">
                                    ` + extractDataFromArray(component_config, ['title'], 'Info') + `
                                </a>
                            </h5>
                            <div class="qr_page_component_card_actions">
                                ` + (fixed_components.indexOf(component.component) < 0 ? `<a class="btn btn_delete_component_card display_on_hover"><i class="text-danger icon-delete_1"></i></a>` : '') + `
                                <a class="btn handle display_on_hover d-none"><i class="icon-drag_1"></i></a>
                                <div class="d-inline mr-2">` + QRPageComponentWrapper.getSwitcheryButton('card_enable', extractDataFromArray(component, ['card_enable'], 1)) + `</div>
                                <a class="btn toggle_card_visiblitiy mr-0"><i class="icon-` + (hide ? 'add_1' : 'remove_1') + `"></i></a>
                            </div>
                        </div>
                        <div class="qr_page_component_card_body ` + (hide ? '' : 'show') + ` secondary_color">
                            <div class="card-body">
                                <div class="row">
                                 ` + component_config.getInputWrapperHtml(component, index) + `
                                </div>
                            </div>` + (no_bg_components.indexOf(component.component) == -1 ? `
                            <div class="card-footer d-flex">
                                ` + QRPageComponentWrapper.getSwitcheryButton("card_bg_enable", extractDataFromArray(component, ['card_background'], 1)) + ` <div class="ml-2">Card Background</div>
                            </div>` : '') + `
                        </div>
                        
                    </div>
        `;
    },
    getTitleDescSectionData: function(parent) {
        return {
            title: $(parent).find('.title_desc_wrapper_input input[name=title]').val(),
            desc: $(parent).find('.title_desc_wrapper_input [name=desc]').val(),
            header_enable: $(parent).find("input[name=header_enable]").prop("checked") ? 1 : 0
        }
    },
    components: {

    }
}

const QRPageStyleComponents = {
    style: {},
    saved_styles: [],
    _container: '#page-tab-style-design-content',
    style_selected: -1,
    styleComponentWrappers: {
        color: {
            title: 'Colors',
            getInputHtml: function() {
                const bg_colors = [
                    ["#517AFA", "#C5FEFF", "#061244", "#76839B"],
                    ["#374793", "#C5FEFF", "#061244", "#76839B"],
                    ["#D51A47", "#FFB1DB", "#061244", "#76839B"],
                    ["#FF8F03", "#FFD5A1", "#432806", "#805F37"],
                    ["#805F37", "#CCFFAC", "#1C380A", "#485540"],
                    ["#469EA6", "#BAF9FF", "#0A2F33", "#647374"],
                    ["#194F92", "#C1DDFF", "#061244", "#76839B"],
                    ["#6474E5", "#CED4FF", "#061244", "#76839B"],
                    ["#F53163", "#FFEDE8", "#061244", "#76839B"],
                    ["#683B2B", "#FFE9A7", "#271109", "#676361"],
                    ["#F9D326", "#FFEEA2", "#3B3106", "#5C5A53"],
                    ["#57F1B1", "#DEFFC9", "#0C1D16", "#707B76"],
                    ["#A8BE72", "#F1FFD0", "#262F0E", "#6D6F69"],
                    ["#223CCF", "#C7D0FF", "#0A2F33", "#647374"],
                    ["#E61313", "#FFC9C9", "#2F0F0F", "#696262"],
                    ["#210972", "#D4C7FF", "#061244", "#76839B"],
                    ["#000000", "#C3C3C3", "#2F2F2F", "#747474"],
                    ["#41B853", "#C4FFCD", "#09270E", "#777E78"],
                    ["#D89D1A", "#FFEABC", "#261D0B", "#76726C"],
                    ["#E1EA35", "#FBFFB1", "#242604", "#72726D"],
                ]
                const text_colors = [
                    ["#333333", "#dddddd"],
                    ["#374793", "#C5FEFF"],
                    ["#D51A47", "#FFB1DB"],
                    ["#FF8F03", "#FFD5A1"],
                ]
                let bgColorsHtml = '';
                bg_colors.forEach(color => {
                    let active = '';
                    if (color[0] == extractDataFromArray(QRPageStyleComponents, ['style', 'primary_bg_color'], bg_colors[0][0]) && color[1] == extractDataFromArray(QRPageStyleComponents, ['style', 'secondary_bg_color'], bg_colors[0][1])) {
                        active = 'active';
                    }
                    bgColorsHtml += `<li class="` + active + `">
                                        <div class="qr_color_panel_wr" data-bg_1="` + color[0] + `"  data-bg_2="` + color[1] + `" data-text_1="` + color[2] + `"  data-text_2="` + color[3] + `">
                                            <div class="qr_color_panel_1" style="background: ` + color[0] + `">
                                            </div>
                                            <div class="qr_color_panel_2" style="background: ` + color[1] + `">
                                            </div>
                                        </div>
                                    </li>`
                })

                let textColorsHtml = '';
                // text_colors.forEach(color => {
                //     let active = '';
                //     if (color[0] == extractDataFromArray(QRPageStyleComponents, ['style', 'primary_text_color'], text_colors[0][0]) && color[1] == extractDataFromArray(QRPageStyleComponents, ['style', 'secondary_text_color'], text_colors[0][1])) {
                //         active = 'active';
                //     }
                //     textColorsHtml += `<li class="` + active + `">
                //                         <div class="qr_color_panel_wr">
                //                             <div class="qr_color_panel_1" style="background: `+ color[0] + `">
                //                             </div>
                //                             <div class="qr_color_panel_2" style="background: `+ color[1] + `">
                //                             </div>
                //                         </div>
                //                     </li>`
                // })
                return `<div class="col-md-12 d-none"><h6>Background Color</h6></div>
                        <div class="col-md-12">
                            <ul class="borderbox qr_color_panel_bg" data-type="bg">
                                ` + bgColorsHtml + `
                            </ul>
                        </div>
                       ` + QRPageStyleComponents.getColorPickerHtml('Primary Color', 'colorpicker-bg-primary', extractDataFromArray(QRPageStyleComponents.style, ['primary_bg_color'], bg_colors[0][0])) + `
                      ` + QRPageStyleComponents.getColorPickerHtml('Secondary Color', 'colorpicker-bg-secondary', extractDataFromArray(QRPageStyleComponents.style, ['secondary_bg_color'], bg_colors[0][1])) +
                    `<div class="col-md-12 mt-3 d-none"><h6>Text Color</h6></div>
                      <div class="col-md-12 d-none">
                      <ul class="borderbox qr_color_panel_text"  data-type="text">
                          ` + textColorsHtml + `
                      </ul>
                  </div>
                 ` + QRPageStyleComponents.getColorPickerHtml('Primary Profile Text Color', 'colorpicker-profile-primary', extractDataFromArray(QRPageStyleComponents.style, ['primary_profile_text_color'], bg_colors[0][2])) + `
                ` + QRPageStyleComponents.getColorPickerHtml('Secondary Profile Text Color', 'colorpicker-profile-secondary', extractDataFromArray(QRPageStyleComponents.style, ['secondary_profile_text_color'], bg_colors[0][3])) + `
                 ` + QRPageStyleComponents.getColorPickerHtml('Primary Text Color', 'colorpicker-text-primary', extractDataFromArray(QRPageStyleComponents.style, ['primary_text_color'], bg_colors[0][2])) + `
                ` + QRPageStyleComponents.getColorPickerHtml('Secondary Text Color', 'colorpicker-text-secondary', extractDataFromArray(QRPageStyleComponents.style, ['secondary_text_color'], bg_colors[0][3]))
            }

        },
        bg_img: {
            title: 'Background Image',
            preset: [
                '/images/digitalCard/bg_page_1.jpg',
                '/images/digitalCard/student_background.jpg',
                '/images/digitalCard/youtuber_background.jpg',
                '/images/digitalCard/bg/event_ticket_background_1.jpg',
                '/images/digitalCard/bg/pet_tag_bg_1.jpg',
                '/images/digitalCard/bg/pet_tag_bg_2.jpg',
                '/images/digitalCard/bg/coupon_background_1.jpg',
                '/images/digitalCard/bg/coupon_background_2.jpg',
                '/images/digitalCard/bg/background_1.jpg',
                // '/images/digitalCard/bg_video/video_2.mp4',
                '/images/digitalCard/bg/background_2.jpg',
                '/images/digitalCard/bg_video/video_5.mp4',
                '/images/digitalCard/bg/background_3.jpg',
                '/images/digitalCard/bg/background_4.jpg',
                '/images/digitalCard/bg/background_5.jpg',
                '/assets/images/fb_cover.svg',
                '/images/digitalCard/bg_video/video_3.mp4',
                '/images/digitalCard/bg/background_6.jpg',
                '/images/digitalCard/bg/background_7.jpg',
                '/images/digitalCard/bg_video/video_7.mp4',
                '/images/digitalCard/bg/background_8.jpg',
                '/images/digitalCard/bg/background_9.jpg',
                '/images/digitalCard/bg_video/video_6.mp4',
                '/images/digitalCard/bg/background_10.jpg',
                '/images/digitalCard/bg/background_11.jpg',
                '/images/digitalCard/bg/background_12.jpg',
                '/images/digitalCard/bg/background_13.jpg',
                '/images/digitalCard/bg/background_14.jpg',
                '/images/digitalCard/bg/background_15.jpg',
                '/images/digitalCard/bg/background_16.jpg',
                '/images/digitalCard/bg/background_17.jpg',
                '/images/digitalCard/bg/background_18.jpg',
                '/images/digitalCard/bg/background_19.jpg',
                '/images/digitalCard/bg/background_20.jpg',
                '/images/digitalCard/bg/bg_image_5.jpg',
                '/images/digitalCard/bg/bg_image_4.jpg',
                // '/images/digitalCard/bg_video/video.mp4',
                // '/images/digitalCard/bg_video/video_1.mp4',
                // '/images/digitalCard/bg_video/video_4.mp4',
                '/images/digitalCard/bg_video/video_8.mp4',
                // '/images/digitalCard/bg_video/video_9.mp4',
                '/images/digitalCard/bg_video/video_10.mp4',
                // '/images/digitalCard/bg_video/video_11.mp4',
            ],
            getInputHtml: function() {
                let imageHtml = ``;
                let selectedImg = extractDataFromArray(QRPageStyleComponents.style, ['bg_img'], "");
                if (selectedImg.includes('cdn03.qrcodechimp.com')) {
                    imageHtml += `<div class="img_uploaded_card selected user_upload_img mr-3" style="background-image:url('` + selectedImg + `'); position:relative;"></div>`
                }

                QRPageStyleComponents.styleComponentWrappers.bg_img.preset.forEach(image => {
                    let selected = "";
                    if (selectedImg.includes(image)) {
                        selected = "selected"
                    }
                    if (image.endsWith(".mp4")) {
                        imageHtml += `<div class="img_uploaded_card ` + selected + ` mr-3" style="background-image:url('` + image.cleanReplace(".mp4", ".jpg") + `'); position:relative;" data-video="` +
                            image + `">
                                        <div class="video_icon">
                                            <i class="icon-play3"></i>
                                        </div>
                                    </div>`
                    } else {
                        imageHtml += `<div class="img_uploaded_card ` + selected + ` mr-3" style="background-image:url('` + image + `'); position:relative;"></div>`
                    }
                })
                // let userUploadHtml = '';


                return `<div class="col-md-12 px-3 mb-3">
                            <div class="mb-2">Image / Video</div>
                            <div class="d-flex img_upload_card_wrapper bg_img_upload_card_wrapper flex-wrap thinScrollBar pt-2">
                                <div class="img_uploaded_card remove_img mr-3" style="background-image:url('/assets/images/close.svg');"></div>
                                <div class="img_uploaded_card upload_bg_img mr-3 d-flex justify-content-center align-items-center">
                                    <i class="font-24 icon-file_upload_1"></i>
                                </div>
                                ` + imageHtml + `
                                <input class="d-none" type="file" name="pg_upload_bg_image" accept="image/*">
                            </div>
                        </div>
                    `;
            }
        },
        ld_img: {
            title: 'Page Loader',
            getInputHtml: function() {
                return '<div class="pg_loader_wrp">' + QRPageComponentWrapper.getImageUploader("Loader", [extractDataFromArray(QRPageStyleComponents.style, ['ld_img'], extractDataFromArray(user_info, ['default_loader_img'], '/assets/images/def_qrc_loader.png'))], '', '1:1 Ratio') + '</div>'
            }
        },
        page_setting: {
            title: 'Page Settings',
            getInputHtml: function() {
                let share_qr_input_html = '';
                if (page == 'digital-business-card') {
                    share_qr_input_html += `<div class="col-md-12 mt-3 mb-2 d-flex">
                    <div class="mr-2 mb-2">Page QR Code </div>` + QRPageComponentWrapper.getSwitcheryButton("style_page_qr_code", extractDataFromArray(QRPageComponents.page_setting, ['page_qr_code'], 1)) + `
                    <div class="ml-4 mr-2 mb-2">Page Sharing Option </div>` + QRPageComponentWrapper.getSwitcheryButton("style_page_sharing", extractDataFromArray(QRPageComponents.page_setting, ['page_sharing'], 1)) + `
                </div>`
                }
                return QRPageComponentWrapper.getInputText("Email me on scan", "emails", extractDataFromArray(QRPageComponents.page_setting, ['email_on_scan', 'emails'], ''), 12, 'email_on_scan_enable', extractDataFromArray(QRPageComponents.page_setting, ['email_on_scan', 'enable'], 1), 'Comma-separed emails.') +
                    share_qr_input_html
                // + QRPageComponentWrapper.getInputText("SMS me on scan", "subtitle", '', 12, 'sms_on_scan_enable', '')
            }
        },
        font_style: {
            title: 'Font Style',
            fonts: {
                default: {
                    title: 'Default',
                    img: 'close.svg',
                    src: ``,
                    style: "'SF Pro Text','SF Pro Icons', 'Helvetica Neue','Helvetica','Arial',sans-serif"
                },
                work_sans: {
                    title: 'Work Sans',
                    img: 'fonts/work_sans.png',
                    src: `<link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@400;500;700&display=swap" rel="stylesheet">`,
                    style: "'Work Sans', sans-serif"
                },
                open_sans: {
                    title: 'Open Sans',
                    img: 'fonts/opensans.png',
                    src: `<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;700&display=swap" rel="stylesheet">`,
                    style: "'Open Sans', sans-serif"
                },
                roboto: {
                    title: 'Roboto',
                    img: 'fonts/roboto.png',
                    src: `<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">`,
                    style: "'Roboto', sans-serif"
                },
                playfair_display: {
                    title: 'Playfair Display',
                    img: 'fonts/playfair_display.png',
                    src: `<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;700&display=swap" rel="stylesheet">`,
                    style: "'Playfair Display', serif"
                },
                josefin_sans: {
                    title: 'Josefin Sans',
                    img: 'fonts/josefin_sans.png',
                    src: `<link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;500;700&display=swap" rel="stylesheet">`,
                    style: "'Josefin Sans', sans-serif"
                },
                slabo: {
                    title: 'Slabo',
                    img: 'fonts/slabo.png',
                    src: `<link href="https://fonts.googleapis.com/css2?family=Slabo+27px&display=swap" rel="stylesheet">`,
                    style: " 'Slabo 27px', serif"
                },
                concert_one: {
                    title: 'Concert One',
                    img: 'fonts/concert_one.png',
                    src: `<link href="https://fonts.googleapis.com/css2?family=Concert+One&display=swap" rel="stylesheet">`,
                    style: "'Concert One', cursive"
                },
                krona_one: {
                    title: 'Krona One',
                    img: 'fonts/krona_one.png',
                    src: `<link href="https://fonts.googleapis.com/css2?family=Krona+One&display=swap" rel="stylesheet">`,
                    style: "'Krona One', sans-serif"
                },
                syne: {
                    title: 'Syne',
                    img: 'fonts/syne.png',
                    src: `<link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700&display=swap" rel="stylesheet">`,
                    style: "'Syne', sans-serif"
                },
                federo: {
                    title: 'Federo',
                    img: 'fonts/federo.png',
                    src: `<link href="https://fonts.googleapis.com/css2?family=Federo&display=swap" rel="stylesheet">`,
                    style: "'Federo', sans-serif"
                },
                viaoda_libre: {
                    title: 'Viaoda Libre',
                    img: 'fonts/viaoda_libre.png',
                    src: `<link href="https://fonts.googleapis.com/css2?family=Viaoda+Libre&display=swap" rel="stylesheet">`,
                    style: "'Viaoda Libre', cursive"
                },
                handlee: {
                    title: 'Handlee',
                    img: 'fonts/handlee.png',
                    src: `<link href="https://fonts.googleapis.com/css2?family=Handlee&display=swap" rel="stylesheet">`,
                    style: "'Handlee', cursive"
                },
                courier: {
                    title: 'Courier New',
                    img: 'fonts/courier.png',
                    src: ``,
                    style: "Courier New, sans-serif"
                },
                poppins: {
                    title: 'Poppins',
                    img: 'fonts/poppins.png',
                    src: `<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700&display=swap" rel="stylesheet">`,
                    style: "'Poppins', sans-serif"
                },
                gess2: {
                    custom_fonts: 1,
                    title: 'GESSTwo',
                    img: '',
                    src: `<style>@font-face { font-family: 'GE SS Two'; src: url('/assets/css/customFonts/GESSTwoMedium-Medium.woff2') format('woff2'), url('/assets/css/customFonts/GESSTwoMedium-Medium.woff') format('woff'); font-weight: 500; font-style: normal; font-display: swap; }</style>`,
                    style: "GE SS Two"
                },
                messinaseriff: {
                    custom_fonts: 1,
                    title: 'Messina Serif',
                    img: '',
                    src: `<style>@font-face { font-family: 'Messina Serif'; src: url('/assets/css/customFonts/MessinaSerif-Regular.woff2') format('woff2'), url('/assets/css/customFonts/MessinaSerif-Regular.woff') format('woff'); font-weight: 500; font-style: normal; font-display: swap; }</style>`,
                    style: "Messina Serif"
                },
                messinasans: {
                    custom_fonts: 1,
                    title: 'Messina Sans',
                    img: '',
                    src: `<style>@font-face { font-family: 'Messina Serif'; src: url('/assets/css/customFonts/MessinaSans-Regular.woff2') format('woff2'), url('/assets/css/customFonts/MessinaSans-Regular.woff') format('woff'); font-weight: 500; font-style: normal; font-display: swap; }</style>`,
                    style: "Messina Sans"
                },
                montserrat: {
                    // custom_fonts : 1,
                    title: 'Montserrat',
                    img: '',
                    src: `<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet">`,
                    style: "'Montserrat', sans-serif"
                },
                lato: {
                    // custom_fonts : 1,
                    title: 'Lato',
                    img: '',
                    src: `<link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet">`,
                    style: "'Lato', sans-serif"
                },
                spectral: {
                    // custom_fonts : 1,
                    title: 'Spectral',
                    img: '',
                    src: `<link href="https://fonts.googleapis.com/css2?family=Spectral:wght@400;700&display=swap" rel="stylesheet">`,
                    style: "'Spectral', serif"
                },
                manrope: {
                    // custom_fonts : 1,
                    title: 'Manrope',
                    img: '',
                    src: `<link href="https://fonts.googleapis.com/css2?family=Manrope&display=swap" rel="stylesheet">`,
                    style: "'Manrope', sans-serif"
                },
                didot: {
                    // custom_fonts : 1,
                    title: 'Didot',
                    img: '',
                    src: `<link href="https://fonts.googleapis.com/css2?family=GFS+Didot&display=swap" rel="stylesheet">`,
                    style: "'GFS Didot', serif"
                },
                Kano: {
                    // custom_fonts : 1,
                    title: 'Mukta',
                    img: '',
                    src: `<link href="https://fonts.googleapis.com/css2?family=Mukta:wght@400;700&display=swap" rel="stylesheet">`,
                    style: "'Mukta', sans-serif"
                },
                kano: {
                    custom_fonts: 1,
                    title: 'Kano',
                    img: '',
                    src: `<style>@font-face { font-family: 'Kano'; src: url('/assets/css/customFonts/Kano-regular.woff2') format('woff2'); font-weight: normal; font-style: normal; font-display: swap; }</style>`,
                    style: "Kano"
                },
                magenta: {
                    custom_fonts: 1,
                    title: 'Magenta',
                    img: '',
                    src: `<style>@font-face { font-family: 'Magenta'; src: url('/assets/css/customFonts/Magenta.woff2') format('woff2'); font-weight: normal; font-style: normal; font-display: swap; }</style>`,
                    style: "Magenta"
                },
                minervamodern: {
                    custom_fonts: 1,
                    title: 'MinervaModern',
                    img: '',
                    src: `<style>@font-face { font-family: 'MinervaModern'; src: url('/assets/css/customFonts/MinervaModern-Regular.woff2') format('woff2'); font-weight: normal; font-style: normal; font-display: swap; }</style>`,
                    style: "MinervaModern"
                },
                gilroy: {
                    custom_fonts: 1,
                    title: 'Gilroy',
                    img: '',
                    src: `<style>@font-face { font-family: 'Gilroy'; src: url('/assets/css/customFonts/Gilroy-Regular.woff2') format('woff2'); font-weight: normal; font-style: normal; font-display: swap; }</style>`,
                    style: "Gilroy"
                },
                mont: {
                    custom_fonts: 1,
                    title: 'Mont',
                    img: '',
                    src: `<style>@font-face { font-family: 'Mont'; src: url('/assets/css/customFonts/Mont-Regular.woff2') format('woff2'); font-weight: normal; font-style: normal; font-display: swap; }</style>`,
                    style: "Mont"
                },
                marcellus: {
                    // custom_fonts : 1,
                    title: 'Marcellus',
                    img: '',
                    src: `<link href="https://fonts.googleapis.com/css2?family=Marcellus&display=swap" rel="stylesheet">`,
                    style: "'Marcellus', serif"
                },
                Mulish: {
                    // custom_fonts : 1,
                    title: 'Mulish',
                    img: '',
                    src: `<link href="https://fonts.googleapis.com/css2?family=Mulish:ital@0;1&display=swap" rel="stylesheet">`,
                    style: "'Mulish', sans-serif"
                },
                kurye: {
                    custom_fonts: 1,
                    title: 'Kurye',
                    img: '',
                    src: `<style>@font-face { font-family: 'Kurye'; src: url('/assets/css/customFonts/kurye-light.woff2') format('woff2'); font-weight: normal; font-style: normal; font-display: swap; }</style>`,
                    style: "Kurye"
                },
                dm_serif: {
                    // custom_fonts : 1,
                    title: 'DM Serif',
                    img: '',
                    src: `<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap" rel="stylesheet">`,
                    style: "'DM Serif', serif"
                },
                dm_sans: {
                    // custom_fonts : 1,
                    title: 'DM Sans',
                    img: '',
                    src: `<link href="https://fonts.googleapis.com/css2?family=DM+Sans&display=swap" rel="stylesheet">`,
                    style: "'DM Sans', sans-serif"
                },
                be_vietnam_pro: {
                    title: 'Be Vietnam Pro',
                    img: '',
                    src: `<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;700&display=swap" " rel="stylesheet">`,
                    style: "'Be Vietnam Pro', sans-serif"
                },
                dm_serif_display: {
                    title: 'DM Serif Display',
                    img: '',
                    src: `<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&display=swap" " rel="stylesheet">`,
                    style: "'DM Serif Display', serif"
                },
            },
            getInputHtml: function() {
                function getFontStylesHtml() {
                    let fontItemHtmls = '';
                    Object.keys(QRPageStyleComponents.styleComponentWrappers.font_style.fonts).forEach(font => {
                        if (extractDataFromArray(QRPageStyleComponents.styleComponentWrappers.font_style.fonts, [font, "custom_fonts"], 0)) {
                            let user_custom_font_list = extractDataFromArray(user_info, ['custom_options', 'include_custom_fonts'], [])
                            if (empty(user_custom_font_list)) {
                                return "";
                            } else if (user_custom_font_list.indexOf(font) == -1) {
                                return "";
                            }
                        }
                        let active = '';
                        if (extractDataFromArray(QRPageStyleComponents.style, ['font'], 'default') == font) {
                            active = 'selected';
                        }
                        let img = extractDataFromArray(QRPageStyleComponents.styleComponentWrappers.font_style.fonts, [font, "img"], "")
                        let thumbnailHtml = '';
                        if (empty(img)) {
                            thumbnailHtml = `<div style=" width: 36px; font-size: 24px; " class="">Aa</div>`;
                        } else {
                            thumbnailHtml = `<img src="/assets/images/` + QRPageStyleComponents.styleComponentWrappers.font_style.fonts[font].img + `" width="36" height="36" class="">`;
                        }
                        fontItemHtmls += `<div class="font_style_item">
                                            <div class="font_style_card ` + active + `" data-type="` + font + `">
                                                ` + thumbnailHtml + `
                                            </div>
                                            <div class="text-center mt-1">` + QRPageStyleComponents.styleComponentWrappers.font_style.fonts[font].title + `</div>
                                        </div>`
                    })
                    return `<div class="col-md-12 d-flex font_style_card_wrapper flex-wrap">` + fontItemHtmls + `</div>`;
                }
                return `<div class="col-md-12 mb-2">
                            <div class="mr-2 mb-2">Font </div>
                        </div>` + getFontStylesHtml()
            }
        },
        card_style: {
            title: 'Card Style',
            getInputHtml: function() {
                let card_style = extractDataFromArray(QRPageStyleComponents.style, ['card'], {})

                function getDropShadowParams() {
                    return `<div class="col-md-6 d-flex">
                                <div class="mr-2">
                                    <label>X</label>
                                    <input type="number" min="0" id="card_shadow_x" max="100" value="` + extractDataFromArray(card_style, ['x'], 0) + `" class="form-control" style="width:60px">
                                </div>
                                <div class="mr-2">
                                    <label>Y</label>
                                    <input type="number" min="0" id="card_shadow_y" max="100" value="` + extractDataFromArray(card_style, ['y'], 7) + `" class="form-control" style="width:60px">
                                </div>
                                <div class="mr-2">
                                    <label>Blur</label>
                                    <input type="number" min="0" id="card_shadow_blur" max="100" value="` + extractDataFromArray(card_style, ['blur'], 29) + `" class="form-control" style="width:60px">
                                </div>
                                <div class="mr-2">
                                    <label>Spread</label>
                                    <input type="number" min="0" id="card_shadow_spread" max="100" value="` + extractDataFromArray(card_style, ['spread'], 0) + `" class="form-control" style="width:60px">
                                </div>
                            </div>`
                }

                function getBorderRadiusSlider() {
                    return `<div class="col-md-6">
                            <label>Corners</label>
                            <div class="d-block">
                                <input type="range" min="0" max="100" value="` + extractDataFromArray(card_style, ['border_radius'], 16) + `" class="slider sliderInput" id="card_border_radius"  style="width:100%; ">
                            </div>
                        </div>`
                }
                return `<div class="col-md-12 mb-2 d-flex">
                            <div class="mr-2 mb-2">Card Background </div>` + QRPageComponentWrapper.getSwitcheryButton("style_card_enable", extractDataFromArray(card_style, ['enable'], 1)) + `
                        </div>` +
                    QRPageStyleComponents.getColorPickerHtml("Background color", 'colorpicker-card-bg', extractDataFromArray(card_style, ['bg_color'], "#ffffff")) +
                    getBorderRadiusSlider() +
                    QRPageStyleComponents.getColorPickerHtml("Drop shadow", 'colorpicker-card-shadow', extractDataFromArray(card_style, ['shadow_color'], "#64646f33")) + getDropShadowParams()
            }
        },
        saved_style: {
            title: 'Saved Style',
            getInputHtml: function() {
                let styleCards = '';
                if (empty(QRPageStyleComponents.saved_styles)) {
                    styleCards = '<div class="mr-2 mb-2">No style saved</div>'
                } else {
                    QRPageStyleComponents.saved_styles.forEach((style, index) => {
                        styleCards += QRPageStyleComponents.getSavedStyleWrapper(index, style)
                    })
                }
                return `<div class="col-md-12 mb-2 d-flex row" id="saved_style_container">` + styleCards + `</div>`

            }
        },
        lock_code: {
            title: 'Lock QR Code',
            getInputHtml: function() {
                return `<div class="col-md-12"><div class="mr-2 mb-2 d-inline">Lock QR Code</div>` + QRPageComponentWrapper.getSwitcheryButton("lock_enable", extractDataFromArray(QRPageComponents.page_setting, ['lock_code', 'lock_enable'], 1)) + "</div>" +
                    '<div class="col-md-12" ><div class="row p-2 mx-0 mt-2" style="background: var(--light-color);">' + QRPageComponentWrapper.getInputText("After Scan", "scan_count", extractDataFromArray(QRPageComponents.page_setting, ['lock_code', 'scan_count'], 2), 6, '', false, '', 'number') + "</div></div>" +
                    `<div class="col-md-12 mt-3"><div class="mr-2 mb-2 d-inline">Lock only when scanned from owner/sub-account account</div>` + QRPageComponentWrapper.getSwitcheryButton("lock_by_owner", extractDataFromArray(QRPageComponents.page_setting, ['lock_code', 'lock_by_owner'], 1)) + "</div>" +
                    '<div class="col-md-12 mt-4 mb-3 font-weight-semibold">Display on Lock</div>' +
                    QRPageComponentWrapper.getInputText("Heading", "title", extractDataFromArray(QRPageComponents.page_setting, ['lock_code', 'title'], 'Heading')) +
                    QRPageComponentWrapper.getInputText("Description", "desc", extractDataFromArray(QRPageComponents.page_setting, ['lock_code', 'desc'], 'Description')) +
                    QRPageComponentWrapper.getImageUploader("Lock Image", [extractDataFromArray(QRPageStyleComponents.page_setting, ['lock_code', 'lock_img'], "/images/lock_image.svg")], "250x250px, 1:1 Ratio", '', 1, extractDataFromArray(QRPageStyleComponents.page_setting, ['lock_code', 'lock_img_enable'], 1))
            }
        },
    },
    cards_open: {
        bg_img: 1
    },
    getStyleContainerComponents: function(addListener = true) {
        $(QRPageStyleComponents._container).html('')
        $(QRPageStyleComponents._container).append(QRPageStyleComponents.getStyleComponentWrapperHtml('bg_img'))
        $(QRPageStyleComponents._container).append(QRPageStyleComponents.getStyleComponentWrapperHtml('color'))
        $(QRPageStyleComponents._container).append(QRPageStyleComponents.getStyleComponentWrapperHtml('font_style'))
        $(QRPageStyleComponents._container).append(QRPageStyleComponents.getStyleComponentWrapperHtml('card_style'))
        $(QRPageStyleComponents._container).append(QRPageStyleComponents.getStyleComponentWrapperHtml('ld_img'))
        if (page == 'pet-id-tags' || page == 'digital-business-card') {
            $(QRPageStyleComponents._container).append(QRPageStyleComponents.getStyleComponentWrapperHtml('page_setting'))
        }
        if (page == 'event-ticket') {
            $(QRPageStyleComponents._container).append(QRPageStyleComponents.getStyleComponentWrapperHtml('lock_code'))
        }
        $(QRPageStyleComponents._container).append(QRPageStyleComponents.getSaveStyleButton())
        $(QRPageStyleComponents._container).append(QRPageStyleComponents.getStyleComponentWrapperHtml('saved_style'))

        QRPageStyleComponents.listeners(addListener)
        QRPageComponents.prepareHtml()
    },
    syncAllCardDisplayStates: function() {
        QRPageStyleComponents.cards_open = {}
        Array.from($("#page-tab-style-design-content .qr_page_component_card")).forEach((ele, index) => {
            QRPageStyleComponents.cards_open[$(ele).data('type')] = $(ele).find(".qr_page_component_card_body").hasClass("show") ? 1 : 0;
        })
    },
    listeners: function(addListener) {
        let colorpickerElements = ['bg-primary', 'bg-secondary', 'text-primary', 'text-secondary', 'card-bg', 'card-shadow', 'profile-primary', 'profile-secondary'];
        colorpickerElements.forEach(ele => {
            $(".colorpicker-" + ele).spectrum({
                preferredFormat: "hex8",
                showAlpha: true,
            })
            $(".colorpicker-" + ele).on("keyup change", function(e) {
                ColorPicker.changeIconColor(e.target.value, $(this))
                $(".colorpicker-" + ele + "-input").val(e.target.value)
                $(".colorpicker-" + ele).val(e.target.value)
                $(".colorpicker-" + ele).spectrum({
                    preferredFormat: "hex8",
                    showAlpha: true,
                })
                QRPageStyleComponents.handleStyleInputChange()
            })
            $(".colorpicker-" + ele + "-input").on("input", function(e) {
                ColorPicker.changeIconColor(e.target.value, $(this))
                $(".colorpicker-" + ele + "-input").val(e.target.value)
                $(".colorpicker-" + ele).val(e.target.value)
                $(".colorpicker-" + ele).spectrum({
                    preferredFormat: "hex8",
                    showAlpha: true,
                })
                QRPageStyleComponents.handleStyleInputChange()
            })
        })

        if (!addListener) {
            return;
        }
        QRPageStyleComponents.fetchStyles()

        $(document).on('click', ".qr_color_panel_bg li, .qr_color_panel_text li", function(e) {
            $(this).parent().find("li").removeClass('active')
            $(this).addClass('active')
            // var color1 = ColorPicker.rgbToHex($(this).find(".qr_color_panel_wr").data('bg_1'))
            // var color2 = ColorPicker.rgbToHex($(this).find(".qr_color_panel_wr").data('bg_2'))
            // var color3 = ColorPicker.rgbToHex($(this).find(".qr_color_panel_wr").data('text_1'))
            // var color4 = ColorPicker.rgbToHex($(this).find(".qr_color_panel_wr").data('text_2'))
            var color1 = $(this).find(".qr_color_panel_wr").data('bg_1')
            var color2 = $(this).find(".qr_color_panel_wr").data('bg_2')
            var color3 = $(this).find(".qr_color_panel_wr").data('text_1')
            var color4 = $(this).find(".qr_color_panel_wr").data('text_2')
            // var color4 = ColorPicker.rgbToHex($(this).children().children()[1].style['backgroundColor'])
            let type = $(this).parent().data("type")

            ColorPicker.changeIconColor(color1, $(".colorpicker-bg-primary"))
            ColorPicker.changeIconColor(color2, $(".colorpicker-bg-secondary"))
            ColorPicker.changeIconColor(color3, $(".colorpicker-text-primary"))
            ColorPicker.changeIconColor(color4, $(".colorpicker-text-secondary"))
            ColorPicker.changeIconColor(color3, $(".colorpicker-profile-primary"))
            ColorPicker.changeIconColor(color4, $(".colorpicker-profile-secondary"))

            $(".colorpicker-bg-primary-input").val(color1)
            $(".colorpicker-bg-primary").val(color1)
            $(".colorpicker-bg-primary").spectrum({
                preferredFormat: "hex8",
                showAlpha: true,
            })

            $(".colorpicker-bg-secondary-input").val(color2)
            $(".colorpicker-bg-secondary").val(color2)
            $(".colorpicker-bg-secondary").spectrum({
                preferredFormat: "hex8",
                showAlpha: true,
            })

            $(".colorpicker-text-primary-input").val(color3)
            $(".colorpicker-text-primary").val(color3)
            $(".colorpicker-text-primary").spectrum({
                preferredFormat: "hex8",
                showAlpha: true,
            })

            $(".colorpicker-text-secondary-input").val(color4)
            $(".colorpicker-text-secondary").val(color4)
            $(".colorpicker-text-secondary").spectrum({
                preferredFormat: "hex8",
                showAlpha: true,
            })

            $(".colorpicker-profile-primary-input").val(color3)
            $(".colorpicker-profile-primary").val(color3)
            $(".colorpicker-profile-primary").spectrum({
                preferredFormat: "hex8",
                showAlpha: true,
            })

            $(".colorpicker-profile-secondary-input").val(color4)
            $(".colorpicker-profile-secondary").val(color4)
            $(".colorpicker-profile-secondary").spectrum({
                preferredFormat: "hex8",
                showAlpha: true,
            })

            QRPageStyleComponents.handleStyleInputChange()
        })

        $(document).on("click", "#page-tab-style-design-content .font_style_card", function(e) {
            $(this).parents('.font_style_card_wrapper').find(".font_style_card").removeClass("selected")
            $(this).addClass("selected")
            QRPageStyleComponents.style.font = $(this).data("type")
            QRPageStyleComponents.handleStyleInputChange()
        })


        $(document).on("click", "#page-tab-style-design-content .img_uploaded_card.upload_bg_img", function(e) {
            if (!amILoggedIn()) {
                e.stopPropagation();
                $("#signup-free").modal("show");
                __signup_callback = false;
                return;
            }

            let parent = $(this).parents('.bg_img_upload_card_wrapper')
            FileManager.showFileManager("IMAGE", 1, (file) => {
                let url = extractDataFromArray(file, [0, 'asset_url'], '')
                if (parent.find(".user_upload_img").length == 0) {
                    let div = document.createElement('div')
                    div.className = "img_uploaded_card selected user_upload_img mr-3"
                    div.style.backgroundImage = `url('` + url + `')`;
                    div.style.position = `relative`;
                    $(div).insertAfter(parent.find(".img_uploaded_card.upload_bg_img"))
                }
                parent.find(".img_uploaded_card").removeClass("selected")
                parent.find(".user_upload_img").addClass("selected")
                parent.find(".user_upload_img").css("background-image", '')
                parent.find(".user_upload_img").css("background-image", 'url(' + url + ')')
                QRPageStyleComponents.style.bg_img = url
                QRPageStyleComponents.handleStyleInputChange(e)
            })
        })

        $(document).on("click", "#page-tab-style-design-content .bg_img_upload_card_wrapper .img_uploaded_card", function(e) {
            if ($(this).hasClass("upload_bg_img")) {
                return;
            }
            $(this).parents('.bg_img_upload_card_wrapper').find(".img_uploaded_card").removeClass("selected")

            if ($(this).hasClass("remove_img")) {
                QRPageStyleComponents.style.bg_img = '';
                QRPageStyleComponents.handleStyleInputChange(e)
                return;
            }
            $(this).addClass("selected")

            let video = $(this).parents(".bg_img_upload_card_wrapper").find(".img_uploaded_card.selected").data("video")

            if (empty(video)) {
                let icon_img = $(this).parents(".bg_img_upload_card_wrapper").find(".img_uploaded_card.selected").css("background-image")
                if (!empty(icon_img)) {
                    icon_img = icon_img.split('"')[1]
                }
                QRPageStyleComponents.style.bg_img = icon_img
            } else {
                QRPageStyleComponents.style.bg_img = video
            }
            QRPageStyleComponents.handleStyleInputChange(e)
        })

        $(document).on("click", "#btn_save_style", function(e) {
            if (QRPageStyleComponents.style_selected != -1) {

            }
            QRPageStyleComponents.editStyleName()
        })

        $(document).on("click", ".saved_style_card", function(e) {
            let index = $(this).parents('.saved_style_wrapper').index()
            QRPageStyleComponents.syncAllCardDisplayStates()
            QRPageStyleComponents.style_selected = index
            let custom_css = extractDataFromArray(QRPageStyleComponents.style, ['custom_css'], '')
            QRPageStyleComponents.style = JSON.parse(JSON.stringify(extractDataFromArray(QRPageStyleComponents.saved_styles, [index, 'style_config'], {})))
            QRPageStyleComponents.style.custom_css = custom_css
            QRPageStyleComponents.getStyleContainerComponents(false)
        })

        $(document).on("click", ".delete_style", function(e) {
            e.preventDefault()
            let style_id = $(this).parents('.saved_style_wrapper').data('style_id')
            QRPageStyleComponents.deleteStyle(style_id)
        })
    },
    getSaveStyleButton: function() {
        return `<button class="btn btn-outline-primary mb-3" id="btn_save_style">Save this Style</button>`
    },
    getSavedStyleWrapper: function(index, style) {
        let bg_img = extractDataFromArray(style, ['style_config', 'bg_img'], '')
        if (bg_img.endsWith(".mp4")) {
            bg_img = bg_img.cleanReplace(".mp4", ".jpg")
        }
        return `<div class="saved_style_wrapper col-md-4" data-index="` + index + `" data-style_id="` + style._id + `">
                                                <div class="saved_style_action dropdown mr-2">
                                                    <a href="#" class="btn secondary_color dropdown-toggle" type="button" id="qrlist_more_dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="icon-moreoption"></i></a>
                                                    <div class="dropdown-menu dropdown-menu-right dropdown-shared-menu" aria-labelledby="qrlist_more_dropdown">
                                                        <a href="" class="btn btn-link dropdown-item remove_style d-none" >Remove Style</a>
                                                        <a href="" class="btn btn-link dropdown-item delete_style" >Delete Style</a>
                                                    </div>
                                                </div>
                                                <div class="saved_style_card ` + (QRPageStyleComponents.style_selected == index ? 'selected' : '') + `">
                                                    <div class="saved_style_color" >
                                                        <div class="qr_color_panel_1" style="background: ` + extractDataFromArray(style, ['style_config', 'primary_bg_color'], '') + `">
                                                        </div>
                                                        <div class="qr_color_panel_2" style="background: ` + extractDataFromArray(style, ['style_config', 'secondary_bg_color'], '') + `">
                                                        </div>
                                                    </div>
                                                    <div class="saved_style_bg" style="background-image: url('` + bg_img + `');"></div>
                                                    <div class="saved_style_font saved_style_bg" style="background-image: url('/assets/images/` + extractDataFromArray(QRPageStyleComponents.styleComponentWrappers.font_style.fonts, [extractDataFromArray(style, ['style_config', 'font'], 'default'), 'img'], '') + `');"></div>
                                                </div>
                                                ` + extractDataFromArray(style, ['style_name'], '') +
            `</div>`
    },
    getStyleComponentWrapperHtml: function(type) {
        return `<div class="card collapse_card mb-3 qr_page_component_card list-group-item" data-type="` + type + `">
                    <div class="card-header d-flex justify-content-between" aria-expanded="true">
                        <h5 class="mb-0">
                            <a class="btn btn-link qr_page_component_card_title">
                                ` + QRPageStyleComponents.styleComponentWrappers[type].title + `
                            </a>
                        </h5>
                        <div class="qr_page_component_card_actions">
                            <a class="btn toggle_card_visiblitiy"><i class="` + (extractDataFromArray(QRPageStyleComponents.cards_open, [type], 0) ? 'icon-remove_1' : 'icon-add_1') + `"></i></a>
                        </div>
                    </div>
                    <div class="qr_page_component_card_body ` + (extractDataFromArray(QRPageStyleComponents.cards_open, [type], 0) ? 'show' : '') + ` secondary_color ` + type + `_input_wrapper">
                        <div class="card-body">
                            <div class="row">
                                ` + QRPageStyleComponents.styleComponentWrappers[type]['getInputHtml']() + `
                            </div>
                        </div>
                    </div>
                </div>`
    },
    getColorPickerHtml: function(title, name, color) {
        return ` <div class="col-md-6 mb-4">
                    <label>` + title + `</label>
                    <div class="input-group">
                        <input type="text" class="form-control ` + name + `" data-cancel-text="Cancel" data-choose-text="Choose" value="` + color + `" data-fouc>
                        <div class="color_picker_icon"><i class="icon-colorpicker"></i></div>
                        <input type="text" class="form-control border-left-0 ` + name + `-input qr_color_picker" placeholder="` + color + `" value="` + color + `">
                    </div>
                </div>`
    },
    handleStyleInputChange: function(e) {
        if (__KEYUP_DELAY == undefined) __KEYUP_DELAY = 1000;
        if (_timeoutId != null) clearTimeout(_timeoutId);
        _timeoutId = setTimeout(function() {
            QRPageStyleComponents.style.primary_bg_color = $(".colorpicker-bg-primary-input").val()
            QRPageStyleComponents.style.secondary_bg_color = $(".colorpicker-bg-secondary-input").val()
            QRPageStyleComponents.style.primary_text_color = $(".colorpicker-text-primary-input").val()
            QRPageStyleComponents.style.secondary_text_color = $(".colorpicker-text-secondary-input").val()
            QRPageStyleComponents.style.primary_profile_text_color = $(".colorpicker-profile-primary-input").val()
            QRPageStyleComponents.style.secondary_profile_text_color = $(".colorpicker-profile-secondary-input").val()
            QRPageStyleComponents.style.custom_css = extractDataFromArray(getComponentStyleFromTemplate(QRPageComponents.selected_template), ['custom_css'], '')
            QRPageStyleComponents.style.card = {
                enable: $("input[name=style_card_enable]").prop("checked") ? 1 : 0,
                bg_color: $(".colorpicker-card-bg-input").val(),
                shadow_color: $(".colorpicker-card-shadow-input").val(),
                border_radius: $("#card_border_radius").val(),
                x: $("#card_shadow_x").val(),
                y: $("#card_shadow_y").val(),
                blur: $("#card_shadow_blur").val(),
                spread: $("#card_shadow_spread").val(),
            };
            if (typeof QRPageStyleComponents.style.ld_img == "undefined") {
                QRPageStyleComponents.style.ld_img = extractDataFromArray(user_info, ['default_loader_img'], '/assets/images/def_qrc_loader.png')
            }
            QRPageComponents.prepareHtml()
        }, __KEYUP_DELAY)
    },
    editStyleName: function(action = 'A', name = '') {
        Swal.fire({
            title: "Save Style",
            html: `<div class="form-group mt-2 text-left">
                        <label>Style Name</label>
                        <input type="text" class="form-control mt-0"  value="` + extractDataFromArray(QRPageStyleComponents.saved_styles, [QRPageStyleComponents.style_selected, 'style_name'], '') + `" id="style_name_input" required>
                    </div>`,
            reverseButtons: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            preConfirm: () => {
                const style_name = ($("#style_name_input").val()).trim()
                if (empty(style_name)) {
                    Swal.showValidationMessage("Style name cannot be empty.")
                    return
                }

                QRPageStyleComponents.saveStyle(style_name)
                return false;


            }
        })
    },
    saveStyle: function(style_name) {
        $.post("//" + __api_domain + "/user/services/api", {
            cmd: 'saveStyle',
            style_id: extractDataFromArray(QRPageStyleComponents.saved_styles, [QRPageStyleComponents.style_selected, '_id'], ''),
            style_config: JSON.stringify(QRPageStyleComponents.style),
            style_name,
            page_type: page
        }, function(response) {
            if (response.errorCode == 0) {
                SwalPopup.showSingleButtonPopup({
                    icon: 'success',
                    text: 'Style saved',
                })
                QRPageStyleComponents.fetchStyles()
            } else {
                Swal.showValidationMessage(response.errorMsg)
            }
        })
    },
    fetchStyles: function() {
        $.post("//" + __api_domain + "/user/services/api", {
            cmd: 'fetchStyles',
            page_type: page
        }, function(response) {
            QRPageStyleComponents.saved_styles = extractDataFromArray(response, ['data'], [])
            if (empty(QRPageStyleComponents.saved_styles)) {
                QRPageStyleComponents.saved_styles = []
            }
            $("#saved_style_container").html('')
            QRPageStyleComponents.saved_styles.forEach((style, index) => {
                $("#saved_style_container").append(QRPageStyleComponents.getSavedStyleWrapper(index, style))
            })
        })
    },
    deleteStyle: function(style_id) {
        showDeleteConfirmation("Delete Style", 'Are you sure to delete this style', '', function() {
            $.post("//" + __api_domain + "/user/services/api", {
                cmd: 'deleteStyle',
                style_id: style_id
            }, function(response) {
                showAlertMessage("S", "Style deleted successfully", () => {
                    QRPageStyleComponents.fetchStyles()
                })
            })
        })
    },


}

const QRDesignComponents = {
    _container: "#page-tab-qr-design-content",
    getWrapperHtml: function(type) {
        $(QRDesignComponents._container).html('')
        $(QRDesignComponents._container).append(`<div class="card collapse_card mb-3 qr_page_component_card list-group-item" data-type="` + type + `">
                    <div class="card-header d-flex justify-content-between" aria-expanded="true">
                        <h5 class="mb-0">
                            <a class="btn btn-link ">
                                Cutomize QR Code
                            </a>
                        </h5>
                    </div>
                    <div class="qr_page_component_card_body show secondary_color">
                        <div class="card-body">
                            <div class="row">
                               ` + QRDesignComponents.getQRAttibutesHtml() + `
                            </div>
                        </div>
                    </div>
                </div>`)
    },
    getQRAttibutesHtml: function() {
        const attributes = {
            qrshape: {
                title: 'QR SHAPES',
                getPreview: function() {
                    let qrshape = extractDataFromArray(_qrOptions, ['DESIGN_OPTS', 'qrshape'], '/assets/images/select.png')
                    return `<a class="w-100"><img src="` + qrshape + `" class="img-fluid"></a>`
                },
                getSelectedClass: function() {
                    return empty(extractDataFromArray(_qrOptions, ['DESIGN_OPTS', 'qrshape'], '')) ? '' : 'selected';
                },
                getClickAction: function() {
                    return "showDesignPopUp('#gntr_qrshapes_tab-1'); return false;";
                }
            },
            predesign: {
                title: 'PRE-DESIGNED',
                getPreview: function() {
                    let predesign = extractDataFromArray(_qrOptions, ['DESIGN_OPTS', 'prebuilt'], '/images/digitalCard/pre_design_qr.png')
                    if (empty(predesign)) {
                        predesign = '/images/digitalCard/pre_design_qr.png';
                    }
                    return `<a class="w-100 "><img src="` + predesign + `" class="img-fluid"></a>`
                },
                getSelectedClass: function() {
                    return empty(extractDataFromArray(_qrOptions, ['DESIGN_OPTS', 'prebuilt'], '')) ? '' : 'selected';
                },
                getClickAction: function() {
                    return "showDesignPopUp('#gntr_prebuilt_tab-1'); return false;";
                }
            },
            sticker: {
                title: 'STICKERS',
                getPreview: function() {
                    let sticker = extractDataFromArray(_qrOptions, ['DESIGN_OPTS', 'sticker'], '/images/digitalCard/stickers_qr.png')
                    if (empty(sticker)) {
                        sticker = '/images/digitalCard/stickers_qr.png';
                    }
                    return `<a class="w-100 "><img src="` + sticker + `" class="img-fluid"></a>`
                },
                getSelectedClass: function() {
                    return empty(extractDataFromArray(_qrOptions, ['DESIGN_OPTS', 'sticker'], '')) ? '' : 'selected';
                },
                getClickAction: function() {
                    return "showDesignPopUp('#gntr_sticker_tab-1'); return false;";
                }
            },
            color: {
                title: 'COLORS',
                getPreview: function() {
                    return ` <a class="qr_color_panel_wr">
                                <div class="qr_color_panel_1" style="background: ` + extractDataFromArray(_qrOptions, ['DESIGN_OPTS', 'colorpickerSFg'], '#333333') + `">
                                </div>
                                <div class="qr_color_panel_2" style="background: ` + extractDataFromArray(_qrOptions, ['DESIGN_OPTS', 'colorpickerSEye'], '#333333') + `">
                                </div>
                            </a>`
                },
                getSelectedClass: function() {
                    return 'selected';
                },
                getClickAction: function() {
                    return "showDesignPopUp('#gntr_color_tab-1'); return false;";
                }
            },
            shape: {
                title: 'SHAPES',
                pointer: ['DESIGN_OPTS', 'qrshape'],
                getPreview: function() {
                    return `<a class="d-flex" style="width:70px">
                    <div class="w-100 mr-2"><img src="` + extractDataFromArray(_qrOptions, ['DESIGN_OPTS', 'part-body'], 'https://qrcodechimp.s3.amazonaws.com/sysconf/qr-body24.png') + `" class="img-fluid"></div>
                    <div class="w-100 mr-2"><img src="` + extractDataFromArray(_qrOptions, ['DESIGN_OPTS', 'part-eyeball'], 'https://qrcodechimp.s3.amazonaws.com/sysconf/2089-Square.svg') + `" class="img-fluid"></div>
                    <div class="w-100"><img src="` + extractDataFromArray(_qrOptions, ['DESIGN_OPTS', 'part-eyeframe'],
                        'https://qrcodechimp.s3.amazonaws.com/sysconf/eye-11.svg') + `" class="img-fluid"></div></a>`
                },
                getSelectedClass: function() {
                    return 'selected';
                },
                getClickAction: function() {
                    return "showDesignPopUp('#gntr_shape_tab-1'); return false;";
                }
            },
            logo: {
                title: 'LOGO',
                pointer: ['DESIGN_OPTS', 'qrshape'],
                getPreview: function() {
                    let logo = extractDataFromArray(_qrOptions, ['DESIGN_OPTS', 'logo'], '/images/digitalCard/logo_qr.png')
                    // logo = '';
                    if (empty(logo)) {
                        logo = '/images/digitalCard/logo_qr.png';
                    }
                    return `<a class="w-100"><img src="` + logo + `" class="img-fluid"></a>`
                },
                getSelectedClass: function() {
                    return empty(extractDataFromArray(_qrOptions, ['DESIGN_OPTS', 'logo'], '')) ? '' : 'selected';
                },
                getClickAction: function() {
                    return "showDesignPopUp('#gntr_logo_tab-1'); return false;";
                }
            },
            decorpic: {
                title: 'DECORATE PICTURE',
                pointer: ['DESIGN_OPTS', 'qrshape'],
                getPreview: function() {
                    let decorpic = extractDataFromArray(_qrOptions, ['BGImg_details', 'conf', 'image'], '/images/digitalCard/upload_qr.png')
                    if (empty(decorpic)) {
                        decorpic = '/images/digitalCard/upload_qr.png';
                    }
                    return `<a class="w-100"><img src="` + decorpic + `" class="img-fluid"></a>`
                },
                getSelectedClass: function() {
                    return empty(extractDataFromArray(_qrOptions, ['BGImg_details', 'conf', 'image'], '')) ? '' : 'selected';
                },
                getClickAction: function() {
                    return "showDesignPopUp('#gntr_bgimg_tab-1'); return false;";
                }
            },
        }

        let qrAttributesHtml = '';
        Object.keys(attributes).forEach(attribute => {
            qrAttributesHtml += `<div class="col-md-3">
                                    <div class="qr_design_card_wrapper ` + attributes[attribute].getSelectedClass() + `" onclick="` + attributes[attribute].getClickAction() + `">
                                        <div class="">` + attributes[attribute].title + `</div>
                                        <div class="d-flex justify-content-center align-items-center qr_design_card">` + attributes[attribute].getPreview() + `</div>
                                    </div>
                                </div>`
        })
        return qrAttributesHtml;
    }
}


const HrefLinks = function(type, data) {
    switch (type) {
        case 'upi':
            return formUPIurl(linkData)
        case 'email':
            return "mailto:" + data
        case 'sms':
            return "sms:" + data
        case 'whatsapp':
            if (data.includes('https://wa.me')) {
                return data;
            }
            return "https://wa.me/" + data
        case 'mobile':
            return "tel:" + data
        case 'tel':
            return "tel:" + data
        case 'fax':
            return "fax:" + data
        case 'skype':
            if (data.startsWith("/skype?user")) {
                return data;
            }
            return "/skype?user=" + data;
        case 'viber':
            if (data.startsWith("viber:")) {
                return data;
            }
            return "viber://chat?number=" + data
        default:
            return checkAndAdjustURL(data);
    }
}



const ComponentLists = {
    profile: {
        getContactShortcutItem: function(type, value = '') {
            let optionsHtml = '';
            Object.keys(QRPageComponentWrapper.contactOptions).forEach(option => {
                optionsHtml += '<option value="' + option + '" ' + (option == type ? 'selected' : '') + '>' + QRPageComponentWrapper.contactOptions[option].label + '</option>'
            })



            return `<div class="list-group-item subcomponent_sortable_wrapper contact_shortcut_input_wrapper mb-4" >
                        <div class="action_buttons">
                            <a class="btn btn_delete_pro_card"><i class="text-danger icon-delete_1"></i></a>
                            <a class="btn handle-contact"><i class="icon-drag_1"></i></a>
                        </div>
                        <div class=""></div>
                        <div class="input-group my-3">
                            <div class="input-group-prepend">
                                <select class="form-control select2_no_search profile_contact_info" name="type">` + optionsHtml + `</select>
                            </div>
                            <input type="text" class="form-control" name="value" value="` + value + `" placeholder="` + QRPageComponentWrapper.contactOptions[type].placeholder + `">
                        </div>
                    </div>`
        },
        getInputWrapperHtml: function(data, index) {
            function getDraggableContactIconsWrapper(data) {
                let shortcuts = extractDataFromArray(data, ['contact_shortcuts'], [])
                let shortcutsHtml = '';
                shortcuts.forEach(shortcut => {
                    shortcutsHtml += ComponentLists.profile.getContactShortcutItem(shortcut.type, shortcut.value)
                })
                let addDropdownOptions = '';
                Object.keys(QRPageComponentWrapper.contactOptions).forEach(option => {
                    addDropdownOptions += '<a class="dropdown-item" href="" data-type="' + option + '">' + QRPageComponentWrapper.contactOptions[option].label + '</a>'
                })

                return `<div class="col-md-12 px-3 mt-2">
                            <div class="row mx-0">
                                <div class="mr-2 mb-2" >Profile Contact Shortcuts </div>` + QRPageComponentWrapper.getSwitcheryButton('contact_shortcut_enable', extractDataFromArray(data, ['contact_shortcut_enable'], 0)) + `
                            </div>
                            <div class="contact_shortcut_container" style="` + (!empty(extractDataFromArray(data, ['contact_shortcut_enable'], 0)) ? '' : 'display:none;') + `">
                                <div class="row mx-0 list-group  " id="contact_shortcut_container_` + index + `" >
                                    ` + shortcutsHtml + `
                                </div>
                                <div class="row mx-0 mt-2" >
                                    <div class="dropup">
                                        <button class="btn btn-outline-primary dropdown-toggle" type="button" id="btn_add_profile_component" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i class="icon-add_1"></i>Add More
                                        </button>
                                        <div class="dropdown-menu add_profile_component" aria-labelledby="btn_add_profile_component">
                                            ` + addDropdownOptions + `
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>`

            }

            if ((typeof __savedQrCodeParams == 'undefined' || empty(extractDataFromArray(__savedQrCodeParams, ['id'], ''))) && isUserLoggedIn()) {
                let default_pr = extractDataFromArray(user_info, ['default_profile_img'], '')
                if (!empty(default_pr)) {
                    data.pr_img = default_pr
                }
            }

            let profile_img_section = QRPageComponentWrapper.getImageUploader('Profile Photo', [extractDataFromArray(data, ['pr_img'], '')], extractDataFromArray(data, ['pr_img_label'], '(250x250px, 1:1 Ratio)'), '', 1, extractDataFromArray(data, ['enable_pr'], 1), 12, 'pr_img', 'bottom')
            if (!empty(extractDataFromArray(data, ['show_brand_img'], 0)) && !empty(extractDataFromArray(data, ['show_pr_bg_img'], 0))) {
                profile_img_section = QRPageComponentWrapper.getImageUploader('Profile Photo', [extractDataFromArray(data, ['pr_img'], '')], extractDataFromArray(data, ['pr_img_label'], '(250x250px, 1:1 Ratio)'), '', 1, extractDataFromArray(data, ['enable_pr'], 1), 4, 'pr_img', 'bottom') +
                    QRPageComponentWrapper.getImageUploader('Brand Logo', [extractDataFromArray(data, ['br_img'], '')], extractDataFromArray(data, ['br_img_label'], '(250x250px, 1:1 Ratio)'), '', 1, extractDataFromArray(data, ['enable_br'], 1), 4, 'br_img', 'bottom') +
                    QRPageComponentWrapper.getImageUploader('Profile Background', [extractDataFromArray(data, ['pr_bg_img'], '')], extractDataFromArray(data, ['pr_bg_img_label'], '(250x250px, 1:1 Ratio)'), '', 1, extractDataFromArray(data, ['enable_pr_bg'], 1), 4, 'pr_bg_img', 'bottom')

            } else if (!empty(extractDataFromArray(data, ['show_brand_img'], 0))) {
                profile_img_section = QRPageComponentWrapper.getImageUploader('Profile Photo', [extractDataFromArray(data, ['pr_img'], '')], extractDataFromArray(data, ['pr_img_label'], '(250x250px, 1:1 Ratio)'), '', 1, extractDataFromArray(data, ['enable_pr'], 1), 6, 'pr_img', 'bottom') +
                    QRPageComponentWrapper.getImageUploader('Brand Logo', [extractDataFromArray(data, ['br_img'], '')], extractDataFromArray(data, ['br_img_label'], '(250x250px, 1:1 Ratio)'), '', 1, extractDataFromArray(data, ['enable_br'], 1), 6, 'br_img', 'bottom')
            } else if (!empty(extractDataFromArray(data, ['show_pr_bg_img'], 0))) {
                profile_img_section = QRPageComponentWrapper.getImageUploader('Profile Photo', [extractDataFromArray(data, ['pr_img'], '')], extractDataFromArray(data, ['pr_img_label'], '(250x250px, 1:1 Ratio)'), '', 1, extractDataFromArray(data, ['enable_pr'], 1), 6, 'pr_img', 'bottom') +
                    QRPageComponentWrapper.getImageUploader('Profile Background', [extractDataFromArray(data, ['pr_bg_img'], '')], extractDataFromArray(data, ['pr_bg_img_label'], '(250x250px, 1:1 Ratio)'), '', 1, extractDataFromArray(data, ['enable_pr_bg'], 1), 6, 'pr_bg_img', 'bottom')
            }


            return profile_img_section + QRPageComponentWrapper.getInputText('Name', 'name', extractDataFromArray(data, ['name'], '')) + QRPageComponentWrapper.getInputText('Heading', 'desc', extractDataFromArray(data, ['desc'], ''), 6) + QRPageComponentWrapper.getInputText('Sub Heading', 'company', extractDataFromArray(data, ['company'], ''), 6) + getDraggableContactIconsWrapper(data)
        },
        title: 'Profile',
        listeners: function(index) {
            new Sortable(document.getElementById('contact_shortcut_container_' + index), {
                handle: '.handle-contact', // handle class
                animation: 150,
                ghostClass: 'blue-background-class',
                onEnd: function(e) {
                    // debugger
                    QRPageComponents.handleInputChange(e)
                }
            });
        },
        getInputData: function(index, parent) {
            let pr_img = $(parent).find(".img_uploaded_card.selected_img.pr_img").css("background-image")
            if (!empty(pr_img)) {
                pr_img = pr_img.split('"')[1]
            }
            let br_img = $(parent).find(".img_uploaded_card.selected_img.br_img")
            if (br_img.length == 1) {
                br_img = br_img.css("background-image")
                br_img = br_img.split('"')[1]
            } else {
                br_img = ''
            }
            let pr_bg_img = $(parent).find(".img_uploaded_card.selected_img.pr_bg_img")
            if (pr_bg_img.length == 1) {
                pr_bg_img = pr_bg_img.css("background-image")
                pr_bg_img = pr_bg_img.split('"')[1]
            } else {
                pr_bg_img = ''
            }
            // let pr_bg_img = $(parent).find(".img_uploaded_card.selected_img").css("background-image")
            // if (!empty(pr_bg_img)) {
            //     pr_img = pr_bg_img.split('"')[1]
            // }pr_bg_img
            let contact_shortcuts = [];
            Array.from($(parent).find(".contact_shortcut_input_wrapper")).forEach(ele => {
                contact_shortcuts.push({
                    type: $(ele).find("select").val(),
                    value: $(ele).find("input").val(),
                })
            })
            let extra_attributes = {}

            if (typeof QRPageComponents.components[index]['show_brand_img'] != "undefined") {
                if (!empty(br_img)) {
                    extra_attributes['show_brand_img'] = 1
                }
                if ($(parent).find("input[name=enable_br]").length == 1) {
                    extra_attributes['enable_br'] = $(parent).find("input[name=enable_br]").prop("checked") ? 1 : 0
                } else {
                    extra_attributes['enable_br'] = extractDataFromArray(QRPageComponents.components, [index, 'enable_br'], 0)
                }
                extra_attributes['br_img'] = empty(br_img) ? extractDataFromArray(QRPageComponents.components, [index, 'br_img'], 0) : br_img;
            }

            if (typeof QRPageComponents.components[index]['show_pr_bg_img'] != "undefined") {
                if (!empty(pr_bg_img)) {
                    extra_attributes['show_pr_bg_img'] = 1
                }
                // extra_attributes['show_pr_bg_img'] = 1
                if ($(parent).find("input[name=enable_pr_bg]").length == 1) {
                    extra_attributes['enable_pr_bg'] = $(parent).find("input[name=enable_pr_bg]").prop("checked") ? 1 : 0
                } else {
                    extra_attributes['enable_pr_bg'] = extractDataFromArray(QRPageComponents.components, [index, 'enable_pr_bg'], 0)
                }
                extra_attributes['pr_bg_img'] = empty(pr_bg_img) ? extractDataFromArray(QRPageComponents.components, [index, 'pr_bg_img'], 0) : pr_bg_img;
            }

            return {
                pr_img,
                name: $(parent).find('input[name=name]').val(),
                desc: $(parent).find('input[name=desc]').val(),
                company: $(parent).find('input[name=company]').val(),
                contact_shortcut_enable: $(parent).find("input[name=contact_shortcut_enable]").prop("checked") ? 1 : 0,
                enable_pr: $(parent).find("input[name=enable_pr]").prop("checked") ? 1 : 0,
                contact_shortcuts,
                ...extra_attributes
            }
        },
        getPreviewHtml: function(data) {
            QRPageComponents.getPrBase64(extractDataFromArray(data, ['pr_img'], ''))
            let profileHtmlConfig = getComponentHtmlFromTemplate(QRPageComponents.selected_template, 'profile')
            QRPageComponents.profile_name = extractDataFromArray(data, ['name'], '')
            let profileHtml = profileHtmlConfig.main;
            let pr_img_html = '';
            if (parseInt(extractDataFromArray(data, ['enable_pr'], 1))) {
                let pr_img = extractDataFromArray(data, ['pr_img'], '');
                if (pr_img.indexOf("/images") < 0) {
                    pr_img = pr_img.split(".")
                    pr_img[pr_img.length - 2] += "_m"
                    pr_img = pr_img.join(".")
                }
                pr_img_html = profileHtmlConfig.pr_img.cleanReplace("___pr_img___", pr_img)
            } else if (parseInt(extractDataFromArray(DigitalBusinessPageTemplates, [QRPageComponents.selected_template, 'content', 0, 'remove_only_pr_img'], 0))) {
                pr_img_html = profileHtmlConfig.pr_img.cleanReplace("___pr_img___", '');
            }

            profileHtml = profileHtml.cleanReplace("___pr_img_html___", pr_img_html)
            profileHtml = profileHtml.cleanReplace("___pr_pic___", pr_img_html)

            let br_img_html = '';
            if (parseInt(extractDataFromArray(data, ['enable_br'], 1)) && parseInt(extractDataFromArray(DigitalBusinessPageTemplates, [QRPageComponents.selected_template, 'content', 0, 'show_brand_img'], 0))) {
                br_img_html = profileHtmlConfig.br_img.cleanReplace("___br_img___", extractDataFromArray(data, ['br_img'], ''))
            } else if (parseInt(extractDataFromArray(DigitalBusinessPageTemplates, [QRPageComponents.selected_template, 'content', 0, 'remove_only_br_img'], 0))) {
                br_img_html = profileHtmlConfig.br_img.cleanReplace("___br_img___", '');
            }

            profileHtml = profileHtml.cleanReplace("___br_img_html___", br_img_html)

            let pr_bg_img_html = '';
            if (parseInt(extractDataFromArray(data, ['enable_pr_bg'], 1)) && parseInt(extractDataFromArray(DigitalBusinessPageTemplates, [QRPageComponents.selected_template, 'content', 0, 'show_pr_bg_img'], 0))) {
                pr_bg_img_html = profileHtmlConfig.pr_bg_img.cleanReplace("___pr_bg_img___", extractDataFromArray(data, ['pr_bg_img'], ''))
            } else if (parseInt(extractDataFromArray(DigitalBusinessPageTemplates, [QRPageComponents.selected_template, 'content', 0, 'remove_only_pr_bg_img'], 0))) {
                pr_bg_img_html = profileHtmlConfig.pr_bg_img.cleanReplace("___pr_bg_img___", '');
            }

            profileHtml = profileHtml.cleanReplace("___pr_bg_img_html___", pr_bg_img_html)

            profileHtml = profileHtml.cleanReplace("___name___", extractDataFromArray(data, ['name'], ''))
            profileHtml = profileHtml.cleanReplace("___desc___", extractDataFromArray(data, ['desc'], ''))
            profileHtml = profileHtml.cleanReplace("___company___", extractDataFromArray(data, ['company'], ''))

            let shortcut = '';
            extractDataFromArray(data, ['contact_shortcuts'], []).forEach((item, index) => {
                data['contact_shortcuts'][index]['_id'] = typeof data['contact_shortcuts'][index]['_id'] == 'undefined' ? QRPageComponents.getUniqueId() : data['contact_shortcuts'][index]['_id'];
            })

            if (parseInt(extractDataFromArray(data, ['contact_shortcut_enable'], 0))) {
                let shortcutItemHtml = ''
                extractDataFromArray(data, ['contact_shortcuts'], []).forEach(item => {
                    let linkHtml = profileHtmlConfig.item.cleanReplace('___item_link___', HrefLinks(item.type, item.value))
                    linkHtml = linkHtml.cleanReplace('___item_icon___', QRPageComponentWrapper.contactOptions[item.type].icon)
                    shortcutItemHtml += linkHtml
                })
                shortcut = profileHtmlConfig.shortcut.cleanReplace('___shortcut_items___', shortcutItemHtml)
            }
            profileHtml = profileHtml.cleanReplace("___shortcut_html___", shortcut)
            // profileHtml = profileHtml.cleanReplace(/qr_cc_card/g, getCardClass(data))
            return profileHtml;
        },
        default: {
            component: 'profile',
            pr_img: '/images/digitalCard/profilepic.jpg',
            name: 'Name',
            desc: 'Job Title',
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
        getColumnNames: function(component_index, columns, samples, component) {
            let component_order = component_index + "."
            columns.push(component_order + "Profile Name")
            samples.push(extractDataFromArray(component, ['name'], ''))

            columns.push(component_order + "Profile Heading")
            samples.push(extractDataFromArray(component, ['desc'], ''))

            columns.push(component_order + "Profile Sub Heading")
            samples.push(extractDataFromArray(component, ['company'], ''))

            // columns.push(component_order + "Show Profile Image")
            // samples.push(extractDataFromArray(component, ['enable_pr'], 1) ? 'Y' : 'N')

            if (parseInt(extractDataFromArray(component, ['enable_pr'], 1))) {
                columns.push(component_order + "Profile Image")
                samples.push(extractDataFromArray(component, ['pr_img'], ''))
            }

            // columns.push(component_order + "Show Profile Shortcuts")
            // samples.push(extractDataFromArray(component, ['contact_shortcut_enable'], 1) ? 'Y' : 'N')

            if (parseInt(extractDataFromArray(component, ['contact_shortcut_enable'], 1))) {

                extractDataFromArray(component, ['contact_shortcuts'], []).forEach((shortcut, index) => {
                    columns.push(component_order + "Profile Shortcut:" + (index + 1) + ".type")
                    samples.push(extractDataFromArray(shortcut, ['type'], ''))

                    columns.push(component_order + "Profile Shortcut:" + (index + 1) + ".value")
                    samples.push(extractDataFromArray(shortcut, ['value'], ''))
                })
            }
        }
    },
    event_profile: {
        getInputWrapperHtml: function(data, index) {
            return QRPageComponentWrapper.getImageUploader('Event Photo', [extractDataFromArray(data, ['pr_img'], '')], '(400x133px, 3:1 Ratio)', '', 1, extractDataFromArray(data, ['enable_pr'], 1)) +
                QRPageComponentWrapper.getInputText('Customer Name', 'name', extractDataFromArray(data, ['name'], ''))
                // + QRPageComponentWrapper.getInputText('Customer Email to Send Ticket', 'cust_email', extractDataFromArray(data, ['cust_email'], ''), 6)
                +
                QRPageComponentWrapper.getInputText('Event Name', 'event_name', extractDataFromArray(data, ['event_name'], ''), 6) +
                QRPageComponentWrapper.getInputText('Description', 'desc', extractDataFromArray(data, ['desc'], ''), 6) +
                `<div class="col-md-12 mt-3"><div class="mr-2 mb-2 d-inline">QR Code on ticket</div>` + QRPageComponentWrapper.getSwitcheryButton("qr_enable", extractDataFromArray(data, ['qr_enable'], 1)) + "</div>"
        },
        title: 'Ticket Details',
        listeners: function(index) {},
        getInputData: function(index, parent) {
            let pr_img = $(parent).find(".img_uploaded_card.selected_img").css("background-image")
            if (!empty(pr_img)) {
                pr_img = pr_img.split('"')[1]
            }
            return {
                pr_img,
                name: $(parent).find('input[name=name]').val(),
                desc: $(parent).find('input[name=desc]').val(),
                event_name: $(parent).find('input[name=event_name]').val(),
                cust_email: $(parent).find('input[name=cust_email]').val(),
                enable_pr: $(parent).find("input[name=enable_pr]").prop("checked") ? 1 : 0,
                qr_enable: $(parent).find("input[name=qr_enable]").prop("checked") ? 1 : 0,
            }
        },
        getPreviewHtml: function(data) {
            let profileHtmlConfig = getComponentHtmlFromTemplate(QRPageComponents.selected_template, 'event_profile')
            QRPageComponents.profile_name = extractDataFromArray(data, ['name'], '')
            let profileHtml = profileHtmlConfig.main;
            let prImg = '';
            if (parseInt(extractDataFromArray(data, ['enable_pr'], 1))) {
                prImg = profileHtmlConfig.pr_img.cleanReplace("___pr_img___", extractDataFromArray(data, ['pr_img'], ''))
            }
            profileHtml = profileHtml.cleanReplace("___pr_img_html___", prImg)
            profileHtml = profileHtml.cleanReplace("___event_name___", extractDataFromArray(data, ['event_name'], ''))
            profileHtml = profileHtml.cleanReplace("___event_desc___", extractDataFromArray(data, ['desc'], ''))

            let qr_code = ''
            if (!empty(extractDataFromArray(data, ['qr_enable'], 1))) {
                qr_code = profileHtmlConfig.qr_code.cleanReplace("___name___", extractDataFromArray(data, ['name'], ''))
                // qr_code = qr_code.cleanReplace("___name___", extractDataFromArray(data, ['name'], ''))
            }
            profileHtml = profileHtml.cleanReplace("___qr_code___", qr_code)
            // profileHtml = profileHtml.cleanReplace("___qr_img___", extractDataFromArray(data, ['company'], ''))

            // profileHtml = profileHtml.cleanReplace(/qr_cc_card/g, getCardClass(data))
            return profileHtml;
        },
        default: {
            component: 'profile',
            pr_img: '/images/digitalCard/profilepic.jpg',
            name: 'Name',
            desc: 'Job Title',
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
        }
    },
    social_link: {
        socialLinks: {
            facebook: {
                title: 'Facebook',
                icon: '/images/digitalCard/fb_icon@72x.png'
            },
            instagram: {
                title: 'Instagram',
                icon: '/images/digitalCard/insta_icon@72x.png'
            },
            linkedin: {
                title: 'LinkedIn',
                icon: '/images/digitalCard/linkedin_icon@72x.png'
            },
            twitter: {
                title: 'Twitter',
                icon: '/images/digitalCard/tw_icon@72x.png'
            },
            skype: {
                title: 'Skype',
                icon: '/images/digitalCard/skype_icon.png'
            },
            behance: {
                title: 'Behance',
                icon: '/images/digitalCard/behance_icon.png'
            },
            snapchat: {
                title: 'Snapchat',
                icon: '/images/digitalCard/snapchat_icon@72x.png'
            },
            xing: {
                title: 'Xing',
                icon: '/images/digitalCard/xing_icon.png'
            },
            youtube: {
                title: 'YouTube',
                icon: '/images/digitalCard/youtube_icon@72x.png'
            },
            weburl: {
                title: 'Webpage',
                icon: '/images/digitalCard/website_icon.png'
            },
            website: {
                title: 'Webpage',
                icon: '/images/digitalCard/website_icon.png'
            },
            whatsapp: {
                title: 'Whatsapp',
                icon: '/images/digitalCard/whatsapp_icon@72x.png'
            },
            pinterest: {
                title: 'Pinterest',
                icon: '/images/digitalCard/pin_icon@72x.png'
            },
            location: {
                title: 'Location',
                icon: '/images/digitalCard/location_icon.png'
            },
            email: {
                title: 'Email',
                icon: '/images/digitalCard/email_icon.png'
            },
            telegram: {
                title: 'Telegram',
                icon: '/images/digitalCard/telegram_icon@72x.png'
            },
            tiktok: {
                title: 'TikTok',
                icon: '/images/digitalCard/tiktok_icon.png'
            }
        },
        getSocialLinkItem: function(data) {
            let optionsHtml = '';
            Object.keys(ComponentLists.social_link.socialLinks).forEach(option => {
                if (option == 'weburl') {
                    return;
                }
                optionsHtml += '<option value="' + option + '" ' + (option == data.type ? 'selected' : '') + '>' + ComponentLists.social_link.socialLinks[option].title + '</option>'
            })
            // console.log(optionsHtml)


            return `<div class="list-group-item social_link_input_wrapper subcomponent_sortable_wrapper mb-4" >
                        <div class="action_buttons">
                            <a class="btn btn_delete_pro_card"><i class="text-danger icon-delete_1"></i></a>
                            <a class="btn handle-social-link"><i class="icon-drag_1"></i></a>
                        </div>
                        <div class=""></div>
                        <div class="input-group my-3">
                            <div class="input-group-prepend">
                                <select class="form-control select2_no_search social_media_select" name="type" >` + optionsHtml + `</select>
                            </div>
                            <input type="text" class="form-control" name="url" value="` + data.url + `" placeholder="URL">
                        </div>
                        <div class="row">
                            ` + QRPageComponentWrapper.getImageUploader('', [extractDataFromArray(data, ['icon_img'], extractDataFromArray(ComponentLists, ['social_link', 'socialLinks', extractDataFromArray(data, ['type'], ''), 'icon'], ''))]) + `
                        </div>
                        <div class="row">
                            ` + QRPageComponentWrapper.getInputText("Title", "title", data.title, 6) + `
                            ` + QRPageComponentWrapper.getInputText("Subtitle", "subtitle", data.subtitle, 6, 'subtitle_enable', data.subtitle_enable) + `
                        </div>
                    </div>`

        },
        getInputWrapperHtml: function(data, index) {


            function getDraggableLinkWrapper(data) {
                let links = extractDataFromArray(data, ['links'], [])
                let linksHtml = '';
                links.forEach(link => {
                    linksHtml += ComponentLists.social_link.getSocialLinkItem(link)
                })
                return QRPageComponentWrapper.getTitleDescSection(extractDataFromArray(data, ['title'], ''), extractDataFromArray(data, ['desc'], ''), parseInt(extractDataFromArray(data, ['header_enable'], 0))) +
                    `<div class="col-md-12 px-3">
                    <div class="row mx-0 list-group mt-3" id="social_link_container_` + index + `">
                        ` + linksHtml + `
                    </div>
                    <div class="row mx-0 mt-2 btn_add_social_link" >
                        <button class="btn btn-outline-primary" ><i class="icon-add_1"></i>Add Link</button>
                    </div>
                </div>`

            }


            return getDraggableLinkWrapper(data)
        },
        title: 'Social Links',
        listeners: function(index) {
            new Sortable(document.getElementById('social_link_container_' + index), {
                handle: '.handle-social-link', // handle class
                animation: 150,
                ghostClass: 'blue-background-class',
                onEnd: function(e) {
                    // debugger
                    QRPageComponents.handleInputChange(e)
                }
            });
        },
        getInputData: function(index, parent) {
            let header = QRPageComponentWrapper.getTitleDescSectionData(parent)
            let links = [];
            Array.from($(parent).find(".social_link_input_wrapper")).forEach(ele => {
                let icon_img = $(ele).find(".img_uploaded_card.selected_img").css("background-image")
                if (!empty(icon_img)) {
                    icon_img = icon_img.split('"')[1]
                }
                links.push({
                    type: $(ele).find("select").val(),
                    url: $(ele).find("input[name=url]").val(),
                    title: $(ele).find("input[name=title]").val(),
                    subtitle: $(ele).find("input[name=subtitle]").val(),
                    subtitle_enable: $(ele).find("input[name=subtitle_enable]").prop('checked') ? 1 : 0,
                    icon_img
                })
            })
            return {
                ...header,
                links,
            }
        },
        getPreviewHtml: function(data) {
            let socialLinksHtmlConfig = getComponentHtmlFromTemplate(QRPageComponents.selected_template, 'social_link')

            let main = socialLinksHtmlConfig.main

            let header = '';
            if (parseInt(extractDataFromArray(data, ['header_enable'], 0))) {
                header = socialLinksHtmlConfig.header.cleanReplace('___title___', extractDataFromArray(data, ['title'], ''))
                header = header.cleanReplace('___desc___', extractDataFromArray(data, ['desc'], ''))
                // main = main.cleanReplace("___header____", header)
            }

            function getLinkHtml(link_data, index) {
                if (empty(link_data)) {
                    return '<li class="qr_cc_card no_data">' + header + '</li>'
                }
                let linkHtml = socialLinksHtmlConfig.item;

                if (index > 0) {
                    header = '';
                }
                linkHtml = linkHtml.cleanReplace("____header___", header)
                let subtitle = '';
                if (parseInt(extractDataFromArray(link_data, ['subtitle_enable'], 0))) {
                    subtitle = socialLinksHtmlConfig.subtitle.cleanReplace('___subtitle___', extractDataFromArray(link_data, ['subtitle'], ''))
                }
                linkHtml = linkHtml.cleanReplace("___item_subtitle___", subtitle)

                // let link_url = extractDataFromArray(link_data, ['type'], '') == 'email' ? 'mailto:'+extractDataFromArray(link_data, ['url'], '') : checkAndAdjustURL(extractDataFromArray(link_data, ['url'], ''));
                let link_url = HrefLinks(extractDataFromArray(link_data, ['type'], ''), extractDataFromArray(link_data, ['url'], ''));
                linkHtml = linkHtml.cleanReplace("___item_url___", link_url)
                linkHtml = linkHtml.cleanReplace("___item_title___", extractDataFromArray(link_data, ['title'], ''))
                let icon_img = extractDataFromArray(link_data, ['icon_img'], '')
                icon_img = empty(icon_img) ? extractDataFromArray(ComponentLists, ['social_link', 'socialLinks', extractDataFromArray(link_data, ['type'], ''), 'icon'], '') : icon_img;
                linkHtml = linkHtml.cleanReplace("___item_icon___", icon_img)

                return linkHtml
            }

            let linkHtml = ''
            let links = extractDataFromArray(data, ['links'], [])
            links = empty(links) ? [{}] : links;
            links.forEach((item, index) => {
                if (!empty(item)) {
                    data['links'][index]['_id'] = typeof data['links'][index]['_id'] == 'undefined' ? QRPageComponents.getUniqueId() : data['links'][index]['_id'];
                    linkHtml += getLinkHtml(item, index)
                }
            })

            main = main.cleanReplace('___link_item___', linkHtml)
            return main.cleanReplace(/qr_cc_card/g, getCardClass(data))
        },
        default: {
            component: 'social_link',
            header_enable: 1,
            title: 'Social Links',
            desc: 'Description',
            links: [{
                    type: "facebook",
                    url: "",
                    title: "Title",
                    subtitle: "Follow us",
                    subtitle_enable: 1,
                    icon_img: "/images/digitalCard/fb_icon@72x.png"
                },
                {
                    type: "instagram",
                    url: "",
                    title: "Instagram",
                    subtitle: "Follow us",
                    subtitle_enable: 0,
                    icon_img: "/images/digitalCard/insta_icon@72x.png"
                },
            ]
        },
        getColumnNames: function(component_index, columns, samples, component) {
            let component_order = component_index + "."

            if (parseInt(extractDataFromArray(component, ['header_enable'], 1))) {
                columns.push(component_order + "Card title")
                samples.push(extractDataFromArray(component, ['title'], ''))

                columns.push(component_order + "Card Description")
                samples.push(extractDataFromArray(component, ['desc'], ''))
            }

            extractDataFromArray(component, ['links'], []).forEach((link, index) => {
                let prefix = component_order + "Social Link:" + (index + 1)
                columns.push(prefix + ".type")
                samples.push(extractDataFromArray(link, ['type'], ''))

                columns.push(prefix + ".title")
                samples.push(extractDataFromArray(link, ['title'], ''))


                if (parseInt(extractDataFromArray(link, ['subtitle_enable'], 1))) {
                    columns.push(prefix + ".subtitle")
                    samples.push(extractDataFromArray(link, ['subtitle'], ''))
                }

                columns.push(prefix + ".icon_img")
                samples.push(extractDataFromArray(link, ['icon_img'], ''))

                columns.push(prefix + ".url")
                samples.push(extractDataFromArray(link, ['url'], ''))
            })
        }
    },
    pdf_gallery: {
        getPDFItem: function(data) {
            // console.log(optionsHtml)


            return `<div class="list-group-item pdf_gallery_input_wrapper subcomponent_sortable_wrapper mb-4" >
                        <div class="action_buttons">
                            <a class="btn btn_delete_pro_card"><i class="text-danger icon-delete_1"></i></a>
                            <a class="btn handle-social-link"><i class="icon-drag_1"></i></a>
                        </div>
                        <div class="my-2">PDF URL <span>(Please enter the PDF URL or upload)</span></div>
                        <div class="row">
                            <div class="col-md-9 pr-0">
                                <input type="text" class="form-control" name="url" value="` + data.url + `" placeholder="URL">
                            </div>
                            <div class="col-md-1 px-0 d-flex align-items-center justify-content-center">
                                <span style=" margin-bottom: 12px; ">or</span>
                            </div>
                            <div class="col-md-2 pl-0" >
                                <button class="upload_pdfs btn btn-primary  p-2" type="button"><i class="icon-file_upload_1 mr-1"></i>Upload</button>
                            </div>
                        </div>
                        <div class="row">
                            ` + QRPageComponentWrapper.getImageUploader('PDF Thumbnail', [extractDataFromArray(data, ['icon_img'], ComponentLists.pdf_gallery.default.pdfs[0].icon_img)], '(250x250px, 1:1 Ratio)') + `
                        </div>
                        <div class="row">
                            ` + QRPageComponentWrapper.getInputText("Title", "title", data.title, 6) + `
                            ` + QRPageComponentWrapper.getInputText("Subtitle", "subtitle", data.subtitle, 6, 'subtitle_enable', data.subtitle_enable) + `
                        </div>
                    </div>`

        },
        getInputWrapperHtml: function(data, index) {


            function getDraggableLinkWrapper(data) {
                let pdfs = extractDataFromArray(data, ['pdfs'], [])
                let pdfsHtml = '';
                pdfs.forEach(pdf => {
                    pdfsHtml += ComponentLists.pdf_gallery.getPDFItem(pdf)
                })
                return QRPageComponentWrapper.getTitleDescSection(extractDataFromArray(data, ['title'], ''), extractDataFromArray(data, ['desc'], ''), parseInt(extractDataFromArray(data, ['header_enable'], 0))) +
                    `<div class="col-md-12 px-3">
                    <div class="row mx-0 list-group mt-3" id="pdf_gallery_container_` + index + `">
                        ` + pdfsHtml + `
                    </div>
                    <div class="row mx-0 mt-2 btn_add_pdf_gallery" >
                        <button class="btn btn-outline-primary" ><i class="icon-add_1"></i>Add Link</button>
                    </div>
                </div>`

            }


            return getDraggableLinkWrapper(data)
        },
        title: 'PDF Gallery',
        listeners: function(index) {
            new Sortable(document.getElementById('pdf_gallery_container_' + index), {
                handle: '.handle-social-link', // handle class
                animation: 150,
                ghostClass: 'blue-background-class',
                onEnd: function(e) {
                    // debugger
                    QRPageComponents.handleInputChange(e)
                }
            });
        },
        getInputData: function(index, parent) {
            let header = QRPageComponentWrapper.getTitleDescSectionData(parent)
            let pdfs = [];
            Array.from($(parent).find(".pdf_gallery_input_wrapper")).forEach(ele => {
                let icon_img = $(ele).find(".img_uploaded_card.selected_img").css("background-image")
                if (!empty(icon_img)) {
                    icon_img = icon_img.split('"')[1]
                }
                pdfs.push({
                    url: $(ele).find("input[name=url]").val(),
                    title: $(ele).find("input[name=title]").val(),
                    subtitle: $(ele).find("input[name=subtitle]").val(),
                    subtitle_enable: $(ele).find("input[name=subtitle_enable]").prop('checked') ? 1 : 0,
                    icon_img
                })
            })
            return {
                ...header,
                pdfs,
            }
        },
        getPreviewHtml: function(data) {
            let pdfGalleryHtmlConfig = getComponentHtmlFromTemplate(QRPageComponents.selected_template, 'pdf_gallery')

            let main = pdfGalleryHtmlConfig.main

            let header = '';
            if (parseInt(extractDataFromArray(data, ['header_enable'], 0))) {
                header = pdfGalleryHtmlConfig.header.cleanReplace('___title___', extractDataFromArray(data, ['title'], ''))
                header = header.cleanReplace('___desc___', extractDataFromArray(data, ['desc'], ''))
                // main = main.cleanReplace("___header____", header)
            }

            function getPDFHtml(pdf_data, index) {
                if (empty(pdf_data)) {
                    return '<li class="qr_cc_card no_data">' + header + '</li>'
                }
                let pdfHtml = pdfGalleryHtmlConfig.item;

                if (index > 0) {
                    header = '';
                }
                pdfHtml = pdfHtml.cleanReplace("____header___", header)
                let subtitle = '';
                if (parseInt(extractDataFromArray(pdf_data, ['subtitle_enable'], 0))) {
                    subtitle = pdfGalleryHtmlConfig.subtitle.cleanReplace('___subtitle___', extractDataFromArray(pdf_data, ['subtitle'], ''))
                }
                pdfHtml = pdfHtml.cleanReplace("___item_subtitle___", subtitle)

                // let link_url = extractDataFromArray(pdf_data, ['type'], '') == 'email' ? 'mailto:'+extractDataFromArray(pdf_data, ['url'], '') : checkAndAdjustURL(extractDataFromArray(pdf_data, ['url'], ''));
                let link_url = HrefLinks(extractDataFromArray(pdf_data, ['type'], ''), extractDataFromArray(pdf_data, ['url'], ''));
                pdfHtml = pdfHtml.cleanReplace("___item_url___", link_url)
                pdfHtml = pdfHtml.cleanReplace("___item_title___", extractDataFromArray(pdf_data, ['title'], ''))
                let icon_img = extractDataFromArray(pdf_data, ['icon_img'], '')
                icon_img = empty(icon_img) ? extractDataFromArray(ComponentLists, ['social_link', 'socialLinks', extractDataFromArray(pdf_data, ['type'], ''), 'icon'], '') : icon_img;
                pdfHtml = pdfHtml.cleanReplace("___item_icon___", icon_img)

                return pdfHtml
            }

            let pdfHtml = ''
            let pdfs = extractDataFromArray(data, ['pdfs'], [])
            pdfs = empty(pdfs) ? [{}] : pdfs;
            pdfs.forEach((item, index) => {
                if (!empty(item)) {
                    data['pdfs'][index]['_id'] = typeof data['pdfs'][index]['_id'] == 'undefined' ? QRPageComponents.getUniqueId() : data['pdfs'][index]['_id'];
                    pdfHtml += getPDFHtml(item, index)
                }
            })

            main = main.cleanReplace('___link_item___', pdfHtml)
            return main.cleanReplace(/qr_cc_card/g, getCardClass(data))
        },
        default: {
            component: 'pdf_gallery',
            header_enable: 1,
            title: 'PDF Gallery',
            desc: 'Description',
            pdfs: [{
                    url: "",
                    title: "PDF 1",
                    subtitle: "PDF Description",
                    subtitle_enable: 1,
                    icon_img: "/images/pdf_icon.png"
                },
                {
                    url: "",
                    title: "PDF 1",
                    subtitle: "PDF Description",
                    subtitle_enable: 1,
                    icon_img: "/images/pdf_icon.png"
                },
            ]
        },
        getColumnNames: function(component_index, columns, samples, component) {
            let component_order = component_index + "."

            if (parseInt(extractDataFromArray(component, ['header_enable'], 1))) {
                columns.push(component_order + "Card title")
                samples.push(extractDataFromArray(component, ['title'], ''))

                columns.push(component_order + "Card Description")
                samples.push(extractDataFromArray(component, ['desc'], ''))
            }

            extractDataFromArray(component, ['links'], []).forEach((link, index) => {
                let prefix = component_order + "Social Link:" + (index + 1)
                columns.push(prefix + ".type")
                samples.push(extractDataFromArray(link, ['type'], ''))

                columns.push(prefix + ".title")
                samples.push(extractDataFromArray(link, ['title'], ''))


                if (parseInt(extractDataFromArray(link, ['subtitle_enable'], 1))) {
                    columns.push(prefix + ".subtitle")
                    samples.push(extractDataFromArray(link, ['subtitle'], ''))
                }

                columns.push(prefix + ".icon_img")
                samples.push(extractDataFromArray(link, ['icon_img'], ''))

                columns.push(prefix + ".url")
                samples.push(extractDataFromArray(link, ['url'], ''))
            })
        }
    },
    custom_fields: {
        getCustomFieldHtml: function(data) {

            return `<div class="list-group-item custom_field_input_wrapper subcomponent_sortable_wrapper mb-4" >
                        <div class="action_buttons">
                            <a class="btn btn_delete_pro_card"><i class="text-danger icon-delete_1"></i></a>
                            <a class="btn handle-custom-field"><i class="icon-drag_1"></i></a>
                        </div>
                        <div class=""></div>
                        <div class="row">
                            ` + QRPageComponentWrapper.getInputText("", "key", data.key, 6) + `
                            ` + QRPageComponentWrapper.getInputText("", "val", data.val, 6) + `
                        </div>
                    </div>`
        },
        getInputWrapperHtml: function(data, index) {
            function getCustomFields(data) {
                let fields = extractDataFromArray(data, ['fields'], [])
                let fieldsHtml = '';
                fields.forEach(field => {
                    fieldsHtml += ComponentLists.custom_fields.getCustomFieldHtml(field)
                })
                return `<div class="col-md-12 px-3 ">
                        <div class="row mx-0 list-group mt-3" id="custom_field_container_` + index + `">
                                ` + fieldsHtml + `
                            </div>
                            <div class="row mx-0 mt-2" >
                                <button class="btn btn-outline-primary btn_add_custom_field" ><i class="icon-add_1"></i>Add</button>
                            </div>
                        </div>`

            }


            return QRPageComponentWrapper.getTitleDescSection(extractDataFromArray(data, ['title'], ''), extractDataFromArray(data, ['desc'], ''), parseInt(extractDataFromArray(data, ['header_enable'], 0))) +
                getCustomFields(data)
        },
        title: 'Other Details',
        listeners: function(index) {
            new Sortable(document.getElementById('custom_field_container_' + index), {
                handle: '.handle-custom-field', // handle class
                animation: 150,
                ghostClass: 'blue-background-class',
                onEnd: function(e) {
                    // debugger
                    QRPageComponents.handleInputChange(e)
                }
            });
        },
        getInputData: function(index, parent) {
            let header = QRPageComponentWrapper.getTitleDescSectionData(parent)
            let fields = [];
            Array.from($(parent).find(".custom_field_input_wrapper")).forEach(ele => {
                fields.push({
                    key: $(ele).find("input[name=key]").val(),
                    val: $(ele).find("input[name=val]").val()
                })
            })
            return {
                ...header,
                fields,
            }
        },
        getPreviewHtml: function(data) {
            let customFieldsHtmlConfig = getComponentHtmlFromTemplate(QRPageComponents.selected_template, 'custom_fields')

            let main = customFieldsHtmlConfig.main

            let header = '';
            if (parseInt(extractDataFromArray(data, ['header_enable'], 0))) {
                header = customFieldsHtmlConfig.header.cleanReplace('___title___', extractDataFromArray(data, ['title'], ''))
                header = header.cleanReplace('___desc___', extractDataFromArray(data, ['desc'], ''))
                // main = main.cleanReplace("___header____", header)
            }

            function getLinkHtml(data, index) {
                let fieldHtml = customFieldsHtmlConfig.item;
                fieldHtml = fieldHtml.cleanReplace("___key___", extractDataFromArray(data, ['key'], ''))
                return fieldHtml.cleanReplace("___val___", extractDataFromArray(data, ['val'], ''))


            }

            main = main.cleanReplace("___header___", header)
            let fieldsHtml = ''
            let fields = extractDataFromArray(data, ['fields'], [])
            data['fields'] = empty(fields) ? [{}] : fields;
            data['fields'].forEach((item, index) => {
                data['fields'][index]['_id'] = typeof data['fields'][index]['_id'] == 'undefined' ? QRPageComponents.getUniqueId() : data['fields'][index]['_id'];
                fieldsHtml += getLinkHtml(item, index)
            })

            main = main.cleanReplace('___field_items___', fieldsHtml)
            return main.cleanReplace(/qr_cc_card/g, getCardClass(data))

            // function getLinkHtml(link_data) {
            //     let subtitle = '';
            //     if (parseInt(extractDataFromArray(link_data, ['subtitle_enable'], 0))) {
            //         subtitle = `<div class="qrc_social_text_discription">
            //                         `+ extractDataFromArray(link_data, ['subtitle'], '') + `
            //                     </div>`;
            //     }
            //     return `<a href="` + extractDataFromArray(link_data, ['url'], '') + `">
            //                 <div class="qrc_social_icon" style="background-image:url('`+ extractDataFromArray(link_data, ['icon_img'], '') + `');"></div>
            //                 <div class="qrc_social_text">
            //                     <div class="qrc_social_text_heading">`+ extractDataFromArray(link_data, ['title'], '') + `</div>
            //                     `+ subtitle + `
            //                 </div>
            //                 <div class="qrc_social_action">
            //                         <span class="icon-right_arrow"></span>
            //                 </div>
            //             </a>`
            // }
            // let header = '';
            // if (parseInt(extractDataFromArray(data, ['header_enable'], 0))) {
            //     header = ` <div class="qrc_heading">
            //     <h2>`+ extractDataFromArray(data, ['title'], '') + `</h2>
            //     <p>`+ extractDataFromArray(data, ['desc'], '') + `</p>
            //     </div>`;
            // }
            // let linkHtml = ''
            // extractDataFromArray(data, ['links'], []).forEach((item, index) => {
            //     if (index > 0) {
            //         linkHtml += '<li>' + getLinkHtml(item) + '</li>'
            //     }
            // })

            // return ` <div class="section qrc_social_links">
            //             <ul class="qrc_social_links_list">
            //                 <li>
            //                     `+ header + `
            //                     `+ getLinkHtml(data.links[0]) + `
            //                 </li>
            //                 `+ linkHtml + `
            //             </ul>
            //         </div>`;
        },
        default: {
            component: 'custom_fields',
            header_enable: 1,
            title: 'Other Information',
            desc: '',
            fields: [{
                key: "Key",
                val: "Value"
            }]
        },
        getColumnNames: function(component_index, columns, samples, component) {
            let component_order = component_index + "."

            if (parseInt(extractDataFromArray(component, ['header_enable'], 1))) {
                columns.push(component_order + "Card title")
                samples.push(extractDataFromArray(component, ['title'], ''))

                columns.push(component_order + "Card Description")
                samples.push(extractDataFromArray(component, ['desc'], ''))
            }

            extractDataFromArray(component, ['fields'], []).forEach((field, index) => {
                let prefix = component_order + "Social Link:" + (index + 1)
                columns.push(index + ".key")
                samples.push(extractDataFromArray(field, ['key'], ''))

                columns.push(index + ".val")
                samples.push(extractDataFromArray(field, ['val'], ''))
            })
        }
    },
    web_links: {
        getLinkItem: function(data) {

            return `<div class="list-group-item web_link_input_wrapper subcomponent_sortable_wrapper mb-4" >
                        <div class="action_buttons">
                            <a class="btn btn_delete_pro_card"><i class="text-danger icon-delete_1"></i></a>
                            <a class="btn handle-web-link"><i class="icon-drag_1"></i></a>
                        </div>
                        <div class=""></div>
                        <div class="row">
                            ` + QRPageComponentWrapper.getInputText("Link", "url", data.url) + `
                        </div>
                        <div class="row">
                            ` + QRPageComponentWrapper.getImageUploader('', [extractDataFromArray(data, ['icon_img'], '/images/digitalCard/weblink.png')], '', '1:1 Ratio') + `
                        </div>
                        <div class="row">
                            ` + QRPageComponentWrapper.getInputText("Title", "title", data.title, 6) + `
                            ` + QRPageComponentWrapper.getInputText("Subtitle", "subtitle", data.subtitle, 6, 'subtitle_enable', data.subtitle_enable) + `
                        </div>
                    </div>`
        },
        getInputWrapperHtml: function(data, index) {
            function getDraggableLinkWrapper(data) {
                let links = extractDataFromArray(data, ['links'], [])
                let linksHtml = '';
                links.forEach(link => {
                    linksHtml += ComponentLists.web_links.getLinkItem(link)
                })
                return QRPageComponentWrapper.getTitleDescSection(extractDataFromArray(data, ['title'], ''), extractDataFromArray(data, ['desc'], ''), parseInt(extractDataFromArray(data, ['header_enable'], 0))) +
                    `<div class="col-md-12 px-3 ">
                        <div class="row mx-0 list-group mt-3" id="web_link_container_` + index + `">
                                ` + linksHtml + `
                            </div>
                            <div class="row mx-0 mt-2" >
                                <button class="btn btn-outline-primary btn_add_web_link" ><i class="icon-add_1"></i>Add Link</button>
                            </div>
                        </div>`

            }


            return getDraggableLinkWrapper(data)
        },
        title: 'Links',
        listeners: function(index) {
            new Sortable(document.getElementById('web_link_container_' + index), {
                handle: '.handle-web-link', // handle class
                animation: 150,
                ghostClass: 'blue-background-class',
                onEnd: function(e) {
                    // debugger
                    QRPageComponents.handleInputChange(e)
                }
            });
        },
        getInputData: function(index, parent) {
            let header = QRPageComponentWrapper.getTitleDescSectionData(parent)
            let links = [];
            Array.from($(parent).find(".web_link_input_wrapper")).forEach(ele => {
                let icon_img = $(ele).find(".img_uploaded_card.selected_img").css("background-image")
                if (!empty(icon_img)) {
                    icon_img = icon_img.split('"')[1]
                }
                links.push({
                    url: $(ele).find("input[name=url]").val(),
                    title: $(ele).find("input[name=title]").val(),
                    subtitle: $(ele).find("input[name=subtitle]").val(),
                    subtitle_enable: $(ele).find("input[name=subtitle_enable]").prop('checked') ? 1 : 0,
                    icon_img
                })
            })
            return {
                ...header,
                links,
            }
        },
        getPreviewHtml: function(data) {
            let socialLinksHtmlConfig = getComponentHtmlFromTemplate(QRPageComponents.selected_template, 'social_link')

            let main = socialLinksHtmlConfig.main

            let header = '';
            if (parseInt(extractDataFromArray(data, ['header_enable'], 0))) {
                header = socialLinksHtmlConfig.header.cleanReplace('___title___', extractDataFromArray(data, ['title'], ''))
                header = header.cleanReplace('___desc___', extractDataFromArray(data, ['desc'], ''))
                // main = main.cleanReplace("___header____", header)
            }

            function getLinkHtml(link_data, index) {
                if (empty(link_data)) {
                    return '<li class="qr_cc_card no_data">' + header + '</li>'
                }
                let linkHtml = socialLinksHtmlConfig.item;

                if (index > 0) {
                    header = '';
                }
                linkHtml = linkHtml.cleanReplace("____header___", header)
                let subtitle = '';
                if (parseInt(extractDataFromArray(link_data, ['subtitle_enable'], 0))) {
                    subtitle = socialLinksHtmlConfig.subtitle.cleanReplace('___subtitle___', extractDataFromArray(link_data, ['subtitle'], ''))
                }
                linkHtml = linkHtml.cleanReplace("___item_subtitle___", subtitle)
                linkHtml = linkHtml.cleanReplace("___item_url___", checkAndAdjustURL(extractDataFromArray(link_data, ['url'], '')))
                linkHtml = linkHtml.cleanReplace("___item_title___", extractDataFromArray(link_data, ['title'], ''))
                linkHtml = linkHtml.cleanReplace("___item_icon___", extractDataFromArray(link_data, ['icon_img'], ''))

                return linkHtml
            }

            let linkHtml = ''
            if (typeof data['links'] != 'undefined') {
                let links = extractDataFromArray(data, ['links'], [])
                links = empty(links) ? [] : links;
                links.forEach((item, index) => {
                    if (typeof data['links'][index] == 'undefined') data['links'][index] = [];
                    data['links'][index]['_id'] = typeof data['links'][index]['_id'] == 'undefined' ? QRPageComponents.getUniqueId() : data['links'][index]['_id'];
                    linkHtml += getLinkHtml(item, index)
                })
            }
            main = main.cleanReplace('___link_item___', linkHtml)
            return main.cleanReplace(/qr_cc_card/g, getCardClass(data))

            // function getLinkHtml(link_data) {
            //     let subtitle = '';
            //     if (parseInt(extractDataFromArray(link_data, ['subtitle_enable'], 0))) {
            //         subtitle = `<div class="qrc_social_text_discription">
            //                         `+ extractDataFromArray(link_data, ['subtitle'], '') + `
            //                     </div>`;
            //     }
            //     return `<a href="` + extractDataFromArray(link_data, ['url'], '') + `">
            //                 <div class="qrc_social_icon" style="background-image:url('`+ extractDataFromArray(link_data, ['icon_img'], '') + `');"></div>
            //                 <div class="qrc_social_text">
            //                     <div class="qrc_social_text_heading">`+ extractDataFromArray(link_data, ['title'], '') + `</div>
            //                     `+ subtitle + `
            //                 </div>
            //                 <div class="qrc_social_action">
            //                         <span class="icon-right_arrow"></span>
            //                 </div>
            //             </a>`
            // }
            // let header = '';
            // if (parseInt(extractDataFromArray(data, ['header_enable'], 0))) {
            //     header = ` <div class="qrc_heading">
            //     <h2>`+ extractDataFromArray(data, ['title'], '') + `</h2>
            //     <p>`+ extractDataFromArray(data, ['desc'], '') + `</p>
            //     </div>`;
            // }
            // let linkHtml = ''
            // extractDataFromArray(data, ['links'], []).forEach((item, index) => {
            //     if (index > 0) {
            //         linkHtml += '<li>' + getLinkHtml(item) + '</li>'
            //     }
            // })

            // return ` <div class="section qrc_social_links">
            //             <ul class="qrc_social_links_list">
            //                 <li>
            //                     `+ header + `
            //                     `+ getLinkHtml(data.links[0]) + `
            //                 </li>
            //                 `+ linkHtml + `
            //             </ul>
            //         </div>`;
        },
        default: {
            component: 'web_links',
            header_enable: 1,
            title: 'Web Link',
            desc: 'Description',
            links: [{
                url: "",
                title: "URL",
                subtitle: "",
                subtitle_enable: 0,
                icon_img: "/images/digitalCard/weblink.png"
            }]
        },
        getColumnNames: function(component_index, columns, samples, component) {
            let component_order = component_index + "."

            if (parseInt(extractDataFromArray(component, ['header_enable'], 1))) {
                columns.push(component_order + "Card title")
                samples.push(extractDataFromArray(component, ['title'], ''))

                columns.push(component_order + "Card Description")
                samples.push(extractDataFromArray(component, ['desc'], ''))
            }

            extractDataFromArray(component, ['links'], []).forEach((link, index) => {
                let prefix = component_order + "Web Link:" + (index + 1)

                columns.push(prefix + ".title")
                samples.push(extractDataFromArray(link, ['title'], ''))


                if (parseInt(extractDataFromArray(link, ['subtitle_enable'], 1))) {
                    columns.push(prefix + ".subtitle")
                    samples.push(extractDataFromArray(link, ['subtitle'], ''))
                }

                columns.push(prefix + ".icon_img")
                samples.push(extractDataFromArray(link, ['icon_img'], ''))

                columns.push(prefix + ".url")
                samples.push(extractDataFromArray(link, ['url'], ''))
            })
        }
    },
    contact: {
        getContactInfoItem: function(data) {
            let contactInfoWrappers = {
                number: {
                    label: 'Contact Number',
                    getHtml: function(data) {
                        // `+ QRPageComponentWrapper.getInputText("Title", "title", data.title) + `
                        return `<div class="row">
                               
                                ` + QRPageComponentWrapper.getInputText("Label", "title", data.title, 6) + `
                                ` + QRPageComponentWrapper.getInputText("Number", "number", data.number, 6) + `
                            </div>`
                    }
                },
                email: {
                    label: 'Email',
                    getHtml: function(data) {
                        // `+ QRPageComponentWrapper.getInputText("Title", "title", data.title) + `
                        return `<div class="row">
                                ` + QRPageComponentWrapper.getInputText("Label", "title", data.title, 6) + `
                                ` + QRPageComponentWrapper.getInputText("Email", "email", data.email, 6) + `
                            </div>`
                    }
                },
                address: {
                    label: 'Address',
                    getHtml: function(data) {
                        return `<div class="row">
                                ` + QRPageComponentWrapper.getInputText("Label", "title", data.title) + `
                                ` + QRPageComponentWrapper.getInputText("Address Line 1", "street", extractDataFromArray(data, ['street'], ''), 6) + `
                                ` + QRPageComponentWrapper.getInputText("Address Line 2", "building", extractDataFromArray(data, ['building'], ''), 6) + `
                                ` + QRPageComponentWrapper.getInputText("City", "city", extractDataFromArray(data, ['city'], ''), 6) + `
                                ` + QRPageComponentWrapper.getInputText("State", "state", extractDataFromArray(data, ['state'], ''), 6) + `
                                ` + QRPageComponentWrapper.getInputText("Country", "country", extractDataFromArray(data, ['country'], ''), 6) + `
                                ` + QRPageComponentWrapper.getInputText("Zipcode", "zip", extractDataFromArray(data, ['zip'], ''), 6) + `
                                ` + QRPageComponentWrapper.getInputText("Action Button", "action_button_label", data.action_button_label, 6, 'action_button_enable', data.action_button_enable) +
                            QRPageComponentWrapper.getInputText("Google Map URL", "action_button_link", extractDataFromArray(data, ['action_button_link'], ''), 6) + `
                            </div>`
                    }
                },
            }

            let inputHtml = contactInfoWrappers[data.type].getHtml(data);

            return `<div class="list-group-item contact_info_input_wrapper subcomponent_sortable_wrapper mb-5" data-type="` + data.type + `">
                        <div class="contact_info_input_title">
                            ` + contactInfoWrappers[data.type].label + `
                        </div>
                        <div class="action_buttons">
                            <a class="btn btn_delete_pro_card"><i class="text-danger icon-delete_1"></i></a>
                            <a class="btn handle-contact_info"><i class="icon-drag_1"></i></a>
                        </div>
                        ` + inputHtml + `
                    </div>`
        },
        getInputWrapperHtml: function(data, index) {

            function getFloatingButtonWrapperHtml(data) {
                return `<div class="col-md-12 px-3 mt-2">
                            <div class="row mx-0">
                                <div class="mr-2 mb-2" > Floating button </div>` + QRPageComponentWrapper.getSwitcheryButton('floating_button_enable', extractDataFromArray(data, ['floating_button_enable'], 0)) + `
                            </div>
                            <div class="row mx-0 gray_card align-items-center" >
                                ` + QRPageComponentWrapper.getInputText('Button Text', 'floating_button_label', extractDataFromArray(data, ['floating_button_label'], ''), 6) + `
                                <div class="col-md-6 d-flex justify-content-end">
                                    <button class="btn bg-light floating_contact_button" type="button">
                                        <span class="floating_contact_button_text">` + extractDataFromArray(data, ['floating_button_label'], '') + `</span>
                                        <span class="add_contact_icon"><i class="icon-add_1"></i></span>
                                    </button>
                                </div>
                            </div> 
                        </div>`

            }

            function getDraggableContactsWrapper(data) {
                let contact_infos = extractDataFromArray(data, ['contact_infos'], [])
                let contactHtml = '';
                contact_infos.forEach(contact => {
                    contactHtml += ComponentLists.contact.getContactInfoItem(contact)
                })
                return `<div class="col-md-12 px-3 mt-2">
                            <div class="row mx-0 list-group mt-5" id="contact_info_container_` + index + `">
                                ` + contactHtml + `
                            </div>
                            <div class="row mx-0 mt-2" >
                                <div class="dropup">
                                    <button class="btn btn-outline-primary dropdown-toggle" type="button" id="btn_add_contact_component" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="icon-add_1"></i>Add
                                    </button>
                                    <div class="dropdown-menu add_contact_component" aria-labelledby="btn_add_contact_component">
                                        <a class="dropdown-item" href="" data-type="number">Number</a>
                                        <a class="dropdown-item" href="" data-type="email">Email</a>
                                        <a class="dropdown-item" href="" data-type="address">Address</a>
                                    </div>
                                </div>
                            </div>
                        </div>`

            }

            return QRPageComponentWrapper.getInputText('Title', 'contact_title', extractDataFromArray(data, ['contact_title'], '')) +
                QRPageComponentWrapper.getImageUploader('', [extractDataFromArray(data, ['icon_img'], '/images/digitalCard/contactus.png')], '1:1 Ratio') +
                getFloatingButtonWrapperHtml(data) +
                getDraggableContactsWrapper(data)
        },
        title: 'Contact Us',
        listeners: function(index) {
            new Sortable(document.getElementById('contact_info_container_' + index), {
                handle: '.handle-contact_info', // handle class
                animation: 150,
                ghostClass: 'blue-background-class',
                onEnd: function(e) {
                    // debugger
                    QRPageComponents.handleInputChange(e)
                }
            });
        },
        getInputData: function(index, parent) {
            let icon_img = $(parent).find(".img_uploaded_card.selected_img").css("background-image")
            if (!empty(icon_img)) {
                icon_img = icon_img.split('"')[1]
            }

            let contact_infos = [];
            Array.from($(parent).find(".contact_info_input_wrapper")).forEach(ele => {
                let contact_data = {
                    type: $(ele).data("type"),
                    title: $(ele).find("input[name=title]").val(),
                }

                if (contact_data.type == 'number') {
                    contact_data['label'] = $(ele).find("input[name=label]").val();
                    contact_data['number'] = $(ele).find("input[name=number]").val();
                } else if (contact_data.type == 'email') {
                    contact_data['label'] = $(ele).find("input[name=label]").val();
                    contact_data['email'] = $(ele).find("input[name=email]").val();
                } else if (contact_data.type == 'address') {
                    contact_data['street'] = $(ele).find("input[name=street]").val();
                    contact_data['building'] = $(ele).find("input[name=building]").val();
                    contact_data['city'] = $(ele).find("input[name=city]").val();
                    contact_data['state'] = $(ele).find("input[name=state]").val();
                    contact_data['country'] = $(ele).find("input[name=country]").val();
                    contact_data['zip'] = $(ele).find("input[name=zip]").val();
                    // contact_data['address'] = $(ele).find("textarea[name=address]").val();
                    contact_data['action_button_label'] = $(ele).find("input[name=action_button_label]").val();
                    contact_data['action_button_link'] = $(ele).find("input[name=action_button_link]").val();
                    contact_data['action_button_enable'] = $(ele).find("input[name=action_button_enable]").prop('checked') ? 1 : 0
                }

                contact_infos.push(contact_data)
            })
            return {
                contact_title: $(parent).find("input[name=contact_title]").val(),
                icon_img,
                floating_button_enable: $(parent).find("input[name=floating_button_enable]").prop('checked') ? 1 : 0,
                floating_button_label: $(parent).find("input[name=floating_button_label]").val(),
                contact_infos,
            }
        },
        getPreviewHtml: function(data) {

            let contactHtmlConfig = getComponentHtmlFromTemplate(QRPageComponents.selected_template, 'contact')
            let main = contactHtmlConfig.main.cleanReplace("___title___", extractDataFromArray(data, ['contact_title'], ''))
            main = main.cleanReplace("___icon_img___", extractDataFromArray(data, ['icon_img'], ''))
            let contactInfoHtml = ''
            extractDataFromArray(data, ['contact_infos'], []).forEach((item, index) => {
                data['contact_infos'][index]['_id'] = typeof data['contact_infos'][index]['_id'] == 'undefined' ? QRPageComponents.getUniqueId() : data['contact_infos'][index]['_id'];
                let itemHtml = '';
                if (item.type == 'number') {
                    itemHtml = contactHtmlConfig.number.cleanReplace("___title___", item.title)
                    itemHtml = itemHtml.cleanReplace("___number___", item.number)
                } else if (item.type == 'email') {
                    itemHtml = contactHtmlConfig.email.cleanReplace("___title___", item.title)
                    itemHtml = itemHtml.cleanReplace("___email___", item.email)
                } else if (item.type == 'address') {

                    let actionButton = '';
                    if (!empty(item.action_button_enable)) {
                        actionButton = contactHtmlConfig.address.action_button.cleanReplace('___btn_link___', checkAndAdjustURL(item.action_button_link))
                        actionButton = actionButton.cleanReplace('___btn_label___', item.action_button_label)
                    }
                    itemHtml = contactHtmlConfig.address.main.cleanReplace("___title___", item.title)

                    /* Address Format
                    Address Line 1
                    Address Line 2
                    City, State, Zip Code
                    Country
                    */

                    let street = extractDataFromArray(item, ['street'], '');
                    let building = extractDataFromArray(item, ['building'], '');
                    let city = extractDataFromArray(item, ['city'], '');
                    let state = extractDataFromArray(item, ['state'], '');
                    let zip = extractDataFromArray(item, ['zip'], '');
                    let country = extractDataFromArray(item, ['country'], '');

                    let address = '';

                    if (street != '')
                        address += street + '<br>';

                    if (building != '')
                        address += building + '<br>';

                    let ctStZp = '';

                    if (city != '')
                        ctStZp += city + ', ';

                    if (state != '')
                        ctStZp += state + ', ';

                    if (zip != '')
                        ctStZp += zip;

                    if (ctStZp.endsWith(', '))
                        ctStZp = ctStZp.slice(0, -2);

                    if (ctStZp != '')
                        address += ctStZp + '<br>';


                    if (country != '')
                        address += country;

                    if (address.endsWith("<br>"))
                        address = address.slice(0, -4);

                    itemHtml = itemHtml.cleanReplace("___address___", address);
                    itemHtml = itemHtml.cleanReplace("___action_button___", actionButton);
                }
                contactInfoHtml += itemHtml
            })
            let floating_button = '';
            if (parseInt(extractDataFromArray(data, ['floating_button_enable'], 0))) {
                floating_button = floating_button = contactHtmlConfig.floating_button.cleanReplace("___label___", extractDataFromArray(data, ['floating_button_label'], ''))
            }
            main = main.cleanReplace('___contact_info_html___', contactInfoHtml)
            main = main.cleanReplace('___floating_btn___', floating_button)
            // main = main.cleanReplace('___link_item___', linkHtml)
            return main.cleanReplace(/qr_cc_card/g, getCardClass(data))
        },
        default: {
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
            }]
        },
        getColumnNames: function(component_index, columns, samples, component) {
            let component_order = component_index + "."
            columns.push(component_order + "Contact Title")
            samples.push(extractDataFromArray(component, ['contact_title'], ''))

            columns.push(component_order + "Contact Icon")
            samples.push(extractDataFromArray(component, ['icon_img'], ''))

            // columns.push(component_order + "Show Floating Button")
            // samples.push(extractDataFromArray(component, ['floating_button_enable'], 1) ? 'Y' : 'N')
            if (parseInt(extractDataFromArray(component, ['floating_button_enable'], 1))) {
                columns.push(component_order + "Floating Button Text")
                samples.push(extractDataFromArray(component, ['floating_button_label'], 'Add to Contact'))
            }

            extractDataFromArray(component, ['contact_infos'], []).forEach((contact_info, index) => {
                let column_prefix = component_order + "Contact Info:" + (index + 1) + "."

                columns.push(column_prefix + "type")
                samples.push(extractDataFromArray(contact_info, ['type'], ''))

                columns.push(column_prefix + "title")
                samples.push(extractDataFromArray(contact_info, ['title'], ''))

                if (contact_info.type == 'number') {
                    columns.push(column_prefix + "Number")
                    samples.push(extractDataFromArray(contact_info, ['number'], ''))
                } else if (contact_info.type == 'email') {
                    columns.push(column_prefix + "Email")
                    samples.push(extractDataFromArray(contact_info, ['email'], ''))
                } else if (contact_info.type == 'address') {
                    columns.push(column_prefix + "Street1")
                    samples.push(extractDataFromArray(contact_info, ['street'], ''))

                    columns.push(column_prefix + "Street2")
                    samples.push(extractDataFromArray(contact_info, ['building'], ''))

                    columns.push(column_prefix + "City")
                    samples.push(extractDataFromArray(contact_info, ['city'], ''))

                    columns.push(column_prefix + "State")
                    samples.push(extractDataFromArray(contact_info, ['state'], ''))

                    columns.push(column_prefix + "Country")
                    samples.push(extractDataFromArray(contact_info, ['country'], ''))

                    columns.push(column_prefix + "Zipcode")
                    samples.push(extractDataFromArray(contact_info, ['zipcode'], ''))

                    // columns.push(component_order + "Action Button")
                    // samples.push(extractDataFromArray(component, ['action_button_enable'], 1) ? 'Y' : 'N')

                    if (parseInt(extractDataFromArray(component, ['action_button_enable'], 1))) {
                        columns.push(column_prefix + "Action Button Label")
                        samples.push(extractDataFromArray(contact_info, ['action_button_label'], ''))

                        columns.push(column_prefix + "Action Button Link")
                        samples.push(extractDataFromArray(contact_info, ['action_button_link'], ''))
                    }
                }

            })
        }
    },
    text_desc: {
        getInputWrapperHtml: function(data) {
            //console.log(data);
            return QRPageComponentWrapper.getInputText('Title', 'title', extractDataFromArray(data, ['title'], '')) + QRPageComponentWrapper.getTextAreaInput('Description', 'desc', extractDataFromArray(data, ['desc'], ''))
        },
        title: 'Heading + Text',
        getInputData: function(index, parent) {
            return {
                title: $(parent).find('input[name=title]').val(),
                desc: $(parent).find('textarea[name=desc]').val()
            }
        },
        getPreviewHtml: function(data) {
            let textHtmlConfig = getComponentHtmlFromTemplate(QRPageComponents.selected_template, 'text_desc')
            let main = textHtmlConfig.main.cleanReplace("___title___", extractDataFromArray(data, ['title'], ''))
            main = main.cleanReplace(/qr_cc_card/g, getCardClass(data))
            main = main.cleanReplace("___desc___", extractDataFromArray(data, ['desc'], ''))
            return nl2br(main);
        },
        default: {
            component: 'text_desc',
            title: 'Heading',
            desc: 'Description',
        },
        getColumnNames: function(component_index, columns, samples, component) {
            let component_label = component_index + ".Heading+Text"

            columns.push(component_label + ".Heading")
            samples.push(extractDataFromArray(component, ['title'], ''))

            columns.push(component_label + ".Description")
            samples.push(extractDataFromArray(component, ['desc'], ''))
        }
    },
    coupon_code: {
        getUploadAndDragStep: function() {
            return `
            <div class="d-flex align-items-center" id="coupon-code-upload">
                <div class=" qr_file_upload mr-2">
                    <i class="icon-uploadfile"></i>
                </div>
                <div class="">Upload Coupon File</div>
            </div>
            <input type="file" class="d-none" id="coupon-code-upload-input" accept=".csv,.tsv,.xls,.xlsx,.ods">
            <div class="text-muted mt-2 mb-3">Please upload the CSV, XLS or XLSX file</div>`
        },
        getUploadStepsWrapper: function() {

            return `<div class="coupon-code-upload-wrapper col-md-12 text-left">
                        <div class="row">
                            <div class="col-md-3  py-3 border-top mt-4">Step 1 <span class="ml-2 tippy"><i class="icon-help help-popup" help-id="coupon-code-step-1"></i></span></div>
                            <div class="col-md-9  py-3 border-top mt-4">
                                <a class="btn btn-link p-0 mb-2" href="/user/services/openapi?cmd=getCouponSampleRec" >Download Sample File</a>
                            </div>
                            <div class="col-md-3 border-top py-3">Step 2
                                <span class="ml-2 tippy"><i class="icon-help help-popup" help-id="coupon-code-step-2"></i></span>
                            </div>
                            <div class="col-md-9 border-top py-3">
                                <div class="mb-2">Upload (Only alpha-numeric coupon codes are allowed.)</div>
                               ` + ComponentLists.coupon_code.getUploadAndDragStep() + `
                            </div>
                        </div>
                    </div>`
        },
        getInputWrapperHtml: function(data) {
            //console.log(data);
            let bulk_upload_html = ComponentLists.coupon_code.getUploadStepsWrapper() + `
            <div class="coupon-code-uploaded-file-wrapper col-md-12" style="display:none;">
                <div class="row">
                    <span class="file_name">asdfa</span>
                    <span class="remove_file_btn"><i class="icon-ic_add"></i></span>
                </div>
            </div>`;
            if ($("[name=id]").val() != "new") {
                bulk_upload_html = `
                <div class="col-md-12">
                    You can upload new coupon codes or edit existing codes from dashboard.
                </div>
                <div class="col-md-12 mt-2">
                    <img src="/images/coupon_code_edit_image.png" class="w-100">
                </div>`
            }
            return QRPageComponentWrapper.getInputText('Heading', 'title', extractDataFromArray(data, ['title'], '')) + bulk_upload_html
        },
        listeners: function() {
            CouponCodeHandler.init()
        },
        title: 'Coupon Codes',
        getInputData: function(index, parent) {
            return {
                title: $(parent).find('input[name=title]').val(),
                desc: $(parent).find('textarea[name=desc]').val()
            }
        },
        getPreviewHtml: function(data) {
            let textHtmlConfig = getComponentHtmlFromTemplate(QRPageComponents.selected_template, 'coupon_code')
            let main = textHtmlConfig.main.cleanReplace("___title___", extractDataFromArray(data, ['title'], ''))
            let coupon_code = 'XXXXXX';
            if (typeof _coupon_code != "undefined") {
                coupon_code = _coupon_code
            }
            if (empty(coupon_code) && page == 'displayPage') {
                return ` <div class="section qrc_coupon_code qr_cc_card"><p class="no_coupon">Sorry, Coupon Codes are not available at the moment. Please revisit again in some time.</p></div>`;
            }
            main = main.cleanReplace("___coupon_code___", coupon_code)
            main = main.cleanReplace(/qr_cc_card/g, getCardClass(data))
            return main
        },
        default: {
            component: 'text_desc',
            title: 'Heading',
            desc: 'Description',
        },
        getColumnNames: function(component_index, columns, samples, component) {
            let component_label = component_index + ".Heading+Text"

            columns.push(component_label + ".Heading")
            samples.push(extractDataFromArray(component, ['title'], ''))

            columns.push(component_label + ".Description")
            samples.push(extractDataFromArray(component, ['desc'], ''))
        }
    },
    images: {
        getInputWrapperHtml: function(data, index) {
            function getViewTypeHtml(selected_type) {
                let viewTypes = {
                    // slider: {
                    //     img_name: 'slider.png',
                    //     label: 'Slider'
                    // },
                    list: {
                        img_name: 'list.png',
                        label: 'List'
                    },
                    grid_1: {
                        img_name: 'grid.png',
                        label: 'Grid 1'
                    },
                    grid_2: {
                        img_name: 'grid_2.png',
                        label: 'Grid 2'
                    },
                }
                let viewTypeHtml = '';
                Object.keys(viewTypes).forEach(view_type => {
                    viewTypeHtml += `<div class="image_view_type_item">
                                        <div class="image_view_type_card ` + (selected_type == view_type ? 'selected' : '') + `" data-type="` + view_type + `">
                                            <img src="/assets/images/` + viewTypes[view_type].img_name + `" width=36 height=36 class="img-fluid">
                                        </div>
                                        <div class="text-center mt-1">` + viewTypes[view_type].label + `</div>
                                    </div>`
                })
                return `<div class="col-md-12 mb-2">
                            <div class="row mx-0">
                                <div class="mr-2 mb-2" > View Type </div>
                            </div>
                            <div class="row mx-0 d-flex image_view_type_wrapper">
                                ` + viewTypeHtml + `
                            </div>
                        </div>`;

            }
            return QRPageComponentWrapper.getTitleDescSection(extractDataFromArray(data, ['title'], ''), extractDataFromArray(data, ['desc'], ''), parseInt(extractDataFromArray(data, ['header_enable'], 0))) + getViewTypeHtml(extractDataFromArray(data, ['view_type'], 'slider')) + QRPageComponentWrapper.getImagesUploader("Photos", extractDataFromArray(data, ['images'], []), index)
        },
        title: 'Images',
        getInputData: function(index, parent) {
            let header = QRPageComponentWrapper.getTitleDescSectionData(parent)
            let images = [];
            Array.from($(parent).find(".img_upload_card_wrapper .img_uploaded_card.multiple_img")).forEach(ele => {
                let icon_img = $(ele).css("background-image")
                if (!empty(icon_img)) {
                    icon_img = icon_img.split('"')[1]
                }
                images.push(icon_img)
            })
            return {
                ...header,
                view_type: $(parent).find('.image_view_type_card.selected').data('type'),
                images
            }
        },
        getPreviewHtml: function(data) {
            // if (parseInt(extractDataFromArray(data, ['header_enable'], 0))) {
            let header = '';
            if (parseInt(extractDataFromArray(data, ['header_enable'], 0))) {
                header = ` <div class="qrc_heading">
                            <h2>` + extractDataFromArray(data, ['title'], '') + `</h2>
                            <p>` + extractDataFromArray(data, ['desc'], '') + `</p>
                        </div>`;
                // main = main.cleanReplace("___header____", header)
            }

            // }

            let images = '';
            extractDataFromArray(data, ['images'], []).forEach(item => {
                images += `<li>
                    <a rel="nofollow" href="` + item + `" data-lightbox="images-gallery" >
                        <img class="img-fluid"  src="` + item + `">
                    </a>
                </li>`
            })

            return `<div class="section qrc_gallery ` + getCardClass(data) + `">
                        ` + header + `
                        <div class="qrc_gallery_wrapper">
                            <ul class="qrc_gallery_` + extractDataFromArray(data, ['view_type'], 'list') + `">` + images + `</ul>
                        </div>
                    </div>`;
        },
        listeners: function(index) {
            new Sortable(document.getElementById('images_grid_' + index), {
                handle: '.handle-img', // handle class
                animation: 150,
                ghostClass: 'blue-background-class',
                onEnd: function(e) {
                    // debugger
                    QRPageComponents.handleInputChange(e)
                }
            });
        },
        default: {
            component: 'images',
            title: 'Heading',
            desc: 'Description',
            view_type: 'grid_2',
            images: [
                '/images/digitalCard/image_1.png',
                '/images/digitalCard/image_2.png'
            ]
        },
        getColumnNames: function(component_index, columns, samples, component) {
            let component_order = component_index + "."

            if (parseInt(extractDataFromArray(component, ['header_enable'], 1))) {
                columns.push(component_order + "Image.Title")
                samples.push(extractDataFromArray(component, ['title'], ''))

                columns.push(component_order + "Image.Description")
                samples.push(extractDataFromArray(component, ['desc'], ''))
            }


            columns.push(component_order + "Image.View type")
            samples.push(extractDataFromArray(component, ['view_type'], 'list'))

            columns.push(component_order + "Images")
            let images = extractDataFromArray(component, ['images'], ['image url']).join(",")
            // extractDataFromArray(component, ['images'], ['image url']).forEach((image, index) => {
            //     images+=image
            // })
            samples.push(images)
        }
    },
    button: {
        getInputWrapperHtml: function(data) {
            return QRPageComponentWrapper.getTitleDescSection(extractDataFromArray(data, ['title'], ''), extractDataFromArray(data, ['desc'], ''), parseInt(extractDataFromArray(data, ['header_enable'], 0))) +
                QRPageComponentWrapper.getInputText('Button Label', 'button_label', extractDataFromArray(data, ['button_label'], '')) +
                QRPageComponentWrapper.getInputText('Button Link', 'button_link', extractDataFromArray(data, ['button_link'], ''))

        },
        title: 'Button',
        getInputData: function(index, parent) {
            let header = QRPageComponentWrapper.getTitleDescSectionData(parent)
            return {
                ...header,
                button_label: $(parent).find('input[name=button_label]').val(),
                button_link: $(parent).find('input[name=button_link]').val()

            }
        },
        getPreviewHtml: function(data) {
            let buttonHtmlConfig = getComponentHtmlFromTemplate(QRPageComponents.selected_template, 'button')
            let main = buttonHtmlConfig.main.cleanReplace("___btn_link___", checkAndAdjustURL(extractDataFromArray(data, ['button_link'], '')))
            main = main.cleanReplace("___btn_label___", extractDataFromArray(data, ['button_label'], ''))

            let header = '';
            if (parseInt(extractDataFromArray(data, ['header_enable'], 0))) {
                header = buttonHtmlConfig.header.cleanReplace('___title___', extractDataFromArray(data, ['title'], ''))
                header = header.cleanReplace('___desc___', extractDataFromArray(data, ['desc'], ''))
            }
            main = main.cleanReplace("___header___", header)

            return main.cleanReplace(/qr_cc_card/g, getCardClass(data))
        },
        default: {
            component: 'button',
            header_enable: 1,
            title: 'Button',
            desc: 'Description',
            button_label: 'Visit my site',
            button_link: ''
        },
        getColumnNames: function(component_index, columns, samples, component) {
            let component_label = component_index + ".Button."

            if (parseInt(extractDataFromArray(component, ['header_enable'], 1))) {
                columns.push(component_label + "title")
                samples.push(extractDataFromArray(component, ['title'], ''))

                columns.push(component_label + "Description")
                samples.push(extractDataFromArray(component, ['desc'], ''))
            }

            columns.push(component_label + "Button Label")
            samples.push(extractDataFromArray(component, ['button_label'], ''))

            columns.push(component_label + "Button Link")
            samples.push(extractDataFromArray(component, ['button_link'], ''))
        }
    },
    video: {
        getInputWrapperHtml: function(data) {
            const video_types = {
                youtube: 'YouTube',
                vimeo: 'Vimeo',
            }

            function getVideoTypeGroupButtons(selected_type) {
                let buttonHtmls = '';
                Object.keys(video_types).forEach(type => {
                    buttonHtmls += '<button type="button" class="btn btn-light ' + (type == selected_type ? 'active' : '') + ' video_type_btn" data-type="' + type + '">' + video_types[type] + '</button>'
                })
                return ` <div class="btn-group" role="group">
                            ` + buttonHtmls + `
                            
                        </div>`
            }
            return QRPageComponentWrapper.getTitleDescSection(extractDataFromArray(data, ['title'], ''), extractDataFromArray(data, ['desc'], ''), parseInt(extractDataFromArray(data, ['header_enable'], 0))) +
                `<div class="col-md-12 mb-3">
                ` + getVideoTypeGroupButtons(extractDataFromArray(data, ['video_type'], 'youtube')) + `
            </div>` +
                QRPageComponentWrapper.getInputText('Video Link', 'video_link', extractDataFromArray(data, ['video_link'], ''))
        },
        title: 'Video',
        getInputData: function(index, parent) {
            let header = QRPageComponentWrapper.getTitleDescSectionData(parent)
            let video_type = $(parent).find('.btn-group .btn.active').data('type')
            let video_link = $(parent).find('input[name=video_link]').val()
            if (video_type == 'youtube') {
                if (!video_link.includes("www.youtube.com/embed/")) {
                    if (video_link.includes("youtu.be")) {
                        video_link = video_link.split(".be/")[1]
                    } else if (video_link.includes("/watch?v=")) {
                        video_link = video_link.split("v=")[1]
                    } else {
                        video_link = ''
                    }
                    video_link = "https://www.youtube.com/embed/" + video_link
                }
            } else if (video_type == 'vimeo') {
                if (!video_link.includes("player.vimeo.com/video")) {
                    video_link = video_link.split("vimeo.com/")[1]
                    video_link = "https://player.vimeo.com/video/" + video_link
                }
            }
            return {
                ...header,
                video_type,
                video_link
            }
        },
        getPreviewHtml: function(data) {

            let buttonHtmlConfig = getComponentHtmlFromTemplate(QRPageComponents.selected_template, 'video')
            let main = buttonHtmlConfig.main.cleanReplace("___video_link___", extractDataFromArray(data, ['video_link'], ''))


            let header = '';
            if (parseInt(extractDataFromArray(data, ['header_enable'], 0))) {
                header = buttonHtmlConfig.header.cleanReplace('___title___', extractDataFromArray(data, ['title'], ''))
                header = header.cleanReplace('___desc___', extractDataFromArray(data, ['desc'], ''))
            }
            main = main.cleanReplace("___header___", header)

            return main.cleanReplace(/qr_cc_card/g, getCardClass(data))
        },
        default: {
            component: 'video',
            header_enable: 1,
            title: 'Video',
            desc: 'Description',
            video_type: 'youtube',
            video_link: ''
        },
        getColumnNames: function(component_index, columns, samples, component) {
            let component_label = component_index + ".Video."

            if (parseInt(extractDataFromArray(component, ['header_enable'], 1))) {
                columns.push(component_label + "title")
                samples.push(extractDataFromArray(component, ['title'], ''))

                columns.push(component_label + "Description")
                samples.push(extractDataFromArray(component, ['desc'], ''))
            }

            columns.push(component_label + "Type")
            samples.push(extractDataFromArray(component, ['video_type'], ''))

            columns.push(component_label + "URL")
            samples.push(extractDataFromArray(component, ['video_link'], ''))
        }
    },
    password: {
        getInputWrapperHtml: function(data, index) {
            function getProtectionTypeHtml(type, contacts) {
                return ` <div class="col-md-12 mb-4">
                            <div class="row mx-0">
                                <div class="mr-2 mb-3" > Make this page password protected</div>` + QRPageComponentWrapper.getSwitcheryButton('page_protection_enable', type == 'page') + `
                            </div>
                            <div class="row mx-0">
                                <div class="mr-2 mb-2" > Make contact information password protected</div>` + QRPageComponentWrapper.getSwitcheryButton('contact_protection_enable', type == 'contact') + `
                            </div>
                            <div class="gray_card pl-4 contact_protect">
                                <div class="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" id="ct_pr_email_` + index + `" class="custom-control-input" name="email" ` + (extractDataFromArray(contacts, ['email'], 0) == 1 ? 'checked' : '') + `>
                                    <label class="custom-control-label" for="ct_pr_email_` + index + `">Email</label>
                                </div>  
                                <div class="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" id="ct_pr_number_` + index + `" class="custom-control-input" name="number" ` + (extractDataFromArray(contacts, ['number'], 0) == 1 ? 'checked' : '') + `>
                                    <label class="custom-control-label" for="ct_pr_number_` + index + `">Number</label>
                                </div>  
                                <div class="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" id="ct_pr_address_` + index + `" class="custom-control-input" name="address" ` + (extractDataFromArray(contacts, ['address'], 0) == 1 ? 'checked' : '') + `>
                                    <label class="custom-control-label" for="ct_pr_address_` + index + `">Address</label>
                                </div>  
                            </div>
                            
                        </div>`
            }

            function getUsernameAndPasswordHtml() {
                return `<div class="col-md-12 mb-4">
                            <div class="row mx-0 gray_card">
                                <div class="col-md-12 d-flex">
                                    <div class="mr-2 mb-3 " >Enable Username</div>` + QRPageComponentWrapper.getSwitcheryButton('username_enable', data.username_enable) + `
                                </div>
                                ` + QRPageComponentWrapper.getInputText('Label', 'username_label', data.username_label, 6) + `
                                ` + QRPageComponentWrapper.getInputText('Value', 'username_value', data.username_value, 6) + `
                                <div class="col-md-12 d-flex">
                                    <div class="mr-2 my-2 " >Password</div>  
                                </div>
                                ` + QRPageComponentWrapper.getInputText('Label', 'password_label', data.password_label, 6) + `
                                ` + QRPageComponentWrapper.getInputText('Value', 'password_value', data.password_value, 6) + `
                                ` + QRPageComponentWrapper.getInputText('Button Label', 'button_label', data.button_label, 12) + `
                            </div>
                        </div>`
            }
            return getProtectionTypeHtml(extractDataFromArray(data, ['protection_type'], 'page'), extractDataFromArray(data, ['contacts'], [])) + QRPageComponentWrapper.getTitleDescSection(extractDataFromArray(data, ['title'], ''), extractDataFromArray(data, ['desc'], ''), parseInt(extractDataFromArray(data, ['header_enable'], 0))) +
                getUsernameAndPasswordHtml()

        },
        title: 'Password Protection',
        getInputData: function(index, parent) {
            let header = QRPageComponentWrapper.getTitleDescSectionData(parent)

            let protection_type = '';
            if ($("input[name=page_protection_enable]").prop("checked")) {
                protection_type = 'page';
            } else if ($("input[name=contact_protection_enable]").prop("checked")) {
                protection_type = 'contact';
            }

            let contacts = {};
            Array.from($(parent).find(".contact_protect input")).forEach(ele => {
                contacts[ele.name] = ele.checked
            })
            return {
                ...header,
                protection_type,
                contacts,
                username_enable: $(parent).find("input[name=username_enable]").prop("checked") ? 1 : 0,
                username_label: $(parent).find("input[name=username_label]").val(),
                username_value: $(parent).find("input[name=username_value]").val(),
                password_label: $(parent).find("input[name=password_label]").val(),
                password_value: $(parent).find("input[name=password_value]").val(),
                button_label: $(parent).find("input[name=button_label]").val(),
            }
        },
        default: {
            component: 'password',
            header_enable: 1,
            title: 'Heading Text',
            desc: 'Heading Description',
            protection_type: 'page',
            contacts: {
                email: 1,
                number: 1,
                address: 1
            },
            username_enable: 1,
            username_label: 'Username',
            username_value: 'Login Id',
            password_label: 'Password',
            password_value: '12345',
            button_label: 'Login',
        }
    }
}

const getComponentHtmlFromTemplate = function(template_id, component) {
    var pageType = extractDataFromArray(__savedQrCodeParams, ['page'], '');
    var selectedPageArr = QRPageComponents_GetPageTypeTemplates(pageType);

    return (typeof selectedPageArr[template_id] != "undefined" && typeof selectedPageArr[template_id]['html'] != "undefined" &&
        typeof selectedPageArr[template_id]['html'][component] != "undefined") ? selectedPageArr[template_id]['html'][component] : {};
}

const getComponentStyleFromTemplate = function(template_id) {
    var pageType = extractDataFromArray(__savedQrCodeParams, ['page'], '');
    var selectedPageArr = QRPageComponents_GetPageTypeTemplates(pageType);

    var style = (typeof selectedPageArr[template_id] != "undefined" && typeof selectedPageArr[template_id].style != "undefined") ? selectedPageArr[template_id].style : {};
    return JSON.parse(JSON.stringify(style))
}

const getComponentContentFromTemplate = function(template_id) {
    var pageType = extractDataFromArray(__savedQrCodeParams, ['page'], '');
    var selectedPageArr = QRPageComponents_GetPageTypeTemplates(pageType);

    var content = (typeof selectedPageArr[template_id] != "undefined" && typeof selectedPageArr[template_id].content != "undefined") ? selectedPageArr[template_id].content : {};
    return JSON.parse(JSON.stringify(content))
}

const getCardClass = function(data) {
    return parseInt(extractDataFromArray(data, ['card_background'], 1)) ? 'qr_cc_card' : '';

}

const DefaultHtmlTemplate = {
    event_profile: {
        main: `<div class="section qrc_ticket">
                    ___pr_img_html___
                    <div class="qrc_ticket_details">
                    <div class="qrc_ticket_heading">___event_name___</div>
                        <div class="qrc_ticket_discription">___event_desc___</div>
                    </div>
                    ___qr_code___
                    
                </div>`,
        pr_img: `<div class="qrc_ticket_image">
                    <img src="___pr_img___"/>
                </div>`,
        qr_code: `<div class="qrc_ticket_user_name">
                        <div class="qrc_ticket_username_text">___name___</div>
                    </div>
                    
                    <div class="qrc_ticket_qrcode">
                        <img src="___qr_img___" onerror="this.onerror=null;this.src=\'/images/qrcode_ticket.png\';" />
                    </div>  `

    },
    profile: {
        main: `<div class="section qrc_profile">
                    ___pr_img_html___
                    <h2 >___name___</h2>
                    <p>___desc___</p>
                    <p><strong>___company___</strong></p>
                    ___shortcut_html___
                </div>`,
        shortcut: `<div class="qrc_profile_shortcut">
                        <ul>___shortcut_items___</ul>
                    </div>`,
        item: '<li class="qr_cc_card"><a  rel="nofollow" href="___item_link___"  target="_blank"><span class="___item_icon___"></span></a></li>',
        pr_img: `<div class="qrc_profilepic" style="background-image: url('___pr_img___');"></div>`

    },
    social_link: {
        main: ` <div class="section qrc_social_links">
                    <ul class="qrc_social_links_list">
                        ___link_item___
                    </ul>
                </div>`,
        header: `<div class="qrc_heading">
                    <h2>___title___</h2>
                    <p>___desc___</p>
                </div>`,
        item_wrapper: ``,
        item: `<li class="qr_cc_card">
                    ____header___
                    <a  rel="nofollow" href="___item_url___"  target="_blank">
                        <div class="qrc_social_icon" style="background-image:url('___item_icon___');"></div>
                        <div class="qrc_social_text">
                            <div class="qrc_social_text_heading">___item_title___</div>
                            ___item_subtitle___
                        </div>
                        <div class="qrc_social_action">
                                <span class="icon-right_arrow"></span>
                        </div>
                    </a>
                </li>`,
        subtitle: `<div class="qrc_social_text_discription">___subtitle___</div>`
    },
    pdf_gallery: {
        main: ` <div class="section qrc_social_links">
                    <ul class="qrc_social_links_list">
                        ___link_item___
                    </ul>
                </div>`,
        header: `<div class="qrc_heading">
                    <h2>___title___</h2>
                    <p>___desc___</p>
                </div>`,
        item_wrapper: ``,
        item: `<li class="qr_cc_card">
                    ____header___
                    <a  rel="nofollow" href="___item_url___"  target="_blank">
                        <div class="qrc_social_icon" style="background-image:url('___item_icon___');"></div>
                        <div class="qrc_social_text">
                            <div class="qrc_social_text_heading">___item_title___</div>
                            ___item_subtitle___
                        </div>
                        <div class="qrc_social_action">
                                <span class="icon-right_arrow"></span>
                        </div>
                    </a>
                </li>`,
        subtitle: `<div class="qrc_social_text_discription">___subtitle___</div>`
    },
    web_links: {
        main: ` <div class="section qrc_social_links">
                    <ul class="qrc_social_links_list">
                        ___link_item___
                    </ul>
                </div>`,
        header: `<div class="qrc_heading">
                    <h2>___title___</h2>
                    <p>___desc___</p>
                </div>`,
        item_wrapper: ``,
        item: `<li class="qr_cc_card">
                    ____header___
                    <a  rel="nofollow" href="___item_url___" target="_blank">
                        <div class="qrc_social_icon" style="background-image:url('___item_icon___');"></div>
                        <div class="qrc_social_text">
                            <div class="qrc_social_text_heading">___item_title___</div>
                            ___item_subtitle___
                        </div>
                        <div class="qrc_social_action">
                                <span class="icon-right_arrow"></span>
                        </div>
                    </a>
                </li>`,
        subtitle: `<div class="qrc_social_text_discription">___subtitle___</div>`
    },
    custom_fields: {
        main: ` <div class="section qrc_calltoaction qr_cc_card">
                    ___header___
                    <ul class="qrc_custom_list_tow_col">
                        ___field_items___
                    </ul>
                </div>`,
        header: `<div class="qrc_heading">
                    <h2>___title___</h2>
                    <p>___desc___</p>
                </div>`,
        item_wrapper: ``,
        item: `<li>
                    <div class="qrc_custom_list_tow_col_1">___key___</div>
                    <div class="qrc_custom_list_tow_col_2">___val___</div>
                </li>`,
    },
    text_desc: {
        main: ` <div class="section qrc_heading_text qr_cc_card">
                    <h2>___title___</h2>
                    <p>___desc___</p>
                </div>`
    },
    coupon_code: {
        main: ` <div class="section qrc_coupon_code qr_cc_card">
                    <p>___title___</p>
                    <h2>___coupon_code___</h2>
                </div>`
    },
    contact: {
        main: `<div class="section qrc_contact qr_cc_card">
                    <div class="qrc_contact_header">
                        <div class="qrc_contact_hdr_img" style="background-image: url('___icon_img___');"></div>
                        <div class="qrc_contact_hdr_text">___title___</div>
                    </div>
                    ___contact_info_html___
                    ___floating_btn___
                </div>`,
        floating_button: `<a  rel="nofollow" href="#" class="qrc_addtocontact">
                            <div class="qrc_addtocontact_text">___label___</div>
                            <div class="qrc_addtocontact_circle">
                                <span class="icon-add_1"></span>
                            </div>                
                        </a>`,
        number: `<div class="qrc_contact_info">
                        <div class="qrc_contact_info_title">___title___</div>
                        <div class="qrc_contact_number">___number___</div>
                    </div>`,
        email: `<div class="qrc_email_info">
                    <div class="qrc_email_info_title">___title___</div>
                    <div class="qrc_email_id">___email___</div>
                </div>`,
        address: {
            action_button: `<a class="qrc_direction_btn" href="___btn_link___"  target="_blank"><span class="icon-direction_1"></span>___btn_label___</a>`,
            main: `<div class="qrc_address_info">
                        <div class="qrc_address_info_title">___title___</div>
                        <div class="qrc_address_text">___address___</div>
                        ___action_button___
                    </div>`
        }

    },
    button: {
        header: `<div class="qrc_heading">
                    <h2>___title___</h2>
                    <p>___desc___</p>
                </div>`,
        main: `<div class="section qrc_calltoaction qr_cc_card">
                ___header___
                <a rel="nofollow" href="___btn_link___" class="qrc_button"  target="_blank">___btn_label___</a>
            </div>`
    },
    video: {
        header: `<div class="qrc_heading">
                    <h2>___title___</h2>
                    <p>___desc___</p>
                </div>`,
        main: `<div class="section qrc_video qr_cc_card">
                    ___header___
                    <div class="qrc_video_wrapper">
                        <iframe width="100%" height="203" src="___video_link___" title="video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="z-index: 999;-webkit-border-bottom-right-radius: 18px; -webkit-border-bottom-left-radius: 18px; -moz-border-radius-bottomright: 18px; -moz-border-radius-bottomleft: 18px; border-bottom-right-radius: 18px; border-bottom-left-radius: 18px; overflow: hidden;"></iframe>
                    </div>
                </div>`
    },
}

const defaultContentArray = {
    content: [{
            component: 'profile',
            pr_img: '/images/digitalCard/profilepic.jpg',
            name: 'Name',
            desc: 'Title',
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
}


const DigitalBusinessPageTemplates = [{
        content: defaultContentArray.content,
        style: {
            primary_bg_color: "#210972",
            primary_profile_text_color: "#061244",
            primary_text_color: "#061244",
            secondary_bg_color: "#9380ff",
            secondary_profile_text_color: "#061244",
            secondary_text_color: "#76839B",
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
            custom_css: `body{overflow:auto !important;}
            .qrc_page_wrapper{height:unset; min-height:100vh;}
            @media (max-width: 767px) {
                body::-webkit-scrollbar { display: none;}
                body { -ms-overflow-style: none;  scrollbar-width: none;}
            }`
        },
        html: DefaultHtmlTemplate
    },
    {
        content: defaultContentArray.content,
        style: {
            primary_bg_color: "#000000",
            primary_profile_text_color: "#2F2F2F",
            primary_text_color: "#2F2F2F",
            secondary_bg_color: "#f6f6f6ff",
            secondary_profile_text_color: "#747474",
            secondary_text_color: "#747474",
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
            custom_css: `body{overflow:auto !important;}
            .qrc_page_wrapper{height:unset; min-height:100vh;}
            @media (max-width: 767px) {
                body::-webkit-scrollbar { display: none;}
                body { -ms-overflow-style: none;  scrollbar-width: none;}
            }`
        },
        html: DefaultHtmlTemplate
    },
    {
        content: defaultContentArray.content,
        style: {
            primary_bg_color: "#000000",
            primary_profile_text_color: "#2F2F2F",
            primary_text_color: "#2F2F2F",
            secondary_bg_color: "#f6f6f6ff",
            secondary_profile_text_color: "#747474",
            secondary_text_color: "#747474",
            bg_img: "/images/digitalCard/bg_page_1.jpg",
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
            custom_css: `body{overflow:auto !important;}
            .qrc_page_wrapper{height:unset; min-height:100vh;}
            @media (max-width: 767px) {
                body::-webkit-scrollbar { display: none;}
                body { -ms-overflow-style: none;  scrollbar-width: none;}
            }`
        },
        html: DefaultHtmlTemplate
    },
    {
        content: defaultContentArray.content,
        style: {
            primary_bg_color: "#000000",
            primary_profile_text_color: "#2F2F2F",
            primary_text_color: "#2F2F2F",
            secondary_bg_color: "#f6f6f6ff",
            secondary_profile_text_color: "#2F2F2F",
            secondary_text_color: "#747474",
            bg_img: "/images/digitalCard/bg/background_18.jpg",
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
            custom_css: `body{overflow:auto !important;}
            .qrc_page_wrapper{height:unset; min-height:100vh;}
            @media (max-width: 767px) {
                body::-webkit-scrollbar { display: none;}
                body { -ms-overflow-style: none;  scrollbar-width: none;}
            }`
        },
        html: DefaultHtmlTemplate
    },
    {
        content: defaultContentArray.content,
        style: {
            primary_bg_color: "#061244",
            primary_profile_text_color: "#ffffff",
            primary_text_color: "#061244",
            secondary_bg_color: "#a07ddaff",
            secondary_profile_text_color: "#ffffff",
            secondary_text_color: "#061244",
            bg_img: "/images/digitalCard/bg_page_1.jpg",
            card: {
                bg_color: "#ffffff",
                blur: "0",
                border_radius: "8",
                enable: 1,
                shadow_color: "#64646f33",
                spread: "0",
                x: "0",
                y: "0",
            },
            custom_css: `body{overflow:auto !important;}
            .qrc_page_wrapper{height:unset; min-height:100vh;}
            @media (max-width: 767px) {
                body::-webkit-scrollbar { display: none;}
                body { -ms-overflow-style: none;  scrollbar-width: none;}
            }`
        },
        html: {
            profile: {
                main: `<div class="section qrc_profile qrc_profile_2">
                            <div class="qrc_profile_inner">
                                ___pr_img_html___
                                <h2 >___name___</h2>
                                <p>___desc___</p>
                                <p><strong>___company___</strong></p>
                                ___shortcut_html___
                            </div>
                        </div>`,
                shortcut: `<div class="qrc_profile_shortcut">
                                <ul>___shortcut_items___</ul>
                            </div>`,
                item: '<li class="qr_cc_card"><a  rel="nofollow" href="___item_link___"><span class="___item_icon___"></span></a></li>',
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
    {
        content: defaultContentArray.content,
        style: {
            primary_bg_color: "#941700ff",
            primary_profile_text_color: "#061244",
            primary_text_color: "#061244",
            secondary_bg_color: "#ff7960",
            secondary_profile_text_color: "#061244",
            secondary_text_color: "#76839B",
            bg_img: "",
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
            custom_css: `body{overflow:auto !important;}
            .qrc_page_wrapper{height:unset; min-height:100vh;}
            @media (max-width: 767px) {
                body::-webkit-scrollbar { display: none;}
                body { -ms-overflow-style: none;  scrollbar-width: none;}
            }`
        },
        html: DefaultHtmlTemplate
    },
]

const PetIdTagTemplates = [{
        content: defaultContentArray.content,
        style: {
            primary_bg_color: "#85442d",
            primary_profile_text_color: "#85442d",
            primary_text_color: "#85442d",
            secondary_bg_color: "#FFE9A7",
            secondary_profile_text_color: "#676361",
            secondary_text_color: "#676361",
            bg_img: '/images/digitalCard/bg/pet_tag_bg_1.jpg',
            card: {
                bg_color: "#ffffff",
                blur: "29",
                border_radius: "16",
                enable: 1,
                shadow_color: "#64646f33",
                spread: "0",
                x: "0",
                y: "7",
            }

        },
        html: DefaultHtmlTemplate
    },
    {
        content: defaultContentArray.content,
        style: {
            primary_bg_color: "#41B853",
            primary_profile_text_color: "#ffffff",
            primary_text_color: "#09270E",
            secondary_bg_color: "#41B853",
            secondary_profile_text_color: "#ffffff",
            secondary_text_color: "#777E78",
            bg_img: '/images/digitalCard/bg/pet_tag_bg_2.jpg',
            card: {
                bg_color: "#ffffff",
                blur: "29",
                border_radius: "16",
                enable: 1,
                shadow_color: "#64646f33",
                spread: "0",
                x: "0",
                y: "7",
            }

        },
        html: DefaultHtmlTemplate
    },
    {
        content: defaultContentArray.content,
        style: {
            primary_bg_color: "#683B2B",
            primary_profile_text_color: "#ffffff",
            primary_text_color: "#0e781e",
            secondary_bg_color: "#683B2B",
            secondary_profile_text_color: "#ffffff",
            secondary_text_color: "#676361",
            card: {
                bg_color: "#ffffff",
                blur: "29",
                border_radius: "16",
                enable: 1,
                shadow_color: "#64646f33",
                spread: "0",
                x: "0",
                y: "7",
            }

        },
        html: DefaultHtmlTemplate
    },
    {
        content: defaultContentArray.content,
        style: {
            primary_bg_color: "#000000",
            primary_profile_text_color: "#2F2F2F",
            primary_text_color: "#2F2F2F",
            secondary_bg_color: "#F8B4A9",
            secondary_profile_text_color: "#747474",
            secondary_text_color: "#747474",
            card: {
                bg_color: "#ffffff",
                blur: "29",
                border_radius: "16",
                enable: 1,
                shadow_color: "#64646f33",
                spread: "0",
                x: "0",
                y: "7",
            }

        },
        html: DefaultHtmlTemplate
    }
]

const EventTicketTemplates = [{
        content: defaultContentArray.content,
        style: {
            primary_bg_color: "#85442d",
            primary_profile_text_color: "#85442d",
            primary_text_color: "#85442d",
            secondary_bg_color: "#FFE9A7",
            secondary_profile_text_color: "#676361",
            secondary_text_color: "#676361",
            bg_img: '/images/digitalCard/bg/event_ticket_background_1.jpg',
            card: {
                bg_color: "#ffffff",
                blur: "29",
                border_radius: "16",
                enable: 1,
                shadow_color: "#64646f33",
                spread: "0",
                x: "0",
                y: "7",
            }

        },
        html: DefaultHtmlTemplate
    },
    {
        content: defaultContentArray.content,
        style: {
            primary_bg_color: "#000000",
            primary_profile_text_color: "#ffffff",
            primary_text_color: "#09270E",
            secondary_bg_color: "#000000",
            secondary_profile_text_color: "#ffffff",
            secondary_text_color: "#777E78",
            bg_img: '',
            card: {
                bg_color: "#ffffff",
                blur: "29",
                border_radius: "16",
                enable: 1,
                shadow_color: "#64646f33",
                spread: "0",
                x: "0",
                y: "7",
            }

        },
        html: DefaultHtmlTemplate
    },
    {
        content: defaultContentArray.content,
        style: {
            primary_bg_color: "#FF8F03",
            primary_profile_text_color: "#3B3106",
            primary_text_color: "#3B3106",
            secondary_bg_color: "#FFEEA2",
            secondary_profile_text_color: "#5C5A53",
            secondary_text_color: "#5C5A53",
            card: {
                bg_color: "#ffffff",
                blur: "29",
                border_radius: "16",
                enable: 1,
                shadow_color: "#64646f33",
                spread: "0",
                x: "0",
                y: "7",
            }

        },
        html: DefaultHtmlTemplate
    },
]

const CouponCodeTemplates = [{
        content: defaultContentArray.content,
        style: {
            primary_bg_color: "#061244",
            primary_profile_text_color: "#061244",
            primary_text_color: "#061244",
            secondary_bg_color: "#061244",
            secondary_profile_text_color: "#061244",
            secondary_text_color: "#061244",
            bg_img: '/images/digitalCard/bg/coupon_background_1.jpg',
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
            custom_css: `.qrc_page_wrapper{background-position: center top;}`

        },
        html: DefaultHtmlTemplate
    },
    {
        content: defaultContentArray.content,
        style: {
            primary_bg_color: "#FF8F03",
            primary_profile_text_color: "#ffffff",
            primary_text_color: "#333333",
            secondary_bg_color: "#e6ff47ff",
            secondary_profile_text_color: "#ffffff",
            secondary_text_color: "#FF8F03",
            bg_img: '',
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
            custom_css: ''

        },
        html: {
            profile: {
                main: `<div class="section qrc_profile qrc_profile_2">
                            <div class="qrc_profile_inner">
                                ___pr_img_html___
                                <h2 >___name___</h2>
                                <p>___desc___</p>
                                <p><strong>___company___</strong></p>
                                ___shortcut_html___
                            </div>
                        </div>`,
                shortcut: `<div class="qrc_profile_shortcut">
                                <ul>___shortcut_items___</ul>
                            </div>`,
                item: '<li class="qr_cc_card"><a rel="nofollow" href="___item_link___"><span class="___item_icon___"></span></a></li>',
                pr_img: `<div class="qrc_profilepic" style="background-image: url('___pr_img___');"></div>`

            },
            social_link: DefaultHtmlTemplate.social_link,
            web_links: DefaultHtmlTemplate.web_links,
            text_desc: DefaultHtmlTemplate.text_desc,
            contact: DefaultHtmlTemplate.contact,
            button: DefaultHtmlTemplate.button,
            video: DefaultHtmlTemplate.video,
            custom_fields: DefaultHtmlTemplate.custom_fields,
            coupon_code: DefaultHtmlTemplate.coupon_code,
            pdf_gallery: DefaultHtmlTemplate.pdf_gallery,
        }
    },
    {
        content: defaultContentArray.content,
        style: {
            primary_bg_color: "#683B2B",
            primary_profile_text_color: "#ffffff",
            primary_text_color: "#0e781e",
            secondary_bg_color: "#683B2B",
            secondary_profile_text_color: "#ffffff",
            secondary_text_color: "#676361",
            bg_img: '/images/digitalCard/bg/coupon_background_2.jpg',
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
            custom_css: `.qrc_page_wrapper{background-position: center top;}`

        },
        html: DefaultHtmlTemplate
    },
    {
        content: defaultContentArray.content,
        style: {
            primary_bg_color: "#000000",
            primary_profile_text_color: "#2F2F2F",
            primary_text_color: "#2F2F2F",
            secondary_bg_color: "#F8B4A9",
            secondary_profile_text_color: "#747474",
            secondary_text_color: "#747474",
            card: {
                bg_color: "#ffffff",
                blur: "29",
                border_radius: "16",
                enable: 1,
                shadow_color: "#64646f33",
                spread: "0",
                x: "0",
                y: "7",
            }

        },
        html: DefaultHtmlTemplate
    }
]

const PDFGalleryTemplates = [{
        content: defaultContentArray.content,
        style: {
            primary_bg_color: "#061244",
            primary_profile_text_color: "#061244",
            primary_text_color: "#061244",
            secondary_bg_color: "#061244",
            secondary_profile_text_color: "#061244",
            secondary_text_color: "#061244",
            bg_img: '/images/digitalCard/bg_page_1.jpg',
            card: {
                bg_color: "#ffffff",
                blur: "29",
                border_radius: "16",
                enable: 1,
                shadow_color: "#64646f33",
                spread: "0",
                x: "0",
                y: "7",
            }

        },
        html: DefaultHtmlTemplate
    },
    {
        content: defaultContentArray.content,
        style: {
            primary_bg_color: "#517AFA",
            primary_profile_text_color: "#ffffff",
            primary_text_color: "#061244",
            secondary_bg_color: "#243272ff",
            secondary_profile_text_color: "#ffffff",
            secondary_text_color: "#76839B",
            bg_img: "/images/digitalCard/bg/background_16.jpg",
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
            custom_css: ''

        },
        html: {
            profile: {
                main: `<div class="section qrc_profile qrc_profile_2">
                            <div class="qrc_profile_inner">
                                ___pr_img_html___
                                <h2 >___name___</h2>
                                <p>___desc___</p>
                                <p><strong>___company___</strong></p>
                                ___shortcut_html___
                            </div>
                        </div>`,
                shortcut: `<div class="qrc_profile_shortcut">
                                <ul>___shortcut_items___</ul>
                            </div>`,
                item: '<li class="qr_cc_card"><a rel="nofollow" href="___item_link___"><span class="___item_icon___"></span></a></li>',
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
    }
]



if (isComponentBasedUI() || page == 'displayPage') {
    if (typeof __savedQrCodeParams == "undefined") {
        __savedQrCodeParams = {}
    }
    if (extractDataFromArray(__savedQrCodeParams, ['page'], '') == 'digital-business-card') {
        exponentialBackoff(() => {
            return typeof DBC_Templates != "undefined"
        }, 30, 500, () => {
            QRPageComponents.init()
        })
    } else {
        QRPageComponents.init()
    }
}