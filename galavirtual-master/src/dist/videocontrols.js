AFRAME.registerComponent('videoplayer', {

    init: function() {

        let videosource = document.querySelector('#Proyecto-Salvador');

        let videoplay = () => {
            videosource.play();
        }

        this.el.addEventListener('click', videoplay);

    }
});