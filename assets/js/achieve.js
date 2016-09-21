$(function () {
    "use strict";

    var AchieveCreator = function () {
        this.model = [];

        this.achieveForm = $('.create-achieve');
        this.achieveTitle = $('.create-achieve__title-add');
        this.achieveDesc = $('.create-achieve__desc-add');
        this.achieveList = $('.achievements__list');

        this.init();
    };

    // Узнать кол-во ачивок
    AchieveCreator.prototype.getLength = function () {
        return this.model.length;
    };


    // Добавление новой ачивки
    AchieveCreator.prototype.addAchieve = function (title, desc, image, color) {
        var newAchieve = {
            title: title,
            desc: desc,
            image: image,
            color: color
        };

        this.model.push(newAchieve);
        if (this.getLength() <= 100) {
            this.appendRenderItem(title, desc, image, color, this.getLength())
        } else {
            alert('У вас много ачивок')
        }
    };

    // Сабмит формы
    AchieveCreator.prototype.onFormSubmit = function (e, img, color) {
        var __self = this;


        var fr = new FileReader();
        fr.onload = function (e) {
            __self.addAchieve(__self.achieveTitle.val(), __self.achieveDesc.val(), e.target.result, color);
        };
        fr.readAsDataURL(img.files[0]);
    };

    // Шаблон ачивки
    AchieveCreator.prototype.getAchieveHtml = function (title, desc, image, color, index) {
        jQuery.fn.outerHTML = function (s) {
            return s
                ? this.before(s).remove()
                : jQuery("<p>").append(this.eq(0).clone()).html();
        };

        var achieveColor = ['achieve__badge_color-gold',
                            'achieve__badge_color-silver',
                            'achieve__badge_color-copper'];

        var imgSrc = "url(':imagePath')".replace(/:imagePath/gi, image);
        var imgStyle = 'style="background-image: :imgSrc "'.replace(/:imgSrc/gi, imgSrc);
        var badgeTitle = 'title=":alt"'.replace(/:alt/gi, title + ': ' + desc);

        var tmpl = $('.achieve_tmpl').clone().removeClass('achieve_tmpl').outerHTML();
        return tmpl
            .replace(/:index/gi, index)
            .replace(/:title/gi, title)
            .replace(/:description/gi, desc)
            .replace(/title=""/gi, badgeTitle)
            .replace(/style=""/gi, imgStyle)
            .replace(/achieve__badge_color/gi, achieveColor[color]);
    };

    // Добавить в DOM новый элемент
    AchieveCreator.prototype.appendRenderItem = function (title, desc, image, color, index) {
        this.achieveList.append(this.getAchieveHtml(title, desc, image, color, index));

    };


    // Инициализация
    AchieveCreator.prototype.init = function () {
        var __self = this;

        this.achieveForm.submit(function (e) {
            e.preventDefault();

            var color = ($('input[name="radio-button"]:checked').val());
            var img = this.elements['create-achieve__img-add'];

            if (img.files[0]) {
            __self.onFormSubmit(e, img, color)}
            return

        })
    };

    window.achieveCreator = new AchieveCreator();
});
