import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
	afuConfig = {
	    uploadAPI: {
	      url:"/uploads"
	    },
	    formatsAllowed: ".jpg,.png,.gif,.jpeg"
	};
  	constructor() { }
	croppedImage: any = '';
	imageBase64: any = '';

	DocUpload($event) {
		let resolver, promise = new Promise(_resolver=> resolver=_resolver);
		let self = this;
		let image = new Image;
		let response = JSON.parse($event.responseText);
		image.src = `/getFile?filename=${response.file.filename}`;
		image.onload = function(x) {
			var c = <HTMLCanvasElement>document.createElement("canvas");
			c.width = image.width;
        	c.height = image.height;
			var ctx = c.getContext("2d");
			ctx.drawImage(image, 0, 0, image.width, image.height);
			self.imageBase64 = c.toDataURL();
			self.croppedImage = self.imageBase64;
			resolver(self);
		};
		return promise;
	}
	imageCropped(image: string) {
	    this.croppedImage = image;
	}
 	ngOnInit (){

 	}
}
