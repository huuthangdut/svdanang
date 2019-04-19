export const TINY_MCE = {
  API_KEY: "9byhcrv7dz1t8bdwslufkff61j23dt5zoo6kovgiia8ws443",
  SETTINGS: {
    selector: 'textarea',
    menubar: 'file edit insert view format table tools help view',
    plugins: "advlist autolink lists link image charmap print preview hr anchor pagebreak searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking save table contextmenu directionality emoticons template paste textcolor colorpicker textpattern autoresize",
    min_height: 400,
    toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
    toolbar2: "print preview media | forecolor backcolor emoticons",
    image_advtab: true,
    images_upload_handler: function (blobInfo, success, failure) {
      var xhr, formData;

      xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.open('POST', 'https://svdanang.herokuapp.com/uploadFile');

      xhr.onload = function () {
        var json;

        if (xhr.status != 200) {
          failure('HTTP Error: ' + xhr.status);
          return;
        }

        json = JSON.parse(xhr.responseText);

        if (!json || typeof json.fileDownloadUri != 'string') {
          failure('Invalid JSON: ' + xhr.responseText);
          return;
        }

        success(json.fileDownloadUri);
      };

      formData = new FormData();
      formData.append('file', blobInfo.blob(), blobInfo.filename());

      xhr.send(formData);
    },
  }
}